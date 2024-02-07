using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Additional middleware and configuration related to Stripe or other services can be added here.

// Example: Add a middleware for handling Stripe webhook events
app.Use(async (context, next) =>
{
    // Verify the webhook signature for incoming Stripe events
    // You can customize this middleware based on your webhook handling logic
    var stripeWebhookSecret = builder.Configuration.GetSection("Stripe:WebhookSecret").Get<string>();
    var webhookEndpointPath = "/webhooks/stripe";

    if (context.Request.Path.StartsWithSegments(webhookEndpointPath))
    {

        // Handle the Stripe event based on your application's logic
        // For example: HandlePaymentSuccess(stripeEvent);

        context.Response.StatusCode = 200;
        return;
    }

    await next();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

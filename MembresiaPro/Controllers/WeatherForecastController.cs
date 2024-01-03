using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PayPal.Api;
using Stripe.Checkout;
using System.Globalization;
using WooCommerce.NET.WordPress.v2;
using WooCommerceNET;
using WooCommerceNET.WooCommerce.v3;
using WooCommerceNET.WooCommerce.v3.Extension;
using Conekta.net.Client;
using Conekta.net.Api;
using Conekta.net.Model;
using Stripe;
using MembresiaPro.Models;
using Product = WooCommerceNET.WooCommerce.v3.Product;

namespace MembresiaPro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }


        [HttpPost("paypal")]
        public async Task<IActionResult> Agregar(string Nombre, decimal precio, int cantidad, string sku, string orderNumberState)
        {
            // Configurar las credenciales de PayPal
            var config = new Dictionary<string, string>
            {
                 {"mode", "sandbox"}, // O "live" para producción
                 {"clientId", "AX65rWJYdPgFIEpDgHNvnZlfbbL72IJ8JAxl41XRYcVkcpH80BZ6se5VMO-DLPck_4inY-08rLL_ixwn"},
                 {"clientSecret", "EPevlZP5qJBpYDi0emBdktegpi6Rd-s6zKMLKfXJrJaQKVun7Oow9eVHLN7e0wv7FrerauunDferoffH"}
            };

            // Obtener el token de acceso
            var accessToken = new OAuthTokenCredential(config).GetAccessToken();

            // Crear un pago
            var apiContext = new APIContext(accessToken);

            // Detalles de la transacción (ajusta según tus necesidades)
            var transactionDetails = new PayPal.Api.Details
            {
                tax = "0", // Impuestos
                shipping = "0", // Costo de envío
                subtotal = (precio * cantidad).ToString("F2") // Precio por cantidad
            };

            var transactionItemList = new ItemList
            {
                items = new List<Item>
        {
            new Item
            {
                name = Nombre,
                currency = "MXN", // Ajusta según tu moneda
                price = precio.ToString("F2"),
                quantity = cantidad.ToString(),
                sku = sku
            }
        }
            };

            var transaction = new Transaction
            {
                description = "Descripción de la transacción",
                invoice_number = Guid.NewGuid().ToString(), // Número de factura único
                amount = new Amount
                {
                    currency = "MXN", // Ajusta según tu moneda
                    total = (precio * cantidad).ToString("F2"), // Total de la transacción
                    details = transactionDetails
                },
                item_list = transactionItemList
            };

            var payment = new Payment
            {
                intent = "sale",
                payer = new Payer { payment_method = "paypal" },
                transactions = new List<Transaction> { transaction },
                redirect_urls = new RedirectUrls
                {
                    return_url = $"https://localhost:44470/retorno-paypal?orderNumberState={orderNumberState}",
                    cancel_url = "https://localhost:44470/cancelacion-paypal"
                }
            };

            try
            {
                // Crear el pago
                var createdPayment = payment.Create(apiContext);

                // Redirigir al usuario a la URL de PayPal para completar el pago
                var approvalUrl = createdPayment.links
                    .FirstOrDefault(link => link.rel.ToLower() == "approval_url")?.href;

                return Ok(new{ approvalUrl = approvalUrl, orderNumberState = orderNumberState });
            }
            catch (Exception ex)
            {
                // Manejar errores
                return BadRequest($"Error al crear el pago: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(string Nombre, decimal precio, int cantidad)
        {

            var itemOption = new
            {
                name = Nombre,
                price = precio,
                quantity = cantidad,
            };

            var domain = "https://localhost:44470/";
            var options = new SessionCreateOptions
            {
                SuccessUrl = domain,
                CancelUrl = domain + "CheckOut/Login",
                LineItems = new List<SessionLineItemOptions>(),
                Mode = "payment"
            };

            var sessionListItem = new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    UnitAmount = (long)(itemOption.price * itemOption.quantity),
                    Currency = "mxn",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = itemOption.name.ToString(),
                    }
                },
                Quantity = itemOption.quantity
            };
            options.LineItems.Add(sessionListItem);

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            var urlPayment = new { sessionUrl = session.Url };

            return Ok(urlPayment);
        }
    }

 }
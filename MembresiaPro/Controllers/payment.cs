using Conekta.net.Api;
using Conekta.net.Client;
using Conekta.net.Model;
using Microsoft.AspNetCore.Mvc;

namespace MembresiaPro.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class payment : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public payment(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpPost("conekta")]
        public async Task<IActionResult> Post(string Nombre, decimal precio, int cantidad)
        {

            string acceptLanguage = "en";
            Configuration configuration = new()
            {
                AccessToken = "key_Vbsu2aNqukurWFrbyZA1Rzg"
            };
            var ordersApi = new OrdersApi(configuration);
            var customerApi = new CustomersApi("key_yH1OGP40PNBcJWnzgfbqaya");

            // create customer
            var customer = new Customer(
                name: "test dot",
                phone: "+573143159063",
                email: "test@conekta.com"
            );
            CustomerResponse customerResponse = customerApi.CreateCustomer(customer);
            // Create OrderRequest

            var lineItems = new List<Product>{new (
        name: "toshiba",
        quantity: 1,
        unitPrice: 1555
    )};
            var charges = new List<ChargeRequest>{new (
    amount: 1555,
    paymentMethod: new ChargeRequestPaymentMethod(100)
)};
            var customerInfo = new OrderRequestCustomerInfo(new CustomerInfoJustCustomerId(customerResponse.Id));
            OrderRequest orderRequest = new OrderRequest(
                currency: "MXN",
                customerInfo: customerInfo,
                lineItems: lineItems,
                charges: charges
            );

            //Make the call to the service. This example code makes a call to /orders
            OrderResponse response = ordersApi.CreateOrder(orderRequest, acceptLanguage);
            return Ok(response);
        }
    }

}

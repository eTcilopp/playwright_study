const { log } = require("console");

class APIUtils
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login", 
            {data: this.loginPayload});

        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        return token;
    }

    async createOrder(orderPayload)
    {
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: orderPayload,
                headers: {
                    'Authorization': this.getToken(),
                    'Content-Type': 'application/json'
                },
            });
        const orderResponseJson = await  orderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
        return orderId;
    }
}


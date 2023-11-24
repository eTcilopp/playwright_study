const {test, expect, request} = require("@playwright/test");

const loginPayload = {"userEmail":"tcilop-p@yandex.ru","userPassword":"Iamking@123"}
let token;

test.beforeAll(async ()=> 
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:loginPayload});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;

});


test('Client App login', async ({page})=> 
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());

});

test('Place the order', async ({page})=>{
    const APIUtils = new APIUtils(apiContext, loginPayLoad);
    const orderId = createOrder(orderPayload);
})
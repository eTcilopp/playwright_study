const {test, expect, request} = require("@playwright/test");
const loginPayload = {"userEmail":"tcilop-p@yandex.ru","userPassword":"Iamking@123"}

test.beforeAll(async ()=> 
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:loginPayload});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = loginResponse.json();
    const token = loginResponseJson.token;
    console.log(loginResponseJson);

});

// test.beforeEach(()=>
// {

// });

test('PagePlaywright test', async ({page})=> 
{

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await page.locator("#userEmail").fill("tcilop-p@yandex.ru");
    await page.locator("#userPassword").fill("Iamking@123");
    await page.locator("[value='Login']").click();

});

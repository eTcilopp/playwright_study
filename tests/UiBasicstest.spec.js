const {test, expect} = require("@playwright/test");

test('Browser Context Declaration Playwright test', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://ibm.com/");
    console.log(await page.title());
});

test.only('PagePlaywright test', async ({page})=> 
{
    test.setTimeout(60000); 
    await page.goto("https://cfo-uat.api.vitruvi.cc/admin/login/?next=/admin/");
    // get title + assert
    console.log(await page.title());
    await expect(page).toHaveTitle("Log in | Vitruvi Admin");
    await page.locator('input[name="username"]').fill("Alexamder.Kirikeza@vitruvisoftware.com");
    await page.locator('input[name="password"]').fill("P@ssw0rd!");
    await page.locator('input[type="submit"]').click();
    console.log(await page.title());

});
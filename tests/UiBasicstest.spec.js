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
    await page.goto("https://ibm.com/");
    // get title + assert
    await page.title();
    await expect(page).toHaveTitle("IBM - Canada");
    
});
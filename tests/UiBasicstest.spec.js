const {test} = require("@playwright/test");

test('Browser Context Declaration Playwright test', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://ibm.com/");
});

test('PagePlaywright test', async ({page})=> 
{
    await page.goto("https://ibm.com/");
});
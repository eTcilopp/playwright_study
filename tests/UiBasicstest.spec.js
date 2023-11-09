const {test, expect} = require("@playwright/test");

test('Browser Context Declaration Playwright test', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://ibm.com/");
    console.log(await page.title());
});

test('PagePlaywright test', async ({page})=> 
{
    test.setTimeout(60000);
    // const context = await browser.newContext();
    // const page = await context.newPage();

    const userNameInput =  page.locator('input[name="username"]');
    const userPasswordInput =  page.locator('input[name="password"]');
    const submitButton = page.locator('input[type="submit"]');
    const section = page.locator(".section")

    await page.goto("https://cfo-uat.api.vitruvi.cc/admin/login/?next=/admin/");

    console.log(await page.title());
    await expect(page).toHaveTitle("Log in | Vitruvi Admin");

    await userPasswordInput.fill("P@ssw0rd!");;
    await submitButton.click();

    await expect(userNameInput).toHaveAttribute('required', '');
    const message = await page.evaluate(el => el.validationMessage, await userNameInput.elementHandle());
    expect(message).toContain('Please fill out this field');

    await userNameInput.fill("Alexander.Kirikeza@vitruvisoftware.com");
    await userPasswordInput.fill("P@ssw0rd!");
    await submitButton.click();
    
    
    /** 
    Интересно, что, согласно преподавателю, Playwright будет ждать, пока не появится  section.first() 
    (ждать разрешенные 30 или сколько там секунд).
    Однако, не будет ждать allTextContents(), т.к. удовлетворится пустым массивом []
    Т.е. если закомментировать эти две строки ниже, любой expect на содержание allTextContents()
    вернет ошибку.
    А у меня этого не происходит.
    **/
    // console.log(await section.first().textContent());
    // console.log(await section.nth(2).textContent());

    // Getting an array
    const allSections = await section.allTextContents();
    console.log(allSections);

});
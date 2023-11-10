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


test('UI Control test', async ({page})=> 
{

    // const context = await browser.newContext();
    // const page = await context.newPage();

    const userNameInput =  page.locator('input[name="username"]');
    const userPasswordInput =  page.locator('input[name="password"]');
    const submitButton = page.locator('input[type="submit"]');
    const section = page.locator(".section")
    const firstCheckbox = page.locator(".action-select").first()

    // await page.goto("https://cfo-uat.api.vitruvi.cc/admin/login/?next=/admin/");
    await page.goto("http://10.0.0.16:8000/admin/login/?next=/admin/");

    await userNameInput.fill("Alexander.Kirikeza@vitruvisoftware.com");
    await userPasswordInput.fill("P@ssw0rd!");
    await submitButton.click();
    
    await page.getByText('Custom actions').click();
    const dropdown =   page.locator("[name='action']");
    await dropdown.selectOption("Delete selected custom actions");

    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();
    await page.locator('.button').click();
    await page.locator("[class='button cancel-link']").click();

    await firstCheckbox.uncheck();
    // no assertion for uncheck() BUT
    expect(await firstCheckbox.isChecked()).toBeFalsy();

    const testLink = page.locator("[title*='Content Types']");
    await expect(testLink).toHaveAttribute("class", "section");
    await page.pause();

    


    await page.locator("#content").waitFor()
    
    
});

test.only('Lesson 20 test Child window', async ({browser})=> 
{
    // проблема состоит в том, что иногда при клике на ссылку открывается новое окно (новая вкладка)
    // чтобы работать с несколькими вкладками, нужно
    // передать в тест не страницу, а браузер (см. выше ---> test Child window', async ({browser})=>)
    // уже в браузере создать контекст
    const context = await browser.newContext();
    // в этом контексте создать новую страницу
    const page = await context.newPage();
    // найти ссылку как обычно
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    // далее нужно поймать новую страницу, соединив кликание на по ссылке и открытие страницы
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    // дальше обрабатывать как обычно.
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const retrievedUsername = text.split("@")[1].split(" ")[0].split(".")[0];
    console.log(retrievedUsername);

    // тут важно: newPage - это новая открывшаяся страница, 
    // page - старая родительская.
    await page.locator('input[name="username"]').fill(retrievedUsername);
    await page.pause();

})
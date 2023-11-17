const {test, expect} = require("@playwright/test");
const { assert } = require("console");

test('Browser Context Validating Error login', async ({page})=> 
{

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await page.locator("#userEmail").fill("tcilop-p@yandex.ru");
    await page.locator("#userPassword").fill("Iamking@123");
    await page.locator("[value='Login']").click();

 /* 
     await page.waitForLoadState('networkidle'); // команда ждать завершения всех API calls со страницы.
     предполагается, что все делается через service api call. Если это так, данные на странице будут,
     когда сеть сделает все calls и "успокоится"
     таким методом в т.ч. решается проблема, когда .allTextContents() не дожидается появления контента и
     возвращает пустой список, т.к.
     с т.з. PlayWright пустой список (когда на странице ничего нет) это уже что-то.
    однако, это не ВСЕГДА РАБОТАЕТ (что-то там на сайте даже есть)
    поэтому можно заменить на ожидание загрузки элемента (без .first() будет ошибка)
 */

    await page.locator(".card-body b").first().waitFor(); // дождались загрузки первого элемента
    const titles = await page.locator(".card-body b").allTextContents(); //получаем список заголовков всех элементов
    console.log(titles);

});


test('Section 6 end-to-end testing', async ({page})=> 
{
    
    const targetProductName = "adidas original";
    const products = page.locator(".card-body");  //got all card objects on the page

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await page.locator("#userEmail").fill("tcilop-p@yandex.ru");
    await page.locator("#userPassword").fill("Iamking@123");
    await page.locator("[value='Login']").click();

 /* 
     await page.waitForLoadState('networkidle'); // команда ждать завершения всех API calls со страницы.
     предполагается, что все делается через service api call. Если это так, данные на странице будут,
     когда сеть сделает все calls и "успокоится"
     таким методом в т.ч. решается проблема, когда .allTextContents() не дожидается появления контента и
     возвращает пустой список, т.к.
     с т.з. PlayWright пустой список (когда на странице ничего нет) это уже что-то.
    однако, это не ВСЕГДА РАБОТАЕТ (что-то там на сайте даже есть)
    поэтому можно заменить на ожидание загрузки элемента (без .first() будет ошибка)
 */

    await page.locator(".card-body b").first().waitFor(); // дождались загрузки первого элемента
    const count = await products.count();
    console.log("Starting the loop")
    console.log("Count = " + count)
    for(let i=0; i<count; i++)
    {
        console.log("Element " + i);
        let productName = await products.nth(i).locator("b").textContent();
        console.log("Product name:" + productName);
        if(productName === targetProductName);
        {
            // adding stuff to the cart
            // products.nth(i).locator(".fa-shopping-cart")
            // products.nth(i).locator("text= Add To Cart").click(); // круто - локаторы можно в цепь объединять
            products.nth(i).locator(".fa-shopping-cart").click(); // круто - локаторы можно в цепь объединять
            console.log("beep!");
            break;
        }

    }

    await page.locator('role=button[name=" Cart 1"]').click();

    await page.locator('role=button[name="Buy Now❯"]').click();

    expect(page.locator(".user__name [type='text']").first()).toHaveText("tcilop-p@yandex.ru");
    //
    await page.locator('form div').filter({ hasText: 'Credit Card Number' }).nth(2).click();
    await page.locator('input[type="text"]').first().fill('1234 5678 9123 1234');
    await page.getByRole('combobox').first().selectOption('02');
    await page.getByRole('combobox').nth(1).selectOption('09');
    await page.locator('input[type="text"]').nth(1).click();
    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).click();
    await page.locator('input[type="text"]').nth(2).fill('James Bond');
    await page.locator('input[name="coupon"]').click();

    await page.locator('input[name="coupon"]').fill('FREE');
    await page.getByRole('button', { name: 'Apply Coupon' }).click();

    await page.getByPlaceholder('Select Country').click();
    await page.getByPlaceholder('Select Country').pressSequentially('Can', { delay: 100 });
    const countryOptions = page.locator(".ta-results");
    await countryOptions.waitFor();
    console.log('95');
    const countryOptionCount = await countryOptions.locator("button").count();
    console.log("countryOptionCount: " + countryOptionCount);
    for(let i=0; i < countryOptionCount; i++)
    {
        let text = await countryOptions.locator("button").nth(i).textContent();
        console.log("Text: " + text);
        if(text.includes("Canada"))
        {
            countryOptions.locator("button").nth(i).click();
            console.log("Clicked on Canada")
        }
    }

    // await page.getByRole('button', { name: ' Canada' }).click();
    await page.getByText('Place Order').click(); 

    //
    

    await expect(page.locator('text=Thankyou for the order.')).toBeVisible();

    const workOrderLocator = page.locator('text=/\\|\\s*[^|]+\\s*\\|/');
    console.log(await workOrderLocator.textContent());
    await page.pause();

});


test('Section 7 unique getby locators testing', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    console.log(await page.title());

    await page.getByLabel("Check me out if you Love IceCreams!").click(); // PlayWright will find самостоятельно, на что именно кликнуть

    await page.getByLabel("Employed").click();

    await page.getByLabel("Gender").selectOption('Female');

    await page.getByPlaceholder("Password").fill("abc123");

    await page.getByRole("button", {name: 'Submit'}).click();
    // если кнопка только одна, уточнающая часть не нужна
    // await page.getByRole("button").click();


    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link", {name: 'Shop'}).click();

    /* 
        Интересная конструкция: 
        находим все карточки на странице: locator("app-card")
        из совокупности карточек выбираем ту, которая имеет текст
        в этой карточке находим элемент с ролью Кнопка. Поскольку кнопка тут одна, уточняющего аргумента не надо
    */
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    await page.pause();
});

test('Section 8 popup validations', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // page.on('dialog', dialog => dialog.accept());
    page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const numberOfSubscribers = await framesPage.locator(".text h2").textContent();
    console.log(numberOfSubscribers);


});
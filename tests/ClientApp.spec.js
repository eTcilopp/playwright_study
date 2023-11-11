const {test, expect} = require("@playwright/test");

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


test.only('Section 6 end-to-end testing', async ({page})=> 
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
    await page.getByPlaceholder('Select Country').fill('Can');
    await page.getByRole('button', { name: ' Canada' }).click();
    await page.getByText('Place Order').click(); 

    //
    await page.pause();

    const titles = await page.locator(".card-body b").allTextContents(); //получаем список заголовков всех элементов
    console.log(titles);

});

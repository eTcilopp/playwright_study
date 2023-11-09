const {test, expect} = require("@playwright/test");

test('Browser Context Validating Error login', async ({page})=> 
{
    // const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await page.locator("#userEmail").fill("tcilop-p@yandex.ru");
    await page.locator("#userPassword").fill("Iamking@123");
    await page.locator("[value='Login']").click();

    // await page.waitForLoadState('networkidle'); // команда ждать завершения всех API calls со страницы.
    // предполагается, что все делается через service api call. Если это так, данные на странице будут,
    // когда сеть сделает все calls и "успокоится"
    // таким методом в т.ч. решается проблема, когда .allTextContents() не дожидается появления контента и
    // возвращает пустой список, т.к.
    // с т.з. PlayWright пустой список (когда на странице ничего нет) это уже что-то.
    // однако, это не ВСЕГДА РАБОТАЕТ (что-то там на сайте даже есть)
    // поэтому можно заменить на ожидание загрузки элемента (без .first() будет ошибка)

    await page.locator(".card-body b").first().waitFor(); // дождались загрузки первого элемента
    const titles = await page.locator(".card-body b").allTextContents(); //получаем список заголовков всех элементов
    console.log(titles);


    
});

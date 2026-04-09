import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
  await page.goto('https://demoqa.com/', {timeout: 2000});
  // timeout = navigation timeout
  

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/demositeee/);
});

import { generateRandomNumber } from "../utils/utils.ts";
import { faker } from '@faker-js/faker';


test("Create new user", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
  await page.getByRole("textbox", { name: "Full Name" }).fill(faker.person.fullName());
  await page.getByPlaceholder("name@example.com").fill(`shahriarkabbo+${generateRandomNumber(1000,9999)}@gmail.com`)
  await page.getByRole("button", { name: "Submit" }).click();
  await page.pause();
});

test("button click", async ({ page }) => {
  await page.goto("https://demoqa.com/buttons");
  await page.getByRole("button", { name: "Double Click Me" }).dblclick();
  await page
    .getByRole("button", { name: "Right Click Me" })
    .click({ button: "right" });
  await expect(page.getByText("double click").nth(1)).toContainText(
    "You have done a double click"
  );
});

test("double click", async ({page})=>{
    await page.goto("https://demoqa.com/buttons");
    await page.getByRole("button",{name: "Double Click Me" }).dblclick();   
    const txtActual = await page.getByText("double click").nth(1).textContent(); // Double click message appears twice in the DOM; nth(1) returns the 2nd matching element (0-indexed), allowing us to retrieve the actual result message
    // const txtActual = await page.getByText("a double click").nth(1).textContent(); // make it unique to prevent the first element match // this is another way
    expect (txtActual).toContain("You have done a double click")


    // Right Click
    await page.getByRole("button",{name:"Right Click Me"}).click({button:"right"});
    const txtActualRightBtn = await page.getByText("a right click").textContent();
    expect (txtActualRightBtn).toContain("You have done a right click")

    await page.pause();
});


// Handle Alert
test("handle alert",async({page})=>{  
  await page.goto("https://demoqa.com/alerts");
  page.on("dialog", async(dialog)=>{
    console.log("Message", dialog.message());
    await dialog.accept();

  })
  await page.getByRole("button",{name: "Click me"}).first().click();
  await page.getByRole("button",{name: "Click me"}).nth(1).click();
   await page.pause();
})

// Form Submisson
test("Form submisson", async({page})=>{
 await page.goto("https://demoqa.com/text-box");
 await page.getByPlaceholder("Full Name").fill("Test Full Name");
 await page.getByPlaceholder("name@example.com").fill("kabbo@ibos.io");
 await page.locator("#currentAddress").fill("Bogura");
 await page.getByRole("textbox",{exact:true}).nth(3).fill("Mokamtola"); //if there are no Name filed in accessbility, then if there are textbox remains mulitple textbox then have to use nth()
 await page.locator("#submit").click();
 await page.pause();

})

//Manual Scroll
test("Manual scroll", async({page})=>{
   await page.goto("https://demoqa.com/text-box");
   await page.evaluate(()=>{
    window.scrollTo(0,600);
   })
   await page.pause();
})


// Tab Handling

test("Tab handling",async({page, context})=>{
    await page.goto("https://demoqa.com/browser-windows");
    const pagePromise = context.waitForEvent('page');
    await page.getByRole("button",{name: "New Tab"}).click();
    const newPage =  await pagePromise;
    const txtActual = await newPage.getByText("sample page").textContent();
    console.log(txtActual);
    await newPage.close();
    await page.waitForTimeout(2000);
    await page.getByRole("button",{name: "New Tab"}).click();
    await page.pause();
})

// Window Handling

test("Window Handling", async({page})=>{
    await page.goto("https://demoqa.com/browser-windows");
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole("button",{name: "New Window"}).nth(0).click();
    const popupPage = await popupPromise;
    const txtActual = await popupPage.getByText("sample page").textContent();
    console.log("Window popup text : ",txtActual);
    await popupPage.close();
    await page.waitForTimeout(2000);
    await page.getByRole("button",{name: "New Window"}).nth(0).click();
    await page.pause();
})
// Dropdown handling
test("Dropdown Handling",async({page})=>{
  await page.goto("https://demoqa.com/select-menu");
  await page.getByRole("combobox", {exact: true}).nth(2).selectOption({label: "Black"});
  await page.waitForTimeout(2000);
  await page.getByRole("combobox", {exact: true}).nth(2).selectOption({label: "White"});
  await page.waitForTimeout(2000);
  await page.pause();
})

// Select Dynamic Dropdown
test.only("Dynamic Dropdown", async({page})=>{
await page.goto("https://demoqa.com/select-menu");
await page.locator("#withOptGroup").click();
await page.waitForTimeout(4000);
await page.locator("#react-select-2-input").press("Enter");
await page.pause();
})




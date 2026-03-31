import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
  await page.goto('https://demoqa.com/', {timeout: 2000});
  // timeout = navigation timeout
  

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/demositeee/);
});

import { generateRandomNumber } from "../utils/utils.ts";
import { faker } from '@faker-js/faker';
import path from "path";

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

test.only("double click", async ({page})=>{
    await page.goto("https://demoqa.com/buttons");
    await page.getByRole("button",{name: "Double Click Me" }).dblclick();
    const txtActual = await page.getByText("double click").nth(1).textContent(); // Double click message appears twice in the DOM; nth(1) returns the 2nd matching element (0-indexed), allowing us to retrieve the actual result message
    expect (txtActual).toContain("You have done a double click")
    await page.pause();
})


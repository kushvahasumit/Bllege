import {test,expect} from '@playwright/test'
import { describe } from 'node:test';
const testdata = JSON.parse(JSON.stringify(require('../testdata.json')))

describe("my all bllege test", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("https://bllege.netlify.app");
     
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("textbox", { name: "Email" }).click();
    await page
      .getByRole("textbox", { name: "Email" })
      .fill(testdata.email);
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill(testdata.password);
    await page.getByRole("button", { name: "Sign In" }).click();
  });
 
  test.afterAll(async () => {
    console.log("done sucess!!");
  });

  test("homepage", async ({ page }) => {
    await page.goto("https://bllege.netlify.app");
  });

  test.skip("create poll", async ({ page }) => {
    await page
      .locator("div")
      .filter({ hasText: /^Start a Post \.\.\.$/ })
      .click();
    await page.waitForTimeout(6000);
    await page.getByLabel("Section").selectOption("Artificial-Intelligence");
    
    await page.getByLabel("Section").click();
    await page.getByRole("textbox", { name: "Topic" }).click();
    await page.getByRole("textbox", { name: "Topic" }).fill("This is my first poll");
    await page.getByRole("textbox", { name: "Content" }).click();
    await page.getByRole("textbox", { name: "Content" }).fill("This is poll description");
    await page.getByRole("button", { name: "Create Post" }).click();
    await page.locator(".lucide.lucide-circle-user").click();
    await page.getByRole("button", { name: "Logout" }).click();
  });

  test("logout", async ({ page }) => {
    await page.waitForLoadState("networkidle")
    await page.locator(".lucide.lucide-circle-user").click();
    await page.getByRole("button", { name: "Logout" }).click(); 
  });
 
});

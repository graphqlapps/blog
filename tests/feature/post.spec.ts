import { test, expect } from "@playwright/test";

test("create post", async ({ page }) => {
  await page.goto("/");

  const createPostButton = page.locator("text=Create a new Post");

  await createPostButton.click();

  await expect(await page.waitForSelector("text=# Hello")).toBeDefined();
});

test("edit post", async ({ page }) => {
  await page.goto("/");

  const createPostButton = page.locator("text=Create a new Post");

  await createPostButton.click();

  const editor = page.locator(".cm-editor");

  await page.locator("text=# Hello");

  await editor.type("\n## Heading 2");

  await page.locator("button.save").click();

  await page.reload();

  await expect(await page.waitForSelector("text=## Heading 2")).toBeDefined();
});

test("upload image", async ({ page }) => {
  await page.goto("/");

  await page.locator("text=Create a new Post").click();

  const editor = page.locator(".cm-editor");

  await page.locator("text=# Hello");

  await editor.press("ArrowDown");
  await editor.press("Enter");

  // https://playwright.dev/docs/input#upload-files
  // https://playwright.dev/docs/api/class-page#page-set-input-files
  await page.setInputFiles("input#image-input", "public/favicon.ico");

  expect(await page.waitForSelector("text=![favicon.ico]")).toBeDefined();
});

test("preview", async ({ page }) => {
  await page.goto("/");

  await page.locator("text=Create a new Post").click();

  await page.locator("button.preview").click();

  expect(await page.locator("h1").textContent()).toContain("Hello");
});

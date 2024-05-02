const { default: puppeteer } = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const text = generateText("eaysin", 24);
  expect(text).toBe("eaysin (24 years old)");

  const text1 = generateText("Anna", 24);
  expect(text1).toBe("Anna (24 years old)");
});

test("should output data-less text", () => {
  const text = generateText();
  expect(text).toBe("undefined (undefined years old)");
});

test("should generate a valid text output", () => {
  const text = checkAndGenerate("eaysin", 24);
  expect(text).toBe("eaysin (24 years old)");
});

test("should create an element with text and correct class", async () => {
  const brawser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920, 1080"],
  });

  const page = await brawser.newPage();
  await page.goto("http://127.0.0.1:5500/js-testing-introduction/index.html");

  await page.click("input#name");
  await page.type("input#name", "Eaysin");

  await page.click("input#age");
  await page.type("input#age", "24");

  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (el) => el.textContent);

  expect(finalText).toBe("Eaysin (24 years old)");
}, 10000);

const axios = require('axios');
const puppeteer = require('puppeteer');

const screenshot = async (extension, theme) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://127.0.0.1:8080/');

  await page.waitForSelector('.activitybar');

  await page.waitForTimeout(2000);

  await page.keyboard.down('Control');
  await page.keyboard.press('KeyO');
  await page.keyboard.up('Control');

  await page.waitForSelector('.ibwrapper input');

  await page.waitForTimeout(2000);

  await page.type('.ibwrapper input', 'superApp.js');

  await page.waitForTimeout(1000);

  await page.keyboard.press('Tab');

  await page.keyboard.press('Enter');

  await page.waitForTimeout(2000);

  const screenshot = await page.screenshot({ path: `images/${process.env.EXTENSION}_${process.env.THEME}.png`, fullPage: true });

  await browser.close();

  await deleteCI();
};

const deleteCI = async () => {
  await axios.post(`${functionsUrl}DeleteCI`, { containerInstanceId: process.env.CONTAINER_INSTANCE })
}

screenshot();
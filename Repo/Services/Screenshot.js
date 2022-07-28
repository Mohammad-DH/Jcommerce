import puppeteer from "puppeteer/lib/esm/puppeteer/node-puppeteer-core";
import * as fs from "fs";

export async function ScreenshotAsync(Link) {
  const cookiesFilePath = "./cookies.json";

  const Browser = await puppeteer.launch({ headless: true });
  const Page = await Browser.newPage();
  await Page.setViewport({
    width: 400,
    height: 1000,
  });
  //get cookies
  const previousSession = fs.existsSync(cookiesFilePath);
  if (previousSession) {
    // If file exist load the cookies
    const cookiesString = fs.readFileSync(cookiesFilePath);
    const parsedCookies = JSON.parse(cookiesString);
    if (parsedCookies.length !== 0) {
      for (let cookie of parsedCookies) {
        await Page.setCookie(cookie);
      }
      console.log("Session has been loaded in the browser");
    }
  }
  //go to target
  await Page.goto(Link, { waitUntil: "networkidle0" });

  //get current url
  const url = await Page.url();

  if (url !== Link) {
    //login
    //click on cookie popup
    //selector should be dynamic maybe from env file

    try {
      await Page.click("body > div.RnEpo.Yx5HN._4Yzd2 > div > div > button.aOOlW.bIiDR");
    } catch {}

    await Page.waitForSelector('input[name="username"]');

    await Page.type('input[name="username"]', "lplnmdh@gmail.com");
    await Page.type('input[name="password"]', "syncmaster1898");

    await Page.waitFor(2000);
    await Page.click('button[type="submit"]');

    await Page.waitForSelector("#react-root > section > main > div > div > div > section > div > button");
    await Page.click("#react-root > section > main > div > div > div > section > div > button");

    //save cookies
    const cookiesObject = await Page.cookies();

    // Write cookies to temp file to be used in other profile pages

    fs.writeFile(cookiesFilePath, JSON.stringify(cookiesObject), function (err) {
      if (err) {
        console.log("The file could not be written.", err);
      }
      console.log("Session has been successfully saved");
    });
  }

  // await Page.waitForSelector("._aa_8");
  // await Page.waitForSelector("._aayp img");
  // await Page.waitForSelector("._aagw");
  let element = await Page.$("._aa_8");

  let text = await Page.evaluate((el) => el.textContent, element);

  await Page.addStyleTag({
    content: "._abpb,._aanh,._accr,._acbh{display:none !important}",
  });

  let path = `./public/screenshots/${Link.split("/")[3]}.jpeg`;
  await Page.screenshot({ path, fullPage: true });
  await Browser.close();

  return { text, path };
}

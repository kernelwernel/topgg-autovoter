const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteerExtra.use(pluginStealth());

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function check(param, name) {
  if (param == null)
    throw new Error(`Error: Missing parameter ${name}`);
}

/**
* @param {String} voteUrl Your bot's vote url (e.g. https://top.gg/bot/123456789/vote)
* @param {String} userDataDir The path to your chrome user data directory for authentication (e.g. C:\Users\JohnSmith\AppData\Local\Google\Chrome\User Data). Note: You must be logged into top.gg on your normal browser.
* @param {String} connectSidCookie The cookie value for the connect.sid cookie if you do not want to use userDataDir.
* @return {Promise<Object>} Status of the vote { success: true, msg: "Successfully voted for [Bot Name]!" }
*/
async function vote({ voteUrl, userDataDir, connectSidCookie }) {
  let options = connectSidCookie ? { headless: false, ignoreDefaultArgs: ["--enable-automation"] } : { headless: false, userDataDir, ignoreDefaultArgs: ["--enable-automation"] };
  const browser = await puppeteerExtra.launch(options);
  try {
    check(voteUrl, 'voteUrl');
    connectSidCookie == null ? check(userDataDir, 'userDataDir') : check(connectSidCookie, 'connectSidCookie');
    const page = await browser.newPage();
    if (connectSidCookie) {
      const cookies = [{ name: "connect.sid", value: connectSidCookie, domain: "top.gg" }];
      await page.setCookie(...cookies);
    }
    await page.goto(voteUrl);
    await page.setExtraHTTPHeaders({ "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"", "sec-ch-ua-platform": "\"Windows\"", "sec-ch-ua-mobile": "?0" });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36");
    await page.waitForSelector('#__next > div > div > div.chakra-container.css-15i7o5c > div > div.css-d171a1 > div > div.css-1ilyui9 > main > div.css-u9cil6 > div > div.css-1yn6pjb > button:not([disabled])');
    const title = (await page.$eval("#__next > div > div > div.chakra-container.css-15i7o5c > div > section > div.chakra-stack.css-yd7dk3 > div > div.chakra-stack.css-107jsli > h1", el => el.textContent)).replace("Voting for ", "");
    const button = await page.$("#__next > div > div > div.chakra-container.css-15i7o5c > div > div.css-d171a1 > div > div.css-1ilyui9 > main > div.css-u9cil6 > div > div.css-1yn6pjb > button");
    await sleep(500);
    await button.evaluate(el => el.click());
    await sleep(500);
    await browser.close();
    return { success: true, msg: `Successfully voted for ${title}!` };
  } catch (e) {
    await browser.close();
    return { success: false, msg: e.message ? e.message : e };
  }
};

module.exports.vote = vote;
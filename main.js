const puppeteer = require("puppeteer");
const fs = require("fs");
const ioe = require("./ioe.json");

const ranked = fs.createWriteStream(`ranked${Date.now()}.txt`, {
  flags: "a",
});
getData = async (page, url) => {
  await page.goto(url);
  const name = await page.$$eval("table tr td:nth-child(2)", (options) =>
    options.map((option) => option.textContent)
  );
  const rollno = await page.$$eval("table tr td:nth-child(3)", (options) =>
    options.map((option) => option.textContent)
  );
  return { name, rollno };
};
async function main() {
  let dataAll = [];
  let page_count;
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://khwopa.edu.np/apply/verified_applicants.html");
  page_count = await page.evaluate(() => {
    const page_count = document.querySelector("ul#yw1 li:nth-last-child(3)")
      .innerText;
    return page_count;
  });
  await page.goto(
    `https://khwopa.edu.np/apply/verified_applicants.html?SA3_page=${10}`
  );
  page_count = await page.evaluate(() => {
    const page_count = document.querySelector("ul#yw1 li:nth-last-child(3)")
      .innerText;
    return page_count;
  });
  console.log(page_count);
  for (let index = 1; index <= page_count; index++) {
    let url = `https://khwopa.edu.np/apply/verified_applicants.html?SA3_page=${index}`;
    const data = await getData(page, url);
    dataAll.push(data);
  }
  let oneName = dataAll.map((a) => a.name);
  let oneRoll = dataAll.map((a) => a.rollno);
  let finalName = [];
  let finalRoll = [];
  let matchedRoll = [];

  for (let data of oneName) {
    for (let name of data) finalName.push(name);
  }
  for (let data of oneRoll) {
    for (let name of data) finalRoll.push(name);
  }
  const Name = finalName.map((a) => a);
  const Roll = finalRoll.map((a) => a);
  // const finalNaiHo = [Name, Roll];

  for (roll of finalRoll) {
    ioe.map((a) => {
      a.FormNo === roll ? matchedRoll.push(a.Rank) : null;
    });
  }

  console.log(matchedRoll);
  const sortedRoll = matchedRoll.sort(function (a, b) {
    return a - b;
  });
  sortedRoll.forEach(function (v) {
    ranked.write(v + "\n");
  });

  await browser.close();
  ranked.end();
  console.log("\nTotal number of Applicants:", finalRoll.length);
}
main();

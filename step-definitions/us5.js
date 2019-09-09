const ares = require('ares-helper'); // laddar in ares helper
let { $, sleep } = require('./funcs');

module.exports = function () {

  this.Given(/^I have logged as Sven$/, async function () {
    //definition till Ares
    await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
    await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)
      moduleName: 'Swedenbank transaktionshistorik',
      totalTests: 1
    });
    await sleep(1000);
    await helpers.loadPage('http://localhost:3000/#login');

    await driver.findElement(By.id("username")).sendKeys("Sven");
    await driver.findElement(By.id("password")).sendKeys("7777777");
    await sleep(1000);
    let LoginBtn = await driver.findElement(By.css('form.login-form button[type="submit"]'));
    await LoginBtn.click();
    await sleep(1000);

  });

  this.Given(/^I am on the start page$/, async function () {
    await helpers.loadPage('http://localhost:3000/#login');

  });

  this.When(/^I choose Mina konton button$/, async function () {

    await helpers.loadPage('http://localhost:3000/#my-accounts');
  });

  this.When(/^I choose one of my Kontonamn$/, async function () {
    await sleep(1000);
    driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[1]/th/a")).click();
    await sleep(1000);

  });
  radTio = -200;
  this.Then(/^I can see the latest ten transactions$/, async function () {
    // Goto the account-detail page
    await helpers.loadPage('http://localhost:3000/#account-details');
    // Grab all lines with account info
    await sleep(1000);
    let history = await $('section.history table tbody tr');
    let salarySum;
    for (let account of history) {
      let text = await account.getText();
      if (text.includes('Test')) { //Test är på första kolumnen, rad 10
        salarySum = account;
      }
    }
    // td with balance
    let balanceTd = await salarySum.findElement(by.css('td:nth-child(2)'));
    let balance = await balanceTd.getText();
    balance = balance / 1; // converting to number 

    //console.log("PÅ RAD 10 ÄR MEDDELANDET TEST OCH SUMMAN SKA VARA: " +radTio+ " OCH ÄR:", balance);
    assert.equal(balance, '-200', 'PÅ RAD 10 ÄR MEDDELANDET TEST OCH SUMMAN SKA VARA: ' + radTio + ' OCH ÄR: ' + balance);

    // ares
    await ares.testResult({ // skicka resultatet till testrapporten
      moduleName: 'Swedenbank transaktionshistorik',
      title: 'Has your money been sent?',
      //passed: result, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
      passed: (balance == '-200'),
      errorMessage: 'Fel summa'
    });

    await ares.endModule({ // avslutar vi denna testrapport
      moduleName: 'Swedenbank transaktionshistorik',
    });
    await ares.endTests();  // avslutar hela ares
  });
}
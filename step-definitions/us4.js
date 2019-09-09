const ares = require('ares-helper'); // laddar in ares helper
let { $, sleep } = require('./funcs');


module.exports = function () {


  this.Given(/^I have logged in as Pelle$/, async function () {
    //definition till Ares
    await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
    await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)
      moduleName: 'Swedenbank överföring annat konto',
      totalTests: 1
    });

    //Först loggar jag in
    await helpers.loadPage('http://localhost:3000/#login');
    await sleep(1000);
    await driver.findElement(By.id("username")).sendKeys("Pelle");
    await driver.findElement(By.id("password")).sendKeys("123456");
    await sleep(1000);
    let LoginBtn = await driver.findElement(By.css('form.login-form button[type="submit"]'));
    await LoginBtn.click();
    await sleep(1000);

  });

  //Här kommer jag till överföring mellan mina konto sidan
  this.Given(/^I am on the 'Överföring mina konton' page$/, async function () {
    await helpers.loadPage('http://localhost:3000/#transfermyaccount');
    await sleep(1000);
  });

  //Här väljer jag från vilket konto pengarna ska dras, dropdownmeny
  this.When(/^I enter my Kortkonto \- (\d+)\-(\d+)$/, async function (arg1, arg2) {

    driver.findElement({ id: 'fromAccountNumber' });// select dropdown element you wish to select
    await sleep(1000);
    driver.findElement({ id: 'fromAccountNumber' }).sendKeys('Kortkonto -7687-020127');
    await sleep(1000);

  });
  //Skriver in beloppet
  this.When(/^I enter (\d+) kronor$/, async function (arg1) {
    driver.findElement({ id: 'sum' });
    await sleep(1000);
    driver.findElement({ id: 'sum' }).sendKeys('200');
    await sleep(1000);
  });
  //Här väljer jag till vilket konto pengarna ska överföras, dropdownmeny
  this.When(/^I enter my Slösa \- (\d+)\-(\d+) konto/, async function (arg1, arg2) {
    driver.findElement({ id: 'toAccountNumber' });// select dropdown element you wish to select
    await sleep(1000);
    driver.findElement({ id: 'toAccountNumber' }).sendKeys('Slösa - 9324-506032');
    await sleep(1000);
  });
  //Skriver ett meddelande om transaktionen
  this.When(/^I write a message \- (\d+) kronor från kortkonto till slösa kontot$/, async function (arg1) {
    await sleep(1000);
    driver.findElement(By.id("label")).sendKeys("200 kronor från kortkonto till slösa kontot");
    await sleep(1000);
  });

  //Klickar på knappen utför
  this.When(/^I click on the 'Utför' button$/, async function () {
    await sleep(1000);
    driver.findElement(By.xpath("/html/body/main/div/article/form/div[4]/div/button")).click();
    await sleep(1000);
  });

  //Transaktionen utförs och därefter visas startsidan där man kan se överföringen

  let expectedAmount = 200;
  this.Then(/^the money is tranfered$/, async function () {
    await sleep(1000);
    await helpers.loadPage('http://localhost:3000/#start');
    await sleep(1000);
    let accounts = await $('section.accounts table tbody tr');
    let spendAccount = await $('body > main > div > article > section.only-if-logged-in.start-history.row.px-2 > table > tbody > tr:nth-child(1) > td:nth-child(3)');
    let balance = await spendAccount.getText()

    balance = balance / 1; // converting to number

    //console.log("THE AMOUNT ON PELLES SPENDACCOUNT SHOULD BE: " +expectedAmount+" AND IS:", balance);
    assert.equal(balance, '200', 'THE AMOUNT ON PELLES SPENDACCOUNT SHOULD BE: ' + expectedAmount + ' AND IS: ' + balance)

    // ares
    await ares.testResult({ // skicka resultatet till testrapporten
      moduleName: 'Swedenbank överföring annat konto',
      title: 'Has your money been sent?',
      //passed: result, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
      passed: (balance == '200'),
      errorMessage: 'Fel summa'
    });

    await ares.endModule({ // avslutar vi denna testrapport
      moduleName: 'Swedenbank överföring annat konto',
    });
    
  });

}
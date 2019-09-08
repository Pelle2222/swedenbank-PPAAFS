//let today = new Date();
//let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//let today = new Date();
//let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const ares = require('ares-helper'); // laddar in ares helper
// ares.debug = true; // vi får debug info
// ares.setProjectInfo({ // hjälpfunktion för att kunna "logga in" på ares
//   "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjcyNDExNDEsImVtYWlsIjoic3Bhd25lZDkyQGhvdG1haWwuY29tIiwiaWF0IjoxNTY3MTU0NzQxfQ.V3PUqq24hwhyKnmxOeWRQ0cnp2NhJIPD27H5DH644Yk",
//   "workspaceName": "outlook_default",
//   "projectKey": "5d6e566d3e47305847483e92",
//   "projectName": "Ares - Swedenbank"
// });


let { $, sleep } = require('./funcs');
module.exports = function () {

  let balanceBefore;


  this.Given(/^I have logged in as Arne$/, async function () {
    await sleep(1000);
    await helpers.loadPage('http://localhost:3000/#login');
    //definition till Ares
    await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
    await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)
      moduleName: 'Swedenbank löneinsättning',
      totalTests: 1
    });

    
    //await helpers.loadPage('http://localhost:3000/#login');

    await driver.findElement(By.id("username")).sendKeys("Arne");
    await driver.findElement(By.id("password")).sendKeys("222222");
    await sleep(1000);
    let LoginBtn = await driver.findElement(By.css('form.login-form button[type="submit"]'));
    await LoginBtn.click();
    await sleep(1000);


    let guessLetters = await $('.username');
    let contents = await guessLetters.getText();
    // check that the pressedKey letter is included (as a capital)
    console.warn(contents)
    console.warn('Arne')
    assert.equal(contents, 'Arne', 'Fel användarnamn')

    await sleep(1000);

    await helpers.loadPage('http://localhost:3000/#my-accounts');
    // Grab all lines with account info
    let accounts = await $('section.accounts table tbody tr');
    let salaryAccount = await $('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > td.text-right');
    let balance = await salaryAccount.getText()
    balance = balance.replace(/\D/g, '') / 100; // converting to number
    balanceBefore = balance;


  });

  this.Given(/^I am on the simulate-page$/, async function () {
    await helpers.loadPage('http://localhost:3000/#simulate');
    await sleep(1000);
  });

  this.When(/^I enter my Lönekonto "([^"]*)" from dropdownmeny$/, async function (kontonr) {
    let account = await $('#accountNumber > option:nth-child(1)')
    await account.click()
    await sleep(1000);
  });

  this.When(/^I enter insättning from dropdownmeny$/, async function () {
    await driver.findElement({ id: 'depositOrWithdraw' });// select dropdown element you wish to select
    await sleep(1000);
    await driver.findElement({ id: 'depositOrWithdraw' }).sendKeys('Insättning');
    await sleep(1000);
  });
  this.When(/^I enter an amount of (\d+) kronor$/, async function (arg1) {
    driver.findElement({ id: 'sum' });
    await sleep(1000);
    driver.findElement({ id: 'sum' }).sendKeys('22000');
    await sleep(1000);

  });
  this.When(/^I write a message \- Lön (\d+) kronor$/, async function (arg1) {
    await sleep(1000);
    await driver.findElement(By.id("label")).sendKeys("Lön 22000 kronor");
    await sleep(1000);
  });
  this.When(/^I click on the Utför button to transfer the money$/, async function () {
    await sleep(1000);
    let LoginBtn = await driver.findElement(By.css('form.simulate-form button[type="submit"]'));
    await LoginBtn.click();
    await sleep(1000);


  });

  this.Then(/^(\d+) kronor is transfered to Arnes Lönekonto$/, async function (amount) {
    await sleep(1000);
    // Goto the account page
    await helpers.loadPage('http://localhost:3000/#my-accounts');
    // Grab all lines with account info
    let accounts = await $('section.accounts table tbody tr');
    let salaryAccount = await $('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > td.text-right');
    let balance = await salaryAccount.getText()
    balance = balance.replace(/\D/g, '') / 100; // converting to number
    //console.log("GOT THE AMOUNT OF THE SALYRY:", balance - balanceBefore);
    assert.equal(balance - balanceBefore, '22000', 'Fel summa lönen ska vara 22000 kr men är' + balance - balanceBefore + '');

    // ares
    await ares.testResult({ // skicka resultatet till testrapporten
      moduleName: 'Swedenbank löneinsättning',
      title: 'Has your money been sent?',
      //passed: result, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
      passed: (balance - balanceBefore == '22000'),
      errorMessage: 'Fel summa'
    });

    await ares.endModule({ // avslutar vi denna testrapport
      moduleName: 'Swedenbank löneinsättning',
    });

    await ares.endTests();  // avslutar hela ares   
  });


}
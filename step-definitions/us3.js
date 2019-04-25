let {$, sleep} = require('./funcs');

module.exports = function(){

  this.Given(/^I have logged in as Pelle$/, async function () {
    //Först loggar jag in
    await helpers.loadPage('http://localhost:3000/#login');
                  
    driver.findElement(By.id("username")).sendKeys("Pelle");   
    driver.findElement(By.id("password")).sendKeys("123456"); 
     await sleep(1000);
    let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
    await LoginBtn.click();
    await sleep(1000);
    });

    this.Given(/^I am on the simulate\-page$/, async function () {
        // Write code here that turns the phrase above into concrete actions
        await helpers.loadPage('http://localhost:3000/#simulate');
      }); 

      this.When(/^I enter my Kortkonto \- (\d+)\-(\d+) from dropdownmeny$/, async function (arg1, arg2) {
        driver.findElement({id: 'accountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'accountNumber'}).sendKeys('Kortkonto - 7687-020127');
        await sleep(1000);
      });

      this.When(/^I enter uttag from dropdownmeny$/, async function () {
        driver.findElement({id: 'depositOrWithdraw'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'depositOrWithdraw'}).sendKeys('Uttag');
        await sleep(1000);
      });

      this.When(/^I enter a amount of (\d+) kronor$/, async function (arg1) {
        driver.findElement({id: 'sum'});
        await sleep(1000);
        driver.findElement({id: 'sum'}).sendKeys('105');
        await sleep(1000);
      });

      this.When(/^I write a message \- ICA handlat för (\d+) kronor$/, async function (arg1) {
        await sleep(1000);
        driver.findElement(By.id("label")).sendKeys("ICA handlat för 105 kronor"); 
        await sleep(1000);
      });

      this.When(/^I click on the Utför button$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/form/div[5]/button")).click();
        await sleep(1000);
        
      });
      let expectedAmount = -105;
      this.Then(/^the money is substracted from the account$/, async function () {
        await sleep(1000);
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);

        let accounts = await $('section.accounts table tbody tr');
        let cardAccount = await $('body > main > div > article > section.only-if-logged-in.start-history.row.px-2 > table > tbody > tr:nth-child(1) > td:nth-child(3)');
        let balance = await cardAccount.getText()
        
        balance = balance / 1; // converting to number
        assert.equal(balance, '-105', 'Fel -105 kronor skall ha dragits från Kortkontot') 
        console.log("THE AMOUNT THAT IS WITHDRAWN FROM PELLES KORTKONTO SHOULD BE: " +expectedAmount+" AND IS:", balance);
      });

     

     

}
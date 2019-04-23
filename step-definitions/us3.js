let {$, sleep} = require('./funcs');

module.exports = function(){

    this.Given(/^I am on the simulate\-page$/, async function () {
        // Write code here that turns the phrase above into concrete actions
        await helpers.loadPage('http://localhost:3000/#simulate');
      }); 

      this.When(/^I enter my Kortkonto \- (\d+)\-(\d+) from dropdownmeny$/, async function (arg1, arg2) {
        driver.findElement({id: 'accountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'accountNumber'}).sendKeys('Kortkonto - 7687-020127');
        await sleep(3000);
      });

      this.When(/^I enter uttag from dropdownmeny$/, async function () {
        driver.findElement({id: 'depositOrWithdraw'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'depositOrWithdraw'}).sendKeys('Uttag');
        await sleep(3000);
      });

      this.When(/^I enter a amount of (\d+) kronor$/, async function (arg1) {
        driver.findElement({id: 'sum'});
        await sleep(1000);
        driver.findElement({id: 'sum'}).sendKeys('105');
        await sleep(2000);
      });

      this.When(/^I write a message \- ICA handlat för (\d+) kronor$/, async function (arg1) {
        await sleep(1000);
        driver.findElement(By.id("label")).sendKeys("ICA handlat för 105 kronor"); 
        await sleep(2000);
      });

      this.When(/^I click on the Utför button$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/form/div[5]/button")).click();
        await sleep(3000);
        
      });

      this.Then(/^the money is substracted from the account$/, async function () {
        await sleep(1000);
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(5000);
      });

     

     

}
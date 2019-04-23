let {$, sleep} = require('./funcs');

module.exports = function(){

    this.Given(/^I am on the transfer page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#transfer');
        await sleep(1000);
      });

      this.When(/^I choose Kortkonto \- (\d+)\-(\d+) from dropdownmeny$/, async function (arg1, arg2) {
        driver.findElement({id: 'fromAccountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'fromAccountNumber'}).sendKeys('Kortkonto - 7687-020127');
        await sleep(2000);
      });

      this.When(/^I choose option from other accounts$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"accountTypes\"]/label[3]/input")).click(); //radio buttons
        await sleep(2000); 
      });

      this.When(/^I enter Olofs account (\d+)\-(\d+)$/, async function (arg1, arg2) {
        driver.findElement({id: 'toAccountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'toAccountNumber'}).sendKeys('7831-329257');
        await sleep(2000);
      });

      this.When(/^I enter the amount of (\d+) kronor to transfer$/, async function (arg1) {
        driver.findElement({id: 'sum'});
        await sleep(1000);
        driver.findElement({id: 'sum'}).sendKeys('189');
        await sleep(2000);
      });

      this.When(/^I write a message \- Olof, här får du (\d+) kronor från Pelle$/, async function (arg1) {
        await sleep(1000);
        driver.findElement(By.id("label")).sendKeys("Olof, här får du 189 kronor från Pelle"); 
        await sleep(2000);
      });

      this.When(/^I click on the button Utför$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
        await sleep(2000); 
        driver.switchTo().alert().accept();
        await sleep(2000);
      });

      this.Then(/^the money is substracted from Pelles account$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(4000);
        driver.findElement(By.xpath("/html/body/main/div/aside/nav/ul/li[7]/button/a")).click(); //Logout as Pelle
        await sleep(1000);
      });

      this.Then(/^I login as Olof$/, async function () {
          await helpers.loadPage('http://localhost:3000/#login');      
          driver.findElement(By.id("username")).sendKeys("Olof");   //Login as Olof
          driver.findElement(By.id("password")).sendKeys("Gumulkaget"); 
          await sleep(1000);
          driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
          await sleep(3000);
      });

      this.Then(/^I verify if the money is tranfered to Olofs account$/, async function () {
        await sleep(5000); //kolla om pengarna dragits från Olofs konto (vilket dom inte har)
      });

}
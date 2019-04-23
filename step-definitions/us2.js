//let today = new Date();
//let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//let today = new Date();
//let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


let {$, sleep} = require('./funcs');
module.exports = function(){
    this.Given(/^I have logged in as Arne$/, async function () {
        await helpers.loadPage('http://localhost:3000/#login');
                  
          driver.findElement(By.id("username")).sendKeys("Arne");   
         driver.findElement(By.id("password")).sendKeys("222222"); 
          await sleep(1000);
          driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
          await sleep(1000);
      });

      this.When(/^I enter my Lönekonto \- (\d+)\-(\d+) from dropdownmeny$/, async function (arg1, arg2) {
        driver.findElement({id: 'accountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'accountNumber'}).sendKeys('Lönekonto - 9170-843779');
        await sleep(2000);
      });

      this.When(/^I enter insättning from dropdownmeny$/, async function () {        
        driver.findElement({id: 'depositOrWithdraw'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'depositOrWithdraw'}).sendKeys('Insättning');
        await sleep(3000);
      });

      this.When(/^I enter an amount of (\d+) kronor$/, async function (arg1) {
        driver.findElement({id: 'sum'});
        await sleep(1000);
        driver.findElement({id: 'sum'}).sendKeys('22000');
        await sleep(2000);
      });

      this.When(/^I write a message \- Lön (\d+) kronor$/, async function (arg1) {
        await sleep(1000);
        driver.findElement(By.id("label")).sendKeys("Lön 22000 kronor"); 
        await sleep(2000);
      });

      this.When(/^I click on the Utför button to transfer the money$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/form/div[5]/button")).click();
        await sleep(3000);
      });

      this.Then(/^(\d+) kronor is transfered to Arnes Lönekonto$/, async function (arg1) {
        await sleep(1000);
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(5000);
      });


}
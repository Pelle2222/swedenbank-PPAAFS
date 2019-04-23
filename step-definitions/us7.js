let {$, sleep} = require('./funcs');

module.exports = function(){

    this.Given(/^I am on the my\-accounts page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
      });

      this.When(/^I choose to create a new account$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/section[2]/button")).click();
        await sleep(2000); 
      });

      this.When(/^call the account Lönekonto$/, async function () {
        driver.findElement(By.id("newAccountName")).sendKeys("Lönekonto"); 
      });

      this.Then(/^the Lönekonto is created$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"addAccountModal\"]/div/div/div[3]/button[2]")).click();
        await sleep(3000); 
      });

      this.When(/^I choose to change the name of the account$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[3]/td[4]/button")).click();
        await sleep(2000); 
      });

      this.When(/^rename it to Sparkonto$/, async function () {
        driver.findElement(By.id("changeName")).sendKeys("Sparkonto"); 
        
      });
      this.Then(/^the account is changed to Sparkonto$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"changeNameModal\"]/div/div/div[3]/button[2]")).click();
        await sleep(3000); 
      });

      this.When(/^I choose to delete the Sparkonto$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[3]/td[3]/button")).click();
        await sleep(3000);
      });

      this.Then(/^the Sparkonto account is deleted$/, async function () {
        await sleep(4000);
      });


      
}
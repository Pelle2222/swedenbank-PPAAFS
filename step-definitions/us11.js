let {$, sleep} = require('./funcs');
module.exports = function(){

     this.Given(/^I am in the login page$/,async function () {
          await helpers.loadPage('http://localhost:3000/#login');

        });


     this.When(/^I fill my username "([^"]*)"$/,async function (name) {
          await driver.findElement(By.id("username")).sendKeys(name); 

        });

     this.When(/^I fill my password "([^"]*)"$/,async function (pass) {
          await driver.findElement(By.id("password")).sendKeys(pass); 

        });

        this.Then(/^I should see a summary balance of all my accounts and my last five transaction of the account$/,async function () {
          await sleep(1000);
          let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
          await LoginBtn.click();
          await sleep(1000);
        });
 





     

}
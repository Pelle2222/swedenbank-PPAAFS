let {$, sleep} = require('./funcs');
module.exports = function(){

  this.Given(/^I have logged in as Vanessa$/,async function () {
    await helpers.loadPage('http://localhost:3000/#login');
              
    driver.findElement(By.id("username")).sendKeys("Vanessa");   
    driver.findElement(By.id("password")).sendKeys("333333"); 
    await sleep(1000);
    let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
    await LoginBtn.click();
    await sleep(1000);
  });

  this.Given(/^I am on the start page$/,async function () {
    await helpers.loadPage('http://localhost:3000/#start');
  });

  this.When(/^I choose transfer to other account than my own$/,async function () {
    await sleep(1000);
    driver.findElement(By.xpath("/html/body/main/div/aside/nav/ul/li[5]/button/a")).click();
    await sleep(1000);
  });

  this.When(/^I fill the account number "([^"]*)"$/,async function (accnr) {
    await sleep(1000);
    await driver.findElement(By.xpath("//*[@id=\"accountTypes\"]/label[3]/input")).click(); //radio buttons
    let accountNr = await driver.findElement(By.id("toAccountNumber")).sendKeys(accnr);
    await sleep (2000);

  });


  this.When(/^I fill balance "([^"]*)" SEK$/, async function (amount) {

    let sumBalance= await driver.findElement(By.id("sum")).sendKeys(amount); 
    await sleep (1000);

  });

  this.When(/^I press utför button$/,async function () {
    await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
        await sleep(2000); 
         driver.switchTo().alert().accept();
         await sleep(2000);// Write code here that turns the phrase above into concrete actions
  });


  this.Then(/^I should see a message that i cannot transfer over in the last (\d+) days$/,async function () {
    await sleep(1000);
    await driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();

  });


  this.Then(/^I change my balance "([^"]*)" SEK$/, async function (under) {
    let ChangeBalance= await driver.findElement(By.id("sum")).sendKeys(under); 
    await sleep (1000);
            });

   this.Then(/^I press utför button$/,async function () {
        
   });

  this.Then(/^I should see a transfer approval message$/,async function () {
  // Write code here that turns the phrase above into concrete actions
  
});
   
}
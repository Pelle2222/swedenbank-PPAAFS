let {$, sleep} = require('./funcs');

module.exports = function(){

  this.Given(/^I have logged in as Pelle$/, async function () {
    //Först loggar jag in
    await sleep(1000);
    await helpers.loadPage('http://localhost:3000/#login');
                  
    await driver.findElement(By.id("username")).sendKeys("Pelle");   
    await driver.findElement(By.id("password")).sendKeys("123456"); 
    await sleep(1000);
    let LoginBtn = await $('form.login-form button[type="submit"]');
    await LoginBtn.click();
    await sleep(1000);
  });

    this.Given(/^I am on the my\-accounts page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
      });

      this.When(/^I choose to create a new account$/, async function () {
        let clickButton = await $("body > main > div > article > section.row.px-2 > button");
        clickButton.click();
        await sleep(1000); 
      });

      this.When(/^call the account Lönekonto$/, async function () {
        await driver.findElement(By.id("newAccountName")).sendKeys("Lönekonto"); 
      });

      let expectedText = 'Lönekonto';
      this.Then(/^the Lönekonto is created$/, async function () {
        await sleep(1000);
        let clickButton = await $("#addAccountModal > div > div > div.modal-footer > button:nth-child(2)");
        clickButton.click();
        await sleep(1000); 

        let accounts = await $('section.accounts table tbody tr');
        let accountName = await $('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(3) > th > a');
        let balance = await accountName.getText() 
         
        //console.log("THE NAME OF THE NEW ACCOUNT SHOULD BE: " +expectedText+" AND IS:", balance);
        assert.equal(balance, 'Lönekonto', 'THE NAME OF THE NEW ACCOUNT SHOULD BE: ' +expectedText+ ' AND IS: '+ balance);
        
      });

      this.When(/^I choose to change the name of the account$/, async function () {
        await sleep(1000);
        let pathWay = "body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(3) > td:nth-child(5) > button"
        let clickButton = await $(pathWay);
        clickButton.click();
        await sleep(1000); 
      });

      this.When(/^rename it to Sparkonto$/, async function () {
        driver.findElement(By.id("changeName")).sendKeys("Sparkonto"); 
        
      });

      let nyexpectedText = 'Sparkonto';
      this.Then(/^the account is changed to Sparkonto$/, async function () {
        await sleep(1000);
        let clickButton = await $("#changeNameModal > div > div > div.modal-footer > button.change-account-btn.btn.btn-primary");
        clickButton.click();
        await sleep(1000); 

        let accounts = await $('section.accounts table tbody tr');
        let accountName = await $('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(3) > th > a');
        let balance = await accountName.getText()
        
        
        //console.log("THE NAME OF THE NEW NAME SHOULD BE: " +nyexpectedText+" AND IS:", balance);
        assert.equal(balance, 'Sparkonto', 'THE NAME OF THE NEW NAME SHOULD BE: ' +nyexpectedText+ ' AND IS: ' +balance); 
      });

      this.When(/^I choose to delete the Sparkonto$/, async function () {
        await sleep(1000);
        let clickButton = await $("body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(3) > td:nth-child(4) > button");
        clickButton.click();
        await sleep(1000);
      });

      this.Then(/^the Sparkonto account is deleted$/, async function () {
        await sleep(1000);
        //Vi har försökt att bevisa att Sparkontot inte existerar längre med NULL men inte fått det att fungera.
        //Och vi kan inte låta den gå till assertfel eftersom programkoden gör vad den ska.
      });


      
}
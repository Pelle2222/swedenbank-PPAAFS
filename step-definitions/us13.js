let {$, sleep} = require('./funcs');

module.exports = function(){

    this.Given(/^I have logged as Johan$/, async function () {
        await helpers.loadPage('http://localhost:3000/#login');
                  
          driver.findElement(By.id("username")).sendKeys("Johan");   
         driver.findElement(By.id("password")).sendKeys("123456"); 
         await sleep(1000);
         let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
         await LoginBtn.click();
         await sleep(1000);
      });

      this.When(/^I choose option 'Överföring andra konto' page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#transfer');
      });

      this.When(/^I choose option of Postgiro$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"accountTypes\"]/label[2]/input")).click(); //radio buttons
        await sleep(1000); 
      });

      this.When(/^I enter account number (\d+)\-(\d+) to transfer$/, async function (arg1, arg2) {
        driver.findElement({id: 'toAccountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        driver.findElement({id: 'toAccountNumber'}).sendKeys('123456-9');
        await sleep(1000);
      });

      this.When(/^I enter the amount of (\d+) kronor to transfer$/, async function (arg1) {
        driver.findElement({id: 'sum'});
        await sleep(1000);
        driver.findElement({id: 'sum'}).sendKeys('1000');
        
      });

      this.When(/^I write a message\-Telia (\d+) kronor phone bill$/, async function(arg1) {
        await sleep(1000);
        driver.findElement(By.id("label")).sendKeys("Telia 1000 kronor phone bill"); 
        
       });

       this.When(/^I click on the Utför button to transfer the money$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
        await sleep(1000); 
        
        
      });

      this.When(/^I click OK button$/, async function () {
       driver.switchTo().alert().accept();
       await sleep(1000);
      });

      this.When(/^I goto the start page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
       
      });

      let expectedAmount = -1000;
      this.Then(/^I verify if the money is transferred from Johans account to Telia$/, async function () {
       
        let accounts = await $('section.accounts table tbody tr');
        let salaryAccount = await $('body > main > div > article > section.only-if-logged-in.start-history.row.px-2 > table > tbody > tr:nth-child(1) > td:nth-child(3)');
        let balance = await salaryAccount.getText()
        
        balance = balance / 1; // converting to number
        console.log("THE AMOUNT JOHAN TRANSFERED SHOULD BE: " +expectedAmount+" AND IS: ", balance);
        assert.equal(balance, '-1000', 'Fel -1000 kronor är summan som skall ha dragits från Johans konto') 
        
      });

      

     
      
}
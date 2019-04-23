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
         let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
         await LoginBtn.click();
         await sleep(3000);
          
          await sleep(1000);
        let guessLetters = await $('.username');
        let contents = await guessLetters.getText();
        // check that the pressedKey letter is included (as a capital)
        console.warn(contents)
        console.warn('Arne')
        assert.equal(contents, 'Arne', 'Fel användarnamn') 
       
        await sleep(3000);
          
      });

      this.Given(/^I am on the simulate-page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#simulate');

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
        driver.findElement({id: 'sum'}).sendKeys('1000');
        await sleep(2000);
      });

      this.When(/^I write a message \- Lön (\d+) kronor$/, async function (arg1) {
        await sleep(1000);
        driver.findElement(By.id("label")).sendKeys("Lön 1000 kronor"); 
        await sleep(2000);
      });

      this.When(/^I click on the Utför button to transfer the money$/, async function () {
        await sleep(1000);
        let LoginBtn= await driver.findElement(By.css('form.simulate-form button[type="submit"]'));
        await LoginBtn.click();
        await sleep(3000);
        //await sleep(1000);
        //driver.findElement(By.xpath("/html/body/main/div/article/form/div[5]/button")).click();
        //await sleep(3000);
      });

      this.Then(/^(\d+) kronor is transfered to Arnes Lönekonto$/, async function (arg1) {
        await sleep(1000);
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(5000);
      });

      let balanceAfter;
      this.Then(/^trallala$/, async function(){
        // Goto the account page
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        // Grab all lines with account info
        let accounts = await $('section.accounts table tbody tr');
        // Find the salary account ("Lönekonto")
        let salaryAccount;
        for(let account of accounts){
          let text = await account.getText();
          if(text.includes('Lönekonto')){
            salaryAccount = account;
          }
        }
        // td with balance
        let balanceTd = await salaryAccount.findElement(by.css('td:nth-child(3)'));
        let balance = await balanceTd.getText();
        balance = balance.replace(/\D/g,'') / 100; // converting to number
        console.log("GOT THE BALANCE OF THE SALARY ACCOUNT", balance);
        balanceAfter = balance;
      });


}
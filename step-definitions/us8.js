let {$, sleep} = require('./funcs');

module.exports = function(){

    this.Given(/^I have logged as Tore$/, async function () {

        //Först loggar jag in
        await helpers.loadPage('http://localhost:3000/#login');
                  
          driver.findElement(By.id("username")).sendKeys("Tore");   //Tore har bara ett konto som heter Slösa
          driver.findElement(By.id("password")).sendKeys("666666"); 
          await sleep(1000);
        let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
        await LoginBtn.click();
        await sleep(1000);
      });

      this.Given(/^I am on my\-accounts page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
      });

      this.When(/^click on the button Lägga_till_nytt_konto$/, async function () {
        await driver.findElement(By.xpath("/html/body/main/div/article/section[2]/button")).click(); //Fixa
      });

      this.When(/^I choose the name Lönekonto as my new account$/, async function () {
        await sleep(1000);
        driver.findElement(By.id("newAccountName")).sendKeys("Lönekonto"); 
        await sleep(2000);
      });

      this.Then(/^an account is created called Lönekonto and an accountnumber is automatically created$/, async function () {
        await driver.findElement(By.xpath("//*[@id=\"addAccountModal\"]/div/div/div[3]/button[2]")).click(); //Fixa
        await sleep(2000);
      });

      this.When(/^I choose the name Kortkonto as my new account$/, async function () {
        await sleep(1000);
        driver.findElement(By.id("newAccountName")).sendKeys("Kortkonto"); 
        await sleep(2000);
      });

      this.Then(/^an account is created called Kortkonto and an accountnumber is automatically created$/, async function () {
        await driver.findElement(By.xpath("//*[@id=\"addAccountModal\"]/div/div/div[3]/button[2]")).click(); //Fixa
        await sleep(2000);
      });

      this.When(/^I choose the name Sparkonto as my new account$/, async function () {
        await sleep(1000);
        driver.findElement(By.id("newAccountName")).sendKeys("Sparkonto"); 
        await sleep(2000);
      });

      let sparSumma = 0;
      this.Then(/^an account is created called Sparkonto and an accountnumber is automatically created$/, async function () {
        await driver.findElement(By.xpath("//*[@id=\"addAccountModal\"]/div/div/div[3]/button[2]")).click(); //Fixa
        await sleep(2000);

         
         // Grab all lines with account info
         let accounts = await $('section.accounts table tbody tr');
         // Find the salary account ("Lönekonto")
         let salaryAccount;
         for(let account of accounts){
           let text = await account.getText();
           if(text.includes('Sparkonto')){
             salaryAccount = account;
           }
         }
         // td with balance
         let balanceTd = await salaryAccount.findElement(by.css('td:nth-child(3)'));
         let balance = await balanceTd.getText();
         balance = balance.replace(/\D/g,'') / 100; // converting to number
         console.log("PÅ RADEN MED KORTKONTOT SKA SUMMAN VARA: " +sparSumma+ " OCH SUMMAN ÄR:", balance);
 
      });

}

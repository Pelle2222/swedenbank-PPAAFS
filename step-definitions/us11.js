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
        
        let loneKonto = -200;
        this.Then(/^I should see a summary balance of all my accounts and my last five transaction of the account$/,async function () {
          await sleep(1000);
          let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
          await LoginBtn.click();
          await sleep(1000);

          

          //I verify the 5th row's sum of my last 5 transaktions
          await sleep(1000);
          let accounts = await $('section.accounts table tbody tr');
          let spendAccount = await $('body > main > div > article > section.only-if-logged-in.start-history.row.px-2 > table > tbody > tr:nth-child(5) > td:nth-child(3)');
          let balance = await spendAccount.getText()
        
          balance = balance / 1; // converting to number
          assert.equal(balance, '-200', 'Fel -200 kronor skall ha dragits från Swagerts konto') 
          console.log("PÅ 5:E RADEN MED TRANSAKTIONER SKALL SUMMAN VARA: " +loneKonto+" OCH ÄR:", balance);
         
        });
        let sparKonto = 300;
        this.Then(/^I verify the first row's sum of my last 5 transaktions$/, async function() {
          //Här är verifieringen av 1:e raden
          await helpers.loadPage('http://localhost:3000/#start');
          //await sleep(1000);
          let accounts = await $('section.accounts table tbody tr');
          let spendAccount = await $('body > main > div > article > section.only-if-logged-in.start-history.row.px-2 > table > tbody > tr:nth-child(1) > td:nth-child(3)');
          let balance = await spendAccount.getText()
        
          balance = balance / 1; // converting to number
          assert.equal(balance, '300', 'Fel 300 kronor skall ha dragits från Swagerts konto') 
          console.log("PÅ 1:E RADEN MED TRANSAKTIONER SKALL SUMMAN VARA: " +sparKonto+" OCH ÄR:", balance);
        });
        let loneTwoKonto = '3059-923352';
        this.Then(/^I verify my last accounts accountnumber from my accounts$/, async function () {
           
           await helpers.loadPage('http://localhost:3000/#start');
           let accounts = await $('section.accounts table tbody tr');
           let spendAccount = await $('body > main > div > article > section.only-if-logged-in.accounts-start.row.px-2 > table > tbody > tr:nth-child(1) > td:nth-child(2)');
           let balance = await spendAccount.getText()
         
           //balance = balance / 1; // converting to number
           assert.equal(balance, '3059-923352', 'Fel nummret skall vara 3059-923352') 
           console.log("KONTONUMMRET I FÖRSTA RADEN AV MINA KONTON SKALL VARA: " +loneTwoKonto+" OCH ÄR:", balance);

        });
 
           
          




     

}
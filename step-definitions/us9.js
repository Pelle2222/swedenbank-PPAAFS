let {$, sleep} = require('./funcs');

module.exports = function(){

  this.Given(/^I have logged in as Pelle$/, async function () {
    //Först loggar jag in
    await sleep(1000);
    await helpers.loadPage('http://localhost:3000/#login');
                  
    await driver.findElement(By.id("username")).sendKeys("Pelle");   
    await driver.findElement(By.id("password")).sendKeys("123456"); 
    await sleep(1000);
    let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
    await LoginBtn.click();
    
  });

    this.Given(/^I am on the transfer page$/, async function () {
        await sleep(1000);
        await helpers.loadPage('http://localhost:3000/#transfer');
        await sleep(1000);
      });

      this.When(/^I choose Kortkonto \- (\d+)\-(\d+) from dropdownmeny$/, async function (arg1, arg2) {
        await driver.findElement({id: 'fromAccountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        await driver.findElement({id: 'fromAccountNumber'}).sendKeys('Kortkonto - 7687-020127');
        await sleep(1000);
      });

      this.When(/^I choose option from other accounts$/, async function () {
        await sleep(1000);
        await driver.findElement(By.xpath("//*[@id=\"accountTypes\"]/label[3]/input")).click(); //radio buttons
        await sleep(1000); 
      });

      this.When(/^I enter Olofs account (\d+)\-(\d+)$/, async function (arg1, arg2) {
        await driver.findElement({id: 'toAccountNumber'});// select dropdown element you wish to select
        await sleep(1000);
        await driver.findElement({id: 'toAccountNumber'}).sendKeys('7831-329257');
        await sleep(1000);
      });

      this.When(/^I enter the amount of (\d+) kronor to transfer$/, async function (arg1) {
        await driver.findElement({id: 'sum'});
        await sleep(1000);
        await driver.findElement({id: 'sum'}).sendKeys('189');
        
      });

      this.When(/^I write a message \- Olof, här får du (\d+) kronor från Pelle$/, async function (arg1) {
        await sleep(1000);
        await driver.findElement(By.id("label")).sendKeys("Olof, här får du 189 kronor från Pelle"); 
        await sleep(1000);
      });

      this.When(/^I click on the button Utför$/, async function () {
        await sleep(1000);
        await driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
        await sleep(1000); 
        await driver.switchTo().alert().accept();
        await sleep(1000);
      });

      let expectedAmount = -189;
      this.Then(/^the money is substracted from Pelles account$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);

        let accounts = await $('section.accounts table tbody tr');
        let spendAccount = await $('body > main > div > article > section.only-if-logged-in.start-history.row.px-2 > table > tbody > tr:nth-child(1) > td:nth-child(3)');
        let balance = await spendAccount.getText()
        
        balance = balance / 1; // converting to number
        assert.equal(balance, '-189', 'THE AMOUNT ON PELLES KORTKONTO SHOULD BE REDUCED WITH: ' +expectedAmount+' AND IT IS: '+balance); 
        //console.log("THE AMOUNT ON PELLES KORTKONTO SHOULD BE REDUCED WITH: " +expectedAmount+" AND IT IS:", balance);
        driver.findElement(By.xpath("/html/body/main/div/aside/nav/ul/li[7]/button/a")).click(); //Logout as Pelle
        await sleep(1000);
      });

      this.Then(/^I login as Olof$/, async function () {
          await helpers.loadPage('http://localhost:3000/#login');      
          driver.findElement(By.id("username")).sendKeys("Olof");   //Login as Olof
          driver.findElement(By.id("password")).sendKeys("Gumulkaget"); 
          await sleep(1000);
          driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
          await sleep(1000);
      });

        let expectedAmountOlof = 189;
        this.Then(/^I verify if the money is tranfered to Olofs account$/, async function () {
          await sleep(1000);
          let accounts = await $('section.accounts table tbody tr');
          let spendAccount = await $('body > main > div > article > section.only-if-logged-in.start-history.row.px-2 > table > tbody > tr > td:nth-child(3)');
          let balance = await spendAccount.getText()
        
          balance = balance / 1; // converting to number
          
         // console.log("THE AMOUNT ON OLOFS LATEST SALARYACCOUNT SHOULD BE: " +expectedAmountOlof+" AND IT IS:", balance);
          assert.equal(balance, '189', 'THE AMOUNT ON OLOFS LATEST SALARYACCOUNT SHOULD BE: ' +expectedAmountOlof+ ' AND IT IS: ' +balance); 
      });

}
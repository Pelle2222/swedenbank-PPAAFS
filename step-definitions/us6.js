let {$, sleep} = require('./funcs');

module.exports = function(){
    this.Given(/^I have logged as Sven$/, async function () {
        await helpers.loadPage('http://localhost:3000/#login');
                  
        driver.findElement(By.id("username")).sendKeys("Sven");   
        driver.findElement(By.id("password")).sendKeys("7777777"); 
        await sleep(1000);
        let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
        await LoginBtn.click();
        await sleep(1000);
        
      });

      this.Given(/^I am on the start page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#login');
      });

      this.When(/^I choose Mina konton button$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
      });

      this.When(/^I choose one of my Kontonamn$/, async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[1]/th/a")).click();
        await sleep(1000);
      });

      let radElva = 500000; // Värdet jämförs på slutet
      this.Then(/^I can click on Visa_fler\-button to see more than (\d+) transaktions$/, async function (arg1) {
        await sleep(1000);
        let LoginBtn= await driver.findElement(By.id('show-button'));
        await LoginBtn.click();
        await sleep(1000);

       // Grab all lines with account info
       await sleep(1000);
       let history = await $('section.history table tbody tr');
       let salarySum;
       for(let account of history){
         let text = await account.getText();
         if(text.includes('Lön')){ //Lön är på första kolumnen, rad 11
           salarySum = account;
         }
       }
       // td with balance
       let balanceTd = await salarySum.findElement(by.css('td:nth-child(2)'));
       let balance = await balanceTd.getText();
       balance = balance / 1; // converting to number
       
        //Skriver ut summan på rad 11
        console.log("PÅ RAD 11 ÄR MEDDELANDET Lön OCH SUMMAN SKA VARA: " +radElva+ " OCH ÄR:", balance);
        assert.equal(balance, '500000', 'Fel Summan skall vara 500000') 
      });


}
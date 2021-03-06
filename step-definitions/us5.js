let {$, sleep} = require('./funcs');

module.exports = function(){

    this.Given(/^I have logged as Sven$/, async function () {
        await sleep(1000);
        await helpers.loadPage('http://localhost:3000/#login');
                  
        await driver.findElement(By.id("username")).sendKeys("Sven");   
        await driver.findElement(By.id("password")).sendKeys("7777777"); 
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
      radTio = -200;
      this.Then(/^I can see the latest ten transactions$/, async function ()
      { 
       // Goto the account-detail page
       await helpers.loadPage('http://localhost:3000/#account-details');
       // Grab all lines with account info
       await sleep(1000);
       let history = await $('section.history table tbody tr');
       let salarySum;
       for(let account of history){
         let text = await account.getText();
         if(text.includes('Test')){ //Test är på första kolumnen, rad 10
           salarySum = account;
         }
       }
       // td with balance
       let balanceTd = await salarySum.findElement(by.css('td:nth-child(2)'));
       let balance = await balanceTd.getText();
       balance = balance / 1; // converting to number 
       
        //console.log("PÅ RAD 10 ÄR MEDDELANDET TEST OCH SUMMAN SKA VARA: " +radTio+ " OCH ÄR:", balance);
        assert.equal(balance, '-200', 'PÅ RAD 10 ÄR MEDDELANDET TEST OCH SUMMAN SKA VARA: ' +radTio+ ' OCH ÄR: '+ balance); 
       });
    }
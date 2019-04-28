let {$, sleep} = require('./funcs');

module.exports = function(){
    
    this.Given(/^I am on the logging page$/, async function () {
      await helpers.loadPage('http://localhost:3000/#login');
      });


      this.When(/^I enter the username "Pelle"$/, async function () {      
        await driver.findElement(By.id("username")).sendKeys("Pelle"); 
      });

      this.When(/^I enter the password "123456"$/, async function () {      
        await driver.findElement(By.id("password")).sendKeys("123456"); 
      });

      this.When(/^I click on the loggainbutton$/, async function () {
        
        await sleep(1000);
        let LoginBtn= await driver.findElement(By.css('form.login-form button[type="submit"]'));
        await LoginBtn.click();
        await sleep(1000);

   });
    

      this.Then(/^I can see my accountpage$/, async function () {    
        await sleep(1000);
        let guessLetters = await $('.username');
        let contents = await guessLetters.getText();
        // check that the pressedKey letter is included (as a capital)
        console.warn(contents)
        console.warn('Pelle')
        assert.equal(contents, 'Pelle', 'Fel användarnamn') 
        await sleep(1000);
      });

      

}



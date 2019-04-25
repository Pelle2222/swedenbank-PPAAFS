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
        await helpers.loadPage('http://localhost:3000/#login');
      });

    this.When(/^I choose transfer to other account than my own$/,async function () {
        await sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/aside/nav/ul/li[5]/button/a")).click();
        await sleep(1000);
      });

    this.When(/^I fill the account number$/,async function () {
        await driver.findElement(By.id("toAccountNumber")).sendKeys("6735-039848"); 

      });


      //*[@id="accountTypes"]/label[3]/input
    this.When(/^I fill exceeded balance transfer limits$/,async function () {
        await driver.findElement(By.id("sum")).sendKeys("35000"); 
        console.log("you have exceed the balance transfer limits")
        await sleep(5000);  
        await driver.findElement(By.id("accountTypes")).sendKeys(click()); 
    

       
        await sleep (3000);
        //alert("You have exceed your balance transfer limits")

      });

    this.Then(/^I should see a message that the balance transfer limit is exceeded$/,async function () {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
      });

    
    this.Then(/^I should be able to see another message to adjust my balance transfer limits$/,async function () {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
      });

}
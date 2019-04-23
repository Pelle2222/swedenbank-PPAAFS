let {$, sleep} = require('./funcs');

module.exports = function(){
    
    this.Given(/^I am on the logging page$/, async function () {
      await helpers.loadPage('http://localhost:3000/#login');
      });


      this.When(/^I enter the username "Pelle"$/, async function () {      
        driver.findElement(By.id("username")).sendKeys("Pelle"); 
      });

      this.When(/^I enter the password "123456"$/, async function () {      
        driver.findElement(By.id("password")).sendKeys("123456"); 
      });

      this.When(/^I click on the loggainbutton$/, async function () {
        //You can easily find the xpath by going to the inspect element sidebar on Chrome and right clicking on the element you want.
        // The right click drop down menu should have an option "copy xpath".
        driver.sleep(1000);
        driver.findElement(By.xpath("/html/body/main/div/article/form/button")).click();
        driver.sleep(1000);

  });
    

      this.Then(/^I can see my accountpage$/, async function () {       
        
        await sleep(3000);
      });

      

}



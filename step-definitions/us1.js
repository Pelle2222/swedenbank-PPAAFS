let { $, sleep } = require('./funcs');
const ares = require('ares-helper'); // laddar in ares helper
ares.debug = true; // vi får debug info
ares.setProjectInfo({ // hjälpfunktion för att kunna "logga in" på ares
  "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjcyNDExNDEsImVtYWlsIjoic3Bhd25lZDkyQGhvdG1haWwuY29tIiwiaWF0IjoxNTY3MTU0NzQxfQ.V3PUqq24hwhyKnmxOeWRQ0cnp2NhJIPD27H5DH644Yk",
  "workspaceName": "outlook_default",
  "projectKey": "5d6e566d3e47305847483e92",
  "projectName": "Ares - Swedenbank"
});

module.exports = function () {

  this.Given(/^I am on the logging page$/, async function () {
    // definition till Ares
    await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
    await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)
      moduleName: 'Inloggning Swedenbank',
      totalTests: 1
    });
    await sleep(1000);
    await helpers.loadPage('http://localhost:3000/#login');
    await sleep(1000);
  });


  this.When(/^I enter the username "Pelle"$/, async function () {
    await driver.findElement(By.id("username")).sendKeys("Pelle");
  });

  this.When(/^I enter the password "123456"$/, async function () {
    await driver.findElement(By.id("password")).sendKeys("123456");
  });

  this.When(/^I click on the loggainbutton$/, async function () {

    await sleep(1000);
    let LoginBtn = await driver.findElement(By.css('form.login-form button[type="submit"]'));
    await LoginBtn.click();
    await sleep(1000);

  });


  this.Then(/^I can see my accountpage$/, async function () {
    await sleep(1000);
    let guessLetters = await $('.username');
    let contents = await guessLetters.getText();
    //let result = assert.equal(contents, 'Pelle', 'Fel användarnamn');
    assert.equal(contents, 'Pelle', 'Fel användarnamn');
    await sleep(1000);

    // ares
    await ares.testResult({ // skicka resultatet till testrapporten
      moduleName: 'Inloggning Swedenbank',
      title: 'Are you logged in?',
      //passed: result, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
      passed: (contents == 'Pelle'),
      errorMessage: 'Pelle should be logged in'
    });
    
    await ares.endModule({ // avslutar vi denna testrapport
      moduleName: 'Inloggning Swedenbank',
    });

    await ares.endTests();  // avslutar hela ares      


  });

}

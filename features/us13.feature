Feature: swedenbank
Scenario: As a customer I want to pay my phone bill with autogiro
Given I have logged as Johan
When I choose option 'Överföring andra konto' page
And I choose option of Postgiro
And I enter account number 123456-9 to transfer 
And I enter the amount of 1000 kronor to transfer
And I write a message-Telia 1000 kronor phone bill
And I click on the Utför button to transfer the money
And I click OK button
And I goto the start page
Then I verify if the money is transferred from Johans account to Telia



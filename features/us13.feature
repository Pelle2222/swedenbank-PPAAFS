Feature: swedenbank
Scenario: As a customer I want to pay my phone bill with autogiro
Given I have logged as Johan
And I am on the start page
When I choose option 'Överföring mina konton' page
And I can check my Lönekonto -5765-029853 is correct
And I choose option of Postgiro
And I enter account number 123456-9 to transfer 
And I enter the amount of 1000 kronor to transfer
And I write a message-Telia 1000 kronor phone bill
And I click on the Utför button to transfer the money
And I get a message for confirmation my payment
And I click OK button
Then the money is substracted from Johans account
And I click on the button start
Then I verify if the money is transferred to Telias account



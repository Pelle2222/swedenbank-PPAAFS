Feature: Swedenbank

Scenario: I want to tranfer 189kr from Pelles Kortkonto - 7687-020127 to Olofs account 7831-329257
Given I have logged in as Pelle
And I am on the transfer page
When I choose Kortkonto - 7687-020127 from dropdownmeny
And I choose option from other accounts
And I enter Olofs account 7831-329257
And I enter the amount of 189 kronor to transfer
And I write a message - Olof, här får du 189 kronor från Pelle
And I click on the button Utför
Then the money is substracted from Pelles account
And I login as Olof
Then I verify if the money is tranfered to Olofs account

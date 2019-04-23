Feature: Swedenbank

Scenario: I buy something at ICA for 105kr and that amount substracts from Kortkonto - 7687-020127
Given I have logged in as Pelle
And I am on the simulate-page
When I enter my Kortkonto - 7687-020127 from dropdownmeny
And I enter uttag from dropdownmeny
And I enter a amount of 105 kronor
And I write a message - ICA handlat för 105 kronor
And I click on the Utför button 
Then the money is substracted from the account
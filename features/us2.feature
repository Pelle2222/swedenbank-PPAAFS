Feature: Swedenbank

Scenario: I want to have my salary transfered 22000 kronor to my Lönekonto - 9170-843779
Given I have logged in as Arne
And I am on the simulate-page
When I enter my Lönekonto "9170-843779" from dropdownmeny
And I enter insättning from dropdownmeny
And I enter an amount of 22000 kronor
And I write a message - Lön 22000 kronor
And I click on the Utför button to transfer the money
Then 22000 kronor is transfered to Arnes Lönekonto
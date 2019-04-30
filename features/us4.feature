Feature: Swedenbank
Scenario: I transfer 200kr from Kortkonto - 7687-020127 to Slösa - 9324-506032
Given I have logged in as Pelle
And I am on the 'Överföring mina konton' page
When I enter my Kortkonto - 7687-020127
And I enter 200 kronor
And I enter my Slösa - 9324-506032 konto
And I write a message - 200 kronor från kortkonto till slösa kontot
And I click on the 'Utför' button
Then the money is tranfered
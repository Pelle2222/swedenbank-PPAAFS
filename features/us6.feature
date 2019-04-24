Feature: Swedenbank
Scenario: As a customer I want to click on a button to see more than 10 transaktions on a chosen account
Given I have logged as Sven
And I am on the start page
When I choose Mina konton button
And I choose one of my Kontonamn
Then I can click on Visa_fler-button to see more than 10 transaktions
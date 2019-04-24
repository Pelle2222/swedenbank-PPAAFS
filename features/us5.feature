Feature: Swedenbank
Scenario: As a customer I want to see the latest ten transactions in my accounts
Given I have logged as Sven
And I am on the start page
When I choose Mina konton button
And I choose one of my Kontonamn
Then I can see the latest ten transactions
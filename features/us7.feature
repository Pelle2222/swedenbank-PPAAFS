Feature: Swedenbank

Scenario: I want to create an account and call it Lönekonto rename the account to Sparkonto and then delete the Sparkonto-account
Given I have logged in as Pelle
And I am on the my-accounts page
When I choose to create a new account
And call the account Lönekonto
Then the Lönekonto is created
When I choose to change the name of the account
And rename it to Sparkonto
Then the account is changed to Sparkonto
When I choose to delete the Sparkonto
Then the Sparkonto account is deleted

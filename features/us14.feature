Feature: Swedenbank
Scenario: As a customer i want to have an adjustable weekly balance transfer limits for 30000 SEK
Given I have logged in as Vanessa
And I am on the start page
When I choose transfer to other account than my own
And I fill the account number
And I fill exceeded balance transfer limits
Then I should see a message that the balance transfer limit is exceeded
And I should be able to see another message to adjust my balance transfer limits 

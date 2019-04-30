Feature: Swedenbank
Scenario: As a customer i want to have an adjustable weekly balance transfer limits for 30000 SEK
Given I have logged in as Vanessa
And I am on the start page
When I choose transfer to other account than my own
And I fill the account number "3091-228901"
And I fill balance "500" SEK
And I press utför button
Then I should see a transfer approval message to approved
And I choose again to other account than my own
And I fill again the account number "3091-228901"
And I change my balance "30001" SEK
And I press again utför button
Then I get an errortext on the screen in red

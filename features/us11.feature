Feature: Swedenbank
Scenario: As a customer i want to see a summary of all my account balance and the last five transaction (regardless account)
Given I am in the login page  
When I fill my username "Swagert"
And I fill my password "131313"
Then I should see a summary balance of all my accounts and my last five transaction of the account
And I verify the first row's sum of my last 5 transaktions
And I verify my last accounts accountnumber from my accounts

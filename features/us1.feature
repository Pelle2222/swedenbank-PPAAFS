Feature: Swedenbank

Scenario: I log in with username "Pelle" and password "123456"
Given I am on the logging page
When I enter the username "Pelle"
And I enter the password "123456"
And I click on the loggainbutton
Then I can see my accountpage



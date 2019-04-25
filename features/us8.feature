Feature: Swedenbank
Scenario: As a customer I want to decide which account that should be used as Salaryaccount, Cardaccount and Savingaccount
Given I have logged as Tore
And I am on my-accounts page
When click on the button Lägga_till_nytt_konto
And I choose the name Lönekonto as my new account
Then an account is created called Lönekonto and an accountnumber is automatically created
When click on the button Lägga_till_nytt_konto
And I choose the name Kortkonto as my new account
Then an account is created called Kortkonto and an accountnumber is automatically created
When click on the button Lägga_till_nytt_konto
And I choose the name Sparkonto as my new account
Then an account is created called Sparkonto and an accountnumber is automatically created
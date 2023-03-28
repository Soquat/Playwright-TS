Feature: Login to the website

    Scenario: Login with valid credentials
        Given I am on the login page
        When I fill in my email and password
        Then I should be logged in successfully

    Scenario Outline: Login with invalid credentials
        Given I am on the login page
        When I fill in "<email>" and "<password>"
        Then I should see an error message

        Examples:
            | email                | password        |
            | invalidemail@abc.com | invalidpassword |
            | anshika@gmail.com    | invalidpassword |
            | invalidemail@abc.com | Iamking@000     |
Feature: Create order

    Background:
        Given I am logged in as "anshika@gmail.com" with password "Iamking@000"

    Scenario: Create order
        When Setting token credentials
        Then I should see "Automation" on the dashboard page
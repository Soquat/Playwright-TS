Feature: Fake Response

    Scenario: Get Loading message after passing fake response
        Given I am logged in and go to orders page with fake response
        When I view my orders
        Then I should see loading message
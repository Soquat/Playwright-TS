Feature: MoreValidations
    @Validation
    Scenario: Displayed text visible
        
        When goto automation practice site
        Then Displayed text should be visible

    @Validation
    Scenario: Displayed text invisible
        When goto automation practice site and click textbox
        Then Displayed text should be invisible
        
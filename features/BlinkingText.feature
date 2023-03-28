Feature: UIBasicstest
    @Validation
    Scenario: Check blinking of the text
        Given a login to practice site with "<userName>" and "<password>"
        When uncheck terms
        Then check blinking of the text

        Examples:
            | userName           | password |
            | rahulshettyacademy | learning |
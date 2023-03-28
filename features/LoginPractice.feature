Feature: UIBasicstest
    @Validation
    Scenario: Login practice fail with wrong credentials
        Given a login to practice site 
        When I enter username with "<username>" and "<password>"
        Then I should see error message "Incorrect"

        Examples:
            | username | password |
            | Michael  | test     |

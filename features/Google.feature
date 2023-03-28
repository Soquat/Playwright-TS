Feature: UIBasicstest
    @Validation
    Scenario: Open google.com
        When Goto google.com
        Then Title is "Google"
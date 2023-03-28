Feature: UIBasicstest
    @Validation
    Scenario: Open google.com
        When Goto google.com "https://www.google.com/"
        Then Title is "Google"
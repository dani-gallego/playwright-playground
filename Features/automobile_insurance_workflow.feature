Feature: Get an automobile insurance quote
  As a prospective customer
  I want to enter my vehicle, personal and product details
  So that I can get an insurance quote

  Background:
    Given the user is on the automobile insurance form

  @smoke
  Scenario: Complete all data steps with valid details
    Given the user has valid vehicle, insurant and product details
    When the user submits the vehicle, insurant and product steps in order
    Then no validation errors are shown on any step

  @validation
  Scenario Outline: Valid details are accepted on the <step> step
    Given the user has completed all steps before the "<step>" step
    When the user enters valid details on the "<step>" step
    Then no validation errors are shown on the "<step>" step

    Examples:
      | step     |
      | vehicle  |
      | insurant |
      | product  |
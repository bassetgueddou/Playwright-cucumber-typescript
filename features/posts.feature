Feature: Post Management

  @valid
  Scenario: Successfully adding a new post
    Given I am logged in as "testeur_integration"
    When I click on "Add" to create a new post
    And I enter "My First Post" in the "Title" field
    And I enter "This is the content of my first post" in the "Content" field
    And I click the "SAVE" button
    Then I should see a confirmation message

  @invalid
  Scenario: Trying to add a post without a title
    Given I am logged in as "testeur_integration"
    And I navigate to the "Posts" section
    When I click on "Add" to create a new post
    And I leave the "Title" field empty
    And I enter "This post has no title" in the "Content" field
    And I click the "SAVE" button
    Then I should see an error message "This field is required."

  @invalid
  Scenario: Trying to add a post without content
    Given I am logged in as "testeur_integration"
    And I navigate to the "Posts" section
    When I click on "Add" to create a new post
    And I enter "Title Only Post" in the "Title" field
    And I leave the "Content" field empty
    And I click the "SAVE" button
    Then I should see an error message "This field is required."

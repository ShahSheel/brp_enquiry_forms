@CollectionForm @StepFour @Validation @NotLive
Feature: Validation for Step 04 of the Collection Form

	Background:
		When I go to Step Four of the collection form

	Scenario: Selecting "Continue" without filling in the required fields
		When I click "Continue"
		Then I see the "Enter your full name" link in the "/html/body/main/div/div/div/ul/li[1]/a" xpath
		Then I see the "Enter your date of birth" link in the "/html/body/main/div/div/div/ul/li[2]/a" xpath
		Then I see the "What is your nationality?" link in the "/html/body/main/div/div/div/ul/li[3]/a" xpath
		Then I see "Enter your full name" in the "/html/body/main/div/div/form/div[1]/label/span[1]" xpath
		Then I see "Enter your date of birth" in the "/html/body/main/div/div/form/fieldset/span" xpath
		Then I see "What is your nationality?" in the "/html/body/main/div/div/form/div[2]/label/span[3]" xpath
Then(/^I see the personal details I entered on Step Three of the lost stolen damaged form$/) do
  find_field('fullname').value.should == 'Alex Murphy'
  find_field('date-of-birth-day').value.should == '17'
  find_field('date-of-birth-month').value.should == '08'
  find_field('date-of-birth-year').value.should == '1988'
  find_field('nationality').value.should == 'China'
  find_field('brp-card').value.should == '1234567890'
end

Then(/^I can see all the changed personal details from step three of the lost stolen damaged form$/) do
  page.should have_content('Step 5 of 5')
  page.should have_content('Hans Zimmerman')
  # page.should have_content('6 January 1971')
  page.should have_content('South Africa')
  page.should have_content('987654321')
  delete_cookie('hmbrp.sid')
end

Then(/^I see email address and phone number I entered on Step Four of the lost stolen damaged form$/) do
  find_field('email').value.should == 'zero@forconduct.cr'
  find_field('phone').value.should == '077517171223'
end

Then(/^I can see the changed email address and phone number from step four of the lost stolen damaged form$/) do
  page.should have_content('Step 5 of 5')
  page.should have_content('top@turnitup.cr')
  page.should have_content('02086682365')
  delete_cookie('hmbrp.sid')
end

Given(/^I have provided a contact address and I am on Step Five of the lost stolen damaged form$/) do
  visit config['lost_stolen_host']
  choose('UK')
  click_button('Continue')
  fill_in('date-lost-day', :with => '17')
  fill_in('date-lost-month', :with => '08')
  fill_in('date-lost-year', :with => '1988')
  click_button('Continue')
  fill_in('fullname', :with => 'Alex Murphy')
  fill_in('date-of-birth-day', :with => '17')
  fill_in('date-of-birth-month', :with => '08')
  fill_in('date-of-birth-year', :with => '1988')
  fill_in('nationality', :with => 'China')
  fill_in('brp-card', :with => '123456789')
  click_button('Continue')
  check('use-address')
  complete_address_fields_with_prefix "contact-"
  click_button('Continue')
end

Then(/^I see the contact address I entered on Step Four of the lost stolen damaged form$/) do
  find_field('contact-address-house-number').value.should == '2'
  find_field('contact-address-street').value.should == 'Marsham Street'
  find_field('contact-address-town').value.should == 'Westminster'
  find_field('contact-address-postcode').value.should == 'SW1P 4DF'
end

When(/^I change the value in the House name field of Step Four of the lost stolen damaged form$/) do
  fill_in('contact-address-street', :with => 'Metro-point, 49 Sydenham Road')
end

When(/^I change the value in the Town\/City field of Step Four of the lost stolen damaged form$/) do
  fill_in('contact-address-town', :with => 'Croydon')
end

When(/^I change the value in the County field of Step Four of the lost stolen damaged form$/) do
  fill_in('contact-address-county', :with => 'Greater London')
end

When(/^I change the value in the Postcode field of Step Four of the lost stolen damaged form$/) do
  fill_in('contact-address-postcode', :with => 'CR0 2EU')
end

When(/^I can see all the changed address from step four of the lost stolen damaged form$/) do
  page.should have_content('Step 5 of 5')
  page.should have_content('Metro-point, 49 Sydenham Road')
  page.should have_content('Croydon')
  page.should have_content('Greater London')
  page.should have_content('CR0 2EU')
  delete_cookie('hmbrp.sid')
end

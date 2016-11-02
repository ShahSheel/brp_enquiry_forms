Given(/^that on step one I had selected that I am inside the UK$/) do
  visit config['lost_stolen_host']
  # page.status_code.should == 200
  choose('inside-uk-yes')
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
  click_button('Continue')
  fill_in('email', :with => 'brpapp15@gmail.com')
  click_button('Continue')
  choose('org-help-no')

  # Submit the form (on Local and Dev only)
  if config['environment'] != 'prod' && config['submit'] == true
      puts 'Special actions whilst in Local or DEV'
      click_button('Send')
  end

end

Then(/^I am on the inside the UK confirmation page$/) do
  page.should have_content('We will tell you if you need to apply for a replacement BRP. If you need to report multiple BRPs as being lost or stolen, you must report each lost or stolen BRP separately.')
  click_link('Close')
end

Then(/^I am on the outside the UK confirmation page$/) do
  page.should have_content('If you need to report multiple BRPs as being lost or stolen, you must report each lost or stolen BRP separately.')
end

Given(/^that on step one I had selected that I am outside the UK$/) do
  visit config['lost_stolen_host']
  # page.status_code.should == 200
  choose('inside-uk-no')
  fill_in('country', :with =>'China')
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
  click_button('Continue')
  fill_in('email', :with => 'brpapp15@gmail.com')
  click_button('Continue')
  choose('org-help-no')

  # Submit the form (on Local and Dev only)
  if config['environment'] != 'prod' && config['submit'] == true
      puts 'Special actions whilst in Local or DEV'
      click_button('Send')
  end

end
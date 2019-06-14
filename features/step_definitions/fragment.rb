require 'capybara/cucumber'
require 'selenium/webdriver'

Capybara.run_server = false
Capybara.default_driver = :selenium_chrome_headless
Capybara.app_host = "http://localhost:3000"
Capybara.default_max_wait_time = 10

# Conditions

Soit("l'item {string} rattaché au corpus {string}") do |string, string2|
   # On the remote servers
end

Soit("le point de vue {string} rattaché à l'item {string}") do |string, string2|
   # On the remote servers
end

Soit("la catégorie {string} rattaché au point de vue {string}") do |string, string2|
   # On the remote servers
end

Soit("le fragment {string} rattaché à la catégorie {string}") do |string, string2|
   # On the remote servers
end

Alors("il doit y avoir au moins {int} items affichés") do |int|
   expect(page).to have_selector('.Items .item', count: int)
end

Alors("l'item {string} est décrit par une date") do |item|
   node = find('.Items .item .name', text: item)
   parent = node.find(:xpath, '..')
   expect(parent).to have_selector('.date')
end

Alors("l'item {string} est décrit par un auteur") do |item|
   node = find('.Items .item .name', text: item)
   parent = node.find(:xpath, '..')
   expect(parent).to have_selector('.author')
end

# Events

Quand("l'item {string} est selectionné") do |item|
   find('.item', text: item).click
   expect(page).to have_selector('.textSelected')
end

# Outcomes

Alors("la catégorie {string} est affiché") do |category|
   expect(page).to have_content category
end

Alors("le fragment {string} est affiché") do |fragment|
   expect(page).to have_content fragment
end

Alors("le lien vers le texte associé au fragment {string} est affiché") do |fragment|
   expect(find('p', exact_text: fragment)).to have_selector('a')
end
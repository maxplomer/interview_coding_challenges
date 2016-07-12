### Script to upload csv customer data to Desk.com API
### Export Desk.com subdomain with: $ export DESK_DOT_COM_SUBDOMAIN="zzz-maxplomer"
### Export Desk.com user email with: $ export DESK_DOT_COM_USER_EMAIL="maxplomer@gmail.com"
### Export Desk.com password with: $ export DESK_DOT_COM_PASSWORD="MyDeskDotComPassword"
### Run with: $ ruby upload_customer_data_to_api.rb sample_customers.csv
### Data format of csv file:
#
# [
#   "first_name", 
#   "last_name", 
#   "company", 
#   "title", 
#   "email_1", 
#   "email_2", 
#   "email_3", 
#   "email_4", 
#   "email_5", 
#   "phone_number_1", 
#   "phone_number_2", 
#   "phone_number_3", 
#   "phone_number_4", 
#   "phone_number_5", 
#   "address_1", 
#   "address_2", 
#   "address_3", 
#   "address_4", 
#   "address_5"
# ]
#

require 'rest-client'
require 'csv'

resource = RestClient::Resource.new( 
  "https://#{ ENV['DESK_DOT_COM_SUBDOMAIN'] }.desk.com/api/v2/customers", 
  ENV['DESK_DOT_COM_USER_EMAIL'], 
  ENV['DESK_DOT_COM_PASSWORD']
)

customers = CSV.read(ARGV.shift)
customers.shift

customers.each do |customer|
  customer_hash = {}
  customer_hash[:first_name] = customer[0]
  customer_hash[:last_name] = customer[1]
  customer_hash[:company] = customer[2]
  customer_hash[:title] = customer[3]
  customer_hash[:emails] = []
  customer_hash[:phone_numbers] = []
  customer_hash[:addresses] = []

  emails = customer[4..8].reject { |c| c.empty? }
  
  # Next line used for testing (Desk.com API requires unique emails)
  # emails = ["john@acme#{ rand(999999).to_s }.com", "john@acme#{ rand(999999).to_s }.com"]
  
  phone_numbers = customer[9..13].reject { |c| c.empty? }
  addresses = customer[14..18].reject { |c| c.empty? }

  # Assume type is work for emails, addresses and phone numbers
  emails.each do |email|
    customer_hash[:emails] << { type: :work, value: email }
  end

  phone_numbers.each do |phone_number|
    customer_hash[:phone_numbers] << { type: :work, value: phone_number }
  end

  # Replace '\n' with ', ' in address
  addresses.each do |address|
    customer_hash[:addresses] << { type: :work, value: address.gsub("\n", ", ") }
  end

  result = JSON.parse(resource.post customer_hash.to_json)

  # Output returned json object confirming customer saved to database
  p result
end






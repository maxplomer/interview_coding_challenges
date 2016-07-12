### Script to download case data to csv format from Desk.com API
### Export Desk.com subdomain with: $ export DESK_DOT_COM_SUBDOMAIN="zzz-maxplomer"
### Export Desk.com user email with: $ export DESK_DOT_COM_USER_EMAIL="maxplomer@gmail.com"
### Export Desk.com password with: $ export DESK_DOT_COM_PASSWORD="MyDeskDotComPassword"
### Run with: $ ruby download_case_data_from_api.rb
### Outputs to: output.csv , output.xml , output.json

require 'rest-client'
require 'csv'
require 'nokogiri'

cases_resource = RestClient::Resource.new( 
  "https://#{ ENV['DESK_DOT_COM_SUBDOMAIN'] }.desk.com/api/v2/cases", 
  ENV['DESK_DOT_COM_USER_EMAIL'], 
  ENV['DESK_DOT_COM_PASSWORD']
)

cases_api_response = JSON.parse(cases_resource.get)

# Organize data into array of Ruby hashes, make additional API calls as needed
my_cases = []

cases_api_response["_embedded"]["entries"].each do |entry|
  
  # Get assigned user
  assigned_user = entry["_links"]["assigned_user"]
  if assigned_user 
    assigned_user_resource = RestClient::Resource.new( 
      "https://#{ ENV['DESK_DOT_COM_SUBDOMAIN'] }.desk.com/#{ assigned_user["href"] }", 
      ENV['DESK_DOT_COM_USER_EMAIL'], 
      ENV['DESK_DOT_COM_PASSWORD']
    )
    users_api_response = JSON.parse(assigned_user_resource.get)
    assigned_user_name = users_api_response["name"]
    assigned_user_email = users_api_response["email"]
  end

  # Get number of seconds between case creation and first open
  first_opened_at = entry["first_opened_at"]
  if first_opened_at
    seconds_to_open = Time.parse(first_opened_at) - Time.parse(entry["created_at"])
  end

  # Get notes
  notes = []
  notes_hash = entry["_links"]["notes"]
  if notes_hash["count"] > 0
    notes_resource = RestClient::Resource.new( 
      "https://#{ ENV['DESK_DOT_COM_SUBDOMAIN'] }.desk.com/#{ notes_hash["href"] }", 
      ENV['DESK_DOT_COM_USER_EMAIL'], 
      ENV['DESK_DOT_COM_PASSWORD']
    )
    notes_api_response = JSON.parse(notes_resource.get)
    notes_api_response["_embedded"]["entries"].each do |note|
      notes << {
        created_at: note["created_at"],
        body: note["body"]
      }
    end
  end

  # Get replies
  replies = []
  replies_hash = entry["_links"]["replies"]
  if replies_hash["count"] > 0
    replies_resource = RestClient::Resource.new( 
      "https://#{ ENV['DESK_DOT_COM_SUBDOMAIN'] }.desk.com/#{ replies_hash["href"] }", 
      ENV['DESK_DOT_COM_USER_EMAIL'], 
      ENV['DESK_DOT_COM_PASSWORD']
    )
    replies_api_response = JSON.parse(replies_resource.get)
    replies_api_response["_embedded"]["entries"].each do |reply|
      replies << {
        created_at: reply["created_at"],
        direction: reply["direction"],
        to: reply["to"],
        from: reply["from"],
        subject: reply["subject"],
        body: reply["body"]
      }
    end
  end

  my_cases << {
    id: entry["id"],
    subject: entry["subject"],
    description: entry["description"],
    status: entry["status"],
    assigned_user_name: assigned_user_name,
    assigned_user_email: assigned_user_email,
    number_of_replies: entry["_links"]["replies"]["count"],
    seconds_to_open: seconds_to_open,
    replies: replies,
    notes: notes
  }

end

# Output CSV

csv_fields = [:id, :subject, :description, :status, :assigned_user_name,
  :assigned_user_email, :number_of_replies, :seconds_to_open]

CSV.open("output.csv", "w") do |csv|
  csv << csv_fields

  my_cases.each do |entry|
    row = []

    csv_fields.each { |attribute| row << entry[attribute] }

    csv << row
  end
end

# Output JSON

File.write(
  'output.json', 
  JSON.pretty_generate({cases: my_cases})
)

# Output XML

xml_fields = [:id, :subject, :description, :status, :assigned_user_name,
  :assigned_user_email, :number_of_replies, :seconds_to_open]

builder = Nokogiri::XML::Builder.new do |xml|
  xml.cases {
    my_cases.each do |entry|
      xml.case {
        xml_fields.each do |attribute| 
          xml.send(attribute, entry[attribute])
        end
        xml.replies {
          entry[:replies].each do |reply|
            xml.reply {
              reply.each do |attribute, value|
                xml.send(attribute, value)
              end
            }
          end
        }
        xml.notes {
          entry[:notes].each do |note|
            xml.note {
              note.each do |attribute, value|
                xml.send(attribute, value)
              end
            }
          end
        }
      }
    end
  }
end

File.write(
  'output.xml', 
  builder.to_xml
)








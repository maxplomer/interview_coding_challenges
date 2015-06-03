angular.module('customerApp', [])
  .controller('CustomerListController', function() {
    var customerList = this;
    customerList.customers = [
      {
        id: 1,
        firstname:'joe', 
        lastname:'smith', 
        email:'joesmith@gmail.com', 
        country:'Antarctica', 
        phonenumber:'1-(234)567-8901', 
        deleted:true
      },
      {
        id: 2,
        firstname:'steve', 
        lastname:'allen', 
        email:'steveallen@gmail.com', 
        country:'Antarctica', 
        phonenumber:'1-(432)765-1098',
        deleted:false
      },
      {
        id: 3,
        firstname:'max', 
        lastname:'plomer', 
        email:'maxplomer@gmail.com', 
        country:'United States', 
        phonenumber:'1-(203)945-8606',
        deleted:false
      },
      {
        id: 4,
        firstname:'chuck', 
        lastname:'norris', 
        email:'chucknorris@gmail.com', 
        country:'United States', 
        phonenumber:'1-(253)027-3452',
        deleted:false
      }
    ];

    customerList.country_list = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
    customerList.country = "Afghanistan";
    customerList.newView = 'off';
    customerList.editView = 'off';
    customerList.preferredCountry = null;
    customerList.countryOptions = [{country:'Antarctica'},{country:'United States'}];
    customerList.newId = 5;

    customerList.clearFormValues = function () {
      customerList.firstname = '';
      customerList.lastname = '';
      customerList.email = '';
      customerList.country = "Afghanistan";
      customerList.phonenumber = '';
    };

    customerList.addOrEditCustomer = function () {
      if (customerList.newView == 'on') {
        customerList.addCustomer();
      } else {
        customerList.editCustomer();
      }
    };

    customerList.addCustomer = function () {
      customerList.customers.push({
        id:customerList.newId,
        firstname:customerList.firstname, 
        lastname:customerList.lastname, 
        email:customerList.email, 
        country:customerList.country, 
        phonenumber:customerList.phonenumber, 
        deleted:false
      });
      customerList.newId++;
      customerList.clearFormValues();
      customerList.updateCountries();
      customerList.newView = 'off';
    };

    customerList.setupNewCustomer = function () {
      customerList.clearFormValues();
      customerList.newView = 'on';
    };

    customerList.findCustomerById = function () {
      var customers = customerList.customers;
      for (var i=0; i<customers.length; i++) {
        if (customers[i].id == customerList.editIndex) {
          return customers[i];
        }
      }
    };

    customerList.setupEditCustomer = function () {
      var customer = customerList.findCustomerById();
      customerList.firstname = customer.firstname;
      customerList.lastname = customer.lastname;
      customerList.email = customer.email;
      customerList.country = customer.country;
      customerList.phonenumber = customer.phonenumber;
      customerList.editView = 'on'; 
    };
 
    customerList.editCustomer = function() {
      var customer = customerList.findCustomerById();
      customer.firstname = customerList.firstname;
      customer.lastname = customerList.lastname;
      customer.email = customerList.email;
      customer.country = customerList.country;
      customer.phonenumber = customerList.phonenumber;
      customerList.updateCountries();
      customerList.editView = 'off';
    };

    customerList.remaining = function() {
      var count = 0;
      angular.forEach(customerList.customers, function(customer) {
        count += customer.deleted ? 0 : 1;
      });
      return count;
    };
 
    customerList.emptyTrash = function() {
      var oldCustomers = customerList.customers;
      customerList.customers = [];
      angular.forEach(oldCustomers, function(customer) {
        if (!customer.deleted) customerList.customers.push(customer);
      });
      customerList.updateCountries();
    };

    customerList.unique = function (arr) {
      var hash = {}, result = [];
      for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]) ) {
          hash[ arr[i] ] = true;
          result.push(arr[i]);
        }
      }
      return result;
    };

    customerList.uniqueCountries = function () {
      var customer = customerList.customers;
      var result = [];
      for (var i=0; i<customer.length; i++) {
        result.push(customer[i].country);
      }
      result = customerList.unique(result);
      var result_json = [];
      for (var i=0; i<result.length; i++) {
        result_json.push({country: result[i]});
      }
      return result_json;
    };

    customerList.updateCountries = function () {
      customerList.countryOptions = customerList.uniqueCountries();
      customerList.preferredCountry = null;
    };

    customerList.customFilter = function (data) {
      var preferredCountry = customerList.preferredCountry;
      if (preferredCountry === null || data.country === preferredCountry.country) {
        return true;
      } else {
        return false;
      }
    }; 

    customerList.showMap = function (country) {
      country = country.replace(" ", "+");
      $('#map-iframe').attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyALDzrTrc1jqM-VfUD-P7u4bksEuTx3spY&q=" + country + "");
    }

  });
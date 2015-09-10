'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$firebaseArray', function($firebaseArray) {
  var self = this;
  
  // Init Firebase
  var ref = new Firebase('https://mycontacts1.firebaseio.com/contacts');
  
  // Get Contacts
  self.contacts = $firebaseArray(ref);
  
  self.showAddForm = function() {
    self.addFormShown = true;
  };
  
  self.hide = function() {
    self.addFormShown = false;
  };
  
  self.addFormSubmit = function() {
    console.log('Adding Contact...');
    
    // Assign values
    if (self.name) { var name = self.name; } else { var name = null; }
    if (self.email) { var email = self.email; } else { var email = null; }
    if (self.company) { var company = self.company; } else { var company = null; }
    if (self.mobile_phone) { var mobile_phone = self.mobile_phone; } else { var mobile_phone = null; }
    if (self.home_phone) { var home_phone = self.home_phone; } else { var home_phone = null; }
    if (self.work_phone) { var work_phone = self.work_phone; } else { var work_phone = null; }
    if (self.street_address) { var street_address = self.street_address; } else { var street_address = null; }
    if (self.city) { var city = self.city; } else { var city = null; }
    if (self.state) { var state = self.state; } else { var state = null; }
    if (self.zipcode) { var zipcode = self.zipcode; } else { var zipcode = null; }
    
    // Build object (JSON format)
    self.contacts.$add({
        name: name,
        email: email,
        company: company,
        phones:[
            {
                mobile: mobile_phone,
                home: home_phone,
                work: work_phone
            }
        ],
        address: [
            {
                street_address: street_address,
                city: city,
                state: state,
                zipcode: zipcode
            }
        ]
    }).then(function(ref){
      var id = ref.key();
      console.log('Added Contact with ID: ' + id);
      
      // Clear and hide the form
      self.clearFields();
      self.addFormShown = false;
      
      // Send Message
      self.msg = "Contact Added";
    });
  };
  
  self.showContact = function(contact) {
    console.log(contact);
    
    self.name = contact.name;
    self.email = contact.email;
    self.company = contact.company;
    self.work_phone = contact.phones[0].work;
    self.home_phone = contact.phones[0].home;
    self.mobile_phone = contact.phones[0].mobile;
    self.street_address = contact.address[0].street_address;
    self.city = contact.address[0].city;
    self.state = contact.address[0].state;
    self.zipcode = contact.address[0].zipcode;
    
    self.contactShow = true;
  };
  
  self.clearFields = function() {
    self.name = '';
    self.email = '';
    self.company = '';
    self.mobile_phone = '';
    self.home_phone = '';
    self.work_phone = '';
    self.street_address = '';
    self.city = '';
    self.state = '';
    self.zipcode = '';
  };
  
}]);
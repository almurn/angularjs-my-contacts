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
  
  var ref = new Firebase('https://mycontacts1.firebaseio.com/contacts');
  
  self.contacts = $firebaseArray(ref);
//  console.log(self.contacts);
  
  self.showAddForm = function() {
    self.addFormShown = true;
  };
  
  self.hide = function() {
    self.addFormShown = false;
  };
  
}]);
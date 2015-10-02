angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    position: 'Mechanic',
    location: 'Baton Rouge, Louisiana',
    icon: 'ion-wrench'
  }, {
    id: 1,
    position: 'Labor',
    location: 'Baton Rouge, Louisiana',
    icon: 'ion-hammer'
  }, {
    id: 2,
    position: 'Mechanic',
    location: 'Corpus Christi, Texas',
    icon: 'ion-wrench'
  }, {
    id: 3,
    position: 'Electical',
    location: 'Baton Rouge, Louisiana',
    icon: 'ion-flash'
  }, {
    id: 4,
    position: 'Labor',
    location: 'Corpus Christi, Texas',
    icon: 'ion-hammer'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

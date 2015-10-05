angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function(Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  this.chats = Chats.all();
  this.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $firebaseArray) {
  var user = Ionic.User.current();
  var base = new Firebase('https://slackfire.firebaseio.com');
  var notifications;

  $scope.geocodeZip = geocodeZip;
  $scope.newNotification = {};

  if(user.id){
    var notificationsRef = base.child('/notifications');
    $scope.notifications = $firebaseArray(notificationsRef);
  }

  function geocodeZip(){
    var geocoder = new google.maps.Geocoder();
    var data = Object.assign({}, $scope.newNotification);
    $scope.newNotification = {};
    geocoder.geocode({address: data.address},  function(results_array, status) { 
      if(status === 'OK'){
        var lat = results_array[0].geometry.location.lat();
        var lng = results_array[0].geometry.location.lng();
        if(user.id){
          $scope.notifications.$add({
            address: data.address,
            uuid: user.id,
            center: [lat, lng],
            cat: data.cat
          });
        }
      }
    });
  }
});

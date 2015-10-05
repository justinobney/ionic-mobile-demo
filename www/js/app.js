angular.module('ionic').directive('ionRadioFix', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    transclude: true,
    template:
      '<label class="item item-radio">' +
        '<input type="radio" name="radio-group">' +
        '<div class="radio-content">' +
          '<div class="item-content disable-pointer-events" ng-transclude></div>' +
          '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>' +
        '</div>' +
      '</label>',

    compile: function(element, attr) {
      if (attr.icon) {
        var iconElm = element.find('i');
        iconElm.removeClass('ion-checkmark').addClass(attr.icon);
      }

      var input = element.find('input');
      angular.forEach({
          'name': attr.name,
          'value': attr.value,
          'disabled': attr.disabled,
          'ng-value': attr.ngValue,
          'ng-model': attr.ngModel,
          'ng-disabled': attr.ngDisabled,
          'ng-change': attr.ngChange,
          'ng-required': attr.ngRequired,
          'required': attr.required
      }, function(value, name) {
        if (angular.isDefined(value)) {
            input.attr(name, value);
          }
      });

      return function(scope, element, attr) {
        scope.getValue = function() {
          return scope.ngValue || attr.value;
        };
      };
    }
  };
});

var deps = [
  'ionic',
  'ionic.service.core',
  'starter.controllers',
  'starter.services',
  'firebase'
];

angular
  .module('starter', deps)
  .run(bootstrap)
  .config(config);

function bootstrap($ionicPlatform) {
  var user;
  var base = new Firebase('https://slackfire.firebaseio.com');

  $ionicPlatform.ready(onPlatformReady);
  var analytics = new Ionic.Analytics();

  function onPlatformReady(){
    Ionic.io();
    configIonicPlugins();
    auth();
    registerPush();
  }

  function auth(){
    user = Ionic.User.current();

    if (!user.id) {
      user.id = Ionic.User.anonymousId();
    }

    user.save();
  }

  function registerPush(){
    var push = new Ionic.Push({
      // "debug": true,
      // "onNotification": function(notification) {
      //   alert(notification.title);
      // }
    });

    push.register(function(token) { 
      base.child(`people/${user.id}`).set({ token: token.token });
    });
  }

  function configIonicPlugins() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  }
}

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl as chatCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/dash');
}

angular.module('myApp', ['ui.router', 'ngCookies']).config(function($stateProvider, $urlRouterProvider){
  var initState = function() {
    $state.go('note');
  };

  $urlRouterProvider.otherwise('note');

  $stateProvider
    .state('page1', {
      url: '/page1',
      templateUrl:"views/partials/page1.html",
      cache: true,
      controller: function($scope, $state) {
        console.log("-----enter page1-----");
        var a = '';
      }
    })
    .state('page2', {
      url: '/page2',
      templateUrl:"views/partials/page2.html",
      cache: true,
      controller: function($scope, $state) {
        console.log("-----enter page2------");
      }
    })
    .state('note', {
      url: '/note',
      templateUrl:"views/partials/note.html",
      cache: true,
      controller: 'NoteController'
    });

});
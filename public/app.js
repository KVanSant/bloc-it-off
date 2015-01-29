blocitoff = angular.module('Blocitoff', ['firebase', 'ui.router']);

blocitoff.config(['$stateProvider', function($stateProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateURL: '/templates/home.html'
  });
}]);


blocitoff.controller('Home.controller', ['$scope', '$firebase', function($scope, $firebase) {
  var ref = new Firebase("https://sweltering-heat-4642.firebaseio.com/tasks");
  var sync = $firebase(ref);

//Sync task list as array
  $scope.tasks = sync.$asArray();


//add task and add to firebase
  $scope.addTask = function(task){
    $scope.tasks.$add({task: task});
    $scope.newTaskItem = "";
   };
  }]);


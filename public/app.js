blocitoff = angular.module('Blocitoff', ['firebase', 'ui.router']);


blocitoff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('active', {
    url: '/',
    controller: 'Active.controller',
    templateUrl: '/templates/active.html'
  });

  $stateProvider.state('completed', {
    url: '/completed',
    controller: 'Completed.controller',
    templateUrl: '/templates/completed.html'
  });

  $stateProvider.state('expired', {
    url:'/expired',
    controller: 'Expired.controller',
    templateUrl: '/templates/expired.html'
  })
}]);


blocitoff.controller('Active.controller', ['$scope', 'FirebseRef',  function($scope, FirebseRef) {
  $scope.tasks = FirebseRef.all;


//add a new task to the list
  $scope.addTask = function(task){ 
    $scope.tasks.$add({
      task: task, 
      state: "active", 
      dateAdded: Firebase.ServerValue.TIMESTAMP 
    });
    $scope.newTaskItem = "";
  };

//complete a task and save it
  $scope.completeTask = function(taskId) {
    var task = tasks.$getRecord(taskId);
    task.state = "complete";
    tasks.$save(task);
  };

//expire task after 7 days
  $scope.expireTask = function(taskId) {
    var task = tasks.$getRecord(taskId);
    var today = new Date()
    var now = today.getTime();
    var days = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
    if (task.state == "active" && (now - task.dateAdded) >= (7 * days)){   
        task.state = "expired";
        tasks.$save(task);
    }
  };
}]);


blocitoff.controller('Completed.controller', ['$scope', 'FirebseRef', function($scope, FirebseRef) {
  $scope.tasks = FirebseRef.all;

}]);


blocitoff.controller('Expired.controller', ['$scope', 'FirebseRef', function($scope, FirebseRef) {
  $scope.tasks = FirebseRef.all;

}]);


blocitoff.factory('FirebseRef', ['$firebase', function($firebase) {
  var ref = new Firebase("https://sweltering-heat-4642.firebaseio.com/tasks");
  var sync = $firebase(ref);
  var tasks = sync.$asArray();

  return {
    all: tasks
  };

}]);


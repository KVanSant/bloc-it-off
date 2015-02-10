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


blocitoff.controller('Active.controller', ['$scope', '$firebase',  function($scope, $firebase) {
  var ref = new Firebase("https://sweltering-heat-4642.firebaseio.com/tasks");
  var sync = $firebase(ref);

//Sync task list as array
 var tasks = sync.$asArray();
 $scope.tasks = tasks;


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


  $scope.expireTask = function(taskId) {
    var today = new Date()
    var now = today.getTime();
    var task = tasks.$getRecord(taskId);
    if (now - task.dateAdded >= 300000) {   
        task.state = "expired";
        tasks.$save(task);
      
    }
  };


}]);

blocitoff.controller('Completed.controller', ['$scope', '$firebase', function($scope, $firebase) {
  var ref = new Firebase("https://sweltering-heat-4642.firebaseio.com/tasks");
  var sync = $firebase(ref);


 var tasks = sync.$asArray();
 $scope.tasks = tasks;

//undo complete state and save back to active
$scope.undoComplete = function(taskId) {
    var task = tasks.$getRecord(taskId);
    task.state = "active";
    tasks.$save(task);
  };



}]);


blocitoff.controller('Expired.controller', ['$scope', '$firebase', function($scope, $firebase) {
  var ref = new Firebase("https://sweltering-heat-4642.firebaseio.com/tasks");
  var sync = $firebase(ref);

 var tasks = sync.$asArray();
 $scope.tasks = tasks;

}]);




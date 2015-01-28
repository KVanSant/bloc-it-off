blocitoff = angular.module("Blocitoff", ["firebase"]);


blocitoff.controller('Task.controller', ['$scope', '$firebase', function($scope, $firebase) {
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


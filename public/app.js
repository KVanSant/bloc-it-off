blocitoff = angular.module("Blocitoff", ["firebase"]);


blocitoff.controller('Task.controller', ['$scope', '$firebase', function($scope, $firebase) {
  var ref = new Firebase("https://sweltering-heat-4642.firebaseio.com");
  var sync = $firebase(ref);

  $scope.taskList = sync.$asArray();

  $scope.addTask = function(){};

  }]);


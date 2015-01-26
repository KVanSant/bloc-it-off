blocitoff = angular.module("Blocitoff", ["firebase"]);


angular.module('Blocitoff', []).controller('Task.controller', ['$scope', function($scope) {
  $scope.subText = "Current Tasks";

  $scope.tasks = [
    'Clean the bathroom',
    'Pick up the dry cleaning',
    'Wash the car',
    'Get groceries',
    'Pay the bills',
  ];

 }]);
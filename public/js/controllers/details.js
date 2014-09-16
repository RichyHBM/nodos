angular.module('nodos-app.details',[])

.controller('DetailsCtrl',  function ($scope, $http, $interval) {
  $scope.errorMsg = '';

  $scope.collapsable = {}
  $scope.collapsable.process = false;
  $scope.collapsable.system = false;
  $scope.collapsable.files = false;
  $scope.collapsable.ram = false;
  $scope.collapsable.swap = false;
  $scope.collapsable.disk = false;
  $scope.collapsable.network = false;

  $scope.detailInfo = {};

  $scope.getInfo = function()
  {
    $http.get('/api/detail-info')
    .success(function(data, status) {
      $scope.detailInfo = data;
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });
  }
  
  $scope.getInfo();

  $interval($scope.getInfo, 10000);

});
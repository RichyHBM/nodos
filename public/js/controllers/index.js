angular.module('nodos-app.index',[])

.controller('IndexCtrl',  function ($scope, $http) {
  $scope.errorMsg = '';
  $scope.collapsable = {}
  $scope.collapsable.cpu = true;
  $scope.collapsable.sysInfo = true;
  $scope.systemInfo = {};

  $http.get('/api/system-info')
  .success(function(data, status) {
    $scope.systemInfo = data;
  })
  .error(function(data, status) {
    $scope.errorMsg = data;
  });
});
angular.module('nodos-app.index',[])

.controller('IndexCtrl',  function ($scope, $http, $interval) {
  $scope.errorMsg = '';
  $scope.collapsable = {}
  $scope.collapsable.cpu = false;
  $scope.collapsable.sysInfo = false;
  $scope.collapsable.networkInfo = false;
  $scope.systemInfo = {};

  $scope.getInfo = function()
  {
    $http.get('/api/raw-info')
    .success(function(data, status) {
      $scope.systemInfo = data;
      $scope.systemInfo.uptimeFormat = secondsTimeSpanToHMS(Math.floor(data.uptime));
      $scope.systemInfo.totalmemoryFormat = Math.floor(data.totalmemory / 1000 / 1000) + " MB";
      $scope.systemInfo.freememoryFormat = Math.floor(data.freememory / 1000 / 1000) + " MB";
      $scope.systemInfo.cpuSpeed = data.cpus[0].speed + " Hz";
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });
  }
  
  $scope.getInfo();

  $interval(function(){
    $scope.systemInfo.uptime += 1;
    $scope.systemInfo.uptimeFormat = secondsTimeSpanToHMS(Math.floor($scope.systemInfo.uptime));
  }, 1000);

  $interval($scope.getInfo, 10000);

});
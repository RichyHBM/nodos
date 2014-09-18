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
    $http.get('/api/processCount')
    .success(function(data, status) {
      $scope.detailInfo.processCount = data;
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/sessionCount')
    .success(function(data, status) {
      $scope.detailInfo.sessionCount = data;
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/fileHandles')
    .success(function(data, status) {
      $scope.detailInfo.fileHandles = data;
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/fileHandlesLimit')
    .success(function(data, status) {
      $scope.detailInfo.fileHandlesLimit = data;
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/ramTotal')
    .success(function(data, status) {
      $scope.detailInfo.ramTotal = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/ramFree')
    .success(function(data, status) {
      $scope.detailInfo.ramFree = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/ramCached')
    .success(function(data, status) {
      $scope.detailInfo.ramCached = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/ramBuffers')
    .success(function(data, status) {
      $scope.detailInfo.ramBuffers = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/swapTotal')
    .success(function(data, status) {
      $scope.detailInfo.swapTotal = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/swapFree')
    .success(function(data, status) {
      $scope.detailInfo.swapFree = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/diskTotal')
    .success(function(data, status) {
      $scope.detailInfo.diskTotal = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/diskUsage')
    .success(function(data, status) {
      $scope.detailInfo.diskUsage = Math.floor( parseInt(data) / 1000000);
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });

    $http.get('/api/activeConnections')
    .success(function(data, status) {
      $scope.detailInfo.activeConnections = data;
    })
    .error(function(data, status) {
      $scope.errorMsg = data;
    });





  }
  
  $scope.getInfo();

  $interval($scope.getInfo, 10000);

});
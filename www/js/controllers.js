angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function($scope, $rootScope) {
  //$rootScope.site = 'http://yafeilee.me';
  $rootScope.site = 'http://localhost:3002';
})

.controller('BlogsCtrl', function($scope, $http, $rootScope) {
  $http({
    url: $rootScope.site + "/archives.json",
  }).success( function(res){
    $scope.posts = res.posts;
  });
  $scope.posts = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('BlogCtrl', function($scope, $http, $rootScope, $stateParams, $sce) {

  $scope.content_html = '';

  $http({
    url: $rootScope.site + "/blogs/" + $stateParams.id + ".json"
  }).success(function(res){
    $scope.content_html = res.content_html;
    $scope.created_at = res.created_at;
  });

  $scope.trust_content_html = function(){
    return $sce.trustAsHtml($scope.content_html)
  }
});

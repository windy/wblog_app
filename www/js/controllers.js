angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function($scope, $rootScope) {
  //$rootScope.site = 'http://yafeilee.me';
  $rootScope.site = 'http://localhost:3002';
})

.controller('BlogsCtrl', function($scope, $http, $rootScope, $location) {
  var type = $location.search().type;
  var map = {
    tech: '技术',
    life: '生活',
    creator: '创业',
    undefined: '全部',
  }
  $scope.type = type;

  $scope.ctype = function(){
    return map[type];
  }

  $scope.load = function(){
    $http({
      url: $rootScope.site + "/archives.json",
      params: { type: $scope.type, all: true, start_with: 1 }
    }).success( function(res){
      $scope.posts = res.posts;
    }).finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.load();
})

.controller('BlogCtrl', function($scope, $http, $rootScope, $stateParams, $sce) {

  $scope.content_html = '';

  $http({
    url: $rootScope.site + "/blogs/" + $stateParams.id + ".json"
  }).success(function(res){
    $scope.content_html = res.content_html;
    $scope.created_at = res.created_at;
    $scope.title = res.title;
  });

  $scope.trust_content_html = function(){
    $scope.replace_img_src_content_html = $scope.content_html.replace(/img src="/g, "img src=\"" + $rootScope.site);
    return $sce.trustAsHtml($scope.replace_img_src_content_html)
  }
})

.controller('AboutCtrl', function($scope, $http, $rootScope){
  $http({
    url: $rootScope.site + "/mobile"
  }).success(function(res){
    $scope.content = res
  });
});

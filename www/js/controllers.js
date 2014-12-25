angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function($scope, $rootScope) {
  //$rootScope.site = 'http://yafeilee.me';
  $rootScope.site = 'http://localhost:3002';
})

.controller('BlogsCtrl', function($scope, $http, $rootScope, $location) {
  var type = $location.search().type;
  $http({
    url: $rootScope.site + "/archives.json",
    params: { type: type }
  }).success( function(res){
    $scope.posts = res.posts;
  });
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
    $scope.replace_img_src_content_html = $scope.content_html.replace(/img src="/g, "img src=\"" + $rootScope.site);
    return $sce.trustAsHtml($scope.replace_img_src_content_html)
  }
});

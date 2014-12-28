angular.module('starter.controllers', ['ngSanitize', 'starter.directives'])

.factory('ImageProcessor', function($rootScope){
  return {
    replaceImage: function(html){
      if( ! html ){
        return
      }
      return html.replace(/(img src=")[^h]/g, "$1" + $rootScope.site + '/');
    }
  }
})

.controller('AppCtrl', function($scope, $rootScope) {
  $rootScope.site = 'http://yafeilee.me';
  //$rootScope.site = 'http://localhost:3002';
})

.controller('HomeCtrl', function($scope, $http, $rootScope, $state, ImageProcessor) {
  $scope.load = function(){
    $http({
      url: $rootScope.site + '/blogs.json'
    }).success(function(res){
      $scope.post = res
    }).finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.load();

  $scope.visit = function(id){
    $state.go('app.single', { id: id })
  }

  $scope.fix_image_html = function(html){
    return ImageProcessor.replaceImage(html);
  }

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

.controller('BlogCtrl', function($scope, $http, $rootScope, $stateParams, $sce, ImageProcessor) {

  $scope.post = {};

  $http({
    url: $rootScope.site + "/blogs/" + $stateParams.id + ".json"
  }).success(function(res){
    $scope.post = res;
  });

  $scope.trust_content_html = function(){
    return ImageProcessor.replaceImage($scope.post.content_html)
  }
})

.controller('AboutCtrl', function($scope, $http, $rootScope){
  $http({
    url: $rootScope.site + "/mobile"
  }).success(function(res){
    $scope.content = res
  });
});

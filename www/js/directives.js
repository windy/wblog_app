angular.module('starter.directives', ['ngSanitize'])

.directive('target', function(){
  return {
    restrict: 'A',
    scope: {
    },
    link: function(scope, element, attrs){
      url = element.attr('href');
      if(!url){
        return;
      }
      if(url.indexOf('http://') === 0 || url.indexOf('https://') === 0){
        element.bind('click', function(e){
          e.preventDefault();
          window.open(encodeURI(url), '_system', 'location=yes');
        })
      }
    } // link
  } // return
})

.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])

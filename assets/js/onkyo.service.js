(function () {
  'use strict';
  angular
    .module('app')
    .factory('onkyoService', onkyoService);

    onkyoService.$inject = ['$http'];

    function onkyoService($http) {
        
      return {
        send : send,
        onFinish: onFinish,
        getConfiguration:getConfiguration
      };

      function send(command) {
            return new Promise(function(resolve, reject) {
                io.socket.post('/onkyo/send', {cmd : command}, function (data, jwres){
                    return resolve(data);
                });
            });
        }            
        function onFinish(cb){
          io.socket.on('onkyo_command_finished', function (data) {
               cb(data);
           });
        }
        
        function getConfiguration(){
             return $http({method: 'GET', url: '/onkyo/index' }).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    return data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
	}
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('onkyoCtrl', onkyoCtrl);

  onkyoCtrl.$inject = ['onkyoService', '$scope'];

  function onkyoCtrl(onkyoService, $scope){
		/* jshint validthis: true */
		var vm = this;

		/* Functions */
		vm.send = send;
		
		/* datas */
		vm.conf = [];
		vm.cmd = null;
		vm.result = null;
		activate();

		function activate() {
			waitForEvents();
			getConfiguration();
		}

		function send(command) {
			onkyoService.send(command)
				.then(function(result){
					console.log('Command sent : ' + command);										
				});
		}
		
		function getConfiguration(){
			onkyoService
				.getConfiguration()
				.then(function(data){
					vm.conf = data.data;
				});
		}
		
		function waitForEvents(){			
				
			onkyoService.onFinish(function(changes){
				console.log(changes);
				vm.result = changes;
			});
		}
		
		
  }
})();
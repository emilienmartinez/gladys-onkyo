var fs = require('fs');
var path = require('path');
var request = require('request');
var progress = require('request-progress');
require('shelljs/global');

function executeCmd(cmd, userId){
	
	sails.log.info('starting cmd execution');
	// emit an event
	ScenarioService.launcher('onkyo_command_start', cmd);
	
	
	var ps = exec(cmd, {async:true});
	sails.log.info('cmd executed');
	ps.stdout.on('data', function(data) {
			// send desktop notification (with websockets)
				SocketService.sendDesktopMessageUser(userId, 'command_finished' , data, function(err, nbOfMsgSent){
				 if(err) {
					 sails.log.warn(err);
				 }
				});
	});
	
}

module.exports = {
	
	/**
	 * Download a file for a specific user
	 * @url: The URL of the file to download
	 * @user: The User id
	 */
	send: function(cmd, userId){
				
		executeCmd(cmd, userId);
	}	
};

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
	  ScenarioService.launcher('onkyo_command_finished', cmd);
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

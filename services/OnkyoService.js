var fs = require('fs');
var path = require('path');
var request = require('request');
var progress = require('request-progress');
require('shelljs/global');

function executeCmd(cmd, isAsync){
	
	sails.log.info('starting cmd execution');
	// emit an event
	ScenarioService.launcher('onkyo_command_start', cmd);
	
	
	var ps = exec("onkyo "+cmd, {isAsync});
	sails.log.info('cmd executed');
	
	if(isAsync)
	{
		ps.stdout.on('data', function(data) {
				// send desktop notification (with websockets)
					SocketService.sendDesktopMessageUser(userId, 'command_finished' , data, function(err, nbOfMsgSent){
					 if(err) {
						 sails.log.warn(err);
					 }
					});
		});
	}
	else
	{
		return ps.stdout;
	}
	
}

module.exports = {
	
	/**
	 * Download a file for a specific user
	 * @url: The URL of the file to download
	 * @user: The User id
	 */
	send: function(cmd, userId){
				
		executeCmd(cmd, true);
	},
	isAvrOn: function(){
				
		return executeCmd("system-power:query | egrep 'standby|on' -o", false);
		/* return new Promise(function(resolve, reject) {
                io.socket.post('command_finished', function (data){
                    return resolve(data =="on");
                });
            });		*/
	}
		
};

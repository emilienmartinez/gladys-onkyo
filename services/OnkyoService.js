var fs = require('fs');
var path = require('path');
var request = require('request');
var progress = require('request-progress');
require('shelljs/global');

function executeIsAvrOn(){			
		return executeCmd("system-power:query | egrep 'standby|on' -o", false) == "on";
	}

function executeCmd(cmd, isAsync){
	
	// emit an event
	ScenarioService.launcher('onkyo_command_start', cmd);
	
	
	var ps = exec("onkyo --host "+sails.config.onkyo.avrIp +" "+cmd,  {async:isAsync});
	sails.log.info('Onkyo cmd executed');
	
	//Playing sound on Pi hdmi output to avoid delay
	if(sails.config.onkyo.isHdmiInput && sails.config.onkyo.hdmiInputCode == cmd)
	{
		exec("aplay -c2 -r48000 -fS16_LE < /dev/zero &",  {async:false});
	}
	
	if(isAsync)
	{
		ps.stdout.on('data', function(data) {
				// send desktop notification (with websockets)
					SocketService.sendDesktopMessageUser(1, 'command_finished' , data, function(err, nbOfMsgSent){
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
	send: function(cmd, isAsync){
				
		executeCmd(cmd, isAsync);
	},
	startAvr:function(){
		if(!executeIsAvrOn())
		{			
		  executeCmd("system-power=on", false);
		}
			
	},

	stopAvr:function(){
		if(executeIsAvrOn())
		{			
		  executeCmd("system-power=standby", false);
		}
			
	},
	
	
	isAvrOn: function(){			
		return executeCmd("system-power:query | egrep 'standby|on' -o", false) == "on";
	},
	
	getCurrentInput(){		
		return executeCmd("SLIQSTN | sed -n 2p", false);
	},

		
};

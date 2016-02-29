var param = require('./parametres.js');

module.exports.onkyo = {
    
  // title for the Hook
  title: 'Onkyo',
	// the name of the hook folder
  folderName: param.folderName,
  path: 'onkyo',
  launcherTypes:[
        {
            code : 'onkyo_command_start',
            name : 'Command Started',
            description: 'Fire when a command has started',
            optionspath: '/onkyo/index'
        },
        {
            code: 'onkyo_command_finish',
            name: 'Command Finished',
            description: 'Fire when a comand has finished',
            optionspath: '/onkyo/index'
        }
    ],

};

var onkyoInstall = require('./lib/onkyoInstall.js');

module.exports = function (sails) {

  sails.config.Event.on('sailsReady', function(){
    
    onkyoInstall.install(sails.config.onkyo.launcherTypes);
    
     Onkyo.destroy({finished:false}).exec(function (err){
        sails.log.info('Onkyo Module : Onkyo table cleaned !');
     });
  });  

   
  var loader = require("sails-util-mvcsloader")(sails);
  loader.injectAll({
    policies: __dirname + '/policies',// Path to your hook's policies
    config: __dirname + '/config'// Path to your hook's config
  });

    
  return {
    defaults: require('./lib/defaults'),
    configure: require('./lib/configure')(sails),
    initialize: require('./lib/initialize')(sails),
    routes: require('./lib/routes')(sails),
  };


};
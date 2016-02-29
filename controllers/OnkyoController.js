/**
 * Controller
 * @doc http://sailsjs.org/documentation/concepts/controllers
 */

module.exports = {
	
	
	index: function(req, res){
		Onkyo.find({limit:10}, function(err, downloads){
			if(err){
				res.status(500).json(err);
			}else{
				res.json(downloads);
			}
		});
	},
	
	send:function(req,res){
		var cmd = req.param('cmd');

		OnkyoService.send(cmd, req.session.User.id);
		
		return res.json({
			message: 'Command started',
			cmd: cmd
		});
	}
	
};
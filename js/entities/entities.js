//creates a player entity and uses an image and creates deminsions of player
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		this.supper(me.Entity, 'init'[x, y, {
			image:"player",
			width: 64,
			height: 64,
			spritewidth "64",
			spriteheight: "64",
			//defines where entity can move
			getShape: function(){
				return(new )
				//needs more
			}
		}]);
	},

	update: function(){

	}
});
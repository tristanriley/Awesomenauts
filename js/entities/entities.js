//creates a player entity and uses an image and creates deminsions of player
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			//calls image of entity we want to use
			image:"player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			//creates a function that defines where entity can move
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();

			}
		}]);
		//sets characters velocity on x and y axis
		this.body.setVelocity(5, 20);


	},

	update: function(delta){
		//adds if/else so that the caharacter will mve when key is pressed
		if (me.input.isKeyPressed("right")) {
			//adds to the postition of x by the velocity defined above in 
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//lets program use the walk animation
		this.renderable.setCurrentAnimation("walk");
		}else{
			//makes it so that character stops moving when key is not pressed
			this.body.vel.x = 0;
		}
		//shows updated position on screen
		this.body.update(delta);
		return true;
	}
});
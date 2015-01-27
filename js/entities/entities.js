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

		//adds animation when character is idle
		this.renderable.addAnimation("idle", [78]);
		//adds animation as character walks
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//sets character image when we start game
		this.renderable.setCurrentAnimation("idle");

	},

	update: function(delta){
		//adds if/else so that the caharacter will mve when key is pressed
		if (me.input.isKeyPressed("right")) {
			//adds to the postition of x by the velocity defined above in 
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//flips walking animation
			this.flipX(true);
		}else{
			//makes it so that character stops moving when key is not pressed
			this.body.vel.x = 0;
		}
	//makes is so player does not stat out walking
	if(this.body.vel.x !== 0){
		//if statement that makes character walk
		if (!this.renderable.isCurrentAnimation("walk")) {
			//lets program use every walk animation
			this.renderable.setCurrentAnimation("walk");
		}
		//player stops walking when key is not presseed
	}else{
		this.renderable.setCurrentAnimation("idle");
	}

		//shows updated position on screen
		this.body.update(delta);
		//lets animation update on fly
		this._super(me.Entity, "update", [delta]);
		return true;
	}
});

//function for player tower
game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
			this._super(me.Entity, 'init', [x, y, {
				image: "tower",
				width: 100,
				height: 100,
				spriteheight: "100",
				spriteheight: "100",
				getShape: function(){
					return(new me.Rect(0, 0, 100, 100)).toPolygon();
				}

			}]);
			//give variable for when tower is not broken
			this.broken = false;
			//gives tower health
			this.health = 10;
			//updates tower wether or not looking at it
			this.alwaysUpdate = true;
			//entities will be able to collide with tower
			this.body.onCollision = this.onCollision.bind(this);

			this.type = "PlayerBaseEntity";
	},
	//function that updates state of the tower
	update:function(delta){
		//breaks tower when health is 0 or less
		if(this.health<=0){
			this.broken = true; 
		}
		this.body,update(delta);
		//updates state of tower
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}
});

//function for enemy tower
game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
			this._super(me.Entity, 'init', [x, y, {
				image: "tower",
				width: 100,
				height: 100,
				spriteheight: "100",
				spriteheight: "100",
				getShape: function(){
					return(new me.Rect(0, 0, 100, 100)).toPolygon();
				}

			}]);
			//give variable for when tower is not broken
			this.broken = false;
			//gives tower health
			this.health = 10;
			//updates tower wether or not looking at it
			this.alwaysUpdate = true;
			//entities will be able to collide with tower
			this.body.onCollision = this.onCollision.bind(this);

			this.type = "EnemyBaseEntity";
	},
	//function that updates state of the tower
	update:function(delta){
		//breaks tower when health is 0 or less
		if(this.health<=0){
			this.broken = true; 
		}
		this.body,update(delta);
		//updates state of tower
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}
});
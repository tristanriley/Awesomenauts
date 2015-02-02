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
		//keep track of which direction your character is going
		this.facing = "right";
		//follows player with screen so we can see him
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		//adds animation when character is idle
		this.renderable.addAnimation("idle", [78]);
		//adds animation as character walks
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//sets character image when we start game
		this.renderable.setCurrentAnimation("idle");
		//adds animations for attacking
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 70, 71, 72], 80);

	},

	update: function(delta){
		//adds if/else so that the caharacter will mve when key is pressed
		if (me.input.isKeyPressed("right")) {
			//adds to the postition of x by the velocity defined above in 
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//keep track of which direction your character is going
			this.facing = "right";
			//flips walking animation
			this.flipX(true);

		}else if (me.input.isKeyPressed("left")){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//keep track of which direction your character is going
			this.facing = "left";
			//flips blayer back so it is facing left
			this.flipX(false);
		}else{
			//makes it so that character stops moving when key is not pressed
			this.body.vel.x = 0;
		}

		if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		};

		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets current animation to attack and once that is over goes back to idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so next time sequence is started we begin
				//from the first animation not the one we left off at
				this.renderable.setAnimationFrame();
			}

		}
	//makes is so player does not stat out walking
	else if(this.body.vel.x !== 0){
		//if statement that makes character walk
		if (!this.renderable.isCurrentAnimation("walk")) {
			//lets program use every walk animation
			this.renderable.setCurrentAnimation("walk");
		}
		//player stops walking when key is not presseed
	}else{
		this.renderable.setCurrentAnimation("idle");
	}
		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets current animation to attack and once that is over goes back to idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so next time sequence is started we begin
				//from the first animation not the one we left off at
				this.renderable.setAnimationFrame();
			}

		}

		//passing perameter into function with info about player condition
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//shows updated position on screen
		this.body.update(delta);
		//lets animation update on fly
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			//keeps player from glitching into the base from the left
			if(xdif>-50 && this.facing==='right' && (xdif<0)){
				//stops player velocity
				this.body.vel.x = 0;
				//pushes player back
				this.pos.x = this.pos.x -1;
			//keeps player from glitching into the base from the right
			}else if(xdif<60 && this.facing==='left' && (xdif>0)){
				//stops player velocity
				this.body.vel.x = 0;
				//pushes player back
				this.pos.x = this.pos.x +1;

			}
		}
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
					return(new me.Rect(0, 0, 75, 75)).toPolygon();
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
			//shows animation of base not burning
			this.renderable.addAnimation("idle", [0]);
			this.renderable.addAnimation("broken", [1]);
			this.renderable.setCurrentAnimation("idle");
	},
	//function that updates state of the tower
	update:function(delta){
		//breaks tower when health is 0 or less
		if(this.health<=0){
			this.broken = true; 
			//sets animation to burning tower when it breaks
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
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
					return(new me.Rect(0, 0, 75, 75)).toPolygon();
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
			//shows animation of base not burning
			this.renderable.addAnimation("idle", [0]);
			this.renderable.addAnimation("broken", [1]);
			this.renderable.setCurrentAnimation("idle");
	},
	//function that updates state of the tower
	update:function(delta){
		//breaks tower when health is 0 or less
		if(this.health<=0){
			this.broken = true;
			//sets image as burrning when broken
			this.renderable.setCurrentAnimation("broken"); 
			//renderable is a class made in mealonjs that allows us to change animation
		}
		this.body.update(delta);
		//updates state of tower
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}
});
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
		this.type = "PlayerEntity";
		//gives player a health of 20
		this.health = 20;
		//sets characters velocity on x and y axis
		this.body.setVelocity(5, 20);
		//keep track of which direction your character is going
		this.facing = "right";
		//make hit only count as 1
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttck = new Date().getTime();
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
		this.now = new Date().getTime();
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
	else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
		//if statement that makes character walk
		if (!this.renderable.isCurrentAnimation("walk")) {
			//lets program use every walk animation
			this.renderable.setCurrentAnimation("walk");
		}
		//player stops walking when key is not presseed
		//player will do entire attack motion when a is pressed
	}else if(!this.renderable.isCurrentAnimation("attack")){
		this.renderable.setCurrentAnimation("idle");
	}


		//passing perameter into function with info about player condition
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//shows updated position on screen
		this.body.update(delta);
		//lets animation update on fly
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			//keeps player from glitching into the base from the left
			if (ydif<-40 && xdif< 50 && xdif>-35) {
				this.body.falling= false;
				this.body.vel.y = -1;
			}
			else if(xdif>-50 && this.facing==='right' && (xdif<0)){
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
			}else if (response.b.type==='EnemyCreep' ){
			//checks diffrence of player and other entity
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;
			//this.lastAttacking=this.now;
		
			if(xdif>0){
				//keeps moving creep to the right to maintain its position
				this.pos.x = this.pos.x + 1;
				if(this.facing === "left"){
				//sets velocity of playerto 0
				this.body.vel.x = 0;
				}
			//pushes player back if colliding with creep
			}else{
				this.pos.x = this.pos.x - 1;
				//makes you have to face the creep to damage it
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
			//checks if current animation is attack the runs function
			//checks if it has been 1000 miliseconds since last attack so it dosent happen over again
			if(!this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
				
				this.lastHit = this.now;
				//base losses health when attacked
				response.b.loseHealth();
			}
		}else if(response.b.type==='EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y

			

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000
				&& (Math.abs(ydif) <= 40) && 
				(((xdif>0)&& this.facing==="left") || ((xdif<0)&& this.facing==="right"))
				){
				this.lastHit = this.now;
				response.b.loseHealth(1);
			}
		};
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

			this.type = "PlayerBase";
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

	loseHealth: function(damage){
		//subtracts set damage amount from base health
		this.health = this.health - damage;
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

	},

	loseHealth: function(){
		this.health--;
	}
});

game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			//sets image for creep
			image: "creep1",
			//sets height and width for creep
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			//makes object a polygon that is 32 by 64
			getShape: function(){
				return(new me.Rect(200, 0, 32, 64)).toPolygon();
			}
		}]);
	//gives creep 10 health
	this.health = 10;
	//updates health and position of creep
	this.alwaysUpdate = true;
	//lets us know if the enemy is currently attacking
	this.attacking = false;
	//refreshes enemy
	this.lastAttacking = new Date().getTime();
	//keeps track of when creep last attacks
	this.lastHit = new Date().getTime();
	//keeps track of when creep last hits
	this.lastHit = new Date().getTime();
	this.now = new Date().getTime();
	//give the creep a speed
	this.body.setVelocity(3, 20);

	this.type = "EnemyCreep";

	//adds animation when creep is walking
	this.renderable.addAnimation("walk", [3, 4, 5], 80);
	//sets animation of creep walking
	this.renderable.setCurrentAnimation("walk");
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},


	update: function(delta){
		//removes enemy creep from world once it's health is 0 or less
		if(this.health <= 0){
			me.game.world.removeChild(this);
		}
		//refreshes enemy
		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);


		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;
	},

	collideHandler: function(response){
		//if creep runs into base it will stop and get bumped back
		if(response.b.type==='PlayerBase'){
			this.attacking=true;
			//this.lastAttacking=this.now;
			this.body.vel.x = 0;
			//keeps moving creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			//checks if it has been at least 1 second scince creep hits base
			if((this.now-this.lastHit >= 1000)){
				//updates the last hit timer
				this.lastHit = this.now;
				//calls player base lose health function and lose 1 health 
				response.b.loseHealth(1);
			}
		}else if (response.b.type==='PlayerEntity' ){
			//checks diffrence of player and other entity
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking=true;
			//this.lastAttacking=this.now;
		
			if(xdif>0){
				//keeps moving creep to the right to maintain its position
				this.pos.x = this.pos.x + 1;
				//sets velocity of player to 0
				this.body.vel.x = 0;
			}
			//checks if it has been at least 1 second scince creep hits player
			//dosent allow player to lose health when behind creep
			if((this.now-this.lastHit >= 1000) && xdif>0){
				//updates the last hit timer
				this.lastHit = this.now;
				//calls playerlose health function and lose 1 health 
				response.b.loseHealth(1);
			}
		}
	}


});

game.GameManager = Object.extend({
		init: function(x, y, settings){
			//sets time of last creeper creation
			this.now = new Date().getTime();
			this.lastCreep = new Date().getTime();
		
			this.alwaysUpdate = true;
		},

		update: function(){
			this.now = new Date().getTime();

			//adds creep to world after a second
			if(Math.round(this.now/1000) % 10 ===0 && (this.now - this.lastCreep >= 1000)){
				this.lastCreep = this.now;
				var creepe = me.pool.pull("EnemyCreep", 200, 0, {});
				me.game.world.addChild(creepe, 5);
			};
			return true;
		}
	});
//class that runs all the timers and occurences that aren't inside any of the other entities
// game.GameTimeManager = Object.extend({
// 	//constructor function
// 	init: function(x, y, settings){
// 		//sets timer
// 		this.now = new Date().getTime();
// 		//keeps track of last time creep was made
// 		this.lastCreep = new Date().getTime();
// 		//says the game is not paused
// 		this.paused = game.data.paused;
// 		//keeps the function updating
// 		this.alwaysUpdate = true;
// 	},

// 	update: function(){
// 		//keeps track of timer
// 		this.now = new Date().getTime();
		
// 		this.goldTimerCheck();
// 		this.creepTimerCheck();

// 		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 		//enemy hero hack
// 		if(game.data.enemyHero.dead){
// 			//takes the player off the screen
// 			me.game.world.removeChild(game.data.enemyHero);
// 			//runs the resetPlayer function
// 			me.state.current().resetPlayer(10, 0);

// 		}
// 		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
// 		//updates
// 		return true;
// 	},

// 	goldTimerCheck: function(){
// 		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
// 		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
// 			//adds 1 more gold than game.data.exp1
// 			game.data.gold += (game.data.exp1 + 1);
// 			//logs it into the console
// 			console.log("Current gold: " + game.data.gold);
// 		}
// 	},

// 	creepTimerCheck: function(){
// 		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
// 		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
// 			//updates timer
// 			this.lastCreep = this.now;
// 			//creates and inserts creeps into world
// 			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
// 			var creepf = me.pool.pull("FriendCreep", 0, 0, {});
// 			//adds the creeps to the world
// 			me.game.world.addChild(creepe, 5);
// 			me.game.world.addChild(creepf, 5);
// 		} 
// 	}
// });


// game.HeroDeathManager = Object.extend({
// 	init: function(x, y, settings){
// 		this.alwaysUpdate = true;
// 	},

// 	update: function(){
// 		//runs if player is dead
// 		if(game.data.player.dead){
// 			//takes the player off the screen
// 			me.game.world.removeChild(game.data.player);
// 			//runs the resetPlayer function
// 			me.state.current().resetPlayer(10, 0);

// 		}

// 		return true;
// 	}
// });

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameover = false;
	},

	update: function(){
		//runs if enemy base is killed
		if (game.data.win === true && !this.gameover) {
			this.gameOver(true);
		}
		//runs if player based is killed
		else if (game.data.win === false && !this.gameover) {
			this.gameOver(false);
		}
		return true;
	},

	gameOver: function(win){
		if (win) {
			//adds 10 the the exp variable
			game.data.exp += 10;
		}
		else{
			//adds 1 the the exp variable
			game.data.exp += 1;
		}
		console.log(game.data.exp);
		//says game's over
		this.gameover = true;
		//saves the value of the exp variable
		me.save.exp = game.data.exp;
	}
});

//for spending gold
// game.SpendGold = Object.extend({
// 	init: function(x, y, settings){
// 		//sets timer
// 		this.now = new Date().getTime();
// 		//keeps track of last time pause button was pressed
// 		this.lastBuy = new Date().getTime();
// 		//says the game is not paused
// 		this.paused = game.data.paused;
// 		//keeps the function updating
// 		this.alwaysUpdate = true;
// 		//updates functon everytime game is paused
// 		this.updateWhenPaused = true;
// 		//says the player isnt buying anything
// 		this.buying = false;
// 	},

// 	update: function(){
// 		//sets a timer
// 		this.now = new Date().getTime();
// 		//runs if buy button has been pressed and its been at least a second since its last been pressed
// 		if (me.input.isKeyPressed("pause") && this.now - this.lastBuy >= 1000) {
// 			//resets timer
// 			this.lastBuy = this.now;
// 			//runs if player isnt buying anything
// 			if (!this.buying) {
// 				//runs function
// 				this.startBuying();
// 			}
// 			else{
// 				//runs function
// 				this.stopBuying();
// 			}
// 		}
// 		//runs function
// 		this.checkBuyKeys();

// 		return true;
// 	},

// 	startBuying: function(){
// 		//says player is buying
// 		this.buying = true;
// 		//pauses game
// 		me.state.pause(me.state.PLAY);
// 		//freezes everything
// 		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
// 		//displays puase screen
// 		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("pause-screen"));
// 		//updates game while paused
// 		game.data.buyscreen.updateWhenPaused = true;
// 		//makes pause screen slightly opaque
// 		game.data.buyscreen.setOpacity(0.8);
// 		//adds buys screen to world
// 		me.game.world.addChild(game.data.buyscreen, 34);
// 		//stops player from moving
// 		game.data.player.body.setVelocity(0, 0);
// 		//pauses game
// 		me.state.pause(me.state.PLAY);
// 		//binds keys for use
// 		me.input.bindKey(me.input.KEY.F1, "F1", true);
// 		me.input.bindKey(me.input.KEY.F1, "F2", true);
// 		me.input.bindKey(me.input.KEY.F1, "F3", true);
// 		me.input.bindKey(me.input.KEY.F1, "F4", true);
// 		me.input.bindKey(me.input.KEY.F1, "F5", true);
// 		me.input.bindKey(me.input.KEY.F1, "F6", true);
// 		//runs function
// 		this.setBuyText();
// 	},

// 	setBuyText: function(){
// 		game.data.buytext = new (me.Renderable.extend({
// 			init: function(){
// 				//calls super class and positions it
// 				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
// 				//sets the font to arial, the size 46, and colors it white
// 				this.font = new me.Font("ENDORALT", 80, "gold");
// 				//updates when paused
// 				this.updateWhenPaused = true;
// 				//always updates
// 				this.alwaysUpdate = true;
// 			},
// 			//function that sets up the writing
// 			draw: function(renderer){
// 				//inserts the messages and sets where writing starts
// 				this.font.draw(renderer.getContext(), "Press F1-F6 To Buy, P To Exit. Current Gold: " + game.data.gold, this.pos.x + 5, this.pos.y);
// 				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + ". Cost " + ((game.data.skill1 + 1) * 10), this.pos.x + 5, this.pos.y + 60);
// 				this.font.draw(renderer.getContext(), "Skill 2: Increase Speed. Current Level: " + game.data.skill2 + ". Cost " + ((game.data.skill2 + 1) * 10), this.pos.x + 5, this.pos.y + 120);
// 				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + ". Cost " + ((game.data.skill3 + 1) * 10), this.pos.x + 5, this.pos.y + 180);
// 				this.font.draw(renderer.getContext(), "E Ability: Speed Burst. Current Level: " + game.data.ability1 + ". Cost " + ((game.data.ability1 + 1) * 10), this.pos.x + 5, this.pos.y + 240);
// 				this.font.draw(renderer.getContext(), "R Ability: Eat Ally Creep For Health. Current Level: " + game.data.ability2 + ". Cost " + ((game.data.ability2 + 1) * 10), this.pos.x + 5, this.pos.y + 300);
// 				this.font.draw(renderer.getContext(), "F Ability: Throw Spear. Current Level: " + game.data.ability3 + ". Cost " + ((game.data.ability3 + 1) * 10), this.pos.x + 5, this.pos.y + 360);
// 			}
			
// 		}));
	
// 		me.game.world.addChild(game.data.buytext, 35);
// 	},

// 	stopBuying: function(){
// 		//says player isnt moving
// 		this.buying = false;
// 		//unpauses game
// 		me.state.resume(me.state.PLAY);
// 		//lets player move
// 		game.data.player.body.setVelocity(game.data.player.playerMoveSpeed, 20);
// 		//removes buyscreen
// 		me.game.world.removeChild(game.data.buyscreen);
// 		//unbinds keys for use
// 		me.input.unbindKey(me.input.KEY.F1, "F1", true);
// 		me.input.unbindKey(me.input.KEY.F1, "F2", true);
// 		me.input.unbindKey(me.input.KEY.F1, "F3", true);
// 		me.input.unbindKey(me.input.KEY.F1, "F4", true);
// 		me.input.unbindKey(me.input.KEY.F1, "F5", true);
// 		me.input.unbindKey(me.input.KEY.F1, "F6", true);
// 		//removes variable
// 		me.game.world.removeChild(game.data.buytext);
// 	},

// 	checkBuyKeys: function(){
// 		//runs if F1 key is pressed
// 		if (me.input.isKeyPressed("F1")){
// 			//runs function with parameter 1
// 			if (this.checkCost(1)) {
// 				//runs function with parameter 1
// 				this.makePurchase(1);
// 			}
// 		}
// 		//runs if F2 key is pressed
// 		else if (me.input.isKeyPressed("F2")){
// 			//runs function with parameter 2
// 			if (this.checkCost(2)) {
// 				//runs function with parameter 2
// 				this.makePurchase(2);
// 			}
// 		}
// 		//runs if F3 key is pressed
// 		else if (me.input.isKeyPressed("F3")){
// 			//runs function with parameter 3
// 			if (this.checkCost(3)) {
// 				//runs function with parameter 3
// 				this.makePurchase(3);
// 			}
// 		}
// 		//runs if F4 key is pressed
// 		else if (me.input.isKeyPressed("F4")){
// 			//runs function with parameter 4
// 			if (this.checkCost(4)) {
// 				//runs function with parameter 4
// 				this.makePurchase(4);
// 			}
// 		}
// 		//runs if F5 key is pressed
// 		else if (me.input.isKeyPressed("F5")){
// 			//runs function with parameter 5
// 			if (this.checkCost(5)) {
// 				//runs function with parameter 5
// 				this.makePurchase(5);
// 			}
// 		}
// 		//runs if F6 key is pressed
// 		else if (me.input.isKeyPressed("F6")){
// 			//runs function with parameter 6
// 			if (this.checkCost(6)) {
// 				//runs function with parameter 6
// 				this.makePurchase(6);
// 			}
// 		}
// 	},

// 	checkCost: function(skill){
// 		//runs if the parameter is 1 and player has enough gold saved up
// 		if (skill === 1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))) {
// 			return true;
// 		}
// 		//runs if the parameter is 2 and player has enough gold saved up
// 		else if (skill === 2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))) {
// 			return true;
// 		}
// 		//runs if the parameter is 3 and player has enough gold saved up
// 		else if (skill === 3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))) {
// 			return true;
// 		}
// 		//runs if the parameter is 4 and player has enough gold saved up
// 		else if (skill === 4 && (game.data.gold >= ((game.data.ability1 + 1) * 10))) {
// 			return true;
// 		}
// 		//runs if the parameter is 5 and player has enough gold saved up
// 		else if (skill === 5 && (game.data.gold >= ((game.data.ability2 + 1) * 10))) {
// 			return true;
// 		}
// 		//runs if the parameter is 6 and player has enough gold saved up
// 		else if (skill === 6 && (game.data.gold >= ((game.data.ability3 + 1) * 10))) {
// 			return true;
// 		}
// 		else{
// 			return false;
// 		}
// 	},

// 	makePurchase: function(skill){

// 		if (skill === 1) {
// 			//subtracts cost from gold
// 			game.data.gold -= ((game.data.skill1 + 1) * 10);
// 			//adds 1 to skill level
// 			game.data.skill1 += 1;
// 			game.data.playerAttack += 1;
// 		}
// 		else if (skill === 2) {
// 			//subtracts cost from gold
// 			game.data.gold -= ((game.data.skill2 + 1) * 10);
// 			//adds 1 to skill level
// 			game.data.skill2 += 1;
// 			game.data.playerSpeed += 1;
// 		}
// 		else if (skill === 3) {
// 			//subtracts cost from gold
// 			game.data.gold -= ((game.data.skill3 + 1) * 10);
// 			//adds 1 to skill level
// 			game.data.skill3 += 1;
// 			game.data.playerHealth +=1;
// 		}
// 		else if (skill === 4) {
// 			//subtracts cost from gold
// 			game.data.gold -= ((game.data.ability1 + 1) * 10);
// 			//adds 1 to skill level
// 			game.data.ability1 += 1;
// 		}
// 		else if (skill === 5) {
// 			//subtracts cost from gold
// 			game.data.gold -= ((game.data.ability2 + 1) * 10);
// 			//adds 1 to skill level
// 			game.data.ability2 += 1;
// 		}
// 		else if (skill === 6) {
// 			//subtracts cost from gold
// 			game.data.gold -= ((game.data.ability3 + 1) * 10);
// 			//adds 1 to skill level
// 			game.data.ability3 += 1;
// 		}
// 	}
// });


	
//class that runs all the timers and occurences that aren't inside any of the other entities


game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		//runs if player is dead
		if(game.data.player.dead){
			//takes the player off the screen
			me.game.world.removeChild(game.data.player);
			//runs the resetPlayer function
			me.state.current().resetPlayer(10, 0);

		}

		return true;
	}
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		//updates game
		this.alwaysUpdate = true;

		this.gameOver = false;
	},
	update: function(){
		//runs when you win
		if (game.data.win === true && !this.gameover) {
			//ends game with a win
			this.gameOver(true);
		}
		//runs when you win
		else if (game.data.win === false && !this.gameover) {
			//ends game with a loss
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

		//says game's over
		this.game0ver = true;
		//saves the value of the exp variable
		me.save.exp = game.data.exp;
		me.save.exp2 = 4;
	}
});

game.SpendGold = Object.extend({
	init: function(x, y, settings){
		//sets timer
		this.now = new Date().getTime();
		//keeps track of last time creep was made
		this.lastBuy = new Date().getTime();
		//says the game is not paused
		this.paused = false;
		//keeps the function updating
		this.alwaysUpdate = true;
		//updates when paused
		this.updateWhenPaused = true;
		//shows we arent buying anything at the moment
		this.buying = false;

	},

	update: function(){
		//sets timer
		this.now = new Date().getTime();
		//runs when B is pressed and the last buy was 100 miliseconds ago
		if (me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000) {
			this.lastBuy = this.now;
			if (!this.buying) {
				//runs startbuying function
				this.startBuying();
			}else{
				//runs stop buying function
				this.stopBuying();
			}

		}
		//runs function
		this.checkBuyKeys();

		return true;
	},
	//creates function to be used when buying
	startBuying: function(){
		//says we are buying at the moment
		this.buying = true;
		//pauses game
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		//brings up gold screen
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		//makes the gold screen semi see through
		game.data.buyscreen.setOpacity(0.8);
		//adds gold screen to world and sets it on top layer
		me.game.world.addChild(game.data.buyscreen, 34)
		//makes it so player cant move while buying items
		game.data.player.body.setVelocity(0, 0);
		me.state.pause(me.state.Play)
		//binds keys F1 - F6
		me.input.bindKey(me.input.KEY.F1, "F1", true);
	    me.input.bindKey(me.input.KEY.F2, "F2", true);
	    me.input.bindKey(me.input.KEY.F3, "F3", true);
	    me.input.bindKey(me.input.KEY.F4, "F4", true);
	    me.input.bindKey(me.input.KEY.F5, "F5", true);
	    me.input.bindKey(me.input.KEY.F6, "F6", true);
	    this.setBuyText();
	},

	setBuyText: function(){
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class 
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("flame", 26, "red");
			
	},
	setBuyText: function(){
		game.data.buytext = new (me.Renderable.extend({
			init: function(){
				//calls super class and positions it
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("halfelven", 36, "gold");
				//updates when paused
				this.updateWhenPaused = true;
				//always updates
				this.alwaysUpdate = true;
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts the message "Press f1-f4 to buy, f5 to skip" and sets where writing starts
				this.font.draw(renderer.getContext(), "Press F1-F6 To Buy, P To Exit. Current Gold: " + game.data.gold, this.pos.x + 5, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + ". Cost " + ((game.data.skill1 + 1) * 10), this.pos.x + 5, this.pos.y + 60);
				this.font.draw(renderer.getContext(), "Skill 2: Increase Speed. Current Level: " + game.data.skill2 + ". Cost " + ((game.data.skill2 + 1) * 10), this.pos.x + 5, this.pos.y + 120);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + ". Cost " + ((game.data.skill3 + 1) * 10), this.pos.x + 5, this.pos.y + 180);
				this.font.draw(renderer.getContext(), "J Ability: Speed Burst. Current Level: " + game.data.ability1 + ". Cost " + ((game.data.ability1 + 1) * 10), this.pos.x + 5, this.pos.y + 240);
				this.font.draw(renderer.getContext(), "K Ability: Eat Ally Creep For Health. Current Level: " + game.data.ability2 + ". Cost " + ((game.data.ability2 + 1) * 10), this.pos.x + 5, this.pos.y + 300);
				this.font.draw(renderer.getContext(), "L Ability: Throw Spear. Current Level: " + game.data.ability3 + ". Cost " + ((game.data.ability3 + 1) * 10), this.pos.x + 5, this.pos.y + 360);
			}
			
		}));
	
	me.game.world.addChild(game.data.buytext, 35);
	},

	//creates function to be used to stop buying
	stopBuying: function(){
		//says we are not buying at the moment
		this.buying = false;
		//unpauses game
		me.state.resume(me.state.PLAY);
		//allows player to move again after buying
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		//removes gold screen once user is done
		me.game.world.removeChild(game.data.buyscreen);
        //unbinds keys F1 - F6
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
	    me.input.unbindKey(me.input.KEY.F2, "F2", true);
	    me.input.unbindKey(me.input.KEY.F3, "F3", true);
	    me.input.unbindKey(me.input.KEY.F4, "F4", true);
	    me.input.unbindKey(me.input.KEY.F5, "F5", true);
	    me.input.unbindKey(me.input.KEY.F6, "F6", true);
	
	    me.game.world.removeChild(game.data.buytext);
	},

	checkBuyKeys: function(){
		//runs if F1 key is pressed
		if (me.input.isKeyPressed("F1")){
			//runs function with parameter 1
			if (this.checkCost(1)) {
				//runs function with parameter 1
				this.makePurchase(1);
			}
		}
		//runs if F2 key is pressed
		else if (me.input.isKeyPressed("F2")){
			//runs function with parameter 2
			if (this.checkCost(2)) {
				//runs function with parameter 2
				this.makePurchase(2);
			}
		}
		//runs if F3 key is pressed
		else if (me.input.isKeyPressed("F3")){
			//runs function with parameter 3
			if (this.checkCost(3)) {
				//runs function with parameter 3
				this.makePurchase(3);
			}
		}
		//runs if F4 key is pressed
		else if (me.input.isKeyPressed("F4")){
			//runs function with parameter 4
			if (this.checkCost(4)) {
				//runs function with parameter 4
				this.makePurchase(4);
			}
		}
		//runs if F5 key is pressed
		else if (me.input.isKeyPressed("F5")){
			//runs function with parameter 5
			if (this.checkCost(5)) {
				//runs function with parameter 5
				this.makePurchase(5);
			}
		}
		//runs if F6 key is pressed
		else if (me.input.isKeyPressed("F6")){
			//runs function with parameter 6
			if (this.checkCost(6)) {
				//runs function with parameter 6
				this.makePurchase(6);
			}
		}
	},

	checkCost: function(skill){
		//runs if the parameter is 1 and player has enough gold saved up
		if (skill === 1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))) {
			return true;
		}
		//runs if the parameter is 2 and player has enough gold saved up
		else if (skill === 2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))) {
			return true;
		}
		//runs if the parameter is 3 and player has enough gold saved up
		else if (skill === 3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))) {
			return true;
		}
		//runs if the parameter is 4 and player has enough gold saved up
		else if (skill === 4 && (game.data.gold >= ((game.data.ability1 + 1) * 10))) {
			return true;
		}
		//runs if the parameter is 5 and player has enough gold saved up
		else if (skill === 5 && (game.data.gold >= ((game.data.ability2 + 1) * 10))) {
			return true;
		}
		//runs if the parameter is 6 and player has enough gold saved up
		else if (skill === 6 && (game.data.gold >= ((game.data.ability3 + 1) * 10))) {
			return true;
		}
		else{
			return false;
		}
	},

	makePurchase: function(skill){

		if (skill === 1) {
			//subtracts cost from gold
			game.data.gold -= ((game.data.skill1 + 1) * 10);
			//adds 1 to skill level
			game.data.skill1 += 1;
			game.data.playerAttack += 1;
		}
		else if (skill === 2) {
			//subtracts cost from gold
			game.data.gold -= ((game.data.skill2 + 1) * 10);
			//adds 1 to skill level
			game.data.skill2 += 1;
		}
		else if (skill === 3) {
			//subtracts cost from gold
			game.data.gold -= ((game.data.skill3 + 1) * 10);
			//adds 1 to skill level
			game.data.skill3 += 1;
		}
		else if (skill === 4) {
			//subtracts cost from gold
			game.data.gold -= ((game.data.ability1 + 1) * 10);
			//adds 1 to skill level
			game.data.ability1 += 1;
		}
		else if (skill === 5) {
			//subtracts cost from gold
			game.data.gold -= ((game.data.ability2 + 1) * 10);
			//adds 1 to skill level
			game.data.ability2 += 1;
		}
		else if (skill === 6) {
			//subtracts cost from gold
			game.data.gold -= ((game.data.ability3 + 1) * 10);
			//adds 1 to skill level
			game.data.ability3 += 1;
		}
	}
});

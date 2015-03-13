//class that runs all the timers and occurences that aren't inside any of the other entities
game.GameTimerManager = Object.extend({
	//constructor function
	init: function(x, y, settings){
		//sets timer
		this.now = new Date().getTime();
		//keeps track of last time creep was made
		this.lastCreep = new Date().getTime();
		//says the game is not paused
		this.paused = false;
		//keeps the function updating
		this.alwaysUpdate = true;
	},

	update: function(){
		//keeps track of timer
		this.now = new Date().getTime();
		
		this.goldTimerCheck();
		this.creepTimerCheck();
},
		

	goldTimerCheck: function(){
		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += (game.data.exp1 + 1);
			console.log("Current gold: " + game.data.gold);
		}
	},

	creepTimerCheck: function(){
		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
			//updates timer
			this.lastCreep = this.now;
			//creates and inserts creeps into world
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			var creepf = me.pool.pull("FriendCreep", 0, 0, {});
			//adds the creeps to the world
			me.game.world.addChild(creepe, 5);
			me.game.world.addChild(creepf, 5);
		} 
	}
});


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
		game.data.buyscreen = new me.Sprite(game.data.PausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.buyscreen.updateWhenPaused = true;
		//makes the gold screen semi see through
		game.data.buyscreen.setOpacity(0.8);
		//adds gold screen to world and sets it on top layer
		me.game.world.addChild(game.data.buyscreen, 34)
		//makes it so player cant move while buying items
		game.data.player.body.setVelocity(0, 0);
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
	}
});
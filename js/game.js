/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		enemyBaseHealth : 10,
		playerBaseHealth: 10,
		enemyCreepHealth: 10,
		playerHealth: 10,
		friendCreepHealth: 10,
		enemyCreepAttack: 1,
		friendCreepAttack: 1,
		playerAttack: 1,
		playerAttackTimer: 1000,
		creepAttackTimer: 1000,
		playerMoveSpeed: 8,
		creepMoveSpeed: 5,
		gameManager: "",
		heroDeathManager: "",
		player: "",
		exp: 0,
		gold: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	//sets the height and width of the screen
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	//creates a place to save these 5 variables
	me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});
	
	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		//adds player to pool
		me.pool.register("player", game.PlayerEntity, true);
		//adds player base to pool
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		//adds enemy base to pool
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		//adds enemy creep to pool
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		//adds friend creep to pool
		me.pool.register("FriendCreep", game.FriendCreep, true);
		//registers GameTimerManager
		me.pool.register("GameTimerManager", game.GameTimerManager);
		//registers HeroDeathManager
		me.pool.register("HeroDethManager", game.HeroDeathManager);
		//registers ExperienceManager
		me.pool.register("ExperienceManager", game.experienceManager);
		
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Game starts with the title screen
		me.state.change(me.state.MENU);
	}
};
game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;


		//loads level
		me.levelDirector.loadLevel("level01");
		//calls the resetPlayer function with the parameters 0 and 420
		this.resetPlayer(0, 420);
		//adds gameTimermanager to world
		var gameTimerManager = me.pool.pull("GameTimerManager", 0 , 0, {});
		//puts gameTimermanager into world
		me.game.world.addChild(gameTimerManager, 0);

		//adds HeroDeathmanager to world
		var HeroDeathManager = me.pool.pull("HeroDeathManager", 0 , 0, {});
		//puts HeroDeathmanager into world
		me.game.world.addChild(HeroDeathManager, 0);

		//adds Experiencemanager to world
		var heroDeathManager = me.pool.pull("ExperienceManager", 0 , 0, {});
		//puts Experiencemanager into world
		me.game.world.addChild(ExperienceManager, 0);

		//Makes the right key into a variable
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//makes the right key into a variable
		me.input.bindKey(me.input.KEY.LEFT, "left");
		//makes the up key into a variable
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		//makes an attack key
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	//adds player to map
	resetPlayer: function(x, y){
		//pulls the player entity from the pool
		game.data.player = me.pool.pull("player", x, y, {});
		//adds him to the game and sets his layer-level
		me.game.world.addChild(game.data.player, 5);
	}
});
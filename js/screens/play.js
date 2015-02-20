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
		//adds gamemanager to world
		var gamemanager = me.pool.pull("GameManager", 0 , 0, {});
		//puts gamemanager into world
		me.game.world.addChild(gamemanager, 0);
		//makes the D key into a variable
		me.input.bindKey(me.input.KEY.D, "right");
		//makes the A key into a variable
		me.input.bindKey(me.input.KEY.A, "left");
		//makes the W key into a variable
		me.input.bindKey(me.input.KEY.W, "jump");
		//makes an attack key
		me.input.bindKey(me.input.KEY.SHIFT, "attack");
		//Makes the right key into a variable
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//makes the right key into a variable
		me.input.bindKey(me.input.KEY.LEFT, "left");
		//makes the up key into a variable
		me.input.bindKey(me.input.KEY.UP, "jump");
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
//manages hero death
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
		//runs if player is dead
		if(game.data.EnemyHero.dead){
			//takes the player off the screen
			me.game.world.removeChild(game.data.EnemyHero);
			//runs the resetPlayer function
			me.state.current().resetEnemyHero(10, 0);

		}

		return true;
	}
});
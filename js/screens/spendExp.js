game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//inserts the title-screen image into the map
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class 
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("flame", 46, "red");
			
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "Press F1-F4 to buy, F5 to skip", this.pos.x, this.pos.y);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "Current Exp: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F1: Increase Gold Production" + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 100);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F2: Add Starting Gold " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 150);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F3: Increase Attack Damage " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 200);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F4: Increase Starting Health " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 250);
			},


		})));


	},		//for continued game

	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});
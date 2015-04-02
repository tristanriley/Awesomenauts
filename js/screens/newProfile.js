game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//inserts the exp-screen image into the map
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); 
		//makes the elements with followind ids visible
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";
		//binds keys
		me.input.unbindKey(me.input.KEY.D);
		me.input.unbindKey(me.input.KEY.A);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.V);
		me.input.unbindKey(me.input.KEY.P);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.R);
		me.input.unbindKey(me.input.KEY.F);

		//for new game
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class and positions it
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("arial", 33, "red");
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts the message "Press f1-f4 to buy, f5 to skip" and sets where writing starts
				this.font.draw(renderer.getContext(), "Pick A Username and a Password", this.pos.x, this.pos.y);
			}
			
		})));
		
	
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//makes invisble again
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register").style.visibility = "hidden";
	}

});
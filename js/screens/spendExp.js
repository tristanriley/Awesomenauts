game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//inserts the title-screen image into the map
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class 
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("flame", 26, "red");
			
	},
			//function that sets up the writing
			draw: function(renderer){
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "Press F1-F4 to buy, F5 to skip", this.pos.x, this.pos.y);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "Current Exp: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F1: Increase Gold Production, Current Level: " + game.data.exp1.toString() + ", Cost: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F2: Add Starting Gold, Current Level: " + game.data.exp2.toString() + ", Cost: " + ((game.data.exp2 + 1) * 10), this.pos.x, this.pos.y + 150);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F3: Increase Attack Damage, Current Level: " + game.data.exp3.toString() + ", Cost: " + ((game.data.exp3 + 1) * 10), this.pos.x, this.pos.y + 200);
				//inserts text and sets where writing starts
				this.font.draw(renderer.getContext(), "F4: Increase Starting Health, Current Level: " + game.data.exp4.toString() + ", Cost: " + ((game.data.exp4 + 1) * 10), this.pos.x, this.pos.y + 250);
			}


		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			if(action === "F1"){

			}else if(action === "F2"){

			}else if(action === "F3"){
				
			}else if(action === "F4"){
				
			}else if(action === "F5"){
				me.state.change(me.state.PLAY);
			}
		});

	},		

	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.F1, "F1");
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.F5, "F5");
		me.event.unsubscribe(this.handler);
		
	}
});
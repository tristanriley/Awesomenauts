game.MiniMap = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "minimap", //gets minimap img for entity
			width: 421, //width of minimap entity
			height: 136, //height of minimap entity
			spritewidth: "421", //same as width
			spriteheight: "136", //same as height
			getShape: function() {
				return (new me.Rect(0, 0, 384, 122)).toPolygon();
			}
			//tells to make shape
		}]);
		//super class hold info for minimap entity

		this.floating = true;
		//causes minimap to move w/ player
	}
});
//basic entity setup for minimap
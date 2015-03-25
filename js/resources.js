game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	//loads the background tiles from the data folder, allowing it to display them on the map
	{name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	//loads the background tiles from the data folder, allowing it to display them on the map
	{name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	//loads the orc player from the data folder, allowing it to display it on the map
	{name: "player", type:"image", src: "data/img/orcSpear.png"},
	//loads the tower entity from the data folder, allowing it to display it on the map
	{name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	//loads the brainmonster entity from the data folder, allowing it to display it on the map
	{name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	//loads the oneeye entity from the data folder, allowing it to display it on the map
	{name: "creep2", type:"image", src: "data/img/gloop.png"},
	//loads the title-screen image from the data folder, allowing it to display it on the map
	{name: "title-screen", type:"image", src: "data/img/ironclad.jpg"},
	//loads experience screen as resource
	{name: "exp-screen", type:"image", src: "data/img/loadpic.png"},
	//loads gold screen as resource
	{name: "gold-screen", type:"image", src: "data/img/spend.png"},

	//{name: "gold-screen", type:"image", src: "data/img/shop.jpg"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */

 	//loads the map from the map folder and dislplays it
 	{name: "level01", type: "tmx", src: "data/map/test.tmx"},


	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
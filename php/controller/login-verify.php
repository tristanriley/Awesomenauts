<?php

	require_once(__DIR__ . "/../model/config.php");
	//determines whether or not the user is logged in or not
	function authenticateUser(){
		//checks whether or not the session variable has already been set
		if (!isset($_SESSION["authenticated"])) {
			return false;
		}
		//checks if the session variable has what i'm looking for
		else{
			//checks if the session variable has been set to true
			if ($_SESSION["authenticated"] != true) {
				return false;
			}
			else{
				return true;
			}
		}
	}

?>
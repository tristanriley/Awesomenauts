<?php
	require_once(__DIR__ . "/../model/config.php");
	//gets rid of authenticated log in
	unset($_SESSION["authenticated"]);
	//destroys session
	session_destroy();
	//redirects user to home.php
	header("Location: " . $path . "home.php");



		<?php
			require_once(__DIR__ . "/../model/config.php");
			//store username, and password into the database
			$username = filter_input(INPUT_POST, "username" , FILTER_SANITIZE_STRING);
			$password = filter_input(INPUT_POST, "password" , FILTER_SANITIZE_STRING);
			//creates the salt, which adds a bunch of random integers and letters to my password, making it harder to guess
			$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
			//combines the password and the salt to make an encrypted password
			$hashedPassword = crypt($password, $salt);
			//a query that inserts into the users' table
			$query = $_SESSION["connection"]->query("INSERT INTO users SET "
				//sets username
				. "username = '$username', "
				//sets password
				. "password = '$hashedPassword', "
				//sets salt
				. "salt = '$salt', "
				. "exp = 0, "
				. "exp1 = 0, "
				. "exp2 = 0, "
				. "exp3 = 0, "
				. "exp4 = 0");
			$_SESSION["name"] = $username;
			//checks to see if the query is working
			if ($query) {
				//needs for ajax
				echo "True";
			}
			//if the query isnt working, says why not
			else{
				echo "<p>" . $_SESSION["connection"]->error . "</p>";
			}
		?>
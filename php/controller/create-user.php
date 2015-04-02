<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../css/create.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-theme.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-theme.css.map">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.css.map">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
		<meta name="viewport" content="width=device-width">
		<meta name="viewport" content="width=320">
		<meta charset="UTF-8">
		<title>Blogs</title>
	</head>

	<header>
		<h1>CONGRATULATIONS!</h1>
	</header>

	<body>

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

		<div class="links">
			<ul>
				<button type="button" class="btn btn-default btn-lg link">
					<a href="<?php echo $path . "home.php"?>"><span class="glyphicon glyphicon-home "></span></p> Home </a>
				</button>
			</ul>
		</div>
	</body>
</html>
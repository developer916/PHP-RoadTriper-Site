<?php
	session_start();
	if( isset($_SESSION['UA_ADMIN_ADMIN']) && $_SESSION['UA_ADMIN_ADMIN'] == "Y" ){
		echo "<script>window.location.href='main.php';</script>";
		exit();
	}else{
		echo "<script>window.location.href='login.php';</script>";
		exit();
	}
?>
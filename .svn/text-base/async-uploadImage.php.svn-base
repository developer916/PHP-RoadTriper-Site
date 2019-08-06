<?php
session_start();
require_once("./common/DB_Connection.php");
require_once("./common/functions.php");
require_once("./common/dataLog.php");
require_once("./common/simpleImage.php");
$uploadType = $_POST['uploadType'];

if( $uploadType == "category")
	$imageSize = 1000;
else if( $uploadType == "profile" )
	$imageSize = 1000;
else if( $uploadType == "location" )
	$imageSize = 1000;
else if( $uploadType == "blog" )
	$imageSize = 1000;
else
	$imageSize = 1000;

$path = "img/".$uploadType."/";

$valid_formats = array("jpg", "png", "gif", "bmp","jpeg");
if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST"){
	$name = $_FILES['imageUpload']['name'];
	$size = $_FILES['imageUpload']['size'];
	if(strlen($name))
	{
		list($txt, $ext) = explode(".", $name);
		if(in_array($ext,$valid_formats))
		{
			if( $size<( $imageSize * ($imageSize * 0.8) ) ) // Image size max 1 MB
			{
				$actual_image_name = UA_generateRandom(10)."_".time().".".$ext;
				$tmp = $_FILES['imageUpload']['tmp_name'];
				$image = new SimpleImage();
				$image->load( $tmp );
				$imgWidth = $image->getWidth();
				$imgHeight = $image->getHeight();
				
				/* if( $uploadType == "location" || $uploadType == "blog" || $uploadType == "news" || $uploadType == "eye" ){
					$imgNewHeight = ( 800 / $imgWidth ) * $imgHeight;
					$imgNewWidth = 800;
					$image->resize( $imgNewWidth, $imgNewHeight );
					$image->save( $path.$actual_image_name );
					echo "<img style='width: 100%; height: 100%;' src='/".$path.$actual_image_name."'>";
				}else{ */
					if(move_uploaded_file($tmp, $path.$actual_image_name))
						echo "<img src='/".$path.$actual_image_name."'>";
					else
						echo "failed";					
				// }				

				if( $uploadType == "location" || $uploadType == "news" || $uploadType == "eye" ){
					$image = new SimpleImage();
					$image->load( $path.$actual_image_name );
					$image->resize( 75, 50 );
					$image->save( $path."small/".$actual_image_name );					
				}

			}
			else
				echo "Image file size max 1 MB"; 
		}
		else
			echo "Invalid file format.."; 
	}
	else
		echo "Please select image..!";
	exit;
}
?>
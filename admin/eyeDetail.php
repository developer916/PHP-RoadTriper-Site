<?php session_start();?>
<!DOCTYPE html>
<!--[if IE 8]><html lang="en" id="ie8" class="lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]><html lang="en" id="ie9" class="gt-ie8 lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!-->
<html lang="en"> <!--<![endif]-->
<head>
	<?php require("../common/config.php"); ?>    
    <?php require("../common/DB_Connection.php"); ?>
    <?php require("../common/functions.php"); ?>
    <?php require("../common/header.php"); ?>
    <?php require("../common/dataLog.php"); ?>
    <?php UA_isAdmin();?>
    <?php 
    	$pageType = "14";
    	UA_isPermission( $pageType );
    	$sql = "select * from ua_eye_category";
    	$eyeCategoryContent = $db->queryArray($sql);
    	
    	if( isset($_GET['id']) ){
			$eyeLocationId = $_GET['id'];
			$sql = "select * from ua_location where ua_location = '$eyeLocationId'";
			$dataEye = $db->queryArray( $sql );
			$dataEye = $dataEye[0];
		}else{
			$eyeLocationId = "";
	
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
     <script src="/texteditor/scripts/innovaeditor.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/innovamanager.js" type="text/javascript"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/common/webfont.js" type="text/javascript"></script>   
	
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&language=<?php echo UA_getCode("CD009");?>&sensor=false&libraries=places"></script>
    <script src="/js/admin/eyeDetail.js"></script>        
        
    
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Eye Detail");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type="hidden" id="userId" value="<?php echo $_SESSION['UA_ADMIN_USER']?>">
				<input type = "hidden" id="eyeLocationId" value="<?php echo $eyeLocationId?>" />
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="width:105px;"><?php echo _lang("Eye Title");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" style="width:620px;" id="eyeTitle" placeholder="Eye Title" value="<?php echo $dataEye['ua_location_title']?>"></div>
				</div>
				<div class="control-group" style="display:block;">
				     <label class="control-label" style="width:105px;"><?php echo _lang("Eye Category");?><span class="required">*</span></label>
					<div class="controls" style="margin-left:20px;float:left;">
					    <select id="choiceEyeCategory">
					    	<option value="">Please select</option>
					    <?php 
						    for($i = 0 ; $i < count($eyeCategoryContent) ; $i ++)
						   	{
								echo "<option value='".$eyeCategoryContent[$i]['ua_eye_category']."'";
								if( $dataEye['ua_eye_category'] == $eyeCategoryContent[$i]['ua_eye_category'] )
									echo " selected";
								echo ">".$eyeCategoryContent[$i]['ua_title']."</option>";
						    }
					    ?>
						</select>
					</div>				    
				</div>
				<div class="map">
					<div class="eyeMapPanel">					
				  		<div id="eyePartMap-Canvas"></div>		
					</div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="width:105px;"><?php echo _lang("Eye Address");?></label>
				    <div class="controls" style="margin-left:20px;float:left;">
				    	<textarea id="eyeStreetAddress" placeholder="Eye Address"><?php echo $dataEye['ua_location_street_address']?></textarea>
				    	<button class="btn btn-success btn-mini" onclick="onFindOnMap()">Find<br>On Map</button>
				    </div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="width:105px;"><?php echo _lang("Eye Video");?></label>
				    <div class="controls" style="margin-left:20px;float:left;">
				    	<textarea id="eyeVideo" placeholder="Eye Video" rows="4"><?php echo $dataEye['ua_eye_video']?></textarea>
				    </div>
				</div>
				<div class="control-group hide">
				    <label class="control-label" style="width:105px;"><?php echo _lang("Eye Lat");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="eyeLat" placeholder="Eye Lat" value="<?php echo $dataEye['ua_location_lat']?>"></div>
				</div>
				<div class="control-group hide">
				    <label class="control-label" style="width:105px;"><?php echo _lang("Eye Lon");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="eyeLon" placeholder="Eye Lon" value="<?php echo $dataEye['ua_location_lon']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="width:105px;"><?php echo _lang("Eye Keywords");?></label>
				    <div class="controls" style="margin-left:20px;float:left;">
				    	<textarea id="eyeKeyWords" placeholder="Eye Keywords"><?php echo $dataEye['ua_keywords']?></textarea>
				    </div>
				</div>			
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="width:105px;"><?php echo _lang("Eye Image");?><span class="required">*</span></label>
				    <div class="controls"  style="margin-left:20px;float:left;">
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="eye">
							<input type="hidden" id="imagePrevDiv" value="previewEyeImage">
							<div id="previewEyeImage" class="previewMultiImage">
								<div class="img-wrap">
									<img src="<?php echo $dataEye['ua_location_photo']?>" />
									<div class="close-button"></div>
								</div>
								<?php
									$sql = "SELECT * FROM ua_location_photo WHERE ua_location = $eyeLocationId";
									$locationPhoto = $db->queryArray($sql);
									foreach ($locationPhoto as $key => $value) {
								?>
									<div class="img-wrap">
										<img src="<?php echo $value['ua_photo'];?>" />
										<div class="close-button"></div>
									</div>	
								<?php		
									}
								?>
							</div>
						</form>				    	
				    </div>
				</div>

				<div class="control-group" style="display:block;">
				    <label class="control-label" style="padding-top:12px;width:105px;"><?php echo _lang("Eye Content");?></label>	
				    <div class="controls" style="width:730px;margin-left:20px;float:left;">
				       	<input type="hidden" id="getEyeContent" value='<?php echo $dataEye['ua_location_description']?>'>
				    	<textarea rows="10" cols="100"  id="eyeContent" placeholder="Eye Content" ><?php echo $dataEye['ua_location_description']?></textarea>
				    </div>
				</div>
							
				<div style="text-align:center;margin-top:2%;">
					<a href="#" onclick="onEyeSave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="eyeList.php" class="btn btn-danger"><?php echo _lang("List"); ?></a>				
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>
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
    	
    	$pageType = "4";
    	UA_isPermission( $pageType );
    	if( isset($_GET['id']) ){
			$locationId = $_GET['id'];
			
			$sql = "select t1.*, t2.ua_place_category from ua_location t1, ua_place_subcategory t2 where t1.ua_location = $locationId and t1.ua_place_subcategory = t2.ua_place_subcategory";
			$dataLocation = $db->queryArray( $sql );
			$dataLocation = $dataLocation[0];

		}else{
			$locationId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&language=<?php echo UA_getCode("CD009");?>&sensor=false&libraries=places"></script>
    
    <script src="/js/admin/locationDetail.js"> </script>     
    
    <script src="/texteditor/scripts/innovaeditor.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/innovamanager.js" type="text/javascript"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/common/webfont.js" type="text/javascript"></script>   
	       
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Location Detail");?></h3>
			<div id="divContent" class="form-horizontal">
			<input type="hidden" id="userId" value="<?php echo $_SESSION['UA_ADMIN_USER']?>">
			<input type="hidden" id="locationId" value="<?php echo $locationId?>" />
			<input type="hidden" id="locationInfo"  value="<?php echo $dataLocation['ua_location_info']?>">				
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location Title");?><span class="required">*</span></label>
				    <div class="controls"><input type="text" id="locationTitle" placeholder="Location Title" value="<?php echo $dataLocation['ua_location_title']?>"></div>
				</div>
				<div class="map">
				    <div id="partmap-Canvas" style="height: 750px;"></div>
					<div class="control-group">
					    <label class="control-label"><?php echo _lang("Location Subtitle");?></label>
					    <div class="controls"><input type="text" id="locationSubtitle" placeholder="Location Subtitle" value="<?php echo $dataLocation['ua_location_subtitle']?>"></div>
					</div>				    
					<div class="control-group" >
					    <label class="control-label"><?php echo _lang("Location Address");?></label>
					    <div class="controls">
					    	<textarea id="locationStreetAddress" placeholder="Street Address"><?php echo $dataLocation['ua_location_street_address']?></textarea>
					    	<button class="btn btn-success btn-mini" onclick="onFindOnMap()">Find<br>On Map</button>
					    </div>
					</div>				    
					<div class="control-group hide">
					    <label class="control-label"><?php echo _lang("Location Lat");?><span class="required">*</span></label>
					    <div class="controls"><input type="text" id="locationLat" placeholder="location Lat" value="<?php echo $dataLocation['ua_location_lat']?>"></div>
					</div>

				</div>
				<div class="control-group hide" >
				    <label class="control-label"><?php echo _lang("Location Lon");?><span class="required">*</span></label>
				    <div class="controls"><input type="text" id="locationLon" placeholder="Location Lon" value="<?php echo $dataLocation['ua_location_lon']?>"></div>
				</div>
				<div class="control-group" style="margin-top: 12px;">
					<label class="control-label"><?php echo _lang("Location Category");?><span class="required">*</span></label>
					<div class="controls">
						<select id="locationCategory" onchange="onChangeLocationCategory( this )">
							<option value="">Please select category.</option>
						    <?php
						    	$sql = "select * from ua_place_category order by ua_name";
						    	$categoryList = $db->queryArray( $sql );
							    for( $i = 0 ; $i < count( $categoryList ) ; $i ++ )
							   	{
									echo "<option value='".$categoryList[$i]['ua_place_category']."'";
									if( $dataLocation['ua_place_category'] == $categoryList[$i]['ua_place_category'] )
										echo " selected";
									echo ">".$categoryList[$i]['ua_name']."</option>";
							    }
						    ?>							
						</select>
					</div>
				</div>
				<div class="control-group" style="margin-top: 12px;">
				    <label class="control-label"><?php echo _lang("Location Sub Category");?><span class="required">*</span></label>
				    <div class="controls">
					    <select id="locationSubCategory">
					    	<option value="">Please select category.</option>
						    <?php
						    	$sql = "select * from ua_place_subcategory where ua_place_category = '".$dataLocation['ua_place_category']."' order by ua_name";
						    	$subCategoryList = $db->queryArray( $sql );
							    for( $i = 0 ; $i < count( $subCategoryList ) ; $i ++ )
							   	{
									echo "<option value='".$subCategoryList[$i]['ua_place_subcategory']."'";
									if( $dataLocation['ua_place_subcategory'] == $subCategoryList[$i]['ua_place_subcategory'] )
										echo " selected";
									echo ">".$subCategoryList[$i]['ua_name']."</option>";
							    }
						    ?>
						</select>
				    </div>
				</div>				
				<div class="control-group" >
				    <label class="control-label"><?php echo _lang("Location City");?></label>
				    <div class="controls"><input type="text" id="locationCity" placeholder="Location City" value="<?php echo $dataLocation['ua_location_city']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location Zipcode");?></label>
				    <div class="controls"><input type="text" id="locationZip" placeholder="Location Zip" value="<?php echo $dataLocation['ua_location_zip']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location Country");?></label>
				    <div class="controls"><input type="text" id="locationCountry" placeholder="Location Country" value="<?php echo $dataLocation['ua_location_country']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location State");?></label>
				    <div class="controls"><input type="text" id="locationState" placeholder="Location State" value="<?php echo $dataLocation['ua_location_state']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location Phone");?></label>
				    <div class="controls"><input type="text" id="locationPhone" placeholder="Location Phone" value="<?php echo $dataLocation['ua_location_phone']?>"></div>
				</div>				
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location Email");?></label>
				    <div class="controls"><input type="text" id="locationEmail" placeholder="Location Email" value="<?php echo $dataLocation['ua_location_email']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location Websites");?></label>
				    <div class="controls"><input type="text" id="locationWebsite" placeholder="Location Website" value="<?php echo $dataLocation['ua_location_website']?>"></div>
				</div>					
				<div class="control-group">
				    <label class="control-label" style="margin-top:25px;"><?php echo _lang("Location Image");?><span class="required">*</span></label>
				    <div class="controls">
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="location">
							<input type="hidden" id="imagePrevDiv" value="previewLocationImage">
							<div id="previewLocationImage" class="previewMultiImage">
							 <?php if ($dataLocation != null) {?>
								<div class="img-wrap">
									<img src="<?php echo $dataLocation['ua_location_photo']?>" />
									<div class="close-button"></div>
								</div>
								<?php }?>
								<?php
									$sql = "SELECT * FROM ua_location_photo WHERE ua_location = $locationId";
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
		
	
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Keywords");?></label>
				    <div class="controls"><input type="text" id="locationKeyWords" placeholder="Keywords" value="<?php echo $dataLocation['ua_keywords']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label">Paid</label>
				    <div class="controls">
				    	<select id="locationPaid">
				    		<option value="Y" <?php if($dataLocation['ua_valid_yn'] == "Y") echo "selected";?>>Yes</option>
				    		<option value="N" <?php if($dataLocation['ua_valid_yn'] == "N") echo "selected";?>>No</option>
				    	</select>
				    </div>
				</div>							
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Location Description");?></label>
				    <input type="hidden" id="getLocationDescription" value='<?php echo $dataLocation['ua_location_description']?>'>
				    <div class="controls"><textarea rows="6" style="width:380px" id="locationDescription" placeholder="Location Description"><?php echo $dataLocation['ua_location_description']?></textarea></div>
				</div>
				
				<div style="margin-left: 230px;">
					<a href="#" onclick="onLocationSave()" class="btn btn-primary"><?php echo _lang("Save");?></a>&nbsp;&nbsp;&nbsp;
					<a href="locationList.php" class="btn btn-danger"><?php echo _lang("List");?></a>				
				</div>
			</div>
		</div>
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>
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
    	$pageType = "11";
    	UA_isPermission( $pageType );
    	$sql1 = "select * from ua_news_category ";
    	$newsCategoryContent = $db->queryArray($sql1);
    	
    	if( isset($_GET['id']) ){
			
			$newsLocationId = $_GET['id'];
			$sql = "select * from ua_location where ua_location = '$newsLocationId'";
			$dataNews = $db->queryArray( $sql );
			$dataNews = $dataNews[0];
		
			
		}else{
			$newsLocationId = "";
	
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
    <script src="/js/admin/newsDetail.js"></script>        
        
    
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("News Detail");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type="hidden" id="userId" value="<?php echo $_SESSION['UA_ADMIN_USER']?>">
				<input type = "hidden" id="newsLocationId" value="<?php echo $newsLocationId?>" />
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Title");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" style="width:620px;" id="newsTitle" placeholder="News Title" value="<?php echo $dataNews['ua_location_title']?>"></div>
				</div>
				<div class="control-group" style="display:block;">
				     <label class="control-label" style="width:105px;"><?php echo _lang("News Category");?><span class="required">*</span></label>
					<div class="controls" style="margin-left:20px;float:left;">
					    <select id="choiceNewsCategory">
					    	<option value="">Please select</option>
					    <?php 
						    for($i = 0 ; $i < count($newsCategoryContent) ; $i ++)
						   	{
								echo "<option value='".$newsCategoryContent[$i]['ua_news_category']."'";
								if( $dataNews['ua_news_category'] == $newsCategoryContent[$i]['ua_news_category'] )
									echo " selected";
								echo ">".$newsCategoryContent[$i]['ua_title']."</option>";
						    }
					    ?>
						</select>
					</div>				    
				</div>
				<div class="map">
					<div class="newsMapPanel">					
				  		<div id="newsPartMap-Canvas"></div>		
					</div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Address");?></label>
				    <div class="controls" style="margin-left:20px;float:left;">
				    	<textarea id="newsStreetAddress" placeholder="News Address"><?php echo $dataNews['ua_location_street_address']?></textarea>
				    	<button class="btn btn-success btn-mini" onclick="onFindOnMap()">Find<br>On Map</button>
				    </div>
				</div>					
				<div class="control-group hide">
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Lat");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsLat" onkeydown="onLatKeydown(event)" placeholder="News Lat" value="<?php echo $dataNews['ua_location_lat']?>"></div>
				</div>
				<div class="control-group hide">
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Lon");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsLon" onkeydown="onLonKeydown(event)" placeholder="News Lon" value="<?php echo $dataNews['ua_location_lon']?>"></div>
				</div>
				<div class="control-group" >
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Region");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsRegion" placeholder="News Region" value="<?php echo $dataNews['ua_news_region']?>"></div>
				</div>
				<div class="control-group" >
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Who");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsWho" placeholder="News Who" value="<?php echo $dataNews['ua_news_who']?>"></div>
				</div>
				<div class="control-group" >
				    <label class="control-label" style="width:105px;"><?php echo _lang("News What");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsWhat" placeholder="News What" value="<?php echo $dataNews['ua_news_what']?>"></div>
				</div>
				<div class="control-group" >
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Where");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text"  id="newsWhere" placeholder="News Where" value="<?php echo $dataNews['ua_news_where']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="width:105px;"><?php echo _lang("News When");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsWhen" placeholder="News When" value="<?php echo $dataNews['ua_news_when']?>"></div>
				</div>
				<div class="control-group" >
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Bda");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsBds" placeholder="News Bda" value="<?php echo $dataNews['ua_news_bda']?>"></div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="width:105px;margin-top:-9px;"><?php echo _lang("News Action Taken");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsActionTaken" placeholder="News Action Taken" value="<?php echo $dataNews['ua_news_action_taken']?>"></div>
				</div>					
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="width:105px;"><?php echo _lang("News Image");?><span class="required">*</span></label>
				    <div class="controls"  style="margin-left:20px;float:left;">
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>
							<input type="hidden" name="uploadType" value="news">
							<input type="hidden" id="imagePrevDiv" value="previewNewsImage">
							<div id="previewNewsImage" class="previewMultiImage">
							    <div class="img-wrap">
									<img src="<?php echo $dataNews['ua_location_photo']?>" />
									<div class="close-button"></div>
								</div>
								<?php
									$sql = "SELECT * FROM ua_location_photo WHERE ua_location = $newsLocationId";
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
				    <label class="control-label" style="width:105px;"><?php echo _lang(" News Keywords");?></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="newsKeyWords" placeholder="News Keywords" value="<?php echo $dataNews['ua_keywords']?>"></div>
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="padding-top:12px;width:105px;"><?php echo _lang("News Content");?></label>	
				    <div class="controls" style="width:730px;margin-left:20px;float:left;">
				       	<input type="hidden" id="getNewsContent" value='<?php echo $dataNews['ua_location_description']?>'>
				    	<textarea rows="10" cols="100"  id="newsContent" placeholder="News Content" ><?php echo $dataNews['ua_location_description']?></textarea>
				    </div>
				</div>
							
				<div style="text-align:center;margin-top:2%;">
					<a href="#" onclick="onNewsSave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="newsList.php" class="btn btn-danger"><?php echo _lang("List"); ?></a>				
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>
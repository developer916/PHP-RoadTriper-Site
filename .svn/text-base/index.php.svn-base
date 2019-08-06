<?php session_start(); ?>

<!DOCTYPE html>

<!--[if IE 8]><html lang="en" id="ie8" class="lt-ie9 lt-ie10"> <![endif]-->

<!--[if IE 9]><html lang="en" id="ie9" class="gt-ie8 lt-ie10"> <![endif]-->

<!--[if gt IE 9]><!-->

<html lang="en"> <!--<![endif]-->

<head>	

    <?php require_once("./common/config.php"); ?>

    <?php require_once("./common/DB_Connection.php"); ?>

	<?php require_once("./common/functions.php"); ?>

	<?php require_once("./common/dataLog.php"); ?>

    <?php require_once("./common/header.php"); ?>    

    <script type="text/javascript" src="/js/index.js"></script>

    <script type="text/javascript" src="/js/popstate.js"></script>

    <script type="text/javascript" src="/js/planTrip.js"></script>

    <script type="text/javascript" src="/js/findPlaces.js"></script>

    <script type="text/javascript" src="/js/news.js"></script>

    <script type="text/javascript" src="/js/eye.js"></script>

    <script type="text/javascript" src="/js/guides.js"></script>

    <script type="text/javascript" src="/js/blog.js"></script>

    <script type="text/javascript" src="/js/notification.js"></script>

    <script type="text/javascript" src="/js/rightSideBar.js"></script>

    <script type="text/javascript" src="/js/socialLogin.js"></script>

    <script type="text/javascript" src="/js/socialPart.js"></script>

    

    <!-- script type="text/javascript" src="/js/jquery.nicescroll.min.js"></script -->

	    

    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&language=<?php echo $lang;?>&sensor=true&libraries=places&libraries=weather"></script>

	<script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>

	

    <script src="/texteditor/scripts/innovaeditor.js" type="text/javascript"></script>

	<script src="/texteditor/scripts/innovamanager.js" type="text/javascript"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" type="text/javascript"></script>

	<script src="/texteditor/scripts/common/webfont.js" type="text/javascript"></script>

	

	<!-- script src="http://code.highcharts.com/highcharts.js"></script>

	<script src="http://code.highcharts.com/modules/exporting.js"></script -->

	<script src="/js/highcharts/highcharts.js"></script>

	<script src="/js/highcharts/modules/exporting.js"></script>

	

	<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>

		

	 	

    <?php

    	if( UA_isLogin() ){

			$isLogin = "Y";

			$userId = UA_getCookie("UA_USER");

			$sql = "select * from ua_user where ua_user = $userId";

			$dataUser = $db->queryArray( $sql );

			$username = $dataUser[0]['ua_username'];

			$photo = $dataUser[0]['ua_photo'];

			$balanceAmount = $dataUser[0]['ua_balance_amount'];

			

			$sql = "select count(*) cnt from ua_user_trip where ua_user = $userId";

			$result = $db->queryArray( $sql );

			$cntPlanTrip = $result[0]['cnt'];

		}else{

			$isLogin = "N";

			$cntPlanTrip = 0;

		}

    ?>



</head>

<body>

	<?php require_once("analyticstracking.php"); ?>

	<?php require_once("404.php"); ?>



	<div id="fb-root"></div>

	<script src="http://connect.facebook.net/en_US/all.js"></script>

	<script>

	    FB.init({ 

	        appId:'<?php echo FACEBOOK_APP_ID;?>', cookie:true, 

	        status:true, xfbml:true

	     });		

	</script>

	<script>

	  (function() {

		    var po = document.createElement('script');

		    po.type = 'text/javascript'; po.async = true;

		    po.src = 'https://apis.google.com/js/client:plusone.js?onload=onRender';

		    var s = document.getElementsByTagName('script')[0];

		    s.parentNode.insertBefore(po, s);

		  })();

	  function onRender() {

		    gapi.signin.render('btnGoogleLogin', {

		      'callback': 'googleLoginCallback',

		      'clientid': '<?php echo GOOGLE_CLIENT_ID?>',

		      'cookiepolicy': 'single_host_origin',

		      'scope': 'https://www.googleapis.com/auth/userinfo.email',

		      'approvalprompt' : 'auto'

		    });

		  }

	</script>

	<script src="http://vkontakte.ru/js/api/openapi.js" type="text/javascript"></script>

	<script>

		VK.init({

		  apiId: <?php echo VK_API_ID;?>

		});

		// VK.Auth.getLoginStatus(authInfo);

		VK.UI.button('btnVkLogin');
		
	</script>		

	<div class="container-overlay" style="<?php if (isset($containerOverlayShow)) echo $containerOverlayShow; ?>"></div>

	<input type="hidden" id="titleSuffix" value="<?php echo $titleSuffix?>"/>				

	<input type="hidden" id="isNormal" value="<?php echo $isNormal?>"/>

	<input type="hidden" id="isLogin" value="<?php echo $isLogin?>"/>

	<input type="hidden" id="UA_USER" value="<?php echo $userId?>"/>

	<input type="hidden" id="currentURL" value="<?php echo $currentURL?>"/>

	<input type="hidden" id="planTripId"/>

	<input type="hidden" id="siteName" value="<?php echo SITE_NAME?>"/>

	<input type="hidden" id="noProfileImg" value="<?php echo NO_PROFILE_PHOTO;?>"/>	

	<input type="hidden" id="fuelPrice" value="<?php echo PRICE_FUEL;?>"/>

	<input type="hidden" id="pageTitle" value="<?php echo $title;?>"/>

	<input type="hidden" id="notificationCycle" value="<?php echo UA_getCode("CD031");?>"/>

	<input type="hidden" id="currentLocationCycle" value="<?php echo UA_getCode("CD032");?>"/>

	<input type="hidden" id="defaultPlace" value="<?php echo DEFAULT_PLACE;?>"/>
	<?php
		$sql = "select now() currentTime";
		$dataTime = $db->queryArray( $sql );
		$currentTime = $dataTime[0]['currentTime'];
	?>
	<input type="hidden" id="currentTime" value="<?php echo $currentTime;?>"/>
	<?php require_once("notification.php"); ?>

	<div id="mainTopPart">

		<div id="mainMenu">

			<img src="/img/logo.png" class="floatleft">

			<div id="loadingContainer" class="hide">

				<img id="imgLoading" src="/img/loading.png"/>

			</div>

						

			<div id="menuItem">

				<i class="icon-globe icon-white" style="width: 25px; height: 25px;"></i>

				<p><?php echo _lang("PLAN TRIP");?></p>

			</div>

			

			<div id="menuItem">

				<i class="icon-map-marker icon-white" style="width: 25px; height: 25px;"></i>

				<p><?php echo _lang("FIND PLACES");?></p>		

			</div>

			

			<div id="menuItem">

				<i class="icon-tags icon-white" style="width: 25px; height: 25px;"></i>

				<p><?php echo _lang("NEWS");?></p>		

			</div>

			<div id="menuItem">

				<i class="icon-camera icon-white" style="width: 25px; height: 25px;"></i>

				<p><?php echo _lang("EYE");?></p>		

			</div>

			<div id="menuItem">

				<i class="icon-list-alt icon-white"></i>

				<p><?php echo _lang("BLOG");?></p>		

			</div>

		

			<!-- div id="menuItem">

				<i class="icon-book icon-white" style="width: 25px; height: 25px;"></i>

				<p><?php echo _lang("GUIDES");?></p>		

			</div -->			

			<!-- div id="menuItem">

				<i class="icon-question-sign icon-white"></i>

				<p>ABOUT US</p>		

			</div -->

			<div class="clearboth"></div>

		</div>



		<div id="mainPanel">

			<?php require_once("planTrip.php"); ?>

			<?php require_once("findPlaces.php"); ?>

			<?php require_once("news.php"); ?>

			<?php require_once("eye.php"); ?>	

			<?php require_once("blog.php"); ?>			

			<?php require_once("guides.php"); ?>						

			<div id="panelAboutUs" class="panel hide">

				<div style="background:url('/img/panel01.png');height: 75px;text-align:center;">

					<br>

					<span class="panelTopLabel"><?php echo _lang("About Us");?></span>

				</div>

			</div>								
		</div>

		<div id="mainMap">

			<div id="mapTop">

				<div id="searchTop">

					<div id="searchHandler">

						<a onclick="onClickPanelHandler()">

							<i class="icon-align-justify icon-blue"></i>

						</a>			

					</div>

					<div class="floatleft" id="topFunctionArea">

						<div id="searchInput">

							<div class="input-prepend">

							  <span class="add-on" style="background: #fff;"><i class="icon-search"></i></span>

							  <input id="searchLocation" type="text" placeholder="<?php echo _lang("Search...");?>">

							</div>

						</div>

						<div id="searchRemove">

							<a onclick="onClickSearchRemove()">

								<i class="icon-remove icon-white"></i>

							</a>

						</div>

						

						<div id="displayWeather">

							<a onclick="onClickDisplayWeather(this)" title="<?php echo _lang("Weather");?>">

								<i class="icon-certificate icon-white"></i>

								<span style="color:white;"><?php echo _lang("Weather");?></span>

							</a>

						</div>	

						<div id="currentLocation">

							<a onclick="onClickMyLocation(this)" title="<?php echo _lang("GPS");?>">

								<i class="icon-map-marker icon-white" style="background-position: -24px -72px;"></i>

								<span style="color:white;"><?php echo _lang("GPS");?></span>

							</a>

						</div>										

						<div id="displayRegion">

							<select id="regionList" onchange="onChangeRegion()">

								<option value='' data=''><?php echo _lang("All Region");?></option>

								<?php

								$sql = "select * from ua_region order by ua_order";

								$regionList = $db->queryArray( $sql );

								for( $i = 0; $i < count( $regionList); $i++ ){

									echo "<option data = '".$regionList[$i]['ua_code']."' value='".$regionList[$i]['ua_region']."'>"._lang($regionList[$i]['ua_title'])."</option>";

								}

								?>

							</select>

						</div>

						<div id="languageArea">

							<a onclick="onChangeLanguage('ua')"><img <?php if( $lang != "ua" ) echo " class='opacity50'"; ?> src="/img/flagUA.png" style="width: 24px; height: 15px;"/></a>

							<a onclick="onChangeLanguage('en')"><img <?php if( $lang != "en" ) echo " class='opacity50'"; ?> src="/img/flagEn.png" style="width: 24px; height: 15px;"/></a>

							<a onclick="onChangeLanguage('ru')"><img <?php if( $lang != "ru" ) echo " class='opacity50'"; ?> src="/img/flagRu.png" style="width: 24px; height: 15px;"/></a>							

						</div>

						<div class="clearboth"></div>

					</div>

					<div class="clearboth"></div>

				</div>

				<div id="profileArea" class="floatright">

					<div id="profileAreaLogin" <?php if( $isLogin == "N" ) echo "class='hide'";?> >

						<a id="aProfileBalanceAmount">

							<span id="profileBalanceAmount"><?php echo "$".$dataUser[0]['ua_balance_amount']?></span>

						</a>

						<a>

							<span id="profileName"><?php echo $username?></span>

						</a>

						&nbsp;

						<img src="<?php echo $photo;?>" style="width:50px; height: 50px;" id="imgProfile"/>

					</div>

					

					<div id="profileAreaNotLogin" <?php if( $isLogin == "Y" ) echo "class='hide'";?>>

						<a onclick="onSignInPopup()">

							<span id="profileName"><?php echo _lang("Sign In");?></span>

						</a>

						<span id="profileName">/</span>

						<a onclick="onSignUpPopup()">

							<span id="profileName"><?php echo _lang("Sign Up");?></span>

						</a>

					</div>

					

				</div>

				<div class="clearboth"></div>

			</div>

						<div id="main_Panel_back_button">
						<INPUT type="button" value="Назад" onClick="history.back()" style="border: none; outline:none; background: transparent; padding: 13px 7px; color: #fff;"> 
						</div>

		</div>

		<div id="mapCanvas"></div>		

		<div style="clear:both;"></div>

	</div>

	

	<?php require_once ("container.php");?>

	<div id="newsAnalyticsContainer" class="popupContainer <?php if( $pageType != "newsAnalytics") echo "hide"; ?>">

		<div id="newsAnalyticsMain">

			<div style="margin:0px auto; width: 600px;padding:20px;"> 

				<input type="text" id="newsAnalysticsStartDate" placeholder="<?php echo _lang("Start Date");?>"/>

				<input type="text" id="newsAnalysticsEndDate"  placeholder="<?php echo _lang("End Date");?>"/>

				

				<select id="newsAnalysticsRegionList">

					<option value=""><?php echo _lang("All Region");?></option>

					<?php

					$sql = "select * from ua_region";

					$regionList = $db->queryArray( $sql );

					for( $i = 0; $i < count( $regionList); $i++ ){

						echo "<option value='".$regionList[$i]['ua_region']."'>"._lang($regionList[$i]['ua_title'])."</option>";

					}

					?>

				</select>

				<button class="btn btn-primary floatright" onclick="onNewsAnalyticsShowChart()"><?php echo _lang("Show Chart");?></button>

				<div class="clearboth"></div>

			</div>

			<div id="newsAnalysticsChart"></div>

			<div id="newsAnalysticsChartNoData" class="hide"><?php echo _lang("No Data");?></div>

			<div>&nbsp;</div>

		</div>

	</div>

	<div id="myPlacesContainer" class="popupContainer <?php if( $pageType != "myPlaces") echo "hide"; ?>">

		<div id="myPlacesMain">

			<?php require("blogHeader.php"); ?>

			<div id="myPlacesBody">

				<h3 class="floatleft"><?php echo _lang("My Places");?></h3>

				<a class="btn floatright js-link" href="/addPlace"><?php echo _lang("Add Place");?></a>

				<div class="clearboth"></div>

				<div id="myPlacesList">

					<?php for( $i = 0; $i < count( $dataResult ); $i ++ ){
if( $pageType == "myPlaces"){
?>

						<div id="myPlacesItem">

							<div class="floatleft" id="myPlacesItemTitle"><?php echo $dataResult[$i]['ua_location_title']; ?></div>

							<a class="js-link floatleft" id="myPlacesItemView" href="<?php echo "/locations/".str_replace(" ", "-", UA_translateEn($dataResult[$i]['ua_location_title']))."/".base64_encode($dataResult[$i]['ua_location'])?>"><?php echo _lang("View");?></a>

							<a class="js-link floatleft" id="myPlacesItemEdit" href="<?php echo "/editPlace/".base64_encode($dataResult[$i]['ua_location'])?>"><?php echo _lang("Edit");?></a>

						</div>

					<?php } } ?>

					<div class="clearboth"></div>

				</div>				

			</div>

			<?php require("footer.php"); ?>

		</div>

	</div>

	<div id="addLocationContainer" class="popupContainer <?php if( $pageType != "addPlace" && $pageType != "editPlace") echo "hide"; ?>">

		<div id="addLocationMain">

			<?php require("blogHeader.php"); ?>

			<div id="addLocationBody" class="form-horizontal ">

              	<input type="hidden" id="addLocationLat" value="<?php echo $dataResult['ua_location_lat']?>"/>

              	<input type="hidden" id="addLocationLon" value="<?php echo $dataResult['ua_location_lon']?>"/>

              	<input type="hidden" id="addLocationId" value="<?php echo $dataResult['ua_location']?>"/>

            <div class="<?php if( $pageType == "editPlace") echo "hide"; ?>" id="add_place_bar">  	
				<div id="addplace_desc_adv">
						<span>
						<div class="popup_addplace_adv">
						<div style="color: #26268b; font-size: 13px; margin-bottom: 6px; font-weight: bold; border-bottom: 1px solid #ccc;">
						ПРИВЛЕЧЬ ПОЛЬЗОВАТЕЛЕЙ
						</div>
						<div style="float: left; display: inline; line-height: 14px;">Поднять&nbsp;</div>
						<div id="uptotop_title" style="float: left; display: inline; line-height: 14px;">
						<b><?php echo $dataResult['ua_location_title'];?></b>
						</div>
						<div style="float: left; display: inline; line-height: 14px;">на первое место в категории&nbsp;</div>
						<div id="uptotop_category" style="float: left; display: inline; margin-bottom: 10px; line-height: 14px;">
							<?php for( $i = 0; $i < count( $dataCategory ); $i++ ){

									$subCategoryName =  UA_translateEn($dataCategory[$i]['ua_name']);

									$subCategoryName = str_replace(" ", "-", $subCategoryName);

									if( $pageType == "places" ){

										$categoryType = "places";

									}

								?>

							<i><?php echo _lang($dataCategory[$i]['ua_name'])?></i>

							<?php }?>
						</div>
						<div style="margin-top: 6px; color: #f60; clear: both; line-height: 14px;">Стоимость - $1</br>Длительность - 48 часов</div>
						</div>
						</span>
						<div id="add_location_adv_button">
						ПРЕИМУЩЕСТВА
						</div>
						<div style="float: left; margin-left: 7px;"><i id="panelFindPlacesItemParentImage" class="icon-blue icon-chevron-down"></i></div>
				</div>
				<div id="addplace_desc_how">
						<span>
						<div class="popup_addplace_adv">
						</div>
						</span>
						<div id="add_location_adv_button">
						ОФОРМЛЕНИЕ
						</div>
						<div style="float: left; margin-left: 7px;"><i id="panelFindPlacesItemParentImage" class="icon-blue icon-chevron-down"></i></div>
				</div>
				<div id="addplace_desc_examples">
						<span>
						<div class="popup_addplace_adv">
						</div>
						</span>
						<div id="add_location_adv_button">
						ПРИМЕРЫ
						</div>
						<div style="float: left; margin-left: 7px;"><i id="panelFindPlacesItemParentImage" class="icon-blue icon-chevron-down"></i></div>
				</div>
				<div id="addplace_desc_price">
						<span>
						<div class="popup_addplace_adv">
						</div>
						</span>
						<div id="add_location_adv_button">
						<?php echo "$".PRICE_ADD_LOCATION." "._lang("For Add Place")?>
						</div>
						<div style="float: left; margin-left: 7px;"><i id="panelFindPlacesItemParentImage" class="icon-blue icon-chevron-down"></i></div>
				</div>
			</div>	
				
				


              	<div class="clearboth"></div>

              	

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Title"); ?><span class="required">*</span></label>

	              <div class="controls fullWidth">

	                <input type="text" id="addLocationTitle" placeholder="<?php echo _lang("Location Title");?>" value="<?php echo $dataResult['ua_location_title']?>">

	              </div>

	            </div>

	            

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Subtitle");?><span class="required">*</span></label>

	              <div class="controls fullWidth">

	                <input type="text" id="addLocationSubtitle" placeholder="<?php echo _lang("Location Subtitle");?>" value="<?php echo $dataResult['ua_location_subtitle']?>">

	              </div>

	            </div>

	            

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Address");?><span class="required">*</span></label>

	              <div class="controls fullWidth">

	                <input type="text" id="addLocationAddress" placeholder="<?php echo _lang("Location Address");?>" value="<?php echo $dataResult['ua_location_street_address']?>" onkeyup="onKeyUpLocationAddress( event )">

	              </div>

	            </div>

	            <div class="control-group">

	              <div class="controls fullWidth" style="margin: 20px 0px 20px 4px; width: 650px;">

	              	<div id="mapCanvasLocation" style="width:100%; height:400px; border:1px solid #CCC;"></div>	                

	              </div>

	            </div>

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Category");?><span class="required">*</span></label>

	              <div class="controls fullWidth">

	              	<select id="addLocationSubCategory">

	              		<option value=""><?php echo _lang("Select category.");?></option>

	              	<?php

	              	$sql = "

						select t1.*, t2.ua_name as ua_parent_name

						  from ua_place_subcategory t1, ua_place_category t2

						 where t1.ua_place_category = t2.ua_place_category

						 order by ua_parent_name, t1.ua_name";

	              	$subCategoryList = $db->queryArray( $sql );

	              	for( $i = 0; $i < count( $subCategoryList); $i ++ ){ ?>

	              		<option value="<?php echo $subCategoryList[$i]['ua_place_subcategory'];?>" <?php if( $dataResult['ua_place_subcategory'] == $subCategoryList[$i]['ua_place_subcategory'] ) echo "selected";?>>

              				<?php echo _lang($subCategoryList[$i]['ua_parent_name']);?>&nbsp;:&nbsp;<?php echo _lang($subCategoryList[$i]['ua_name']);?>

	              		</option>

	              	<?php } ?>

	              	</select>

	              </div>

	            </div>

				<div class="control-group">

				    <label class="control-label"><?php echo _lang("Image");?><span class="required">*</span></label>

				    <div class="controls">

						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php' style="margin-bottom:0px;width:450px;">

							<input type="file" name="imageUpload" id="imageUpload"/>						

							<input type="hidden" name="uploadType" value="location">

							<input type="hidden" id="imagePrevDiv" value="previewLocationImage">

							<div id="previewLocationImage" class="previewMultiImage" style="max-width: 100%;">
<!-- 							    <div class="img-wrap"> -->
    								<!-- <img src="<?php // echo $dataResult['ua_location_photo']?>"/> -->
<!--     								<div class="close-button"></div> -->
<!-- 								</div> -->
							</div>

						</form>

				    </div>

				</div>		            


<!-- div>
	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("City");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationCity" placeholder="<?php echo _lang("City");?>" value="<?php echo $dataResult['ua_location_city']?>">

	              </div>

	            </div>



	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Zip Code");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationZipCode" placeholder="<?php echo _lang("Zip Code");?>" value="<?php echo $dataResult['ua_location_zip']?>">

	              </div>

	            </div>

	            

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Country");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationCountry" placeholder="<?php echo _lang("Country");?>" value="<?php echo $dataResult['ua_location_country']?>">

	              </div>

	            </div>



	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("State");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationState" placeholder="<?php echo _lang("State");?>" value="<?php echo $dataResult['ua_location_state']?>">

	              </div>

	            </div>
</div -->          

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Phone");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationPhone" placeholder="<?php echo _lang("Phone");?>" value="<?php echo $dataResult['ua_location_phone']?>">

	              </div>

	            </div>

	            

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Email");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationEmail" placeholder="<?php echo _lang("Email");?>" value="<?php echo $dataResult['ua_location_email']?>">

	              </div>

	            </div>

	            

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Website");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationWebsite" placeholder="<?php echo _lang("Website");?>" value="<?php echo $dataResult['ua_location_website']?>">

	              </div>

	            </div>

	            	            

	            <div class="control-group">

	              <label class="control-label"><?php echo _lang("Keywords");?></label>

	              <div class="controls halfWidth">

	                <input type="text" id="addLocationKeywords" placeholder="<?php echo _lang("Keywords");?>" value="<?php echo $dataResult['ua_keywords']?>">

	              </div>

	            </div>



	            <?php if( $isLogin == "Y" ){?>

	            <div class="control-group">

	              <div class="controls fullWidth" style="margin-left: 0px; width: 660px;">

	                <textarea id="addLocationDescription">

	                	

	                </textarea>

	                <input type="hidden" id="addLocationDescriptionTxt" value='<?php echo $dataResult['ua_location_description']?>'/>

	              </div>

	            </div>

	            <?php } ?>            

				

	            <div class="control-group">

	              <label class="control-label"></label>

	              <div class="controls fullWidth" style="text-align:right;">

	              	<div class="floatleft <?php if( $dataResult['ua_created_by'] != $userId) echo "hide"?>" id="addLocationScoreArea">

	              		<span class="floatleft"><?php echo _lang("Score");?>&nbsp;:&nbsp;</span>

	              		<span class="floatleft" id="addLocationScore"><?php echo $dataResult['ua_location_like_score']?></span>

	              		<button class="btn btn-mini floatleft" onclick="onLocationScoreUp( this )">

	              			<i class="icon-arrow-up icon-blue marginTop0"></i>&nbsp;&nbsp;&nbsp;<span style="color: #359FE6;"><?php echo _lang("UP RATING");?></span>

	              		</button>

	              		<div class="clearboth"></div>

	              	</div>

	                <a class="btn btn-primary floatright" onclick="onSavePlace(this)"><?php echo _lang("Save Place");?></a>

					<a class="btn floatright marginRight10 js-link" href="/myPlaces"><?php echo _lang("My Places");?></a>	                

	                <div class="clearboth"></div>

	              </div>	            

	            </div>

			

			</div>

			

			<?php require("footer.php"); ?>

		</div>

	</div>

	

	<?php require_once("infobox.php"); ?>

	<?php require_once("modal.php"); ?>

	<?php require_once("clone.php"); ?>

	

<!-- ABSOLUTE START -->

	<?php require_once("rightSideBar.php"); ?>

	<?php require_once("profileMenu.php"); ?>

	<?php require_once("socialPart.php"); ?>

<!-- ABSOLUTE END -->

	<script>

	<?php 

		foreach( $languageList as $key => $value ){

			echo 'languageList["'.$key.'"] = "'.$value.'";';	

		}	

	?>

	</script>

<script type="text/javascript" src="//assets.pinterest.com/js/pinit.js"></script>

</body>

</html>
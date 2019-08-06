	<div id="pageInfoContainer" class="popupContainer <?php if( $pageType != "pages" ) echo "hide"; ?>">

		<div id="pageInfo">

			<?php require("blogHeader.php"); ?>

			<input type="hidden" id="pageInfoId"/>

			<div id="pageInfoBody">

				<div id="pageInfoTitle"><?php echo $pageTitle; ?></div>

				<div id="pageInfoContent">

					<?php 

						$pageContent = preg_replace_callback('~<a(.*?)\s+href="(.*?)"(.*?)>(.*?)</a>~i', function($m){

							return sprintf('<a rel="nofollow" target="_blank" href="/external.php?url=%s"%s>%s</a>', urlencode($m[2]), $m[3], $m[4]);

						}, $pageContent);

						echo $pageContent;

					?>				

				</div>

			</div>

			<?php require("footer.php"); ?>			

		</div>

	</div>	

	

	<div id="blogInfoContainer" class='popupContainer <?php if( $pageType != "blog" ) echo "hide"; ?>'>

		<div id="blogInfo">

			<?php require("blogHeader.php"); ?>

			<input type="hidden" id="blogInfoId" value="<?php echo $dataResult['ua_blog'];?>"/>

			<div id="blogInfoImage" style="background-image: url(<?php echo $dataResult['ua_image'];?>); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;">

				<?php

					$shareURL = "http://".HOST_SERVER.$_SERVER["REQUEST_URI"];

				?>

				<div id="locationSocialFB1">

					<fb:like href="<?php echo $shareURL;?>" layout="button_count" action="like" show_faces="false" share="false"></fb:like>

				</div>

				<div id="locationSocialTW1"> 

					<a class="twitter-share-button" href="<?php echo $shareURL?>" data-count="none" data-dnt="true">Tweet</a>

										

				</div>

				<div id="locationSocialGP1">

					<div data-href="<?php echo $shareURL;?>" class="g-plusone" data-size="medium" data-annotation="none"></div>

				</div>

				<div id="locationSocialPI1">

					<a href="//www.pinterest.com/pin/create/button/?url=<?php echo urldecode($shareURL);?>&media=<?php echo urlencode("http://".HOST_SERVER."/".$dataResult['ua_location_photo'])?>&description=<?php echo urlencode($dataResult['ua_location_title'])?>" data-pin-do="buttonPin" data-pin-config="none"><img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" /></a>					

				</div>			

			</div>

			<div id="blogInfoBody">

				<div id="blogInfoTitle"><?php echo $dataResult['ua_title'];?></div>

				<div>

					<div id="blogInfoCategory"><?php echo _lang($dataResult['ua_blog_title']);?></div>

					<div id="blogInfoDays"><b><?php echo $dataResult['ua_username'];?></b>&nbsp;&nbsp;&nbsp;&nbsp;

						<i>

						<?php 

							if( $dataResult['ua_day_ago'] == 0 ) echo _lang("today");

							else if( $dataResult['ua_day_ago'] == 1 ) echo _lang("yesterday");

							else echo $dataResult['ua_day_ago']." "._lang("days ago");

						?>

						</i>

					</div>

					<div class="clearboth"></div>

				</div>

				<div id="blogInfoContent">

					<?php 

						$blogDesc = $dataResult['ua_content'];

						$blogDesc = preg_replace_callback('~<a(.*?)\s+href="(.*?)"(.*?)>(.*?)</a>~i', function($m){

							return sprintf('<a rel="nofollow" target="_blank" href="/external.php?url=%s"%s>%s</a>', urlencode($m[2]), $m[3], $m[4]);

						}, $blogDesc);

						echo $blogDesc;

					?>

				</div>

			</div>

			<div id="blogInfoComment">

			<div id="locationInfoCommentWrite">
			
				<img src="<?php if(UA_isLogin()) echo $photo; else echo NO_PROFILE_PHOTO;?>" id="blogInfoPhoto">

				<h5 class="floatleft" style="margin-left: 10px;margin-top:5px;"><?php echo _lang("COMMENTS"); ?></h5>

				<div class="clearboth"></div>

				<textarea id="blogInfoCommentText" rows="3" placeholder="<?php echo _lang('Got a trip/review/awesome factoid about this place? Please share!'); ?>"></textarea>

				<button class="btn btn-primary floatright" id="blogInfoBtnSend" onclick="onClickBlogInfoComment(this)"><?php echo _lang("SEND"); ?></button>

			

				<div class="clearboth"></div>

				</div>

				<div id="blogInfoCommentList">

					<?php

					for( $i = 0; $i < count( $dataComment ); $i++ ){ 

					?>

					<div id="blogInfoCommentItem">

						<input type="hidden" id="blogInfoCommentId" value="<?php echo $dataComment[$i]['ua_blog_comment']; ?>"/>											

						<div id="blogInfoCommentItemPhoto" class="floatleft marginRight10">

							<img style="width:30px; height: 30px;" src="<?php echo $dataComment[$i]['ua_photo']; ?>"/>

						</div>

						<div id="blogInfoCommentItemUsername" class="floatleft">

							<?php echo $dataComment[$i]['ua_username']; ?>

						</div>						

						<div class="floatleft marginLeft10">												

							<p id="blogInfoCommentItemComment">

								<?php echo $dataComment[$i]['ua_comment']; ?>

							</p>

														<div id="blogInfoCommentItemFooter">



								<div id="blogInfoCommentItemRating" class="floatright">

									<button class="btn btn-mini floatleft <?php if( $dataComment[$i]['ua_liked'] == 1 ) echo "liked";?>" id="commentLikeArea" onclick="onBlogCommentLike(this)">

										&nbsp;<i class="icon-ok icon-blue marginTop0"></i>&nbsp;

										<span id="commentLike"><?php echo $dataComment[$i]['ua_like_count']; ?></span>

									</button>

									<button class="btn btn-mini floatleft <?php if( $dataComment[$i]['ua_liked'] == -1 ) echo "liked";?>" id="commentUnlikeArea" onclick="onBlogCommentUnlike(this)">

										&nbsp;<i class="icon-remove icon-red marginTop0"></i>&nbsp;

										<span id="commentUnlike"><?php echo $dataComment[$i]['ua_unlike_count']; ?></span>

									</button>									

									<div class="clearboth"></div>

								</div>

								<div id="blogInfoCommentItemDate" class="floatright marginRight10">

									<?php echo $dataComment[$i]['ua_created_time']; ?>

								</div>

								<div class="clearboth"></div>

							</div>
							
						</div>

						<div class="clearboth"></div>

					</div>

					<?php } ?>

				</div>				

			</div>			

			<?php require("footer.php"); ?>			

		</div>

	</div>

	

	<div id="blogThumbInfoContainer" class='popupContainer <?php if( $pageType != "blogsThumb" ) echo "hide"; ?>'>

		<div id="blogThumbInfo">

			<?php require("blogHeader.php"); ?>

			<div id="blogThumbList">

				<?php

				if( $pageType == "blogsThumb"){

					for( $i = 0; $i < count( $dataResult ); $i ++ ){ ?>

					<div id="blogThumbItem">

						<input type="hidden" id="blogThumbId" value="<?php echo $dataResult[$i]['ua_blog']?>" />

						<a class="js-link" href="<?php echo "/blogs/".str_replace(" ", "-", UA_translateEn($dataResult[$i]['ua_title']))."/".base64_encode($dataResult[$i]['ua_blog']);?>"><div id="blogThumbImage" style="background-image: url(<?php echo $dataResult[$i]['ua_image']?>); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></a>

						<a class="js-link" href="<?php echo "/blogs/".str_replace(" ", "-", UA_translateEn($dataResult[$i]['ua_title']))."/".base64_encode($dataResult[$i]['ua_blog']);?>"><div id="blogThumbTitle"><?php echo _lang($dataResult[$i]['ua_title'])?></div></a>

						

						<div>

							<div id="blogThumbCategory"><?php echo _lang($dataResult[$i]['ua_blog_title'])?></div>

							<div id="blogThumbDays">

								<i>

								<?php 

									if( $dataResult[$i]['ua_day_ago'] == 0 ) echo _lang("today");

									else if( $dataResult[$i]['ua_day_ago'] == 1 ) echo _lang("yesterday");

									else echo $dataResult[$i]['ua_day_ago']._lang("days ago");

								?>

								</i>

							</div>

							<div class="clearboth"></div>

						</div>

						

						<div id="blogThumbContent">

							<?php 

								$str = UA_html2text($dataResult[$i]['ua_content']);

								if( strlen( $str ) > 250 )

									$str = substr( $str, 0, 250 )." ...";

								echo $str;

							?>

						</div>

						<a class="btn btn-link btn-small js-link" href="<?php echo "/blogs/".str_replace(" ", "-", UA_translateEn($dataResult[$i]['ua_title']))."/".base64_encode($dataResult[$i]['ua_blog']);?>" id="btnThumbReadMore"><?php echo _lang("Read More"); ?></a>

					</div>

				<?php

					}

				}

				?>

				<div class="clearboth"></div>

			</div>
			<div id="placeMetaDescrption">
				<p><?php echo $dataBCategoryMeta; ?></p>			
			</div>
			<?php require("footer.php"); ?>			

		</div>

	</div>

	

	<div id="newsListInfoContainer" class='popupContainer <?php if( $pageType != "newsList" ) echo "hide"; ?>'>

		<div id="newsListInfo">

			<div id="newsListInfoHeader">

				<?php echo _lang("NEWS DIRECTORY"); ?>

			</div>

			<div id="newsListCategoryList">

				<?php

					$sql = "select ua_news_category, ua_title from ua_news_category order by ua_title";

					$categoryList = $db->queryArray( $sql );

					for( $i = 0 ; $i < count( $categoryList ); $i ++ ){ 

				?>

					<div id="newsListCategoryItem">

						<?php

							echo "<a href='/newsCategory/".str_replace(" ","-",UA_translateEn($categoryList[$i]['ua_title']))."/".base64_encode($categoryList[$i]['ua_news_category'])."' class='js-link underline' >"._lang($categoryList[$i]['ua_title'])."</a>";

						?>

					</div>		

				<?php 

				} ?>

				<div class="clearboth"></div>

			</div>

			<?php require("footer.php"); ?>			

		</div>

	</div>

	

	<div id="newsCategoryInfoContainer" class='popupContainer <?php if( $pageType != "newsCategory" ) echo "hide"; ?>'>

		<div id="newsCategoryInfo">

			<div id="newsCategoryInfoHeader">

				<a class="js-link" href="/newsList">

					<div id="newsCategoryInfoDirectory" class="floatleft">

						<?php echo _lang("NEWS DIRECTORY"); ?>

					</div>

				</a>

				<div id="newsCategoryInfoTitle" class="floatleft">

					<?php echo _lang($dataGroupTitle);?>

				</div>

				<div class="clearboth"></div>

			</div>

			<div id="newsCategoryLocationList">

				<?php
if( $pageType == "newsCategory" ){

					for( $i = 0; $i < count( $dataResult ); $i ++ ){

						$newsCategoryName = $dataResult[$i]['ua_location_title'];

						$newsCategoryName = str_replace(" ", "-", $newsCategoryName);

						echo '<div id="newsCategoryLocationItem">';

						echo '<a class="js-link underline" href="/news/'.UA_translateEn($newsCategoryName).'/'.base64_encode($dataResult[$i]['ua_location']).'">'._lang($dataResult[$i]['ua_location_title']).'</a>';

						echo '</div>';

					}
}

				?>

				<div class="clearboth"></div>

			</div>
			<div id="placeMetaDescrption">
				<p><?php echo $dataNCategoryMeta; ?></p>			
			</div>
			<?php require("footer.php"); ?>			

		</div>

	</div>



	<div id="eyeCategoryInfoContainer" class='popupContainer <?php if( $pageType != "eyeCategory" ) echo "hide"; ?>'>

		<div id="eyeCategoryInfo">

			<div id="eyeCategoryInfoHeader">

				<a class="js-link" href="/eyeList">

					<div id="eyeCategoryInfoDirectory" class="floatleft">

						<?php echo _lang("EYE DIRECTORY"); ?>

					</div>

				</a>

				<div id="eyeCategoryInfoTitle" class="floatleft">

					<?php echo _lang($dataGroupTitle);?>

				</div>

				<div class="clearboth"></div>

			</div>

			<div id="eyeCategoryLocationList">

				<?php
if( $pageType == "eyeCategory"){

					for( $i = 0; $i < count( $dataResult ); $i ++ ){

						$eyeCategoryName = $dataResult[$i]['ua_location_title'];

						$eyeCategoryName = str_replace(" ", "-", $eyeCategoryName);

						echo '<div id="eyeCategoryLocationItem">';

						echo '<a class="js-link underline" href="/eye/'.UA_translateEn($eyeCategoryName).'/'.base64_encode($dataResult[$i]['ua_location']).'">'._lang($dataResult[$i]['ua_location_title']).'</a>';

						echo '</div>';

					}
}

				?>

				<div class="clearboth"></div>

			</div>
			<div id="placeMetaDescrption" style="margin: 20px;">
				<p><?php echo $dataECategoryMeta; ?></p>			
			</div>
			<?php require("footer.php"); ?>			

		</div>

	</div>	

	

	<div id="eyeListInfoContainer" class='popupContainer <?php if( $pageType != "eyeList" ) echo "hide"; ?>'>

		<div id="eyeListInfo">

			<div id="eyeListInfoHeader">

				<?php echo _lang("EYE DIRECTORY"); ?>

			</div>

			<div id="eyeListCategoryList">

				<?php

					$sql = "select ua_eye_category, ua_title from ua_eye_category order by ua_title";

					$categoryList = $db->queryArray( $sql );

					for( $i = 0 ; $i < count( $categoryList ); $i ++ ){ 

				?>

					<div id="eyeListCategoryItem">

						<?php

							echo "<a href='/eyeCategory/".str_replace(" ","-",UA_translateEn($categoryList[$i]['ua_title']))."/".base64_encode($categoryList[$i]['ua_eye_category'])."' class='js-link underline' >"._lang($categoryList[$i]['ua_title'])."</a>";

						?>

					</div>		

				<?php 

				} ?>

				<div class="clearboth"></div>

			</div>
			
			<?php require("footer.php"); ?>			
	
		</div>

	</div>	

		

	<div id="placesListInfoContainer" class='popupContainer <?php if( $pageType != "placesList" ) echo "hide"; ?>'>

		<div id="placesListInfo">

			<div id="placesListInfoHeader">

				<?php echo _lang("PLACES DIRECTORY"); ?>

			</div>

			<div id="placesListCategoryList">

				<?php

					$sql = "select ua_place_category, ua_name from ua_place_category order by ua_name";

					$categoryList = $db->queryArray( $sql );

					for( $i = 0 ; $i < count( $categoryList ); $i ++ ){ 

				?>

					<div id="placesListCategoryItem">

						<div id="placesListCategoryItemHeader"><?php echo _lang($categoryList[$i]['ua_name']);?></div>

						<?php

						$sql = "select ua_place_subcategory, ua_name from ua_place_subcategory where ua_place_category = ".$categoryList[$i]['ua_place_category']." order by ua_name";

						$subCategoryList = $db->queryArray( $sql );

						for( $j = 0 ; $j < count( $subCategoryList ); $j ++ ){

							echo "<div><a href='/places/".str_replace(" ","-",UA_translateEn($subCategoryList[$j]['ua_name']))."/".base64_encode($subCategoryList[$j]['ua_place_subcategory'])."' class='js-link underline' >"._lang($subCategoryList[$j]['ua_name'])."</a></div>";

						} 

						?>

						

					</div>		

				<?php 

				} ?>

				<div class="clearboth"></div>

			</div>

			<?php require("footer.php"); ?>			

		</div>

	</div>	

	

	<div id="groupInfoContainer" class='popupContainer <?php if( $pageType != "group" ) echo "hide"; ?>'>

		<div id="groupInfo">

			<div id="groupInfoPlacesHeader">

				<a class="js-link" href="/placesList">

					<div id="groupInfoPlacesDirectory" class="floatleft">

						<?php echo _lang("PLACES DIRECTORY"); ?>					

					</div>

				</a>

				<div id="groupInfoPlacesTitle" class="floatleft">

					<?php echo _lang($dataGroupTitle);?>

				</div>

				<div class="clearboth"></div>

			</div>

			<div id="groupLocationList">

				<?php

					for( $i = 0; $i < count( $dataResult ); $i ++ ){

						$categoryName = $dataResult[$i]['ua_name'];

						$categoryName = str_replace(" ", "-", $categoryName);

						echo '<div id="groupLocationItem">';

						$linkURL = "/places/".UA_translateEn($categoryName)."/".base64_encode($dataResult[$i]['ua_place_subcategory']);

						echo '<a class="js-link underline" href="'.$linkURL.'">'._lang($dataResult[$i]['ua_name']).'</a>';

						echo '</div>';

					}

				?>

				<div class="clearboth"></div>

			</div>
			<div id="placeMetaDescrption" style="margin: 20px;">
				<p><?php echo $dataPCategoryMeta; ?></p>			
			</div>
			<?php require("footer.php"); ?>			

		</div>

	</div>	

	

	<div id="placesInfoContainer" class='popupContainer <?php if( $pageType != "places" ) echo "hide"; ?>' >

		<div id="placesInfo">

			<div id="placesInfoPlacesHeader">

				<a class="js-link" href="/placesList">

					<div id="placesInfoPlacesDirectory" class="floatleft">

						<?php echo _lang("PLACES DIRECTORY"); ?>

					</div>

				</a>

				<div id="placesInfoPlacesTitle" class="floatleft">

					<?php echo _lang($dataGroupTitle);?>

				</div>

				<div class="clearboth"></div>

			</div>

			<div id="placesLocationList">

				<?php
if( $pageType == "places" ){

					for( $i = 0; $i < count( $dataResult ); $i ++ ){

						$placesName = $dataResult[$i]['ua_location_title'];

						$placesName = str_replace(" ", "-", $placesName);

						echo '<div id="placesLocationItem">';

						echo '<a class="js-link underline" href="/locations/'.UA_translateEn($placesName).'/'.base64_encode($dataResult[$i]['ua_location']).'">'._lang($dataResult[$i]['ua_location_title']).'</a>';

						echo '</div>';

					}
}

				?>

				<div class="clearboth"></div>

			</div>
			<div id="placeMetaDescrption" style="margin: 20px;">
				<p><?php echo $dataPSubCategoryMeta; ?></p>			
			</div>

			<?php require("footer.php"); ?>			

		</div>

	</div>		



	<div id="locationInfoContainer" class='popupContainer <?php if( $pageType != "locations" && $pageType != "news" && $pageType != "eye") echo "hide";?>'>
		<div id="locationInfo" itemscope itemtype="http://schema.org/Place">

			<div style="position: relative;">
			    <a id="locationContainerClose"></a>
				<input type="hidden" id="locationInfoLocationId" value="<?php echo $dataResult['ua_location'];?>"/>
				<input type="hidden" id="locationPinLat" value="<?php echo $dataResult['ua_location_lat'];?>"/>
				<input type="hidden" id="locationPinLon" value="<?php echo $dataResult['ua_location_lon'];?>"/>
				<div id="locationInfoTopLine">
				<div id="back_button_container">
				<div style="float: left; padding: 3px; border-right: 1px solid #fff;">
				<i id="panelFindPlacesItemParentImage" class="icon-chevron-left icon-white"></i>
				</div>
				<INPUT type="button" value="Назад" onClick="history.back()" style="border: none; outline:none; background: transparent; padding: 3px 7px; color: #fff; float:right;"> 
				</div>
				<div id="toplinesocial">
				<?php

						$shareURL = "http://".HOST_SERVER.$_SERVER["REQUEST_URI"];

					?>

					<div id="locationSocialPI">

						<a href="//www.pinterest.com/pin/create/button/?url=<?php echo urldecode($shareURL);?>&media=<?php echo urlencode("http://".HOST_SERVER."/".$dataResult['ua_location_photo'])?>&description=<?php echo urlencode($dataResult['ua_location_title'])?>" data-pin-do="buttonPin" data-pin-config="none"><img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" /></a>					

					</div>
					
					<div id="locationSocialGP">

						<div data-href="<?php echo $shareURL;?>" class="g-plusone" data-size="medium" data-annotation="none"></div>

					</div>
					
					<div id="locationSocialTW"> 

						<a class="twitter-share-button" href="<?php echo $shareURL?>" data-count="none" data-dnt="true">Tweet</a>

					</div>
					
					<div id="locationSocialFB">

						<fb:like href="<?php echo $shareURL;?>" layout="button_count" action="like" show_faces="false" share="false"></fb:like>

					</div>

				</div>
			
				</div>
				
				<a rel="location_thumb" href="<?php  echo $dataResult['ua_location_photo'];?>">
					<div id="locationInfoImage" style="background-image: url(<?php echo $dataResult['ua_location_photo'];?>); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;" class="zoomer">
					<div class="zoom-icon" id="zoomIcon"></div>
					
					<div id="locationAvgCommentRates">
						<p style="font-size: 13px;">Рейтинг</p>
						<p>
							<span id="avgUserRates">
								<?php if ($avgUserCommentRate[0]['avgRates'] == null )
										echo "3.0";
									  else	
										echo $avgUserCommentRate[0]['avgRates']; ?>
							</span>
							<span class="fiveMarks"> / 5</span>
						</p>
						<p style="color: #B7CC00;">
							<span id="cntRates">
								<?php if ($avgUserCommentRate[0]['cntRates'] == "0" || $avgUserCommentRate == null )
										echo "0";
									  else
										echo $avgUserCommentRate[0]['cntRates']; ?>
							</span>
							<span style="font-size: 13px;"> голоса</span>
						</p>
					</div>
					<div id="locationUpToTop" class="<?php if( $pageType == 'news' || $pageType == 'eye' ) echo 'hide';?>">
						<span>
							<div class="popup_up_to_top">
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
						<div id="locationUpToTop_button">
							<button class="btn btn-danger btn-small floatleft" id="btnLocationUpToTop" onclick="return fnLocationUpToTop(event, this);" style="outline: none; width: 45px; height: 45px; background: transparent; border: none;"></button>
						</div>
					</div>
					<div id="locationUpToTopLeft" class="floatleft <?php if( $dataResult['ua_highlight'] == 0 ) echo 'hide';?>">
	
						<?php echo $dataResult['ua_hour'].":".$dataResult['ua_minute'].":".$dataResult['ua_second'];?>
	
					</div>
						<div id="locationInfoCategoryImage"">
	
							<img src="<?php echo $dataCategory[0]['ua_category_image'];?>" style="width:45px; height:45px; -webkit-filter: invert(100%);"/>
	
						</div>
						<div id="title_subtitle">
						<div id="locationInfoTitle" itemprop="name">
	
							<?php echo $dataResult['ua_location_title'];?>
						</div>
							<div id="locationInfoSubTitle" <?php if( $pageType == "news" || $pageType == "eye") echo 'class="hide"';?>><?php echo $dataResult['ua_location_subtitle'];?></div>
						
						</div>
						<div id="locationInfoAddress2" <?php if($dataResult['ua_location_street_address'] != "" || $dataResult['ua_location_state'] != "" || $dataResult['ua_location_country'] != ""){?> style="width: 220px;"<?php }?>>
							<p><?php echo $dataResult['ua_location_street_address']." ".$dataResult['ua_location_state']." ".$dataResult['ua_location_country'];?></p>
						<img src="<?php echo $dataCategory[0]['ua_category_marker'];?>" onclick="return onShowLocationPin(event);"/>
						</div>
	
					</div>
				</a>
				<div class="locationPrevSmallImages">
					<?php $sql = "SELECT * FROM ua_location_photo WHERE ua_location = '".$dataResult['ua_location']."'";
					$locationPhoto = $db->queryArray($sql);
					foreach ($locationPhoto as $key => $value) {
					?>
        				<a rel="location_thumb" href="<?php echo $value['ua_photo']?>">
        				    <img src="<?php echo $value['ua_photo']?>" />
        				</a>
					<?php }?>
					<?php for ($i = 0; $i < (10 - count($locationPhoto)); $i ++) {?>
					   <a rel="location_thumb_default" href="#">
					       <img src="/img/default/<?php echo $i?>.png" />
					   </a>    
					<?php }?>
				</div>
				<div id="locationInfoLike">

					<div class="floatleft <?php if( $dataResult['ua_like_type'] == '-1') echo 'btnLocationDislike';?>" id="btnLocationDislike" onclick="onClickLocationDislike( )">

						<i class="icon-thumbs-down <?php if( $dataResult['ua_like_type'] == '-1') echo 'icon-white';?>"></i>

					</div>

					<div class="floatleft" id="locationLikeScoreArea" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
						<meta itemprop="worstRating" content = "-30">
						<div id="locationLikeScore" itemprop="ratingValue"><?php echo $dataResult['ua_location_like_score'];?></div>
						<meta itemprop="bestRating" content = "30">
						<div id="locationLikeArrow" style="-webkit-transform: rotate(<?php if( $dataResult['ua_location_like_score'] > 30 ) echo 90; else echo 90 / 30 * $dataResult['ua_location_like_score'];?>deg);-moz-transform: rotate(<?php if( $dataResult['ua_location_like_score'] > 30 ) echo 90; else echo 90 / 30 * $dataResult['ua_location_like_score'];?>deg);"></div>

					</div>

					<div class="floatleft <?php if( $dataResult['ua_like_type'] == '1') echo 'btnLocationLike';?>" id="btnLocationLike" onclick="onClickLocationLike( )">

						<i class="icon-thumbs-up <?php if( $dataResult['ua_like_type'] == '1') echo 'icon-white';?>"></i>

					</div>

					<div class="clearboth"></div>				
					<div id="locationInfoButton" <?php if( $pageType == "news" || $pageType == "news") echo 'class="hide"';?>>
						<button class="btn btn-danger btnDeleteTrip hide" onclick="onClickLocationInfoDelete(this)" title="<?php echo _lang("DELETE"); ?>" style="height: 65px; width: 65px; background: url('/img/addtotrip_list.png'); background-position: 0px -129px; border: none; position: absolute; top: 1px; left: 46px; outline: none; border-radius: 0px 0px 0px 80px;"></button>
						<button class="addtotrip" onclick="onClickLocationInfoAddToTrip(this)" title="<?php echo _lang("ADD TO TRIP"); ?>"></button>
						<button class="addtolist" onclick="onClickLocationInfoBucketList(this)" title="<?php echo _lang("BUCKET LIST"); ?>"></button>
					</div>
				</div>				
				<div id="locationInfoYouTube" <?php if( $pageType == "locations" || $pageType == "news" ) echo 'class="hide"';?>>

					<iframe style="width:100%;height:400px;" src="<?php echo $dataResult['ua_eye_video']; ?>" frameborder="0" allowfullscreen></iframe>

				</div>

				<div id="locationInfoCommentFirstItem">
				<?php if( count($dataCommentFirstItem)> 0 && $dataCommentFirstItem[0]['result'] > 0 ) {?>
						<div id="locationInfoCommentItem"  itemprop="review" itemscope itemtype="http://schema.org/Review">

							<input type="hidden" id="locationInfoCommentId" value="<?php echo $dataCommentFirstItem[0]['ua_location_comment']; ?>"/>

							<div id="locationInfoCommentItemPhoto" class="floatleft">

								<img src="<?php echo $dataCommentFirstItem[0]['ua_photo']; ?>"/>

							</div>

							<div id="locationInfoCommentItemUsername" class="floatleft marginLeft10" itemprop="author">

								<?php echo $dataCommentFirstItem[0]['ua_username']; ?>

							</div>
							<?php if($dataCommentFirstItem[0]['ua_comment_rate'] != "0"){?>
							<div id="locationInfoCommentItemUserRate" class="floatleft marginLeft20">
								<span>Оценка </span><button class="btn btn-success"><?php echo $dataCommentFirstItem[0]['ua_comment_rate']; ?>.0</button>
							</div>
							<?php }?>
									<div id="locationInfoCommentItemDate" class="floatright marginRight10" itemprop="datePublished">

										<?php echo $dataComment[$i]['ua_created_time']; ?>

									</div>
							<div class="floatleft marginLeft10">

								<p id="locationInfoCommentItemComment" itemprop="description">

									<?php echo $dataCommentFirstItem[0]['ua_comment']; ?>

								</p>											
								
									<div id="locationInfoCommentItemFooter">

									<div id="locationInfoCommentItemRating" class="floatright">

										<button class="btn btn-mini floatleft <?php if( $dataCommentFirstItem[0]['ua_liked'] == 1 ) echo "liked";?>" id="commentLikeArea" onclick="onLocationCommentLike(this)">

											&nbsp;<i class="icon-ok icon-blue marginTop0"></i>&nbsp;

											<span id="commentLike"><?php echo $dataCommentFirstItem[0]['ua_like_count']; ?></span>

										</button>

										<button class="btn btn-mini floatleft <?php if( $dataCommentFirstItem[0]['ua_liked'] == -1 ) echo "liked";?>" id="commentUnlikeArea" onclick="onLocationCommentUnlike(this)">

											&nbsp;<i class="icon-remove icon-red marginTop0"></i>&nbsp;

											<span id="commentUnlike"><?php echo $dataCommentFirstItem[0]['ua_unlike_count']; ?></span>

										</button>									

										<div class="clearboth"></div>

									</div>

									<div class="clearboth"></div>

								</div>	
								
							</div>
							
							<div class="clearboth"></div>

						</div>
						<?php
						}
						?>
				</div>
				<div id="locationInfoNearbyArea">

					<div id="locationInfoNearbyHeader">

						<?php echo _lang("NEARBY PLACES"); ?>

					</div>

					<div id="locationInfoNearbyList">

					<?php

					for( $i = 0; $i < count( $dataNearbyList ); $i ++ ){ 

					?>

						<div id="locationInfoNearbyItem" class="floatleft">

							<a href="<?php echo "/$pageType/".str_replace(" ","-", UA_translateEn($dataNearbyList[$i]['ua_location_title']))."/".base64_encode($dataNearbyList[$i]['ua_location'])?>" class="js-link">

								<div id="locationInfoNearbyItemImage" class="floatleft" style="position:relative;">

									<img id="locationInfoNearbyItemImageObject" src="<?php echo $dataNearbyList[$i]['ua_location_photo'];?>"/>

									<div id="locationInfoNearbyItemDistance">

									<?php echo $dataNearbyList[$i]['distance']." Km";?>

									</div>

								</div>

								<div id="locationInfoNearbyItemBody" class="floatleft marginLeft10">

									<div id="locationInfoNearbyItemTitle"><?php echo $dataNearbyList[$i]['ua_location_title'];?></div>

									<div id="locationInfoNearbyItemSubTitle"><?php echo $dataNearbyList[$i]['ua_location_subtitle'];?></div>

								</div>

								<div class="clearboth"></div>

							</a>

						</div>

					<?php }

						if( count( $dataNearbyList ) == 0){

							echo "<div class='noPlace'>There is no place.</div>";

						}

					?>

						<div class="clearboth"></div>

					</div>
					<div id="nearbyListLoadMore" class="pagination-centered">
						<button class="btn btn-mini btn-default">Еще...</button>
					</div>
				</div>
				<div id="locationInfoBody">


					<?php

					$locationDesc = $dataResult['ua_location_description'];

					$locationDesc = preg_replace_callback('~<a(.*?)\s+href="(.*?)"(.*?)>(.*?)</a>~i', function($m){

						return sprintf('<a rel="nofollow" target="_blank" href="/external.php?url=%s"%s>%s</a>', urlencode($m[2]), $m[3], $m[4]);

					}, $locationDesc);

					?>

					<div id="locationInfoDescription" >

						<b><?php echo $dataResult['ua_location_title'];?></b>&nbsp;-&nbsp;<?php echo $locationDesc;?>

					</div>

					<div id="locationInfoPlace" <?php if( $pageType == "news" || $pageType == "eye") echo 'class="hide"';?>>
						<div class="floatleft" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">

							<div style="width: 320px;">

								<i class="icon-home"></i><span id="locationInfoTitle2">&nbsp;<?php echo $dataResult['ua_location_title'];?></span>

							</div>
							<div id="locationInfoAddress" itemprop="addressLocality">

								<?php echo $dataResult['ua_location_street_address']." ".$dataResult['ua_location_state']." ".$dataResult['ua_location_country'];?>

							</div>
						</div>

						

						<div class="floatright" style="width: 180px;">

							<p>

								<i class="icon-envelope"></i>&nbsp;<span id="locationInfoPhone" itemprop="telephone"><?php echo $dataResult['ua_location_phone'];?></span>

							</p>

							<p>

								<?php

								$websiteUrl = $dataResult['ua_location_website'];

								if( substr($websiteUrl, 0, 4) != "http" )

									$websiteUrl = "http://".$websiteUrl;

								$websiteUrl = "/external.php?url=".urlencode( $websiteUrl );

								?>

								<i class="icon-certificate"></i>&nbsp;<a rel="nofollow" target="_blank" href="<?php echo $websiteUrl;?>" id="locationInfoWebSite"><?php echo _lang("Visit Website"); ?></a>

							</p>

						</div>

						<div class="clearboth"></div>
					</div>
					<div id="mainDescriptionRating" style="with: 100%;">
						<div id="locationDescriptionItemRating" class="floatright">
							<button class="btn btn-mini floatleft <?php  if( $dataMainDescriptionRating[0]['ua_liked'] == 1 ) echo "liked";?>" id="descriptionLikeArea" onclick="onMainDescriptionLike(this)">

								&nbsp;<i class="icon-ok icon-blue marginTop0"></i>&nbsp;

								<span id="commentLike"><?php  echo $dataMainDescriptionRating[0]['ua_like_count']; ?></span>

							</button>

							<button class="btn btn-mini floatleft <?php  if( $dataMainDescriptionRating[0]['ua_liked'] == -1 ) echo "liked";?>" id="descriptionUnlikeArea" onclick="onMainDescriptionUnlike(this)">

								&nbsp;<i class="icon-remove icon-red marginTop0"></i>&nbsp;

								<span id="commentUnlike"><?php echo $dataMainDescriptionRating[0]['ua_unlike_count']; ?></span>

							</button>									

							<div class="clearboth"></div>

						</div>
					</div>    
				</div>

				<div id="newsInfoPlace" <?php if( $pageType == "locations" || $pageType == "eye") echo 'class="hide"';?>>

						<div class="floatleft">

							<p>

								<b><?php echo _lang("Region"); ?>: </b>

								<span id="newsInfoRegion"><?php echo $dataResult['ua_news_region'];?></span>

							</p>

							<p>

								<b><?php echo _lang("Who"); ?>: </b>

								<span id="newsInfoWho"><?php echo $dataResult['ua_news_who'];?></span>

							</p>

							<p>

								<b><?php echo _lang("What"); ?>: </b>

								<span id="newsInfoWhat"><?php echo $dataResult['ua_news_what'];?></span>

							</p>

						</div>

						<div class="floatright">

							<p>

								<b><?php echo _lang("Where"); ?>: </b>

								<span id="newsInfoWhere"><?php echo $dataResult['ua_news_where'];?></span>

							</p>

							<p>

								<b><?php echo _lang("When"); ?>: </b>

								<span id="newsInfoWhen"><?php echo $dataResult['ua_news_when'];?></span>

							</p>							

							<p>

								<b><?php echo _lang("BDA"); ?>: </b>

								<span id="newsInfoBda"><?php echo $dataResult['ua_news_bda'];?></span>

							</p>
							
							<p>

							<b><?php echo _lang("Action Taken"); ?>: </b>

							<span id="newsInfoActionTaken"><?php echo $dataResult['ua_news_action_taken'];?></span>

							</p>

						</div>

						<div class="clearboth"></div>							

					</div>	

				

	

		

				<div id="locationInfoComment">
					<div id="locationInfoCommentWrite">
					<img src="<?php if( UA_isLogin() ) echo $photo; else echo NO_PROFILE_PHOTO;?>" id="locationInfoPhoto">

					<h5 class="floatleft" style="margin-left: 10px;margin-top:5px;"><?php echo _lang("COMMENTS"); ?></h5>

					<div class="clearboth"></div>

					<textarea id="locationInfoCommentText" rows="3" placeholder="<?php echo _lang('Got a trip/review/awesome factoid about this place? Please share!');?>"></textarea>
					<div class="location-comment-rate-wrap floatleft">
						<span style="margin-left: 10px;">Ваш рейтинг: </span>
						<button class="btn btn-default " id="locationCommentRate">1</button>
						<button class="btn btn-default " id="locationCommentRate">2</button>
						<button class="btn btn-default " id="locationCommentRate">3</button>
						<button class="btn btn-default " id="locationCommentRate">4</button>
						<button class="btn btn-default " id="locationCommentRate">5</button>
					</div>
					<button class="btn btn-primary floatright" id="locationInfoBtnSend" onclick="onClickLocationInfoComment(this)"><?php echo _lang("SEND"); ?></button>

					<div class="clearboth"></div>
					</div>
					<div id="locationInfoCommentList">
					<?php 
						for ( $i = 0; $i < count( $dataComment ); $i++ ) { 
					?>

						<div id="locationInfoCommentItem" class="<?php  if ($dataComment[$i]['ua_comment'] == '') echo 'hide';?>" itemprop="review" itemscope itemtype="http://schema.org/Review">

							<input type="hidden" id="locationInfoCommentId" value="<?php echo $dataComment[$i]['ua_location_comment']; ?>"/>

							<div id="locationInfoCommentItemPhoto" class="floatleft">

								<img src="<?php echo $dataComment[$i]['ua_photo']; ?>"/>

							</div>

							<div id="locationInfoCommentItemUsername" class="floatleft marginLeft10" itemprop="author">

								<?php echo $dataComment[$i]['ua_username']; ?>

							</div>
							<?php if($dataComment[$i]['ua_comment_rate'] != "0"){?>
							<div id="locationInfoCommentItemUserRate" class="floatleft marginLeft20">
								<span>Оценка </span><button class="btn btn-success"><?php echo $dataComment[$i]['ua_comment_rate']; ?>.0</button>
							</div>
							<?php }?>
									<div id="locationInfoCommentItemDate" class="floatright marginRight10" itemprop="datePublished">

										<?php echo $dataComment[$i]['ua_created_time']; ?>

									</div>	
							<div class="floatleft marginLeft10">

								<p id="locationInfoCommentItemComment" itemprop="description">

									<?php echo $dataComment[$i]['ua_comment']; ?>

								</p>								

									<div id="locationInfoCommentItemFooter">

									<div id="locationInfoCommentItemRating" class="floatright">

										<button class="btn btn-mini floatleft <?php if( $dataComment[$i]['ua_liked'] == 1 ) echo "liked";?>" id="commentLikeArea" onclick="onLocationCommentLike(this)">

											&nbsp;<i class="icon-ok icon-blue marginTop0"></i>&nbsp;

											<span id="commentLike"><?php echo $dataComment[$i]['ua_like_count']; ?></span>

										</button>

										<button class="btn btn-mini floatleft <?php if( $dataComment[$i]['ua_liked'] == -1 ) echo "liked";?>" id="commentUnlikeArea" onclick="onLocationCommentUnlike(this)">

											&nbsp;<i class="icon-remove icon-red marginTop0"></i>&nbsp;

											<span id="commentUnlike"><?php echo $dataComment[$i]['ua_unlike_count']; ?></span>

										</button>									

										<div class="clearboth"></div>

									</div>							

									<div class="clearboth"></div>

								</div>
					
							</div>

							<div class="clearboth"></div>

						</div>

						<?php } ?>	
					
					</div>				
					<div id="commentListLoadMore" class="pagination-centered">
						<button class="btn btn-mini btn-default">Еще...</button>
					</div>
				</div>

				<div id="locationInfoCategoryList">

					<?php for( $i = 0; $i < count( $dataCategory ); $i++ ){

							$subCategoryName =  UA_translateEn($dataCategory[$i]['ua_name']);

							$subCategoryName = str_replace(" ", "-", $subCategoryName);

							if( $pageType == "places" ){

								$categoryType = "places";

							}else if( $pageType == "news"){

								$categoryType = "newsCategory";

							}else if( $pageType == "eye"){

								$categoryType = "eyeCategory";

							}

						?>
						
						<a class="js-link" href="<?php echo "/$categoryType/".$subCategoryName."/".base64_encode($dataCategory[$i]['ua_place_subcategory']);?>"><div id="locationInfoCategoryItem"><?php echo _lang($dataCategory[$i]['ua_name'])?></div></a>
						
					<?php }?>

					

					<div class="clearboth"></div>

				</div>

				<?php require("footer.php"); ?>

			</div>

		</div>

	</div>

	
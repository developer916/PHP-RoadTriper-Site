	<?php
		$titleSuffix = "Украина-1";
		$description = "Все самое красивое, самое оперативное, на картах. Добавить место на карту. ".SITE_NAME;
		$title = SITE_NAME;
		$keywords = "";
		
   		$currentURL = $_SERVER["REQUEST_URI"];
    	$arrURL = explode("/", $currentURL );
    	$pageType = $arrURL[1];
		if( $pageType == "trips" || $pageType == "locations" || $pageType == "news" || $pageType == "eye" || $pageType == "pages" 
    			|| $pageType == "blogs" || $pageType == "group" || $pageType == "places" || $pageType == "placesList" 
    			|| $pageType == "newsList" || $pageType == "newsCategory" || $pageType == "eyeList" || $pageType == "eyeCategory" || $pageType == "addPlace" || $pageType == "editPlace" 
				|| $pageType == "myPlaces" || $pageType == "profile" || $pageType == "newsAnalytics"
				|| $currentURL == "/" ){
    		$userId = UA_getCookie("UA_USER");
    		if( $pageType == "myPlaces"){
    			$sql = "select * from ua_location where ua_location_type = 1 and ua_created_by = $userId order by ua_updated_time desc";
    			$dataResult = $db->queryArray( $sql );
    			$isNormal = "Y";
    		}else if( $pageType == "editPlace" ){
    			$id = $arrURL[2];
    			$id = base64_decode($id);
    			
				$sql = "select t1.*, (ifnull( t2.ua_score, 0) + t1.ua_location_score) as ua_location_like_score, ifnull( t3.ua_like, 0) as ua_like_type
				          from ua_location t1
				          left join ( select sum( ua_like ) ua_score, ua_location from ua_user_location_like group by ua_location ) t2 
				            on t1.ua_location = t2.ua_location
				          left join ua_user_location_like t3
				            on t1.ua_location = t3.ua_location and t3.ua_user = '$userId'
				  	     where t1.ua_location = '$id'
						   and t1.ua_location_type = 1";
    			$dataResult = $db->queryArray( $sql );
    			if( $dataResult == null ){
    				$isNormal = "N";
    			}else{
    				$dataResult = $dataResult[0];
    				$isNormal = "Y";
    				$title = str_replace( " ", "-", $dataResult['ua_location_title'] );
    			}
    		}else if( $pageType == "eyeCategory"){
    			$id = $arrURL[3];
    			$id = base64_decode($id);
    			
    			$sql = "select ua_location_title, ua_location from ua_location where ua_eye_category = $id";
    			$dataResult = $db->queryArray( $sql );
    			
    			if( $dataResult == null )
    				$isNormal = "N";
    			else{
    				$sql = "select ua_title, ua_meta_description from ua_eye_category where ua_eye_category = $id";
    				$dataGroupTitle = $db->queryArray( $sql );
					$dataECategoryMeta = $dataGroupTitle[0]['ua_meta_description'];
    				$dataGroupTitle = $dataGroupTitle[0]['ua_title'];
					$description = $dataECategoryMeta;
    				if( str_replace(" ", "-", UA_translateEn($dataGroupTitle)) == UA_translateEn($arrURL[2]) ){
    					$isNormal = "Y";
    					$keywords = $dataGroupTitle;
    					$title = $dataGroupTitle;    					
    				}else{
    					$isNormal = "N";
    				}
    			}
    		}else if( $pageType == "newsCategory"){
    			$id = $arrURL[3];
    			$id = base64_decode($id);
    			
    			$sql = "select ua_location_title, ua_location from ua_location where ua_news_category = $id";
    			$dataResult = $db->queryArray( $sql );
    			

    			if( $dataResult == null )

    				$isNormal = "N";

    			else{

    				$sql = "select ua_title, ua_meta_description from ua_news_category where ua_news_category = $id";

    				$dataGroupTitle = $db->queryArray( $sql );
					$dataNCategoryMeta = $dataGroupTitle[0]['ua_meta_description'];
					$description = $dataNCategoryMeta;
    				$dataGroupTitle = $dataGroupTitle[0]['ua_title'];
    				// if( strtolower(str_replace(" ", "-", UA_translateEn($dataGroupTitle))) == strtolower(UA_translateEn($arrURL[2])) ){
    				if( str_replace(" ", "-", UA_translateEn($dataGroupTitle)) == UA_translateEn($arrURL[2]) ){
    					$isNormal = "Y";

    					$keywords = $dataGroupTitle;

    					$title = $dataGroupTitle;    					
    				}else{
    					$isNormal = "N";
    				}

    			}
    		}else if( $pageType == "group"){
    			$id = $arrURL[3];
    			$id = base64_decode($id);
    			$sql = "select t1.* from ua_place_subcategory t1 where t1.ua_place_category = $id";

    			$dataResult = $db->queryArray( $sql );

    			if( $dataResult == null )

    				$isNormal = "N";

    			else{
    				$sql = "select ua_name, ua_meta_description from ua_place_category where ua_place_category = $id";
    				$dataGroupTitle = $db->queryArray( $sql );
					$dataPCategoryMeta = $dataGroupTitle[0]['ua_meta_description'];
					$description = $dataPCategoryMeta;
    				$dataGroupTitle = $dataGroupTitle[0]['ua_name'];
    				// if( strtolower(str_replace(" ", "-", UA_translateEn($dataGroupTitle))) == strtolower(UA_translateEn($arrURL[2])) ){
    				if( str_replace(" ", "-", UA_translateEn($dataGroupTitle)) == UA_translateEn($arrURL[2]) ){	
    					$isNormal = "Y";

    					$keywords = $dataGroupTitle;

    					$title = $dataGroupTitle;    					
    				}else{
    					$isNormal = "N";
    				}



    			}
    		}else if( $pageType == "places"){
    			$id = $arrURL[3];
    			$id = base64_decode($id);
    			
//    			$sql = "select ua_name from ua_place_subcategory where ua_place_subcategory = $id";

//    			$dataResult = $db->queryArray( $sql );

    			$sql = "select ua_location_title, ua_location from ua_location where ua_place_subcategory = $id";
    			$dataResult = $db->queryArray( $sql );


    			if( $dataResult == null )
    				$isNormal = "N";
    			else{
    				$sql = "select ua_name, ua_meta_description from ua_place_subcategory where ua_place_subcategory = $id";
    				$dataGroupTitle = $db->queryArray( $sql );
					$dataPSubCategoryMeta = $dataGroupTitle[0]['ua_meta_description'];
					$description = $dataPSubCategoryMeta;
    				$dataGroupTitle = $dataGroupTitle[0]['ua_name'];
    				if( str_replace(" ", "-", UA_translateEn($dataGroupTitle) ) == UA_translateEn($arrURL[2]) ){
    					$isNormal = "Y";

    					$keywords = $dataGroupTitle;

    					$title = _lang($dataGroupTitle);    					
    				}else{
    					$isNormal = "N";
    				}
    			}
    		}else if( $pageType == "trips" ){
				$id = $arrURL[2];
				$id = base64_decode($id);
				
				$sql = "select * from ua_plan_trip where ua_plan_trip = '$id'";
				$result = $db->queryArray( $sql );
				if( $result == null )
					$isNormal = "N";
				else{
					$sql = "select * from ua_user_trip where ua_plan_trip = '$id'";
					$result = $db->queryArray( $sql );
					if( $result != null ){
						$title = $result[0]['ua_page_title'];
					}
					$isNormal = "Y";
				}
			}else if( $pageType == "locations" || $pageType == "news" || $pageType == "eye" ){
			    $containerOverlayShow = "display:block;";
				$id = $arrURL[3];
				$id = base64_decode($id);
				$sql = "select t1.*, (ifnull( t2.ua_score, 0) + t1.ua_location_score) as ua_location_like_score, ifnull( t3.ua_like, 0) as ua_like_type
				    		 , hour(timediff( t1.ua_top_last_time, now())) as ua_hour
    			 			 , minute(timediff( t1.ua_top_last_time, now())) as ua_minute
    			 			 , second(timediff( t1.ua_top_last_time, now())) as ua_second
    			 			 , if(t1.ua_top_last_time > now(), 1, 0 ) as ua_highlight
				          from ua_location t1
				          left join ( select sum( ua_like ) ua_score, ua_location from ua_user_location_like group by ua_location ) t2 
				            on t1.ua_location = t2.ua_location
				          left join ua_user_location_like t3
				            on t1.ua_location = t3.ua_location and t3.ua_user = '$userId'
				  	     where t1.ua_location = '$id'";
				if( $pageType == "locations" )
					$sql .= "  and t1.ua_location_type = 1";
				else if( $pageType == "news" )
					$sql .= "  and t1.ua_location_type = 4";
				else if( $pageType == "eye" )

					$sql .= "  and t1.ua_location_type = 5";
				
				$result = $db->queryArray( $sql );
				if( $result == null )
					$isNormal = "N";
				else{
					$isNormal = "Y";
					$dataResult = $result[0];
					$description = $dataResult['ua_location_description'];
					$keywords = $dataResult['ua_keywords'];
					$locationId = $dataResult['ua_location'];
					$title = $dataResult['ua_location_title'];
					// if( strtolower(str_replace(" ", "-", UA_translateEn($title))) == strtolower(UA_translateEn($arrURL[2])) ){
					if( str_replace(" ", "-", UA_translateEn($title)) == UA_translateEn($arrURL[2]) ){
						$sql = "SELECT r1.*, (r1.ua_like_count - r1.ua_unlike_count) AS result 
						          FROM (
    						        select t1.*, ifnull(t2.ua_like, 0) ua_like_count, ifnull(t2.ua_unlike, 0) ua_unlike_count, ifnull( t3.ua_like, 0) ua_liked
    								  from
    									(
    									select t1.*, t2.ua_photo, t2.ua_username
    									  from ua_location_comment t1, ua_user t2
    									 where t1.ua_location = $locationId
    									   and t1.ua_user = t2.ua_user
    									   and if(t1.ua_comment != '', true, false)
    									) t1 left join
    									(
    									select sum(if(ua_like = 1, 1, 0)) ua_like, sum(if(ua_like = -1, 1, 0)) ua_unlike, ua_comment
    									  from ua_user_comment_like
    									 where ua_comment_type = 1
    									group by ua_comment
    									) t2 on t1.ua_location_comment = t2.ua_comment
    									left join
    									(
    								   select ua_like, ua_comment
    									 from ua_user_comment_like
    								 	where ua_comment_type = 1
    									  and ua_user = '$userId'
    									) t3
    									on t1.ua_location_comment = t3.ua_comment
    								order by t1.ua_created_time desc
								)r1 ORDER BY result DESC LIMIT 1";
						$dataCommentFirstItem = $db->queryArray( $sql );
						if( $dataCommentFirstItem == null )
							$dataCommentFirstItem = array( );
						$sql = "select t1.*, t2.ua_photo, t2.ua_username
						          from ua_location_comment t1, ua_user t2
						         where t1.ua_location = $locationId
						           and t1.ua_user = t2.ua_user
						           and if(t1.ua_comment != '', false, true) 
						           order by t1.ua_created_time desc";
						$dataCommentNull = $db->queryArray( $sql );
						$commentCnt = count($dataCommentNull) + 10;
						$sql="
						select t1.*, ifnull(t2.ua_like, 0) ua_like_count, ifnull(t2.ua_unlike, 0) ua_unlike_count, ifnull( t3.ua_like, 0) ua_liked
						  from
							(
							select t1.*, t2.ua_photo, t2.ua_username
							  from ua_location_comment t1, ua_user t2
							 where t1.ua_location = $locationId
							   and t1.ua_user = t2.ua_user
							 order by t1.ua_created_time desc
							) t1 left join
							(
							select sum(if(ua_like = 1, 1, 0)) ua_like, sum(if(ua_like = -1, 1, 0)) ua_unlike, ua_comment
							  from ua_user_comment_like
							 where ua_comment_type = 1
							 group by ua_comment
							) t2 on t1.ua_location_comment = t2.ua_comment 
							left join 
							(
							select ua_like, ua_comment
						          from ua_user_comment_like
							 where ua_comment_type = 1
							   and ua_user = '$userId'
							) t3
							on t1.ua_location_comment = t3.ua_comment
						 order by t1.ua_created_time desc limit $commentCnt						
						";
						$dataComment = $db->queryArray( $sql );
						if( $dataComment == null )
						    $dataComment = array( );
						$sql = "SELECT IFNULL(t2.ua_like, 0) ua_like_count, IFNULL(t2.ua_unlike, 0) ua_unlike_count, IFNULL( t3.ua_like, 0) ua_liked
                                  FROM
                                	(
                                	SELECT SUM(IF(ua_like = 1, 1, 0)) ua_like, SUM(IF(ua_like = -1, 1, 0)) ua_unlike, ua_comment, ua_location
                                	  FROM ua_user_comment_like
                                	 WHERE ua_comment_type = 1
                                	  AND ua_location = '$locationId'
                                	 GROUP BY ua_location
                                	) t2
                                	LEFT JOIN 
                                	(
                                	SELECT ua_like, ua_comment, ua_location, ua_created_time
                                	  FROM ua_user_comment_like
                                	 WHERE ua_comment_type = 1
                                	   AND ua_user = '$userId'
                                	) t3
                                	ON t3.ua_location = '$locationId'
                                 ORDER BY t3.ua_created_time DESC";
						$dataMainDescriptionRating = $db->queryArray( $sql );
						if( $dataMainDescriptionRating == null ){
						    $dataMainDescriptionRating = array( );
						    $dataMainDescriptionRating[0]['ua_like_count'] = 0;
						    $dataMainDescriptionRating[0]['ua_unlike_count'] = 0;
						    
						}
						//get location comment rate statstics
						 $sql = "SELECT COUNT(ua_comment_rate) AS cntRates, ROUND(AVG(ua_comment_rate), 1) AS avgRates 
						           FROM ua_location_comment 
						          WHERE ua_created_time IN ( SELECT MAX(ua_created_time) FROM ua_location_comment WHERE ua_comment_rate > 0 AND ua_location = $locationId GROUP BY ua_user )
						          ORDER BY ua_created_time DESC";
                         $avgUserCommentRate = $db->queryArray($sql);
                         if( $avgUserCommentRate == null )
                             $avgUserCommentRate = array( );
//                          foreach ($avgUserCommentRate as $k => $v) {
//                              $commentTotalRate += $v['avgRates'];
//                          }
//                          $commentCntRates = count($avgUserCommentRate);
//                          $commentAvgRate = round(($commentTotalRate / $commentCntRates), 1);

						if( $dataResult['ua_location_type'] == 1 ){
							$placeCategoryId = $dataResult['ua_place_subcategory'];
							$sql = "select t1.ua_place_subcategory, t1.ua_name, t2.ua_category_image, ua_category_marker
									  from ua_place_subcategory t1, ua_place_category t2
									 where t1.ua_place_subcategory = $placeCategoryId
									   and t1.ua_place_category = t2.ua_place_category";
						}else if( $dataResult['ua_location_type'] == 4 ){
							$newsCategoryId = $dataResult['ua_news_category'];
							$sql = "select ua_news_category as ua_place_subcategory, ua_title as ua_name, ua_category_image, ua_category_marker
									  from ua_news_category
									 where ua_news_category = $newsCategoryId";
						}else if( $dataResult['ua_location_type'] == 5 ){
							$eyeCategoryId = $dataResult['ua_eye_category'];
							$sql = "select ua_eye_category as ua_place_subcategory, ua_title as ua_name, ua_category_image, ua_category_marker
									  from ua_eye_category
									 where ua_eye_category = $eyeCategoryId";
						}

						$dataCategory = $db->queryArray( $sql );
						
						$lat = $dataResult['ua_location_lat'];

						$lon = $dataResult['ua_location_lon'];

						
						if( $pageType == "locations" ) $locationType = 1;
						if( $pageType == "news" ) $locationType = 4;
						if( $pageType == "eye" ) $locationType = 5;

						$sql = "

						select distance( $lat, $lon, ua_location_lat, ua_location_lon ) distance, ua_location, ua_location_title, ua_location_subtitle, ua_location_photo

						  from ua_location

						 where ua_location_type = $locationType

						   and ua_location != $locationId";
						if( $locationType == 1 ){

							$sql.= " and ua_place_subcategory = ".$dataResult['ua_place_subcategory'];

						}else if( $locationType == 4 ){

							$sql.= " and ua_news_category = ".$dataResult['ua_news_category'];

						}else if( $locationType == 5 ){

							$sql.= " and ua_eye_category = ".$dataResult['ua_eye_category'];

						}
						$sql.="

						 order by distance * 1 asc

						 limit 6";


						$dataNearbyList = $db->queryArray( $sql );

						if( $dataNearbyList == null )

							$dataNearbyList = array( );						
					}else{
						$isNormal = "N";
					}


				}
			}else if( $pageType == "blogs" ){
				$id = $arrURL[3];
				if( $id == "all" && $arrURL[2] == "category" ){
					$isNormal = "Y";
					$description = "This is blog list.";
					
					$sql = "
					    select t1.*, t2.ua_title as ua_blog_title, datediff( now(), t1.ua_created_time ) as ua_day_ago
					      from ua_blog t1, ua_blog_category t2
					     where t1.ua_blog_category = t2.ua_blog_category
						 order by t1.ua_created_time desc";
					$dataResult = $db->queryArray( $sql );
					$pageType = "blogsThumb";
				}else if( $arrURL[2] == "category" ){
					$id = base64_decode($id);
					$sql = "select * from ua_blog_category where ua_blog_category = '$id'";
					$result = $db->queryArray( $sql );
					
					if( $result == null )
						$isNormal = "N";
					else{
						$dataBCategoryMeta = $result[0]['ua_meta_description'];
						$description = $dataBCategoryMeta;
						$title = $result[0]['ua_title'];
						$isNormal = "Y";
						//$description = "This is blog list of ".$result[0]['ua_title'];
						
						$sql = "

						    select t1.*, t2.ua_title as ua_blog_title, datediff( now(), t1.ua_created_time ) as ua_day_ago

						      from ua_blog t1, ua_blog_category t2

						     where t1.ua_blog_category = t2.ua_blog_category

							   and t1.ua_blog_category = $id
							 order by t1.ua_created_time desc";

						$dataResult = $db->queryArray( $sql );
						$pageType = "blogsThumb";
					}
				}else{
					$id = base64_decode($id);
					$sql = "

						select t1.*, t2.ua_title ua_blog_title, datediff( now(), t1.ua_created_time ) as ua_day_ago, t3.ua_username as ua_username

						  from ua_blog t1, ua_blog_category t2, ua_user t3

						 where t1.ua_blog_category = t2.ua_blog_category

						   and t1.ua_user = t3.ua_user

						   and t1.ua_blog = $id";
										
					$dataResult = $db->queryArray( $sql );
					if( $dataResult == null )
						$isNormal = "N";
					else{
						// if( str_replace(" ", "-", UA_translateEn($dataResult[0]['ua_title']))) == strtolower(UA_translateEn($arrURL[2])) ){

						if( str_replace(" ", "-", UA_translateEn($dataResult[0]['ua_title'])) == UA_translateEn($arrURL[2]) ){

							$sql="
								select t1.*, ifnull(t2.ua_like, 0) ua_like_count, ifnull(t2.ua_unlike, 0) ua_unlike_count, ifnull( t3.ua_like, 0) ua_liked
								  from
									(
									select t1.*, t2.ua_photo, t2.ua_username
									  from ua_blog_comment t1, ua_user t2
									 where t1.ua_blog = $id
									   and t1.ua_user = t2.ua_user
									) t1 left join
									(
									select sum(if(ua_like = 1, 1, 0)) ua_like, sum(if(ua_like = -1, 1, 0)) ua_unlike, ua_comment
									  from ua_user_comment_like
									 where ua_comment_type = 2
									 group by ua_comment
									) t2 on t1.ua_blog_comment = t2.ua_comment 
									left join 
									(
									select ua_like, ua_comment
								          from ua_user_comment_like
									 where ua_comment_type = 2
									   and ua_user = '$userId'
									) t3
									on t1.ua_blog_comment = t3.ua_comment
								 order by t1.ua_created_time desc							
								";

								$dataComment = $db->queryArray( $sql );						
								
								$dataResult = $dataResult[0];
								$isNormal = "Y";
								$description = $dataResult['ua_content'];
								$keywords = $dataResult['ua_keywords'];
								$title = $dataResult['ua_title'];
		
								$pageType = "blog";
						}else{
							$isNormal = "N";
						}
								
					}
				}
			}else if( $pageType == "pages" ){
				$id = $arrURL[3];
				$id = base64_decode($id);
				$sql = "select t1.*, datediff( now(), t1.ua_created_time ) as ua_day_ago, t2.ua_username 
						  from ua_page t1, ua_user t2
						 where t1.ua_page = $id
						   and t1.ua_user = t2.ua_user";
				$result = $db->queryArray( $sql );
				if( $result == null )
					$isNormal = "N";
				else{
					$isNormal = "Y";
					$pageTitle = $result[0]['ua_title'];
					$pageContent = $result[0]['ua_content'];
					$pageUsername = $result[0]['ua_username'];
					$pageDayAgo = $result[0]['ua_day_ago'];
					$title = $pageTitle;
				}
			}else if( $pageType == "placesList" || $pageType == "newsList" || $pageType == "eyeList" ){
				$isNormal = "Y";
			}else if( $pageType == "addPlace"){
				if( UA_isLogin() )
					$isNormal = "Y";
				else{
					$isNormal = "Y";
					// echo "<script>If you want to edit your location in the future - please register.</script>";
					// echo "<script>window.location.href='index.php'</script>";
				}
			}else{
				$isNormal = "Y";
			}
		}else{
			$isNormal = "N";
		}
		if( $isNormal == "Y" ){
	?>		<link rel="shortcut icon" href="/favicon.ico">
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    			
	    <title>
	    	<?php
			if( $title == SITE_NAME ) 
	    		echo $title; 
	    	else 
	    		echo $title." | ".$titleSuffix;
	    	?>
	    </title>
		<meta name="Description" content='<?php echo UA_html2text( $description );?>'>	
	<?php }else{?>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">	
    	<title><?php echo SITE_NAME?></title>
		<meta name="Description" content='This is Administrator Page'>	
	<?php }?>
	<meta name="Keywords" content="<?php echo SITE_KEYWORD.",".$keywords;?>">
	<meta name="Publisher" content="UA-1.com">
	<meta name="Copyright" content="<?php echo SITE_NAME?>. Copyright 2014. Все права защищены. Использование материалов данного сайта возможна только после согласования деталей с администрацией.">
	<meta name="Robots" content="index,follow">
	

    
	<meta property="og:image" content="<?php echo $dataResult['ua_location_photo'];?>" />    
    
    <link href="/css/bootstrap.css" rel="stylesheet" media="screen">
    <link href="/css/docs.css" rel="stylesheet" media="screen">
    <link href="/css/style.css" rel="stylesheet" media="screen">    
    <link href="/css/style_admin.css" rel="stylesheet" media="screen">
    <link rel='stylesheet' href="/css/datepicker.css" type='text/css' media='all'/>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/flick/jquery-ui.css" />    
    <link href='http://fonts.googleapis.com/css?family=Finger+Paint' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Lobster&subset=latin,cyrillic,cyrillic-ext,latin-ext' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans&subset=cyrillic-ext,latin' rel='stylesheet' type='text/css'>
    
    <script src="/js/jquery-1.9.1.js"></script>
    <script src="/js/jquery-ui-1.10.3.js"></script>    
    <script src="/js/jquery.form.js"></script>
    
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/bootstrap-datepicker.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/function.js"></script>
    <script src="/js/jquery.history.js"></script>
	<script src="/js/hoverintent.js"></script>
	
	<script type="text/javascript" src="/js/jquery.mousewheel-3.0.4.pack.js"></script>
    <link rel="stylesheet" href="/css/jquery.fancybox-1.3.4.css" type="text/css" media="screen" />
    <script src="/js/jquery.fancybox-1.3.4.js"></script>
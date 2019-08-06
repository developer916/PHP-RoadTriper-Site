// Display Searched Marker
function fnAddMarkerSearch( lat, lon, locationId ){
	  var pos = markerSearch.length;
	  var myLatlng = new google.maps.LatLng( lat, lon);
	  
	  var image = {
			    url: '/img/markerSearch.png',
			    size: new google.maps.Size(29, 40),
			    origin: new google.maps.Point(0,0),
			    anchor: new google.maps.Point(15, 37)
	  };
	  markerSearch[pos] = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      icon: image,
	      locationId : locationId
	  });
	  
	  map.setCenter(new google.maps.LatLng( lat, lon ) );
	  map.setZoom( 16 );
	  fnAddMarker( markerSearch[pos], "NORMAL" );
}

// Display Draw Marker and call "fnGetLocationInfoDetail" for display Location Detail Popup
// Parameter : pageId -> locationId
function fnOpenLocationDetailPopup( pageId ){
	var locationId = pageId;
    $.ajax({
        url: "/async-getLocationInfo.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, detail : '0' },
        success : function(data){
            if(data.result == "success"){
	  	    	  var lat = data.location.ua_location_lat;
		    	  var lon = data.location.ua_location_lon;
		    	  var locationId = data.location.ua_location;
		    	  var locationType = data.location.ua_location_type;
		    	  var myLatlng = new google.maps.LatLng( lat, lon);
		    	  var iconImage;
		    	  if( locationType == 1 )
		    		  iconImage = '/img/markerSearch.png';
		    	  else if( locationType == 4 )
		    		  iconImage = '/img/markerNews.png';
		    	  else if( locationType == 5 )
		    		  iconImage = '/img/markerEye.png';		    	  
		    	  var image = {
		    			    url: iconImage,
		    			    size: new google.maps.Size(30, 40),
		    			    origin: new google.maps.Point(0,0),
		    			    anchor: new google.maps.Point(15, 37)
		    	  			};
		    	  map.setCenter(new google.maps.LatLng( lat, lon ) );
					map.setZoom( 16 );
	    	  
		    	  markerSearch[ markerSearch.length ] = new google.maps.Marker({
		    	      position: myLatlng,
		    	      map: map,
		    	      icon: image,
		    	      locationId : locationId
		    	  });
		    	  if( locationType == 1 ){
		    		  fnAddMarker( markerSearch[ markerSearch.length - 1 ], "NORMAL" );		    		  
		    	  }else if( locationType == 4 ){
		    		  fnAddMarker( markerSearch[ markerSearch.length - 1 ], "NEWS" );
		    	  }else if( locationType == 5 ){
		    		  fnAddMarker( markerSearch[ markerSearch.length - 1 ], "EYE" );
		    	  }
		    		  
		    	  var locationTitle = data.location.ua_location_title;
		    	  var url = translateEn(locationTitle).split(" ").join("-");
		    	  var state;
		    	  
		    	  if( locationType == 1){
		    		  state = { id: data.location.ua_location, type : "locations" };
		    		  url = "/locations/" + url + "/" + base64_encode(data.location.ua_location);
		    	  }else if ( locationType == 4){
		    		  state = { id: data.location.ua_location, type : "news" };
		    		  url = "/news/" + url + "/" + base64_encode(data.location.ua_location);
		    	  }else if ( locationType == 5){
		    		  state = { id: data.location.ua_location, type : "eye" };
		    		  url = "/eye/" + url + "/" + base64_encode(data.location.ua_location);
		    	  }
		    	  ga('send', 'pageview', {'page': url, 'title': data.location.ua_location_title + " | " + titleSuffix});
		    	  History.replaceState(state, data.location.ua_location_title + " | " + titleSuffix, url );
		    	  
            }
        }
    });
}

// Display infobox on Marker
function fnGetLocationInfo( locationId, obj, option, type ){
    $.ajax({
        url: "/async-getLocationInfo.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, detail : '0' },
        success : function(data){
            if(data.result == "success"){
            	var uaLocationPhoto = data.location.ua_location_photo;
            	

            	var objInfobox;
            	if( $("#infobox").find("div#infoboxLocationTitle").text( "" ) ){
            		objInfobox = $("#cloneInfobox").clone();
            		objInfobox.attr("id","infobox");	            			
            		infobox.setContent( $(objInfobox).get(0) );
            	}else{
            		objInfobox = $("#infobox");
            	}
            	var url;
            	
            	if( type == "TRIP01" || type == "NORMAL" || type == "TRIP04" || type == "TRIP05"){
                	var arr = uaLocationPhoto.split("/");
                	var len = arr.length;
                	arr[ len ] = arr[ len - 1 ];
                	arr[ len - 1 ] = "small";
                	uaLocationPhoto = arr.join( "/" );
                	
            		$(objInfobox).find("div#infoboxLocationTitle").text( data.location.ua_location_title );
            		if( type == "TRIP04" || type == "TRIP05"){
            			$(objInfobox).find("div#infoboxLocationSubTitle").hide();
            		}else{
            			$(objInfobox).find("div#infoboxLocationSubTitle").show();
            			$(objInfobox).find("div#infoboxLocationSubTitle").text( data.location.ua_location_subtitle );	
            		}
            		$(objInfobox).find("input#infoboxLocationId").val( data.location.ua_location );
            		$(objInfobox).find("img#infoboxPhoto").attr("src", uaLocationPhoto );
            	}else if( type == "TRIP03" ){
            		$(objInfobox).find("div#infoboxLocationTitle").text( "via" );
            		$(objInfobox).find("div#infoboxLocationSubTitle").text( data.location.ua_location_lat + ", " + data.location.ua_location_lon );
            		$(objInfobox).find("input#infoboxLocationId").val( data.location.ua_location );
            		$(objInfobox).find("img#infoboxPhoto").attr("src", "/img/infoBoxVia.png" );
            	}else if( type == "NEWS" || "EYE"){
            		$(objInfobox).find("div#infoboxLocationTitle").text( data.location.ua_location_title );
            		$(objInfobox).find("div#infoboxLocationSubTitle").text( "" );
            		$(objInfobox).find("input#infoboxLocationId").val( data.location.ua_location );
            		$(objInfobox).find("img#infoboxPhoto").attr("src", uaLocationPhoto );
            	}

            	if( type == "NORMAL" || type == "NEWS" || type == "EYE" || type == "TRIP01" || type == "TRIP04" || type == "TRIP05"){
            		var prefix = "";
            		if( type == "NORMAL" )
            			prefix = "locations";
            		else if( type == "NEWS" )
            			prefix = "news";
            		else if( type == "EYE" )
            			prefix = "eye";
            		else if( type == "TRIP01" )
            			prefix = "locations";
            		else if( type == "TRIP04" )
            			prefix = "news";
            		else if( type == "TRIP05" )
            			prefix = "eye";
              	  	url = data.location.ua_location_title.split(" ").join("-");
              	  	url = "/" + prefix + "/" + translateEn(url) + "/" + base64_encode(data.location.ua_location);              	  	
              	  	$(objInfobox).find("a#infoboxBodyAreaOverlay").attr("href", url );
              	  	
              	  	$(objInfobox).find("a#infoboxBodyAreaOverlay").click(function (event){ 
              	  		event.preventDefault();
              	  		fnJsLink( this );
              	  	});
            	}else{
            		$(objInfobox).find("a#infoboxBodyAreaOverlay").hide();
            	}
        		
        		if( type == "TRIP01" || type == "TRIP03" || type == "TRIP04" || type == "TRIP05"){
        			$(objInfobox).find("#btnRemoveToTrip").show();
        			$(objInfobox).find("#btnAddToTrip").hide();
        			$(objInfobox).find("#btnBucketList").hide();
        		}else if( type == "NORMAL" ){
        			$(objInfobox).find("#btnRemoveToTrip").hide();
        			$(objInfobox).find("#btnAddToTrip").show();
        			$(objInfobox).find("#btnBucketList").show();
        		}else if( type == "NEWS" || type == "EYE" ){
        			$(objInfobox).find("#btnRemoveToTrip").hide();
        			$(objInfobox).find("#btnAddToTrip").show();
        			$(objInfobox).find("#btnBucketList").hide();
        			$(objInfobox).find("#btnAddToTrip").css("width", "100%");
        		}

        		if( option == 0 ){
        			$(objInfobox).find("#infoboxBtnArea").hide();
        		}else{
        			$(objInfobox).find("#infoboxBtnArea").show();            			
        		}
            	infobox.open(map, obj);
            }
        }
    });
}

// show News Detail Popup
function fnGetNewsInfoDetail( locationId ){
	
	$.ajax({
        url: "/async-getLocationInfo.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, detail : '1' },
        success : function(data){
            if(data.result == "success"){    
            	fnCreateSocialFB( window.location.href );
            	$("#locationInfo").find("#locationSocialPI").find("a").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(window.location.href) 
            			+ "&media=" + encodeURIComponent( "http://" + window.location.hostname + "/" + data.location.ua_location_photo )
            			+ "&description=" + encodeURIComponent(data.location.ua_location_title) );            	
            	fnCreateSocialTW( window.location.href );
            	fnCreateSocialGP( window.location.href );
            	
            	$("#locationInfo").find("#btnLocationDislike").removeClass("btnLocationDislike");
            	$("#locationInfo").find("#btnLocationDislike").find("i").removeClass("icon-white");
            	$("#locationInfo").find("#btnLocationLike").removeClass("btnLocationLike");
            	$("#locationInfo").find("#btnLocationLike").find("i").removeClass("icon-white");
            	$("#locationInfo").find("#locationLikeScore").text( data.location.ua_location_like_score );
            	
            	if( data.location.ua_location_like_score > 30 ){
            		$("#locationLikeArrow").css("-webkit-transform", "rotate(90deg)");
            		$("#locationLikeArrow").css("-moz-transform", "rotate(90deg)");            		
            	}else{
            		$("#locationLikeArrow").css("-webkit-transform", "rotate(" + String(90 / 30 * data.location.ua_location_like_score) +"deg)");
            		$("#locationLikeArrow").css("-moz-transform", "rotate(" + String(90 / 30 * data.location.ua_location_like_score) +"deg)");
            	}	
            		
            	
            	if( data.location.ua_like_type == 1 ){
                	$("#locationInfo").find("#btnLocationLike").addClass("btnLocationLike");
                	$("#locationInfo").find("#btnLocationLike").find("i").addClass("icon-white");            		
            	}else if( data.location.ua_like_type == -1 ){
                	$("#locationInfo").find("#btnLocationDislike").addClass("btnLocationDislike");
                	$("#locationInfo").find("#btnLocationDislike").find("i").addClass("icon-white");            		
            	}
            		
            	
            	$("#locationInfo").find("#locationInfoLocationId").val( data.location.ua_location );
            	$("#locationInfo").find("#locationPinLat").val( data.location.ua_location_lat );
            	$("#locationInfo").find("#locationPinLon").val( data.location.ua_location_lon );
            	
            	$("#locationInfo").find("#locationPinLat").val( data.location.ua_location_lat );
            	$("#locationInfo").find("#locationPinLon").val( data.location.ua_location_lon );
            	
            	$("#locationInfo").find("#locationInfoCategoryImage").html( '<img src="' + data.categoryList[0].ua_category_image + '" style="width:45px; height:45px; -webkit-filter: invert(100%);"/>' );
            	$("#locationInfo").find("#locationInfoTitle").html( data.location.ua_location_title );
            	var objDesc = $("<div></div>");
            	objDesc.html( data.location.ua_location_description );
            	var objA = objDesc.find("a");
            	for( var i = 0; i < objA.length; i ++ ){
            		var strHref = objA.eq(i).attr("href");
            		strHref = "/external.php?url=" + encodeURIComponent( strHref );
            		objA.eq(i).attr("href", strHref );
            		objA.eq(i).attr("target", "_blank" );
            	}
            	$("#locationInfo").find("#locationInfoDescription").html( "<b>" + data.location.ua_location_title + "</b>&nbsp;-&nbsp;" + objDesc.html() );            	
            	$("#locationInfo").find("#locationInfoTitle2").html( "&nbsp;" + data.location.ua_location_title );
            	$("#locationInfo").find("div#locationInfoImage").css( "background", "url('" + data.location.ua_location_photo + "') no-repeat center");
            	$("#locationInfo").find("div#locationInfoImage").css( "background-size", "cover");
            	$("#locationInfo").find("#newsInfoRegion").text( data.location.ua_news_region );
            	$("#locationInfo").find("#newsInfoWho").text( data.location.ua_news_who );
            	$("#locationInfo").find("#newsInfoWhat").text( data.location.ua_news_what );
            	$("#locationInfo").find("#newsInfoWhere").text( data.location.ua_news_where );
            	$("#locationInfo").find("#newsInfoWhen").text( data.location.ua_news_when );
            	$("#locationInfo").find("#newsInfoBda").text( data.location.ua_news_bda );
            	$("#locationInfo").find("#newsInfoActionTaken").text( data.location.ua_news_action_taken );
            	
            	$("a[rel=location_thumb]").attr("href", data.location.ua_location_photo );
            	
            	var tempImgThumbHtml = "";
				if(data.locationSmallThumb.length > 0){
					
					for (var i = 0 ; i < data.locationSmallThumb.length ; i ++) {
						tempImgThumbHtml += "<a rel='location_thumb' href='" + data.locationSmallThumb[i].ua_photo + "'>" +
								"<img src='" + data.locationSmallThumb[i].ua_photo + "'></a>";
					}
					for (var i = 0; i < (10 - data.locationSmallThumb.length); i ++){
						tempImgThumbHtml += "<a rel='location_thumb_default' >" +
								"<img src='/img/default/" + i + ".png'></a>";
					}
					$("#locationInfo").find("div.locationPrevSmallImages").html(tempImgThumbHtml);
				}else{
					for (var i = 0; i < 10; i ++){
						tempImgThumbHtml += "<a rel='location_thumb_default' >" +
								"<img src='/img/default/" + i + ".png'></a>";
					}
					$("#locationInfo").find("div.locationPrevSmallImages").html( tempImgThumbHtml );
				}
				DocInit.init();
				
				if(data.avgCommentRates != null && data.avgCommentRates.cntRates != "0"){
					$("#locationInfo").find("#locationAvgCommentRates").find("#avgUserRates").text(data.avgCommentRates.avgRates);
					$("#locationInfo").find("#locationAvgCommentRates").find("#cntRates").text(data.avgCommentRates.cntRates);
				}else{
					$("#locationInfo").find("#locationAvgCommentRates").find("#avgUserRates").text("3.0");
					$("#locationInfo").find("#locationAvgCommentRates").find("#cntRates").text("0");
				}
				
            	$("div#locationInfoNearbyList").html("");
            	for( var i = 0; i < data.nearbyList.length; i ++ ){
            		var objClone = $("#cloneLocationInfoNearbyItem").clone();
            		objClone.show();
            		objClone.attr("id", "locationInfoNearbyItem");
            		objClone.find("#locationInfoNearbyItemDistance").text( data.nearbyList[i].distance + " Km");
            		objClone.find("#locationInfoNearbyItemImage").find("img").attr("src", data.nearbyList[i].ua_location_photo );
            		objClone.find("#locationInfoNearbyItemTitle").html( data.nearbyList[i].ua_location_title );
            		objClone.find("#locationInfoNearbyItemSubTitle").html( data.nearbyList[i].ua_location_subtitle );
            		objClone.find("a.js-link").attr("href", "/news/" + translateEn(data.nearbyList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.nearbyList[i].ua_location ));
            		objClone.find("a.js-link").click(function (event){
                		event.preventDefault();
						fnJsLink( this );
	              	});
            		$("div#locationInfoNearbyList").append( objClone );
            	}
            	
            	if( data.nearbyList.length == 0 ){
            		$("div#locationInfoNearbyList").append($("<div class='noPlace'>" + _lang("There is no places.") + "</div>"));
            	}            	
            	$("div#locationInfoNearbyList").append($("<div class='clearboth'></div>"));           	
            	
            	$("div#locationInfoCommentFirstItem").html("");
            	//main description rating information
            	if (data.mainDescriptionRating != null) {
            		$("div#mainDescriptionRating").find("#commentLike").text( data.mainDescriptionRating.ua_like_count );
            		$("div#mainDescriptionRating").find("#commentUnlike").text( data.mainDescriptionRating.ua_unlike_count );
            		
            	}
            	if (data.mainDescriptionRating.ua_liked == 1) {
            		$("div#mainDescriptionRating").find("#descriptionLikeArea").addClass("liked");
        		} else if (data.mainDescriptionRating.ua_liked == -1) {
        			$("div#mainDescriptionRating").find("#descriptionLikeArea").addClass("liked");			
        		}	
            	mainDescriptionRatingAvg = data.mainDescriptionRating.ua_like_count * 1 - data.mainDescriptionRating.ua_unlike_count * 1;
            	mainDescriptionRatingAvg = mainDescriptionRatingAvg ? mainDescriptionRatingAvg : -1;
            	
            	if (data.commentFirstItem != null) 
            		firstCommentRatingAvg =  data.commentFirstItem.ua_like_count * 1 - data.commentFirstItem.ua_unlike_count * 1;
            	else
            		firstCommentRatingAvg = 0;
            	firstCommentRatingAvg = firstCommentRatingAvg ? firstCommentRatingAvg : 0;
            	
            	//comment first item information 
            	if (data.commentFirstItem != null && (mainDescriptionRatingAvg - firstCommentRatingAvg) <= 0) {
            		fnAddFirstCommentOnPopup( data.commentFirstItem.ua_location_comment, data.commentFirstItem.ua_photo, data.commentFirstItem.ua_username, data.commentFirstItem.ua_comment, data.commentFirstItem.ua_comment_rate,
            				data.commentFirstItem.ua_created_time, 1, data.commentFirstItem.ua_like_count, data.commentFirstItem.ua_unlike_count, data.commentFirstItem.ua_liked);
        		}
            	
            	$("div#locationInfoCommentList").html("");
            	if( data.commentList != null ){
                	for( var i = 0; i < data.commentList.length; i ++ ){
                		fnAddCommentOnPopup( data.commentList[i].ua_location_comment, data.commentList[i].ua_photo, data.commentList[i].ua_username, data.commentList[i].ua_comment, data.commentList[i].ua_comment_rate,
                				data.commentList[i].ua_created_time, 3, data.commentList[i].ua_like_count, data.commentList[i].ua_unlike_count, data.commentList[i].ua_liked);
                	}            		
            	}
            	if(!$("div#locationInfoCommentFirstItem").find("div#locationInfoCommentItem").length){
    	    		$("div#locationInfoCommentFirstItem").css("padding", "0px");
    	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
            	}else{
            		$("div#locationInfoCommentFirstItem").css("padding", "0px");
    	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
            	}
            	
            	if( data.categoryList != null ){
                	$("div#locationInfoCategoryList").html("");
                	var str = "";
                	for( var i = 0; i < data.categoryList.length; i ++ ){
                		str += '<a class="js-link" href="/newsCategory/' + translateEn(data.categoryList[i].ua_name).split(" ").join("-") + '/' + base64_encode( data.categoryList[i].ua_place_subcategory )+ '"><div id="locationInfoCategoryItem" data="' + data.categoryList[i].ua_place_subcategory + '">' + _lang(data.categoryList[i].ua_name) + '</div></a>';
                	}
                	str += '<div class="clearboth"></div>';
                	$("div#locationInfoCategoryList").html( str );   
                	
                	for( var i = 0; i < $("div#locationInfoCategoryList").find("a.js-link").length; i ++ ){
                		$("div#locationInfoCategoryList").find("a.js-link").eq(i).click(function (event){
                    		event.preventDefault();
   						 	fnJsLink( this );
   	              	 	});                		
                	}
            	}          
            	if (data.location.ua_location_street_address == null)
            		data.location.ua_location_street_address = "";
            	if( data.location.ua_location_state == null)
            		data.location.ua_location_state = "";
            	if ( data.location.ua_location_country == null )
            		data.location.ua_location_country = "";
            	var address = data.location.ua_location_street_address + " " + data.location.ua_location_state + " " + data.location.ua_location_country;
            	if ((data.location.ua_location_street_address != "" || data.location.ua_location_state != "" || data.location.ua_location_country != "") && address != "") {
            		$("#locationInfo").find("#locationInfoAddress2").find("p").show();
            		$("#locationInfo").find("#locationInfoAddress2").find("p").text( address );
            		$("#locationInfo").find("#locationInfoAddress2").width("220px");
            	} else {
            		$("#locationInfo").find("#locationInfoAddress2").css("width",'auto');
            		$("#locationInfo").find("#locationInfoAddress2").find("p").hide();
            	}
            	$("#locationInfo").find("#locationInfoAddress2").find("img").attr("src", data.categoryList[0].ua_category_marker );
            	
            	$("#locationInfo").find("#locationInfoSubTitle").hide();            	
            	$("#locationInfo").find("#locationInfoAddress").hide();
				//$("#locationInfo").find("#locationInfoAddress2").hide();
            	$("#locationInfo").find("#locationInfoPhone").hide();
            	$("#locationInfo").find("#locationInfoWebSite").hide();
            	$("#locationInfo").find("#locationInfoButton").hide();
            	$("#locationInfo").find("#locationInfoPlace").hide();
            	$("#locationInfo").find("div#newsInfoPlace").show();
            	$("#locationInfo").find("div#locationInfoYouTube").hide();
            	$("#locationInfo").find("div#locationUpToTop").hide();
            	
            	fnCloseAllPopup();
            	//containter background open 
            	$("div.container-overlay").show();
            	$("div.container-overlay").height(screen.height);
            	
            	$("#locationInfoContainer").show();
            	$("#modalBackgroundTransparent").show();
            	$("#socialPart").hide();
				$("#main_Panel_back_button").hide();
            	$("#globalIcon").hide();
            	$("#globalList").css("width", "0px");
            	$("#globalIcon").css("right", "0px");
            	isGlobal = false;
            	var tripIds = [];
            	var objTripList = $("#planTripLocationList").find("div#planTripLocationItem").find("#planTripLocationId");
            	for( var i = 0 ; i < objTripList.length; i ++ ){
            		tripIds[i] = objTripList.eq(i).val();
            	}
            	if( $.inArray( data.location.ua_location, tripIds ) == -1 ){
            		$("#locationInfoButton").find(".btnDeleteTrip").hide();
            		$("#locationInfoButton").find(".addtotrip").show();
            	}else{
            		$("#locationInfoButton").find(".btnDeleteTrip").show();
            		$("#locationInfoButton").find(".addtotrip").hide();            		
            	}  
            }
        }
    });
}

//show Eye Detail Popup
function fnGetEyeInfoDetail( locationId ){
	$.ajax({
        url: "/async-getLocationInfo.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, detail : '1' },
        success : function(data){
            if(data.result == "success"){
            	fnCreateSocialFB( window.location.href );
            	
            	////comment rate format
            	$("div#locationInfoCommentList").empty();
            	/////////
            	
            	$("#locationInfo").find("#locationSocialPI").find("a").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(window.location.href) 
            			+ "&media=" + encodeURIComponent( "http://" + window.location.hostname + "/" + data.location.ua_location_photo )
            			+ "&description=" + encodeURIComponent(data.location.ua_location_title) );            	
            	fnCreateSocialTW( window.location.href );
            	fnCreateSocialGP( window.location.href );
            	$("#locationInfo").find("#btnLocationDislike").removeClass("btnLocationDislike");
            	$("#locationInfo").find("#btnLocationDislike").find("i").removeClass("icon-white");
            	$("#locationInfo").find("#btnLocationLike").removeClass("btnLocationLike");
            	$("#locationInfo").find("#btnLocationLike").find("i").removeClass("icon-white");
            	$("#locationInfo").find("#locationLikeScore").text( data.location.ua_location_like_score );
            	
            	if( data.location.ua_location_like_score > 30 ){
            		$("#locationLikeArrow").css("-webkit-transform", "rotate(90deg)");
            		$("#locationLikeArrow").css("-moz-transform", "rotate(90deg)");            		
            	}else{
            		$("#locationLikeArrow").css("-webkit-transform", "rotate(" + String(90 / 30 * data.location.ua_location_like_score) +"deg)");
            		$("#locationLikeArrow").css("-moz-transform", "rotate(" + String(90 / 30 * data.location.ua_location_like_score) +"deg)");
            	}	
            		
            	
            	if( data.location.ua_like_type == 1 ){
                	$("#locationInfo").find("#btnLocationLike").addClass("btnLocationLike");
                	$("#locationInfo").find("#btnLocationLike").find("i").addClass("icon-white");            		
            	}else if( data.location.ua_like_type == -1 ){
                	$("#locationInfo").find("#btnLocationDislike").addClass("btnLocationDislike");
                	$("#locationInfo").find("#btnLocationDislike").find("i").addClass("icon-white");            		
            	}
            		
            	
            	$("#locationInfo").find("#locationInfoLocationId").val( data.location.ua_location );
            	$("#locationInfo").find("#locationPinLat").val( data.location.ua_location_lat );
            	$("#locationInfo").find("#locationPinLon").val( data.location.ua_location_lon );
            	
            	$("#locationInfo").find("#locationInfoCategoryImage").html( '<img src="' + data.categoryList[0].ua_category_image + '" style="width:45px; height:45px; -webkit-filter: invert(100%);"/>' );
            	$("#locationInfo").find("#locationInfoTitle").html( data.location.ua_location_title );
            	var objDesc = $("<div></div>");
            	objDesc.html( data.location.ua_location_description );
            	var objA = objDesc.find("a");
            	for( var i = 0; i < objA.length; i ++ ){
            		var strHref = objA.eq(i).attr("href");
            		strHref = "/external.php?url=" + encodeURIComponent( strHref );
            		objA.eq(i).attr("href", strHref );
            		objA.eq(i).attr("target", "_blank" );
            	}
            	$("#locationInfo").find("#locationInfoDescription").html( "<b>" + data.location.ua_location_title + "</b>&nbsp;-&nbsp;" + objDesc.html() );            	
            	$("#locationInfo").find("#locationInfoTitle2").html( "&nbsp;" + data.location.ua_location_title );
            	$("#locationInfo").find("div#locationInfoImage").css( "background", "url('" + data.location.ua_location_photo + "') no-repeat center");
            	$("#locationInfo").find("div#locationInfoImage").css( "background-size", "cover");
            	
                $("a[rel=location_thumb]").attr("href", data.location.ua_location_photo );
                
                var tempImgThumbHtml = "";

                if(data.locationSmallThumb.length > 0){
                    
                	for (var i = 0 ; i < data.locationSmallThumb.length ; i ++) {
						tempImgThumbHtml += "<a rel='location_thumb' href='" + data.locationSmallThumb[i].ua_photo + "'>" +
								"<img src='" + data.locationSmallThumb[i].ua_photo + "'></a>";
					}
					for (var i = 0; i < (10 - data.locationSmallThumb.length); i ++){
						tempImgThumbHtml += "<a rel='location_thumb_default' >" +
								"<img src='/img/default/" + i + ".png'></a>";
					} 
                    $("#locationInfo").find("div.locationPrevSmallImages").html(tempImgThumbHtml);
                }else{
                	for (var i = 0; i < 10; i ++){
						tempImgThumbHtml += "<a rel='location_thumb_default' >" +
								"<img src='/img/default/" + i + ".png'></a>";
					}
                    $("#locationInfo").find("div.locationPrevSmallImages").html( tempImgThumbHtml );
                }
                DocInit.init();
                
                if(data.avgCommentRates != null && data.avgCommentRates.cntRates != "0"){
					$("#locationInfo").find("#locationAvgCommentRates").find("#avgUserRates").text(data.avgCommentRates.avgRates);
					$("#locationInfo").find("#locationAvgCommentRates").find("#cntRates").text(data.avgCommentRates.cntRates);
                }else{
                	$("#locationInfo").find("#locationAvgCommentRates").find("#avgUserRates").text("3.0");
                    $("#locationInfo").find("#locationAvgCommentRates").find("#cntRates").text("0");
				}
                    
            	// Specail for Eye
            	
            	$("div#locationInfoNearbyList").html("");
            	for( var i = 0; i < data.nearbyList.length; i ++ ){
            		var objClone = $("#cloneLocationInfoNearbyItem").clone();
            		objClone.show();
            		objClone.attr("id", "locationInfoNearbyItem");
            		objClone.find("#locationInfoNearbyItemDistance").text( data.nearbyList[i].distance + " Km");
            		objClone.find("#locationInfoNearbyItemImage").find("img").attr("src", data.nearbyList[i].ua_location_photo );
            		objClone.find("#locationInfoNearbyItemTitle").html( data.nearbyList[i].ua_location_title );
            		objClone.find("#locationInfoNearbyItemSubTitle").html( data.nearbyList[i].ua_location_subtitle );
            		objClone.find("a.js-link").attr("href", "/eye/" + translateEn(data.nearbyList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.nearbyList[i].ua_location ));
            		objClone.find("a.js-link").click(function (event){
                		event.preventDefault();
						fnJsLink( this );
	              	});
            		$("div#locationInfoNearbyList").append( objClone );
            	}
            	if( data.nearbyList.length == 0 ){
            		$("div#locationInfoNearbyList").append($("<div class='noPlace'>" + _lang("There is no places.") + "</div>"));
            	}
            	$("div#locationInfoNearbyList").append($("<div class='clearboth'></div>"));
            	
            	$("div#locationInfoCommentFirstItem").html("");
            	//main description rating information
            	if (data.mainDescriptionRating != null) {
            		$("div#mainDescriptionRating").find("#commentLike").text( data.mainDescriptionRating.ua_like_count );
            		$("div#mainDescriptionRating").find("#commentUnlike").text( data.mainDescriptionRating.ua_unlike_count );
            		
            		if (data.mainDescriptionRating.ua_liked == 1) {
                		$("div#mainDescriptionRating").find("#descriptionLikeArea").addClass("liked");
            		} else if ( data.mainDescriptionRating.ua_liked == -1 ) {
            			$("div#mainDescriptionRating").find("#descriptionLikeArea").addClass("liked");			
            		}	
            	}
            		mainDescriptionRatingAvg = data.mainDescriptionRating.ua_like_count * 1 - data.mainDescriptionRating.ua_unlike_count * 1;
            		mainDescriptionRatingAvg = mainDescriptionRatingAvg ? mainDescriptionRatingAvg : -1;
            	
            	if (data.commentFirstItem != null) 
            		firstCommentRatingAvg =  data.commentFirstItem.ua_like_count * 1 - data.commentFirstItem.ua_unlike_count * 1;
            	else
            		firstCommentRatingAvg = 0;
            	firstCommentRatingAvg = firstCommentRatingAvg ? firstCommentRatingAvg : 0;
            	//comment first item information 
            	if (data.commentFirstItem != null && (mainDescriptionRatingAvg - firstCommentRatingAvg) <= 0) {
            		fnAddFirstCommentOnPopup( data.commentFirstItem.ua_location_comment, data.commentFirstItem.ua_photo, data.commentFirstItem.ua_username, data.commentFirstItem.ua_comment, data.commentFirstItem.ua_comment_rate,
            				data.commentFirstItem.ua_created_time, 1, data.commentFirstItem.ua_like_count, data.commentFirstItem.ua_unlike_count, data.commentFirstItem.ua_liked);
        		}
            	
            	$("div#locationInfoCommentList").html("");
            	if( data.commentList != null ){
                	for( var i = 0; i < data.commentList.length; i ++ ){
                		fnAddCommentOnPopup( data.commentList[i].ua_location_comment, data.commentList[i].ua_photo, data.commentList[i].ua_username, data.commentList[i].ua_comment, data.commentList[i].ua_comment_rate,
                				data.commentList[i].ua_created_time, 3, data.commentList[i].ua_like_count, data.commentList[i].ua_unlike_count, data.commentList[i].ua_liked);
                	}            		
            	}
            	
            	if(!$("div#locationInfoCommentFirstItem").find("div#locationInfoCommentItem").length){
    	    		$("div#locationInfoCommentFirstItem").css("padding", "0px");
    	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
            	}else{
            		$("div#locationInfoCommentFirstItem").css("padding", "0px");
    	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
            	}
            	
            	if( data.categoryList != null ){
                	$("div#locationInfoCategoryList").html("");
                	var str = "";
                	for( var i = 0; i < data.categoryList.length; i ++ ){
                		str += '<a class="js-link" href="/eyeCategory/' + translateEn(data.categoryList[i].ua_name).split(" ").join("-") + '/' + base64_encode( data.categoryList[i].ua_place_subcategory )+ '"><div id="locationInfoCategoryItem" data="' + data.categoryList[i].ua_place_subcategory + '">' + _lang(data.categoryList[i].ua_name) + '</div></a>';
                	}
                	str += '<div class="clearboth"></div>';
                	$("div#locationInfoCategoryList").html( str );   
                	
                	for( var i = 0; i < $("div#locationInfoCategoryList").find("a.js-link").length; i ++ ){
                		$("div#locationInfoCategoryList").find("a.js-link").eq(i).click(function (event){
                    		event.preventDefault();
   						 	fnJsLink( this );
   	              	 	});                		
                	}
            	}            	
            	fnCloseAllPopup(); 
            	//containter background open 
            	$("div.container-overlay").show();
            	$("div.container-overlay").height(screen.height);
            	
            	if (data.location.ua_location_street_address == null)
            		data.location.ua_location_street_address = "";
            	if( data.location.ua_location_state == null)
            		data.location.ua_location_state = "";
            	if ( data.location.ua_location_country == null )
            		data.location.ua_location_country = "";
            	var	 address = data.location.ua_location_street_address + " " + data.location.ua_location_state + " " + data.location.ua_location_country;
                if ((data.location.ua_location_street_address != "" || data.location.ua_location_state != "" || data.location.ua_location_country != "") && address != "" ) {
            		$("#locationInfo").find("#locationInfoAddress2").find("p").show();
            		$("#locationInfo").find("#locationInfoAddress2").find("p").text( address );
            		$("#locationInfo").find("#locationInfoAddress2").width("220px");
            	} else {
            		$("#locationInfo").find("#locationInfoAddress2").css("width",'auto');
            		$("#locationInfo").find("#locationInfoAddress2").find("p").hide();
            	}
            	$("#locationInfo").find("#locationInfoAddress2").find("img").attr("src", data.categoryList[0].ua_category_marker );
            	
            	$("#locationInfo").find("#locationInfoSubTitle").hide();            	
            	$("#locationInfo").find("#locationInfoAddress").hide();
				//$("#locationInfo").find("#locationInfoAddress2").hide();
            	$("#locationInfo").find("#locationInfoPhone").hide();
            	$("#locationInfo").find("#locationInfoWebSite").hide();
            	$("#locationInfo").find("#locationInfoButton").hide();
            	$("#locationInfo").find("#locationInfoPlace").hide();
            	$("#locationInfo").find("div#locationInfoYouTube").show();
            	$("#locationInfo").find("div#locationInfoYouTube").html('<iframe style="width:100%;height:500px;" src="' + data.location.ua_eye_video + '" frameborder="0" allowfullscreen></iframe>');
            	$("#locationInfo").find("div#newsInfoPlace").hide();
            	$("#locationInfo").find("div#locationUpToTop").hide();

            	$("#locationInfoContainer").show();
            	$("#modalBackgroundTransparent").show();
            	$("#socialPart").hide();
				$("#main_Panel_back_button").hide();
            	$("#globalIcon").hide();
            	$("#globalList").css("width", "0px");
            	$("#globalIcon").css("right", "0px");
            	isGlobal = false;
            	var tripIds = [];
            	var objTripList = $("#planTripLocationList").find("div#planTripLocationItem").find("#planTripLocationId");
            	for( var i = 0 ; i < objTripList.length; i ++ ){
            		tripIds[i] = objTripList.eq(i).val();
            	}
            	if( $.inArray( data.location.ua_location, tripIds ) == -1 ){
            		$("#locationInfoButton").find(".btnDeleteTrip").hide();
            		$("#locationInfoButton").find(".addtotrip").show();
            	}else{
            		$("#locationInfoButton").find(".btnDeleteTrip").show();
            		$("#locationInfoButton").find(".addtotrip").hide();            		
            	}                 	
            }
        }
    });
}

// show Location Detail Popup
function fnGetLocationInfoDetail( locationId ){
    $.ajax({
        url: "/async-getLocationInfo.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, detail : '1' },
        success : function(data){
            if(data.result == "success"){
            	fnCreateSocialFB( window.location.href );
            	$("#locationInfo").find("#locationSocialPI").find("a").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(window.location.href) 
            			+ "&media=" + encodeURIComponent( "http://" + window.location.hostname + "/" + data.location.ua_location_photo )
            			+ "&description=" + encodeURIComponent(data.location.ua_location_title) );            	
            	fnCreateSocialTW( window.location.href );
            	fnCreateSocialGP( window.location.href );
            	
            	
            	$("#locationInfo").find("#btnLocationDislike").removeClass("btnLocationDislike");
            	$("#locationInfo").find("#btnLocationDislike").find("i").removeClass("icon-white");
            	$("#locationInfo").find("#btnLocationLike").removeClass("btnLocationLike");
            	$("#locationInfo").find("#btnLocationLike").find("i").removeClass("icon-white");
            	$("#locationInfo").find("#locationLikeScore").text( data.location.ua_location_like_score );
            	
            	if( data.location.ua_location_like_score > 30 ){
            		$("#locationLikeArrow").css("-webkit-transform", "rotate(90deg)");
            		$("#locationLikeArrow").css("-moz-transform", "rotate(90deg)");
            	}else{
            		$("#locationLikeArrow").css("-webkit-transform", "rotate(" + String(90 / 30 * data.location.ua_location_like_score) +"deg)");
            		$("#locationLikeArrow").css("-moz-transform", "rotate(" + String(90 / 30 * data.location.ua_location_like_score) +"deg)");
            	}	
            		            	
            	
            	if( data.location.ua_like_type == 1 ){
                	$("#locationInfo").find("#btnLocationLike").addClass("btnLocationLike");
                	$("#locationInfo").find("#btnLocationLike").find("i").addClass("icon-white");            		
            	}else if( data.location.ua_like_type == -1 ){
                	$("#locationInfo").find("#btnLocationDislike").addClass("btnLocationDislike");
                	$("#locationInfo").find("#btnLocationDislike").find("i").addClass("icon-white");            		
            	}            	
            	
            	$("#locationInfo").find("#locationInfoSubTitle").show();            	
            	$("#locationInfo").find("#locationInfoAddress").show();
				$("#locationInfo").find("#locationInfoAddress2").show();
            	$("#locationInfo").find("#locationInfoPhone").show();
            	$("#locationInfo").find("#locationInfoWebSite").show();
            	$("#locationInfo").find("#locationInfoButton").show();
            	$("#locationInfo").find("#locationInfoCategoryList").show();
            	$("#locationInfo").find("#locationInfoPlace").show();
            	$("#locationInfo").find("div#newsInfoPlace").hide();
            	$("#locationInfo").find("div#locationInfoYouTube").hide();
            	$("#locationInfo").find("div#locationUpToTop").show();
            	if( data.location.ua_highlight == 1 ){
            		$("#locationInfo").find("div#locationUpToTopLeft").show();
            		$("#locationInfo").find("div#locationUpToTopLeft").text( data.location.ua_hour + ":" + data.location.ua_minute + ":" + data.location.ua_second);
            	}else{
            		$("#locationInfo").find("div#locationUpToTopLeft").hide();
            	}
            	
            	$("div#locationInfoCommentList").show();            	
            	
            	$("#locationInfo").find("#locationInfoLocationId").val( data.location.ua_location );
            	$("#locationInfo").find("#locationPinLat").val( data.location.ua_location_lat );
            	$("#locationInfo").find("#locationPinLon").val( data.location.ua_location_lon );
            	
            	$("#locationInfo").find("#locationInfoCategoryImage").html( '<img src="' + data.categoryList[0].ua_category_image + '" style="width:45px; height:45px; -webkit-filter: invert(100%);"/>' );
            	$("#locationInfo").find("#locationInfoTitle").html( data.location.ua_location_title );
            	$("#locationInfo").find("#locationInfoSubTitle").text( data.location.ua_location_subtitle );
            	$("#locationInfo").find("#locationUpToTop").find(".popup_up_to_top").find("#uptotop_title").html( "<b>" + data.location.ua_location_title + "</b>" );
            	$("#locationInfo").find("div#locationInfoImage").css( "background", "url('" + data.location.ua_location_photo + "') no-repeat center");
            	$("#locationInfo").find("div#locationInfoImage").css( "background-size", "cover");
            	
            	$("a[rel=location_thumb]").attr("href", data.location.ua_location_photo );
            	
            	var objDesc = $("<div></div>");
            	objDesc.html( data.location.ua_location_description );
            	var objA = objDesc.find("a");
            	for( var i = 0; i < objA.length; i ++ ){
            		var strHref = objA.eq(i).attr("href");
            		strHref = "/external.php?url=" + encodeURIComponent( strHref );
            		objA.eq(i).attr("href", strHref );
            		objA.eq(i).attr("target", "_blank" );
            	}
            	$("#locationInfo").find("#locationInfoDescription").html( "<b>" + data.location.ua_location_title + "</b>&nbsp;-&nbsp;" + objDesc.html() );
            	
            	$("#locationInfo").find("#locationInfoTitle2").html( "&nbsp;" + data.location.ua_location_title );
            	var address = data.location.ua_location_street_address + " " + data.location.ua_location_state + " " + data.location.ua_location_country;
            	$("#locationInfo").find("#locationInfoAddress").text( address );
            	if (data.location.ua_location_street_address != "" || data.location.ua_location_state != "" || data.location.ua_location_country != "") {
            		$("#locationInfo").find("#locationInfoAddress2").find("p").show();
            		$("#locationInfo").find("#locationInfoAddress2").find("p").text( address );
            		$("#locationInfo").find("#locationInfoAddress2").width("220px");
            	} else {
            		$("#locationInfo").find("#locationInfoAddress2").css("width",'auto');
            		$("#locationInfo").find("#locationInfoAddress2").find("p").hide();
            	}
            		
				$("#locationInfo").find("#locationInfoAddress2").find("img").attr("src", data.categoryList[0].ua_category_marker );
				
				var tempImgThumbHtml = "";
			
				if(data.locationSmallThumb.length > 0){
					
					for (var i = 0 ; i < data.locationSmallThumb.length ; i ++) {
						tempImgThumbHtml += "<a rel='location_thumb' href='" + data.locationSmallThumb[i].ua_photo + "'>" +
								"<img src='" + data.locationSmallThumb[i].ua_photo + "'></a>";
					}
					for (var i = 0; i < (10 - data.locationSmallThumb.length); i ++){
						tempImgThumbHtml += "<a rel='location_thumb_default' >" +
								"<img src='/img/default/" + i + ".png'></a>";
					} 
					$("#locationInfo").find("div.locationPrevSmallImages").html(tempImgThumbHtml);
				}else{
					for (var i = 0; i < 10; i ++){
						tempImgThumbHtml += "<a rel='location_thumb_default' >" +
								"<img src='/img/default/" + i + ".png'></a>";
					}
					$("#locationInfo").find("div.locationPrevSmallImages").html( tempImgThumbHtml );
				}
				DocInit.init();
				
				if(data.avgCommentRates != null && data.avgCommentRates.cntRates != "0"){
					$("#locationInfo").find("#locationAvgCommentRates").find("#avgUserRates").text(data.avgCommentRates.avgRates);
					$("#locationInfo").find("#locationAvgCommentRates").find("#cntRates").text(data.avgCommentRates.cntRates);
				}else{
					$("#locationInfo").find("#locationAvgCommentRates").find("#avgUserRates").text("3.0");
					$("#locationInfo").find("#locationAvgCommentRates").find("#cntRates").text("0");
				}
				
            	$("#locationInfo").find("#locationInfoPhone").text( data.location.ua_location_phone );
            	var websiteUrl = data.location.ua_location_website;
            	if( websiteUrl.substring(0,4) != "http" )
            		websiteUrl = "http://" + websiteUrl;
            	websiteUrl = "/external.php?url=" + encodeURIComponent( websiteUrl );
            	$("#locationInfo").find("#locationInfoWebSite").attr("href", websiteUrl );
            	
            	$("div#locationInfoNearbyList").html("");
            	for( var i = 0; i < data.nearbyList.length; i ++ ){
            		var objClone = $("#cloneLocationInfoNearbyItem").clone();
            		objClone.show();
            		objClone.attr("id", "locationInfoNearbyItem");
            		objClone.find("#locationInfoNearbyItemDistance").text( data.nearbyList[i].distance + " Km");
            		objClone.find("#locationInfoNearbyItemImage").find("img").attr("src", data.nearbyList[i].ua_location_photo );
            		objClone.find("#locationInfoNearbyItemTitle").html( data.nearbyList[i].ua_location_title );
            		objClone.find("#locationInfoNearbyItemSubTitle").html( data.nearbyList[i].ua_location_subtitle );
            		objClone.find("a.js-link").attr("href", "/locations/" + translateEn(data.nearbyList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.nearbyList[i].ua_location ));
            		
            		objClone.find("a.js-link").click(function (event){
                		event.preventDefault();
						fnJsLink( this );
	              	});              		
            		$("div#locationInfoNearbyList").append(objClone);
            	}
            	if( data.nearbyList.length == 0 ){
            		$("div#locationInfoNearbyList").append($("<div class='noPlace'>" + _lang("There is no places.") + "</div>"));
            	}            	
            	$("div#locationInfoNearbyList").append($("<div class='clearboth'></div>"));            	
            	
            	$("div#locationInfoCommentFirstItem").html("");
            	
            	//main description rating information
            	if (data.mainDescriptionRating != null) {
            		$("div#mainDescriptionRating").find("#commentLike").text( data.mainDescriptionRating.ua_like_count );
            		$("div#mainDescriptionRating").find("#commentUnlike").text( data.mainDescriptionRating.ua_unlike_count );
            		
            	}
            	if (data.mainDescriptionRating.ua_liked == 1) {
            		$("div#mainDescriptionRating").find("#descriptionLikeArea").addClass("liked");
        		} else if (data.mainDescriptionRating.ua_liked == -1) {
        			$("div#mainDescriptionRating").find("#descriptionLikeArea").addClass("liked");			
        		}	
            	mainDescriptionRatingAvg = data.mainDescriptionRating.ua_like_count * 1 - data.mainDescriptionRating.ua_unlike_count * 1;
            	mainDescriptionRatingAvg = mainDescriptionRatingAvg ? mainDescriptionRatingAvg : -1;
            	
            	if (data.commentFirstItem != null) 
            		firstCommentRatingAvg =  data.commentFirstItem.ua_like_count * 1 - data.commentFirstItem.ua_unlike_count * 1;
            	else
            		firstCommentRatingAvg = 0;
            	firstCommentRatingAvg = firstCommentRatingAvg ? firstCommentRatingAvg : 0;
            	//comment first item information 
            	if (data.commentFirstItem != null && (mainDescriptionRatingAvg - firstCommentRatingAvg) <= 0) {
            		fnAddFirstCommentOnPopup( data.commentFirstItem.ua_location_comment, data.commentFirstItem.ua_photo, data.commentFirstItem.ua_username, data.commentFirstItem.ua_comment, data.commentFirstItem.ua_comment_rate,
            				data.commentFirstItem.ua_created_time, 1, data.commentFirstItem.ua_like_count, data.commentFirstItem.ua_unlike_count, data.commentFirstItem.ua_liked);
        		}
            	
            	$("div#locationInfoCommentList").html("");
            	if( data.commentList != null ){
                	for( var i = 0; i < data.commentList.length; i ++ ){
                		fnAddCommentOnPopup( data.commentList[i].ua_location_comment, data.commentList[i].ua_photo, data.commentList[i].ua_username, data.commentList[i].ua_comment, data.commentList[i].ua_comment_rate,  
                				data.commentList[i].ua_created_time, 3, data.commentList[i].ua_like_count, data.commentList[i].ua_unlike_count, data.commentList[i].ua_liked);
                	}            		
            	}
            	if(!$("div#locationInfoCommentFirstItem").find("div#locationInfoCommentItem").length){
    	    		$("div#locationInfoCommentFirstItem").css("padding", "0px");
    	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
            	}else{
            		$("div#locationInfoCommentFirstItem").css("padding", "0px");
    	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
            	}
            		
            	if( data.categoryList != null ){
                	$("div#locationInfoCategoryList").html("");
                	var str = "";
                	for( var i = 0; i < data.categoryList.length; i ++ ){
                		str += '<a class="js-link" href="/places/' + translateEn(data.categoryList[i].ua_name).split(" ").join("-") + '/' + base64_encode( data.categoryList[i].ua_place_subcategory )+ '"><div id="locationInfoCategoryItem" data="' + data.categoryList[i].ua_place_subcategory + '">' + _lang(data.categoryList[i].ua_name) + '</div></a>';
                	}
                	str += '<div class="clearboth"></div>';
                	$("div#locationInfoCategoryList").html( str );
                	
                	for( var i = 0; i < $("div#locationInfoCategoryList").find("a.js-link").length; i ++ ){
                		$("div#locationInfoCategoryList").find("a.js-link").eq(i).click(function (event){
                    		event.preventDefault();
   						 	fnJsLink( this );
   	              	 	});                		
                	}                	                	
            	}
				if( data.categoryList != null ){
                	$("div#uptotop_category").html("");
                	var str = "";
                	for( var i = 0; i < data.categoryList.length; i ++ ){
                		str += '<i>' + _lang(data.categoryList[i].ua_name) + '</i>';
                	}
                	$("div#uptotop_category").html( str );               	
            	}
            	fnCloseAllPopup( );
            	//containter background open 
            	$("div.container-overlay").show();
            	$("div.container-overlay").height(screen.height);
            	
            	$("#locationInfoContainer").show();
            	$("#modalBackgroundTransparent").show();
            	$("#socialPart").hide();
				$("#main_Panel_back_button").hide();
            	$("#globalIcon").hide();
            	$("#globalList").css("width", "0px");
            	$("#globalIcon").css("right", "0px");
            	isGlobal = false;
            	var tripIds = [];
            	var objTripList = $("#planTripLocationList").find("div#planTripLocationItem").find("#planTripLocationId");
            	for( var i = 0 ; i < objTripList.length; i ++ ){
            		tripIds[i] = objTripList.eq(i).val();
            	}
            	if( $.inArray( data.location.ua_location, tripIds ) == -1 ){
            		$("#locationInfoButton").find(".btnDeleteTrip").hide();
            		$("#locationInfoButton").find(".addtotrip").show();
            	}else{
            		$("#locationInfoButton").find(".btnDeleteTrip").show();
            		$("#locationInfoButton").find(".addtotrip").hide();            		
            	}            	
            	
            }
        }
    });
}

// reset Plan Trip No when add/remove Plan Trip
function fnResetPlanTripItemNo(){
	$("#planTripLocationList").find("div#planTripLocationItem").each( function(index){
		$(this).find("span#itemNo").text( index + 1 );
	});
}

// add comment on location detail popup
function fnAddCommentOnPopup( id, photo, username, comment, comment_rate,  createdTime, type, likeCnt, unlikeCnt, liked ){
	if( type == 1 ){
		var objClone = $("#cloneLocationInfoCommentItem").clone();
		objClone.show();
		objClone.attr("id", "locationInfoCommentItem");
		var uaPhoto = photo;
		if( uaPhoto == "" )
			uaPhoto = $("#noProfileImg").val();
		
		objClone.find("#locationInfoCommentId").val( id );		
		objClone.find("div#locationInfoCommentItemPhoto").find("img").attr( "src", uaPhoto );
		objClone.find("div#locationInfoCommentItemUsername").text( username );
		if(comment_rate != "" && comment_rate != "0"){
			objClone.find("div#locationInfoCommentItemUserRate").find("button.btn-success").text( comment_rate + '.0' );
			$("div.location-comment-rate-wrap").find("button#locationCommentRate").removeClass("comment-scored btn-success");
		}else
			objClone.find("div#locationInfoCommentItemUserRate").addClass("hide");
		
		objClone.find("div#locationInfoCommentItemDate").text( createdTime );
		objClone.find("p#locationInfoCommentItemComment").text( comment );
		objClone.find("#commentLike").text( likeCnt );
		objClone.find("#commentUnlike").text( unlikeCnt );

		if( liked == 1 ){
			objClone.find("#commentLikeArea").addClass("liked");
		}else if( liked == -1 ){
			objClone.find("#commentUnlikeArea").addClass("liked");			
		}		

		$("div#locationInfoCommentList").prepend( objClone );
		
	}else if( type == 2){
		var objClone = $("#cloneBlogInfoCommentItem").clone();
		objClone.show();
		objClone.attr("id", "blogInfoCommentItem");
		var uaPhoto = photo;
		if( uaPhoto == "" )
			uaPhoto = $("#noProfileImg").val();
		
		objClone.find("#blogInfoCommentId").val( id );
		objClone.find("div#blogInfoCommentItemPhoto").find("img").attr( "src", uaPhoto );
		objClone.find("div#blogInfoCommentItemUsername").text( username );
		objClone.find("div#blogInfoCommentItemDate").text( createdTime );
		objClone.find("p#blogInfoCommentItemComment").text( comment );
		
		objClone.find("#commentLike").text( likeCnt );
		objClone.find("#commentUnlike").text( unlikeCnt );

		if( liked == 1 ){
			objClone.find("#commentLikeArea").addClass("liked");
		}else if( liked == -1 ){
			objClone.find("#commentUnlikeArea").addClass("liked");			
		}

		$("div#blogInfoCommentList").prepend( objClone );		
	}else if( type == 3 ){
		var objClone = $("#cloneLocationInfoCommentItem").clone();
		objClone.show();
		objClone.attr("id", "locationInfoCommentItem");
		var uaPhoto = photo;
		if( uaPhoto == "" )
			uaPhoto = $("#noProfileImg").val();
		
		objClone.find("#locationInfoCommentId").val( id );		
		objClone.find("div#locationInfoCommentItemPhoto").find("img").attr( "src", uaPhoto );
		objClone.find("div#locationInfoCommentItemUsername").text( username );
		if(comment_rate != "" && comment_rate != "0"){
			objClone.find("div#locationInfoCommentItemUserRate").find("button.btn-success").text( comment_rate + '.0' );
			$("div.location-comment-rate-wrap").find("button#locationCommentRate").removeClass("comment-scored btn-success");
		}else
			objClone.find("div#locationInfoCommentItemUserRate").addClass("hide");
		
		objClone.find("div#locationInfoCommentItemDate").text( createdTime );
		objClone.find("p#locationInfoCommentItemComment").text( comment );
		objClone.find("#commentLike").text( likeCnt );
		objClone.find("#commentUnlike").text( unlikeCnt );

		if( liked == 1 ){
			objClone.find("#commentLikeArea").addClass("liked");
		}else if( liked == -1 ){
			objClone.find("#commentUnlikeArea").addClass("liked");			
		}		

		$("div#locationInfoCommentList").append( objClone );		
	}

}

// Add bucket item on User Bucket List Popup
function fnAddBucketItemOnPopup( bucketId, bucketTitle, status ){
	var objClone = $("#cloneModalBucketItem").clone();
	objClone.show();
	objClone.attr("id", "modalBucketItem");
	objClone.find("input#bucketItemId").val( bucketId );
	objClone.find("span").text( bucketTitle );

	if( status == 0)
		objClone.find("i").addClass("hide");

	$("#modalBucketList").prepend( objClone );
}
// Add bucket list on User Bucket List Popup
function fnBucketList( locationId ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this.") );onSignInPopup();
		return;
	}
	$("#modalBucketList").html("");
    $.ajax({
        url: "/async-getUserBucketList.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId },
        success : function(data){
            if(data.result == "success"){
            	if( data.bucketList != null ){
                	for( var i = 0; i < data.bucketList.length; i ++ ){
                		fnAddBucketItemOnPopup( data.bucketList[i].ua_user_bucket, data.bucketList[i].ua_bucket_title, data.bucketList[i].ua_status );
                	}            		
            	}
            	$("#modal-bucketList").find("#locationIdBucket").val( locationId );
            	$("#modal-bucketList").show();
            	$("#modalBackground").show();
            }
        }
    });
}

// Add Effect on Markers
// type : "NORMAL", "TRIP01", "TRIP03", "NEWS", "EYE"
function fnAddMarker( marker, type ){
	  google.maps.event.addListener(marker, 'click', function() {
		  fnGetLocationInfo( this.locationId, this, 1, type );
		  isOpenInfobox = 1;
	  });
		  
	  google.maps.event.addListener(marker, 'mouseover', function() {
		  if( isOpenInfobox == 0 )
			  fnGetLocationInfo( this.locationId, this, 0, type );
	  });
	  google.maps.event.addListener(marker, 'mouseout', function() {
		  if( isOpenInfobox == 0 )
			  infobox.close();
	  });
	  google.maps.event.addListener( infobox,'closeclick',function(){
		  isOpenInfobox = 0;
	  });
}

// Remove Marker
function fnRemoveMarker( marker ){
	marker.setMap(null);
	marker = null;
}

//Remove Markers
function fnRemoveMarkers( markers ){
	if( markers == null )
		return;
	for( var i = 0 ; i < markers.length; i ++ ){
		if( markers[i] != null ){
			markers[i].setMap(null);
			markers[i] = null;
		}
	}
}

// Add Directions
function fnAddDirections( markerList , draggable ){
	var markerNewList = [];
	for (var i = 0 ; i < markerList.length; i++){
		if( markerList[i] != null ){
			markerNewList[ markerNewList.length ] = markerList[ i ];
		}
	}
	var arrDirectionList = [];
	for (var i = 0 ; i < markerNewList.length - 1; i++){
		var start = markerNewList[i].getPosition();
		var end = markerNewList[i+1].getPosition();
		var directionsDisplay = fnAddDirection( start, end, i, draggable);
		arrDirectionList[i] = directionsDisplay;
	}
	return arrDirectionList;
}

// Add Direction
function fnAddDirection(start, end, pos, draggable ){
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	
	directionsDisplay = new google.maps.DirectionsRenderer(  );
	directionsDisplay.setMap(map);
	directionsDisplay.setOptions({ draggable:draggable });
	directionsDisplay.setOptions({suppressMarkers : true});
	
    var request = {
        origin: start, 
        destination: end,   
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        optimizeWaypoints: true
    };

	directionsService.route(request, function(response, status) {
 		if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
 		}
	});
	if( draggable == true ){
		google.maps.event.addListener(directionsDisplay, 'directions_changed', function(){
			var waypoints = directionsDisplay.directions.routes[0].legs[0].via_waypoint;
			if(waypoints.length > 0){
				var cntPos = 0;
				var lat, lon;
				for (var key in waypoints[0].location) {
					if( cntPos == 0 ) lat = waypoints[0].location[key];
					else if( cntPos == 1 ) lon = waypoints[0].location[key];
					else break;
					cntPos ++;
				}
				// if( waypoints[0].location.nb != "" && waypoints[0].location.ob != "" ){
					// var lat = waypoints[0].location.nb;
				    // var lon = waypoints[0].location.ob;
				    var objCurrent = $("#planTripLocationList").find("div#planTripLocationItem").find("a#tripItemAdd").get( pos );
				    onClickTripItemAdd( objCurrent, false );
				    $("#planTripLocationList").find("div#planTripLocationItem").eq( pos + 1).find("#planTripLocationLat").val( lat );
				    $("#planTripLocationList").find("div#planTripLocationItem").eq( pos + 1).find("#planTripLocationLon").val( lon );
				    $("#planTripLocationList").find("div#planTripLocationItem").eq( pos + 1).find("#planTripLocationType").val( 3 );
				    $("#planTripLocationList").find("div#planTripLocationItem").eq( pos + 1).find("#txtTripLocation").val("via")
				    $("#planTripLocationList").find("div#planTripLocationItem").eq( pos + 1).find("#txtTripLocation").prop("readonly", true);
	  				$.ajax({
						url: "/async-addNewLocation.php",
						dataType : "json",
						type : "POST",
						data : { title : "via", lat : lat, lon : lon, locationType : 3},
						success : function(data){
							if(data.result == "success"){
								$("#planTripLocationList").find("div#planTripLocationItem").eq( pos + 1).find("#planTripLocationId").val( data.locationId );
								fnSavePlanTripLocationList();
							}else{
								alert( _lang("Login Failed") );
								return;
							}
						}
					});				    
				// }
			}
				
		});
	}

	return directionsDisplay;
}

// Add New Plan Trip ID
function fnCreateNewPlanTrip(){
    $.ajax({
        url: "/async-getNewPlanTripId.php",
        dataType : "json",
        type : "POST",
        success : function(data){
            if(data.result == "success"){
            	$("#planTripId").val( data.planTripId );
            }
        }
    });
}

// save current Plan Trip Status
function fnSavePlanTripLocationList(){
	var planTripId = $("#planTripId").val();
	var objList = $("#planTripLocationList").find("div#planTripLocationItem").find("input#planTripLocationId");
	var locationIds = [];

	for( var i = 0; i < objList.length; i ++ ){
		if( objList.eq(i).val() != ""){
			locationIds[ locationIds.length ] = objList.eq(i).val();
		}		
	}	
    $.ajax({
        url: "/async-savePlanTripLocationList.php",
        dataType : "json",
        type : "POST",
        data : { planTripId : planTripId, locationIds : locationIds },
        success : function(data){
            if(data.result == "success"){
            	fnDrawPlanTrip();
            }
        }
    });		
}

// Draw Currnet Plan Trip
function fnDrawPlanTrip( ){
	var objList = $("#planTripLocationList").find("div#planTripLocationItem");
	fnRemoveMarkers( markerPlanTripList );
	markerPlanTripList = [];
	
	fnRemoveDirection( directionPlanTripDisplayList );
	directionPlanTripDisplayList = [];

	for( var i = 0; i < objList.size(); i ++ ){
		var lat = objList.eq(i).find("#planTripLocationLat").val();
		var lon = objList.eq(i).find("#planTripLocationLon").val();
		var locationId = objList.eq(i).find("#planTripLocationId").val();
		var locationType = objList.eq(i).find("#planTripLocationType").val();
  	  	if( lat != "" && lon != ""){
	  	  	var myLatlng = new google.maps.LatLng( lat, lon);
	  	  	var imageURL = "";
	  	  	imageURL = "/img/marker" + Number( i + 1 ) + ".png";
	  	  	var image = {
		  		url: imageURL,
		  		size: new google.maps.Size(29, 40),
		  		origin: new google.maps.Point(0,0),
		  		anchor: new google.maps.Point(15, 37)
	  	  	};
	  	  	var markerTemp = new google.maps.Marker({
	  	  		position: myLatlng,
	  	  		map: map,
	  	  		icon: image,
	  	  		zIndex : 10000,
	  	  		locationId : locationId
	  	  	});
	  	  	if( locationType == 1 )
	  	  		fnAddMarker( markerTemp, "TRIP01" );
	  	  	else if( locationType == 3 ){
	  	  		fnAddMarker( markerTemp, "TRIP03" );
	  	  	}else if( locationType == 4 ){
	  	  		fnAddMarker( markerTemp, "TRIP04" );
	  	  	}else if( locationType == 5 ){
	  	  		fnAddMarker( markerTemp, "TRIP05" );
	  	  	}	
	  	  	
	  	  	map.setCenter(new google.maps.LatLng( lat, lon ) );
	  	  	markerPlanTripList[ i ] = markerTemp;
	  	  	
	  	  	if( window.location.pathname == "/"){
	  	  		var planTripId = $("#planTripId").val();
	  	  		var state = { id: base64_encode( planTripId ), type : "trips", 'reset' : 0 };
	  	  		ga('send', 'pageview', {'page': "/trips/" + base64_encode( planTripId ), 'title': siteName});
	  	  		History.replaceState(state, siteName, "/trips/" + base64_encode( planTripId ) );
	  	  	}
	  	  	
  	  	}else{
  	  		markerPlanTripList[ i ] = null;
  	  	}
	}
	for( var i = 0; i < objList.size() - 1; i ++ ){

		var lat1 = objList.eq(i).find("#planTripLocationLat").val();
		var lon1 = objList.eq(i).find("#planTripLocationLon").val();
		var lat2 = objList.eq(i + 1).find("#planTripLocationLat").val();
		var lon2 = objList.eq(i + 1).find("#planTripLocationLon").val();
		
		var departure = lat1 + "," + lon1;
		var destination = lat2 + "," + lon2;
		fnGetDistanceDuration(departure, destination, i);
	}
	directionPlanTripDisplayList = fnAddDirections( markerPlanTripList, true );	
	if( isOpenRightBar == true ){
		$("#btnPlanTrip").trigger("click");
	}
}

// Remove Direction
function fnRemoveDirection( directionDisplayList ){
	for( var i = 0; i < directionDisplayList.length; i ++ ){
		directionDisplayList[i].setMap(null);
		directionDisplayList[i] = null;
	}
}
function fnAddToTrip( locationId ){
	var objList = $("#planTripLocationList").find("div#planTripLocationItem");
	var cntNotEmpty = 0;
	for( var i = 0; i < objList.size(); i ++ ){
		if( objList.eq(i).find("#planTripLocationId").val() != "" )
			cntNotEmpty ++;
	}
	
	if( cntNotEmpty > 2 ){
		for( var i = 0; i < objList.size(); i ++ ){
			if( objList.eq(i).find("#planTripLocationId").val() == "" )
				objList.eq(i).remove();
		}
	}
    $.ajax({
        url: "/async-getLocationInfo.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, detail : '0' },
        success : function(data){
            if(data.result == "success"){
	  	    	  var lat = data.location.ua_location_lat;
		    	  var lon = data.location.ua_location_lon;
		    	  var locationId = data.location.ua_location;
		    	  var title = data.location.ua_location_title;
		    	  objList = $("#planTripLocationList").find("div#planTripLocationItem");
		    	  var pos = objList.size() - 1;
		    	  if( objList.eq(0).find("#planTripLocationId").val() == "" ){
		    		  pos = 0;
		    	  }else if( objList.eq(1).find("#planTripLocationId").val() == "" ){
		    		  pos = 1;
		    	  }else{
		    		  onClickTripItemAdd( objList.find("#tripItemAdd").get(pos), false);
		    		  pos += 1;
		    	  }
		    	  objList = $("#planTripLocationList").find("div#planTripLocationItem");
	    		  objList.eq(pos).find("#planTripLocationLat").val( lat );
	    		  objList.eq(pos).find("#planTripLocationLon").val( lon );
	    		  objList.eq(pos).find("#planTripLocationType").val( data.location.ua_location_type );
	    		  objList.eq(pos).find("#planTripLocationId").val( locationId );
	    		  objList.eq(pos).find("#txtTripLocation").prop( "readonly", true );
	    		  objList.eq(pos).find("#txtTripLocation").val( title );
	    		  
	    		  fnSavePlanTripLocationList();
	    		  infobox.close();
            }
        }
    });	
}

function fnClearMapForNewTrip( ){
	$("#planTripLocationList").find("div#planTripLocationItem").remove();
	onClickTripItemAdd( null, true);
	onClickTripItemAdd( null, true);
	
	fnRemoveMarkers( markerPlanTripList );
	markerPlanTripList = [];
	
	fnRemoveDirection( directionPlanTripDisplayList );
	directionPlanTripDisplayList = [];
	
	var state = { "type": "none" };
	ga('send', 'pageview', {'page': "/", 'title': siteName});
	History.pushState(state, siteName, "/" );	
}

function fnClearMap(){
	$("#planTripLocationList").find("div#planTripLocationItem").remove();
	onClickTripItemAdd( null, true);
	onClickTripItemAdd( null, true);
	
	fnRemoveMarkers( markerSearch );
	markerSearch = [];
	
	for( var i = 0; i < markerGuideBucketList.length; i ++ ){
		for( var j = 0; j < markerGuideBucketList[i].length; j ++ ){
			fnRemoveMarkers( markerGuideBucketList[i][j] );
			markerGuideBucketList[i][j] = [];
		}
		markerGuideBucketList[i] = [];
	}
	markerGuideBucketList = [];
	
	for( var i = 0; i < markerGuideTripList.length; i ++ ){
		for( var j = 0; j < markerGuideTripList[i].length; j ++ ){
			fnRemoveMarkers( markerGuideTripList[i][j] );
			markerGuideTripList[i][j] = [];
		}
		markerGuideTripList[i] = [];
	}
	markerGuideTripList = [];

	for( var i = 0; i < markerFindPlaceList.length; i ++ ){
		for( var j = 0; j < markerFindPlaceList[i].length; j ++ ){
			fnRemoveMarkers( markerFindPlaceList[i][j] );
			markerFindPlaceList[i][j] = [];
		}
		markerFindPlaceList[i] = [];
	}
	markerFindPlaceList = [];
	
	fnRemoveMarkers( markerPlanTripList );
	markerPlanTripList = [];
	
	fnRemoveDirection( directionGuideTripDisplayList );
	directionGuideTripDisplayList = [];
	
	fnRemoveDirection( directionPlanTripDisplayList );
	directionPlanTripDisplayList = [];
	
	var state = { "type": "none" };
	ga('send', 'pageview', {'page': "/", 'title': siteName});
	History.pushState(state, siteName, "/" );
}

function fnAddPlanTripLocationItem( title, locationId, lat, lon, type ){
	var objClone = $("#clonePlanTripLocationItem").clone();
	objClone.show();
	objClone.attr("id", "planTripLocationItem");
	
	objClone.find("#planTripLocationLat").val( lat );
	objClone.find("#planTripLocationLon").val( lon );
	objClone.find("#planTripLocationType").val( type );
	objClone.find("#planTripLocationId").val( locationId );
	
	if( type == 1 || type == 4 || type == 5)
		objClone.find("#txtTripLocation").prop("readonly", true);
	if( type == 3 ){
		objClone.find("#txtTripLocation").val( "via" );
		objClone.find("#txtTripLocation").prop("readonly", true);
	}else{
		objClone.find("#txtTripLocation").val( title );	
		
		objClone.find("#txtTripLocation").autocomplete({
		      source: function( request, response ) {
		        $.ajax({
		          url: "/async-searchLocationOnGoogleMap.php",
		          dataType: "json",
		          data: {
		              keyword: request.term
		          },
		          type : "POST",
		          success: function( data ) {
		        	  if( data.location != null ){
		  	            response( $.map( data.location, function( item ) {
		  	              return {
		  	                reference: item.reference,
		  	                value: item.description
		  	              }
		  	            }));
		        	  }
		          }
		        });
		      },
		      minLength: 2,
		      select: function( event, ui ) {
		    	  // if searched, set marker and move focus
		    	  var reference = ui.item.reference;
		    	  var title = ui.item.value;
		    	  $.ajax({
		    		  url: "/async-getLocationInfoByReference.php",
		    		  dataType : "json",
		    		  type : "POST",
		    		  data : { reference : reference },
		    		  success : function(data){
		    			  if(data.result == "success"){
		    				  var lat = data.locationInfo.result.geometry.location.lat;
		    				  var lon = data.locationInfo.result.geometry.location.lng;
		    				  
		    				  objClone.find("#planTripLocationLat").val( lat );
		    				  objClone.find("#planTripLocationLon").val( lon );
		    				  objClone.find("#planTripLocationType").val( 2 );
		    				  
		    				  $.ajax({
		    					  url: "/async-addNewLocation.php",
		    					  dataType : "json",
		    					  type : "POST",
		    					  data : {title : title, lat : lat, lon : lon, locationType : 2},
		    					  success : function(data){
		    						  if(data.result == "success"){
		    							  objClone.find("#planTripLocationId").val( data.locationId );
		    							  fnSavePlanTripLocationList();
		    						  }else{
		    							  alert( _lang("Login Failed") );
		    							  return;
		    						  }
		    					  }
		    				  });	    		    	  
		    			  }else{
		    				  alert( _lang("Login Failed") );
		    				  return;
		    			  }
		    		  }
		    	  });
		      },
		      open: function() {
		        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		        $(this).autocomplete('widget').css('z-index', 300);
		      },
		      close: function() {
		        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		      }
		});		
		
	}

	$("div#planTripLocationList").append(objClone);
}

// Draw Plan Trip By ID
function fnDrawPlanTripById( pageId ){
	var tripId = pageId;
	$("#planTripId").val( tripId );
    $.ajax({
        url: "/async-getPlanTripLocationList.php",
        dataType : "json",
        type : "POST",
        data : { tripId : tripId },
        success : function(data){
            if(data.result == "success"){
            	$("#planTripLocationList").find("div#planTripLocationItem").remove();
            	for( var i = 0; i < data.locationList.length; i ++ ){
            		fnAddPlanTripLocationItem( data.locationList[i].ua_location_title, data.locationList[i].ua_location, data.locationList[i].ua_location_lat, data.locationList[i].ua_location_lon, data.locationList[i].ua_location_type );
            	}
            	fnResetPlanTripItemNo();
            	fnDrawPlanTrip();
            	if( data.savedPlace == "Y" )
            		isSavedTrips = false;
            	else
            		isSavedTrips = true;
            }
        }
    });
}

// Open Blog Detail Popup
function fnBlogDetailPopup( blogId ){
    $.ajax({
        url: "/async-getBlogInfo.php",
        dataType : "json",
        type : "POST",
        data : { blogId : blogId },
        success : function(data){
            if(data.result == "success"){
            	fnCreateSocialFB1( window.location.href );
            	$("#blogInfoContainer").find("#locationSocialPI1").find("a").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(window.location.href) 
            			+ "&media=" + encodeURIComponent( "http://" + window.location.hostname + "/" + data.blog.ua_image )
            			+ "&description=" + encodeURIComponent(data.blog.ua_title) );            	
            	fnCreateSocialTW1( window.location.href );
            	fnCreateSocialGP1( window.location.href );            	
            	
            	$("#blogThumbInfoContainer").hide();            	
            	$("#blogInfoContainer").find("div#blogInfoImage").css( "background", "url('" + data.blog.ua_image + "') no-repeat center");
            	$("#blogInfoContainer").find("div#blogInfoImage").css( "background-size", "cover");
				  
            	$("#blogInfoContainer").find("#blogInfoTitle").text( data.blog.ua_title );
            	
            	var objDesc = $("<div></div>");
            	objDesc.html( data.blog.ua_content );
            	var objA = objDesc.find("a");
            	for( var i = 0; i < objA.length; i ++ ){
            		var strHref = objA.eq(i).attr("href");
            		strHref = "/external.php?url=" + encodeURIComponent( strHref );
            		objA.eq(i).attr("href", strHref );
            		objA.eq(i).attr("target", "_blank" );
            	}
            	
            	$("#blogInfoContainer").find("#blogInfoContent").html( objDesc.html() );
            	$("#blogInfoContainer").find("#blogInfoCategory").text( _lang(data.blog.ua_blog_title) );
            	$("#blogInfoContainer").find("#blogInfoDays").find("b").text( data.blog.ua_username );
            	$("#blogInfoContainer").find("#blogInfoId").val( data.blog.ua_blog );
            	
            	var strDayAgo = data.blog.ua_day_ago;
            	if( strDayAgo == 0 )
            		strDayAgo = _lang("today");
            	else if( strDayAgo == 1 )
            		strDayAgo = _lang("yesterday");
            	else
            		strDayAgo = strDayAgo + _lang(" days ago");
            	
            	$("div#blogInfoCommentList").html("");
//            	if(data.commentFirstItem != null){
//            		fnAddFirstCommentOnPopup( data.commentFirstItem.ua_location_comment, data.commentFirstItem.ua_photo, data.commentFirstItem.ua_username, data.commentFirstItem.ua_comment, data.commentFirstItem.ua_comment_rate,
//            				data.commentFirstItem.ua_created_time, 1, data.commentFirstItem.ua_like_count, data.commentList.ua_unlike_count, data.commentFirstItem.ua_liked);
//        		}
            	for( var i = 0; i < data.commentList.length; i ++ ){
            		fnAddCommentOnPopup( data.commentList[i].ua_blog_comment, data.commentList[i].ua_photo, data.commentList[i].ua_username, data.commentList[i].ua_comment, '',
            				data.commentList[i].ua_created_time, 2, data.commentList[i].ua_like_count, data.commentList[i].ua_unlike_count, data.commentList[i].ua_liked);
            	}            		
            	
            	$("#blogInfoContainer").find("#blogInfoDays").find("i").text( strDayAgo );
            	$("#blogInfoContainer").show();
            	$("#socialPart").hide();
				$("#main_Panel_back_button").hide();
            	$("#globalIcon").hide();
            	$("#globalList").css("width", "0px");
            	$("#globalIcon").css("right", "0px");
            	isGlobal = false;
            }
        }
    });	
}

//Open Page Detail Popup
function fnPageDetailPopup( pageId ){
    $.ajax({
        url: "/async-getPageInfo.php",
        dataType : "json",
        type : "POST",
        data : { pageId : pageId },
        success : function(data){
            if(data.result == "success"){
            	$("#pageInfoContainer").find("#pageInfoTitle").text( data.page.ua_title );
            	
            	var objDesc = $("<div></div>");
            	objDesc.html( data.page.ua_content );
            	var objA = objDesc.find("a");
            	for( var i = 0; i < objA.length; i ++ ){
            		var strHref = objA.eq(i).attr("href");
            		strHref = "/external.php?url=" + encodeURIComponent( strHref );
            		objA.eq(i).attr("href", strHref );
            		objA.eq(i).attr("target", "_blank" );
            	}
            	
            	$("#pageInfoContainer").find("#pageInfoContent").html( objDesc.html() );
            	$("#pageInfoContainer").find("#pageInfoCategory").text( data.page.ua_title );
            	$("#pageInfoContainer").find("#pageInfoDays").find("b").text( data.page.ua_username );
            	$("#pageInfoContainer").find("#pageInfoId").val( data.page.ua_page );
            	
            	var strDayAgo = data.page.ua_day_ago;
            	if( strDayAgo == 0 )
            		strDayAgo = _lang("today");
            	else if( strDayAgo == 1 )
            		strDayAgo = _lang("yesterday");
            	else
            		strDayAgo = strDayAgo + " " + _lang("days ago");
            	$("#pageInfoContainer").find("#pageInfoDays").find("i").text( strDayAgo );
            	$("#pageInfoContainer").show();
            	$("#socialPart").hide();
				$("#main_Panel_back_button").hide();
            	$("#globalIcon").hide();
            	$("#globalList").css("width", "0px");
            	$("#globalIcon").css("right", "0px");
            	isGlobal = false;
            }
        }
    });	
}

// Open Blog List Popup
function fnBlogListPopup( blogCategoryId ){
	var startDate = $("#blogStartDate").val();
	var endDate = $("#blogEndDate").val();
	$.ajax({
		  url: "/async-getBlogThumbList.php",
		  dataType : "json",
		  type : "POST",
		  data : { blogCategoryId : blogCategoryId, startDate: startDate, endDate : endDate },
		  success : function( data ){
			  $("#blogThumbList").html("");
			  for( var i = 0; i < data.blogThumbList.length; i ++ ){
				  var uaTitle = data.blogThumbList[i].ua_title
				  var url = "/blogs/" + translateEn(uaTitle).split(" ").join("-") + "/" + base64_encode( data.blogThumbList[i].ua_blog );
				  
				  var objClone = $("#cloneBlogThumbItem").clone();
				  objClone.show();
				  objClone.attr("id","blogThumbItem");
				  objClone.find("#blogThumbId").val( data.blogThumbList[i].ua_blog );
				  objClone.find("div#blogThumbImage").css( "background", "url('" + data.blogThumbList[i].ua_image + "') no-repeat center");
				  objClone.find("div#blogThumbImage").css( "background-size", "cover");
				  objClone.find("#blogThumbTitle").text( data.blogThumbList[i].ua_title );
				  objClone.find("#blogThumbCategory").text( _lang(data.blogThumbList[i].ua_blog_title) );
				  
				  objClone.find("#btnThumbReadMore").attr( "href", url );
				  objClone.find("div#blogThumbImage").parents("a").eq(0).attr( "href", url );
				  objClone.find("div#blogThumbTitle").parents("a").eq(0).attr( "href", url );
				  
				  objClone.find("#btnThumbReadMore").click(function (event){ 
					  event.preventDefault();
					  fnJsLink( this );
				  });
				  
				  objClone.find("div#blogThumbImage").parents("a").eq(0).click(function (event){ 
					  event.preventDefault();
					  fnJsLink( this );
				  });
				  
				  objClone.find("div#blogThumbTitle").parents("a").eq(0).click(function (event){ 
					  event.preventDefault();
					  fnJsLink( this );
				  });				  
				  
				  var strDayAgo;
				  if( data.blogThumbList[i].ua_day_ago == 0 )
					  strDayAgo = _lang("today");
				  else if( data.blogThumbList[i].ua_day_ago == 1 )
					  strDayAgo = _lang("yesterday");
				  else
					  strDayAgo = data.blogThumbList[i].ua_day_ago + _lang(" days ago");
				  
				  objClone.find("#blogThumbDays").find("i").text( strDayAgo );
				  
				  var objContent = $("<div></div>");
				  objContent.html( data.blogThumbList[i].ua_content );
				  var strContent = objContent.text();
				  if( strContent.length > 250 ){
					  strContent = strContent.substring( 0, 250 );
					  strContent += " ...";
				  }

				  objClone.find("#blogThumbContent").text( strContent );
				  $("#blogThumbList").append(objClone);
			  }
			  
			  if( data.blogThumbList.length == 0 ){
				  $("#blogThumbList").html("<div id='blogThumbEmpty'>" + _lang("There is no blog in this category.") + "</div>");
			  }			  
			  var objClone = $("#cloneClearBoth").clone();
			  objClone.show();
			  objClone.attr("id","clearBoth");
			  $("#blogThumbList").append(objClone);
			  
			  $("#blogInfoContainer").hide();
			  $("#groupInfoContainer").hide();			  
			  
			  $("#blogThumbInfoContainer").show();
			  $("#socialPart").hide();
			  $("#main_Panel_back_button").hide();
			  $("#globalIcon").hide();
				$("#globalList").css("width", "0px");
				$("#globalIcon").css("right", "0px");
				isGlobal = false;
		  }
	});
}
function fnGetDistanceDuration( departure, destination, pos ){
	if( departure == "," || destination == "," ){		
	  return;
	}
	$.ajax({
		  url: "/async-getDistanceDuration.php",
		  dataType : "json",
		  type : "POST",
		  data : { departure : departure, destination : destination },
		  success : function( data ){
			  if( data.result == "success" ){
				  var distance = data.info.rows[0].elements[0].distance.value;
				  var duration = data.info.rows[0].elements[0].duration.value;

				  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos).find("#tripItemDistanceValue").val( distance );
				  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos).find("#tripItemTimeValue").val( duration );
				  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos).find("#tripItemFuleCostValue").val( Number( distance * fuelPrice / 1000 ) );
				  var fuelCost = Math.round(Number( distance * fuelPrice / 1000 ),1) + "$";
				  if( distance < 1000 )
					  distance = distance + "m";
				  else
					  distance = Math.floor( distance / 1000 ) + "km";
				  
				  var hour = Math.floor( duration / 3600 );
				  var min = Math.floor((duration % 3600) / 60);
				  duration = "";
				  if( hour != 0 )
					  duration = hour + "h ";
				  if( min != 0 )
					  duration = duration + min + "m";
				  
				  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos).find("div#tripItemDistance").text( distance );
				  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos).find("div#tripItemTime").text( duration );
				  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos).find("div#tripItemFuelCost").text( fuelCost );
				  
				  var objList = $("#planTripLocationList").find("div#planTripLocationItem");
				  duration = 0;
				  distance = 0;
				  
				  if( pos == objList.size() - 2 ){
					  for( var i = 0 ; i < objList.length - 1; i ++ ){
						  distance += Number(objList.eq(i).find("#tripItemDistanceValue").val());
						  duration += Number(objList.eq(i).find("#tripItemTimeValue").val());						  
					  }
					  var fuelCost = Math.round(Number( distance / 1000 * fuelPrice ),1) + "$";
					  if( distance < 1000 )
						  distance = distance + "m";
					  else
						  distance = Math.floor( distance / 1000 ) + "km";
					  
					  hour = Math.floor( duration / 3600 );
					  min = Math.floor((duration % 3600) / 60);
					  duration = "";
					  if( hour != 0 )
						  duration = hour + "h ";
					  if( min != 0 )
						  duration = duration + min + "m";					  
					  
					  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos + 1).find("div#tripItemDistance").text( distance );
					  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos + 1).find("div#tripItemTime").text( duration );
					  $("#planTripLocationList").find("div#planTripLocationItem").eq(pos + 1).find("div#tripItemFuelCost").text( fuelCost );
				  }				  
			  }
		  }
	});
}
function fnHightlightMap( locationId ){
	for( var i = 0 ; i < markerEyeList.length; i ++ ){
		for( var j = 0; j < markerEyeList[i].length; j ++ ){
			if( markerEyeList[i][j] != null && markerEyeList[i][j].locationId == locationId ){
				map_recenter( markerEyeList[i][j].position, -200, 0 );
				google.maps.event.trigger( markerEyeList[i][j], 'click');
				return;
			}
		}
	}	
	
	for( var i = 0 ; i < markerNewsList.length; i ++ ){
		for( var j = 0; j < markerNewsList[i].length; j ++ ){
			if( markerNewsList[i][j] != null && markerNewsList[i][j].locationId == locationId ){
				map_recenter( markerNewsList[i][j].position, -200, 0 );
				google.maps.event.trigger( markerNewsList[i][j], 'click');
				return;
			}
		}
	}
	
	for( var i = 0 ; i < markerFindPlaceList.length; i ++ ){
		for( var j = 0; j < markerFindPlaceList[i].length; j ++ ){
			for( var k = 0; k < markerFindPlaceList[i][j].length; k ++ ){
				if( markerFindPlaceList[i][j][k] != null && markerFindPlaceList[i][j][k].locationId == locationId ){
					map_recenter( markerFindPlaceList[i][j][k].position, -200, 0 );
					google.maps.event.trigger(markerFindPlaceList[i][j][k], 'click');
					return;
				}
			}
		}
	}	
}

function map_recenter(latlng,offsetx,offsety) {
    var point1 = map.getProjection().fromLatLngToPoint(
        (latlng instanceof google.maps.LatLng) ? latlng : map.getCenter()
    );
    var point2 = new google.maps.Point(
        ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, map.getZoom()) ) || 0,
        ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, map.getZoom()) ) || 0
    );  
    map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
        point1.x - point2.x,
        point1.y + point2.y
    )));
}

function fnGroupDetailPopup( groupId ){
	$.ajax({
		  url: "/async-getGroupDetailInfo.php",
		  dataType : "json",
		  type : "POST",
		  data : { groupId : groupId },
		  success : function( data ){
			  if( data.result == "success" ){
				  fnCloseAllPopup( );
				  $("#groupInfoContainer").find("div#groupInfoPlacesTitle").text( data.categoryTitle );
				  $("#groupInfoContainer").find("#groupLocationList").html("");
				  $("#groupInfoContainer").find("div#placeMetaDescrption").find("p").text( data.categoryMeta );
				  $("meta[name='Description']").attr("content", data.categoryMeta);
				  for( var i = 0; i < data.categoryList.length; i ++ ){
					  var objClone = $("#cloneGroupLocationItem").clone();
					  objClone.attr("id", "groupLocationItem");
					  objClone.show();
					  objClone.find("a").attr("href", "/places/" + translateEn(data.categoryList[i].ua_name).split(" ").join("-") + "/" + base64_encode( data.categoryList[i].ua_place_subcategory ));
					  objClone.find("a").text( data.categoryList[i].ua_name );
					  objClone.find("a").click(function (event){ 
						  event.preventDefault();
						  fnJsLink( this );
	              	  });					  
					  $("#groupInfoContainer").find("#groupLocationList").append( objClone );
				  }
				  $("#groupInfoContainer").find("#groupLocationList").append("<div class='clearboth'></div>");
				  $("#groupInfoContainer").show();
			  }
		  }
	});
}
function fnPlacesDetailPopup( subCategoryId ){
	$.ajax({
		  url: "/async-getPlacesDetailInfo.php",
		  dataType : "json",
		  type : "POST",
		  data : { subCategoryId : subCategoryId },
		  success : function( data ){
			  if( data.result == "success" ){
				  fnCloseAllPopup( );
				  $("#placesInfoContainer").find("div#placesInfoPlacesTitle").text( data.subCategoryTitle );
				  $("#placesInfoContainer").find("#placesLocationList").html("");
				  $("#placesInfoContainer").find("div#placeMetaDescrption").find("p").text( data.subCategoryMeta );
				  $("meta[name='Description']").attr("content", data.subCategoryMeta);
				  for( var i = 0; i < data.placesList.length; i ++ ){
					  var objClone = $("#clonePlacesLocationItem").clone();
					  objClone.attr("id", "placesLocationItem");
					  objClone.show();
					  objClone.find("a").attr("href", "/locations/" + translateEn(data.placesList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.placesList[i].ua_location));
					  objClone.find("a").text( _lang(data.placesList[i].ua_location_title) );
					  objClone.find("a").click(function (event){ 
						  event.preventDefault();
						  fnJsLink( this );
	              	  });
					  $("#placesInfoContainer").find("#placesLocationList").append( objClone );
				  }
				  $("#placesInfoContainer").find("#placesLocationList").append("<div class='clearboth'></div>");
				  $("#placesInfoContainer").show();
			  }
		  }
	});
}
function fnPlacesListPopup( ){
	fnCloseAllPopup( );
	$("#placesListInfoContainer").show();
}
function fnNewsListPopup( ){
	fnCloseAllPopup( );
	$("#newsListInfoContainer").show();
}
function fnEyeListPopup( ){
	fnCloseAllPopup( );
	$("#eyeListInfoContainer").show();
}
function fnNewsCategoryPopup( newsCategory ){
	$.ajax({
		  url: "/async-getNewsCategoryInfo.php",
		  dataType : "json",
		  type : "POST",
		  data : { newsCategory : newsCategory },
		  success : function( data ){
			  if( data.result == "success" ){
				  fnCloseAllPopup( );
				  
				  $("#newsCategoryInfoContainer").find("div#newsCategoryInfoTitle").text( data.newsCategoryTitle );
				  $("#newsCategoryInfoContainer").find("#newsCategoryLocationList").html("");
				  $("#newsCategoryInfoContainer").find("div#placeMetaDescrption").find("p").text( data.nCategoryMeta );
				  $("meta[name='Description']").attr("content", data.nCategoryMeta);
				  for( var i = 0; i < data.newsCategoryList.length; i ++ ){
					  var objClone = $("#cloneNewsCategoryLocationItem").clone();
					  objClone.attr("id", "newsCategoryLocationItem");
					  objClone.show();
					  objClone.find("a").attr("href", "/news/" + translateEn(data.newsCategoryList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.newsCategoryList[i].ua_location));
					  objClone.find("a").text( data.newsCategoryList[i].ua_location_title );
					  objClone.find("a").click(function (event){ 
						  event.preventDefault();
						  fnJsLink( this );
	              	  });
					  $("#newsCategoryInfoContainer").find("#newsCategoryLocationList").append( objClone );
				  }
				  $("#newsCategoryInfoContainer").find("#newsCategoryLocationList").append("<div class='clearboth'></div>");
				  $("#newsCategoryInfoContainer").show();
			  }
		  }
	});	
}

function fnEyeCategoryPopup( eyeCategory ){
	$.ajax({
		  url: "/async-getEyeCategoryInfo.php",
		  dataType : "json",
		  type : "POST",
		  data : { eyeCategory : eyeCategory },
		  success : function( data ){
			  if( data.result == "success" ){
				  fnCloseAllPopup( );
				  $("#eyeCategoryInfoContainer").find("div#eyeCategoryInfoTitle").text( data.eyeCategoryTitle );
				  $("#eyeCategoryInfoContainer").find("#eyeCategoryLocationList").html("");
				  for( var i = 0; i < data.eyeCategoryList.length; i ++ ){
					  var objClone = $("#cloneEyeCategoryLocationItem").clone();
					  objClone.attr("id", "eyeCategoryLocationItem");
					  objClone.show();
					  objClone.find("a").attr("href", "/eye/" + translateEn(data.eyeCategoryList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.eyeCategoryList[i].ua_location));
					  objClone.find("a").text( data.eyeCategoryList[i].ua_location_title );
					  objClone.find("a").click(function (event){ 
						  event.preventDefault();
						  fnJsLink( this );
	              	  });
					  $("#eyeCategoryInfoContainer").find("#eyeCategoryLocationList").append( objClone );
				  }
				  $("#eyeCategoryInfoContainer").find("#eyeCategoryLocationList").append("<div class='clearboth'></div>");
				  $("#eyeCategoryInfoContainer").show();
			  }
		  }
	});	
}

function fnAddNewsOnRightBar( locationId, locationTitle, locationPhoto, locationDescription, locationCategoryTitle, locationCommentCnt, locationScore, locationCreatedTime ){
	var objList = $("#rightSideNewsList").find("div#rightSideNewsItem").find("#rightSideNewsId");
	$("#rightSideNoNews").remove();	
	for( var i = 0; i < objList.length; i++ ){
		if( objList.eq(i).val() == locationId ) return;
	}
	var objClone = $("#cloneRightSideNewsItem").clone();
	var linkURL = "/news/" + translateEn(locationTitle).split(" ").join("-") + "/" + base64_encode( locationId );
	objClone.show( );
	objClone.attr( "id", "rightSideNewsItem" );
	objClone.find("#rightSideNewsId").val( locationId );
	objClone.find("#rightSideNewsImg").attr("src", locationPhoto );
	objClone.find("#rightSideNewsImg").parents("a").eq(0).attr("href", linkURL);
	objClone.find("#rightSideNewsImg").parents("a").eq(0).click(function (event){ 
	  		event.preventDefault();
	  		fnJsLink( this );
	  	});
	
	objClone.find("#rightSideNewsTitle").text( locationTitle );
	objClone.find("#rightSideNewsTitle").parents("a").eq(0).attr("href", linkURL);
	objClone.find("#rightSideNewsTitle").parents("a").eq(0).click(function (event){ 
	  		event.preventDefault();
	  		fnJsLink( this );
	  	});
	
	var uaDescription = locationDescription;
	var obj = $("<div></div>");
	obj.html( uaDescription );
	uaDescription = obj.text( );
	if( uaDescription.length > 110 )
		uaDescription = uaDescription.substring(0, 110) + "...";
	objClone.find("#rightSideNewsDescription").text( uaDescription );
	objClone.find("#rightSideNewsCreatedTime").html( '&nbsp;' + locationCreatedTime );
	objClone.find("#rightSideNewsCategory").html( '(' + _lang(locationCategoryTitle) + ')' );
	
	var strComment = "";
	if( locationCommentCnt == 0 )
		strComment = _lang("No Comment");
	else if( locationCommentCnt == 1 )
		strComment = _lang("1 Comment");
	else
		strComment = locationCommentCnt + " " +  _lang("Comments");	            	
	
	objClone.find("#rightSideNewsCommentCount").text( strComment );
	objClone.find("#rightSideNewsScore").text( locationScore );
	
	$("#rightSideNewsList").append( objClone );	
}

function fnAddPlaceOnRightBar( locationId, locationTitle, locationPhoto, locationDescription, locationCategoryTitle, locationCommentCnt, locationScore, locationCreatedTime, highlight, hour, minute, second ){
	var objList = $("#rightSidePlacesList").find("div#rightSidePlacesItem").find("#rightSideLocationId");
	$("#rightSideNoPlaces").remove();
	
	for( var i = 0; i < objList.length; i++ ){
		if( objList.eq(i).val() == locationId ) return;
	}
	var objClone = $("#cloneRightSidePlacesItem").clone();
	var linkURL = "/locations/" + translateEn(locationTitle).split(" ").join("-") + "/" + base64_encode( locationId );
	objClone.show( );
	objClone.attr( "id", "rightSidePlacesItem" );
	objClone.find("#rightSideLocationId").val( locationId );
	objClone.find("#rightSidePlacesImg").attr("src", locationPhoto );
	objClone.find("#rightSidePlacesImg").parents("a").eq(0).attr("href", linkURL);
	objClone.find("#rightSidePlacesImg").parents("a").eq(0).click(function (event){ 
	  		event.preventDefault();
	  		fnJsLink( this );
	  	});
	
	objClone.find("#rightSidePlacesTitle").text( locationTitle );
	objClone.find("#rightSidePlacesTitle").parents("a").eq(0).attr("href", linkURL);
	objClone.find("#rightSidePlacesTitle").parents("a").eq(0).click(function (event){ 
	  		event.preventDefault();
	  		fnJsLink( this );
	  	});
	
	var uaDescription = locationDescription;
	var obj = $("<div></div>");
	obj.html( uaDescription );
	uaDescription = obj.text( );
	if( uaDescription.length > 110 )
		uaDescription = uaDescription.substring(0, 110) + "...";
	objClone.find("#rightSidePlacesDescription").text( uaDescription );
	objClone.find("#rightSidePlacesCreatedTime").html( '<i class="icon-time"></i>&nbsp;' + locationCreatedTime );
	objClone.find("#rightSidePlacesCategory").html( '<i class="icon-tag icon-white"></i>&nbsp;' + _lang(locationCategoryTitle) );
	
	var strComment = "";
	if( locationCommentCnt == 0 )
		strComment = _lang("No Comment");
	else if( locationCommentCnt == 1 )
		strComment = _lang("1 Comment");
	else
		strComment = locationCommentCnt + " "+ _lang("Comments");	            	
	
	objClone.find("#rightSidePlacesCommentCount").text( strComment );
	objClone.find("#rightSidePlacesScore").text( locationScore );
	if( highlight == 1 ){
		objClone.find("#rightSidePlaceHighlight").show();
		objClone.find("#rightSidePlaceHighlight").text( hour + ":" + minute + ":" + second );
	}else{
		objClone.find("#rightSidePlaceHighlight").hide();
	}
	
	$("#rightSidePlacesList").append( objClone );	
}

function fnAddEyeOnRightBar( locationId, locationTitle, locationPhoto, locationDescription, locationCategoryTitle, locationCommentCnt, locationScore, locationCreatedTime ){
	var objList = $("#rightSideEyeList").find("div#rightSideEyeItem").find("#rightSideEyeId");
	$("#rightSideNoEye").remove();	
	for( var i = 0; i < objList.length; i++ ){
		if( objList.eq(i).val() == locationId ) return;
	}
	var objClone = $("#cloneRightSideEyeItem").clone();
	var linkURL = "/eye/" + translateEn(locationTitle).split(" ").join("-") + "/" + base64_encode( locationId );
	objClone.show( );
	objClone.attr( "id", "rightSideEyeItem" );
	objClone.find("#rightSideEyeId").val( locationId );
	objClone.find("#rightSideEyeImg").attr("src", locationPhoto );
	objClone.find("#rightSideEyeImg").parents("a").eq(0).attr("href", linkURL);
	objClone.find("#rightSideEyeImg").parents("a").eq(0).click(function (event){ 
	  		event.preventDefault();
	  		fnJsLink( this );
	  	});
	
	objClone.find("#rightSideEyeTitle").text( locationTitle );
	objClone.find("#rightSideEyeTitle").parents("a").eq(0).attr("href", linkURL);
	objClone.find("#rightSideEyeTitle").parents("a").eq(0).click(function (event){ 
	  		event.preventDefault();
	  		fnJsLink( this );
	  	});
	
	var uaDescription = locationDescription;
	var obj = $("<div></div>");
	obj.html( uaDescription );
	uaDescription = obj.text( );
	if( uaDescription.length > 110 )
		uaDescription = uaDescription.substring(0, 110) + "...";
	objClone.find("#rightSideEyeDescription").text( uaDescription );
	objClone.find("#rightSideEyeCreatedTime").html( '<i class="icon-time"></i>&nbsp;' + locationCreatedTime );
	objClone.find("#rightSideEyeCategory").html( '<i class="icon-tag icon-white"></i>&nbsp;' + _lang(locationCategoryTitle) );
	
	var strComment = "";
	if( locationCommentCnt == 0 )
		strComment = _lang("No Comment");
	else if( locationCommentCnt == 1 )
		strComment = _lang("1 Comment");
	else
		strComment = locationCommentCnt + " " + _lang("Comments");
	
	objClone.find("#rightSideEyeCommentCount").text( strComment );
	objClone.find("#rightSideEyeScore").text( locationScore );
	
	$("#rightSideEyeList").append( objClone );	
}
function fnAfterSignIn( data ){
	
	var objClone = $("#cloneAddLocationDescription").clone();
	objClone.removeAttr("id");
	objClone.removeAttr("style");
	objClone.show();
	objClone.find("textarea").attr("id", "addLocationDescription");
	$("#addLocationKeywords").parents("div.control-group").eq(0).after( objClone );
	objClone.find("#addLocationDescription").liveEdit({
	fileBrowser: '/texteditor/assetmanager/asset.php?type=location&userId=' + data.user.ua_user,
        height: 500,
        css: ['/texteditor/bootstrap/css/bootstrap.min.css', '/texteditor/bootstrap/bootstrap_extend.css'],            
        groups: [
                ["group1", "", ["Bold", "Italic", "Underline", "ForeColor", "RemoveFormat"]],
                ["group2", "", ["Paragraph", "FontSize", "FontDialog", "TextDialog","Bullets", "Numbering"]],
                ["group3", "", ["ImageDialog", "LinkDialog", "SourceDialog" ]]
                ]
    });
	objClone.find("textarea#addLocationDescription").data('liveEdit').startedit();
	objClone.find('textarea#addLocationDescription').data('liveEdit').putHTML("");
	
	
	
	$("#profileAreaLogin").find("span#profileBalanceAmount").text( "$" + String(data.user.ua_balance_amount) );
	$("#profileAreaLogin").find("span#profileName").text( data.user.ua_username );
	$("#profileAreaLogin").find("img").attr( "src", data.user.ua_photo );
	
	$("#locationInfoPhoto").attr( "src", data.user.ua_photo );
	$("#blogInfoPhoto").attr( "src", data.user.ua_photo );
	
    $("#profileAreaLogin").show();
    $("#profileAreaNotLogin").hide();
    $("#isLogin").val("Y");
    $("#UA_USER").val(data.user.ua_user);
    $("#cntPlanTrip").text( data.cntPlanTrip );
    $("#cntPlanTrip").show();
    onSignInClose();
    var bucketList = data.bucketList;
    if( bucketList != null ){
        onFindPlacesAddBucketList( bucketList );
    }
}
var nIntervalId;
function fnHighlightCurrentLocation( ){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var image = {
					url: '/img/markerCurrent.png',
					size: new google.maps.Size(29, 40),
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(15, 37) };
			if( markerCurrentLocation != null )
				markerCurrentLocation.setMap( null );
			
			markerCurrentLocation = new google.maps.Marker({
				position: pos,
				map: map,
				icon: image
			});
			var geocoder = new google.maps.Geocoder();
		    geocoder.geocode({'latLng': pos}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		        if (results[1]) {
					google.maps.event.addListener(markerCurrentLocation, 'click', function() {
						var strContent = "";
						strContent += "<p>";
						strContent += results[1].formatted_address;
						strContent += "</p>";
						strContent += "<div style='text-align:center;'>";
						strContent += "<button class='btn btn-rectangle btn-success btn-mini' onclick='onAddToTripCurrentLocation(" + pos.lat() + "," + pos.lng() + ",\"" + results[1].formatted_address + "\")'>" + _lang("ADD TO TRIP") + "</button>";
						strContent += "</div>";
							
						infowindow.setContent( strContent );
						infowindow.open( map, markerCurrentLocation );
					});
		        }
		      } else {
		    	  // alert("Can't get the current location.");
		      }
		    });				
			map.setCenter(pos);
		}, function() {
			alert(_lang("Can't get the current location."));
			clearInterval( nIntervalId );
			return;
		});
	}else {
		alert(_lang("Can't get the current location."));
		clearInterval( nIntervalId );
		return;
	}
}

function fnCommentRating( commentId, commentType, ratingType ){
    $.ajax({
        url: "/async-saveCommentRating.php",
        dataType : "json",
        type : "POST",
        data : { commentId : commentId, commentType : commentType, ratingType : ratingType },
        success : function(data){
            if(data.result == "success"){
            	
            }
        }
    });	
}
function fnMainDescriptionRating (locationId, commentType, ratingType) {
    $.ajax({
        url: "/async-saveMainDescriptionRating.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, commentType : commentType, ratingType : ratingType },
        success : function(data){
            if(data.result == "success"){
            	
            }
        }
    });	
}
function handleNoGeolocation( errorFlag ){
	var content
	if (errorFlag) {
		content = _lang("Can't get the current location.");
	} else {
		content = _lang("Can't get the current location.");
	}
	alert( content );
}
function fnDrawMapOnLocationPopup(){
	var posLatLon = new google.maps.LatLng( $("#addLocationLat").val(), $("#addLocationLon").val() );
	var mapOptions = {
			zoom: 7,
			center: posLatLon,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	mapLocation = new google.maps.Map(document.getElementById('mapCanvasLocation'), mapOptions);
	if( markerLocation != null ) markerLocation.setMap( null );	
	markerLocation = new google.maps.Marker({ position: posLatLon, map: mapLocation });
	
	google.maps.event.addListener( mapLocation, 'click', function(event) {
		if( markerLocation != null )
			markerLocation.setMap( null );
		markerLocation = new google.maps.Marker({ position: event.latLng, map: mapLocation });
		$("#addLocationLat").val( event.latLng.lat() );
		$("#addLocationLon").val( event.latLng.lng() );
		
	    geocoder.geocode({'latLng': event.latLng}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        if (results[1]) {
	          $("#addLocationAddress").val(results[1].formatted_address);
	        }
	      } else {
	    	  
	      }
	    });
	});	
}
function fnMyPlaces(){
	$.ajax({   	
		url: "/async-getMyPlaces.php",
	    cache : false,
	    dataType : "json",
	    type : "POST",
	    data : { },
	    success : function(data){
	    	if( data.result == "success" ){
	    		$("#myPlacesList").html("");
	    		for( var i = 0; i < data.myPlacesList.length; i ++ ){
		    		var objClone = $("#cloneMyPlacesItem").clone();
		    		objClone.show();
		    		objClone.attr("id", "myPlacesItem");
		    		objClone.find("#myPlacesItemTitle").text( data.myPlacesList[i].ua_location_title );
		    		
		    		objClone.find("a#myPlacesItemView").attr("href", "/locations/" + translateEn(data.myPlacesList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.myPlacesList[i].ua_location ) );
		    		objClone.find("a#myPlacesItemView").click(function (event){
                		event.preventDefault();
						fnJsLink( this );
	              	});
		    		objClone.find("a#myPlacesItemEdit").attr("href", "/editPlace/" + base64_encode( data.myPlacesList[i].ua_location ) );
		    		objClone.find("a#myPlacesItemEdit").click(function (event){
                		event.preventDefault();
						fnJsLink( this );
	              	});		    		
		    		
		    		$("#myPlacesList").append( objClone );
	    		}
	    		if( data.myPlacesList.length == 0 ){
	    			$("#myPlacesList").append($("<h3>" + _lang("There is no places.")+ "</h3>"));
	    		}
	    		fnCloseAllPopupPopup();
	    		$("#myPlacesContainer").show();
	    		$("#socialPart").hide();
				$("#main_Panel_back_button").hide();
	    		$("#globalIcon").hide();
	    		$("#globalList").css("width", "0px");
	    		$("#globalIcon").css("right", "0px");
	    		isGlobal = false;
	    	}
	    }
	});	
}
function fnBalanceAmount( price ){
	var balanceAmount = $("#profileBalanceAmount").text();
	balanceAmount = Number( balanceAmount.substring( 1 ) );
	balanceAmount -= price;
	$("#profileBalanceAmount").text( "$" + balanceAmount.toFixed(2) );	
}
function fnLocationUpToTop( event, obj ){
	var locationId = $(obj).parents("#locationInfoContainer").eq(0).find("#locationInfoLocationId").val();
	
	$.ajax({
		url: "/async-setLocationUpToTop.php",
	    cache : false,
	    dataType : "json",
	    type : "POST",
	    data : { locationId : locationId },
	    success : function(data){
	    	if( data.result == "success" ){	
	    		fnBalanceAmount( data.priceLocationUpToTop );
	        	isLoadPlaces = true;
	        	cntPlacesLoaded = 0;
	        	canLoadPlaces = true;
	        	$("#rightSidePlacesList").html("");
	        	$("#btnPlaces").click();
	    	}else{
	    		$("#paymentForm").find("#amount").val( data.priceLocationUpToTop );
	    		$("#paymentForm").find("#return").val( window.location.href );
	    		var invoice = $("#paymentForm").find("#invoice").val();
	    		var amount = data.priceLocationUpToTop;
	    		$.ajax({
	    			url: "/async-savePaymentHistory.php",
	    			dataType : "json",
	    			type : "POST",
	    			data : { invoice : invoice, amount : amount, type : 4, subId : locationId },
	    			success : function(data){	
	    				$("#paymentForm").submit();
	    				
	    			}
	    		});	    		
	    	}
	    }
	});
	event.stopPropagation();
	event.preventDefault();
	console.log(event);
	return false;
}
function fnCloseRightBar( ){
	$("#rightArrow").removeClass("rightArrowOpen");
	$("#rightSidePanel").removeClass("rightSidePanelOpen");
	// $("#rightSidePanelContainer").hide();
}
function loadLanguage(){
	 $.ajax({
		 url: "async-loadLanguage.php",
		 cache : false,
		 dataType : "json",
		 type : "POST",
		 success : function(data){
			 if(data.result == "success"){	
				 if( data.lang != null ){
					languageList = data.lang;
				 }
			 }
		 }		 
	 });
}
function _lang( lang ){
	if(languageList[lang] != null){
		return languageList[lang];
	}else{
		return lang;
	}
}
function fnSetRegion( regionId ){	
	for( var i = 0; i < markerFindPlaceList.length; i ++ ){
		for( var j = 0; j < markerFindPlaceList[i].length; j ++ ){
			var cnt = 0;
			for( var k = 0; k < markerFindPlaceList[i][j].length; k ++ ){
				if( markerFindPlaceList[i][j][k] != null && markerFindPlaceList[i][j][k] != undefined && markerFindPlaceList[i][j][k] != "" ){
					var objList = $("#rightSidePlacesList").find("div#rightSidePlacesItem");
					if( regionId == "" ){
						cnt++;
						markerFindPlaceList[i][j][k].setMap( map );
					}else if( regionId != markerFindPlaceList[i][j][k].regionId ){
						markerFindPlaceList[i][j][k].setMap( null );
					}else{
						cnt++;
						markerFindPlaceList[i][j][k].setMap( map );
					}
				}
			}
			$("#panelFindPlacesList").find("div#panelFindPlacesItem").eq(i).find("div#panelFindPlacesItemList").eq(j).find("div#findCountPlaces").text( cnt );			
		}
	}
	
	for( var i = 0; i < markerNewsList.length; i ++ ){
		var cnt = 0;
		for( var j = 0; j < markerNewsList[i].length; j ++ ){
			if( markerNewsList[i][j] != null && markerNewsList[i][j] != undefined && markerNewsList[i][j] != "" ){
				var objList = $("#rightSideNewsList").find("div#rightSideNewsItem");
				if( regionId == "" ){
					cnt++;
					markerNewsList[i][j].setMap( map );
				}else if( regionId != markerNewsList[i][j].regionId ){
					markerNewsList[i][j].setMap( null );
				}else{
					cnt++;
					markerNewsList[i][j].setMap( map );
				}				
			}
		}
		$("#panelNewsList").find("div#panelNewsItem").eq(i).find("div#newsCount").text( cnt );		
	}

	for( var i = 0; i < markerEyeList.length; i ++ ){
		var cnt = 0;
		for( var j = 0; j < markerEyeList[i].length; j ++ ){
			if( markerEyeList[i][j] != null && markerEyeList[i][j] != undefined && markerEyeList[i][j] != "" ){
				var objList = $("#rightSideEyeList").find("div#rightSideEyeItem");
				if( regionId == "" ){
					cnt++;
					markerEyeList[i][j].setMap( map );
				}else if( regionId != markerEyeList[i][j].regionId ){
					markerEyeList[i][j].setMap( null );
				}else{
					cnt++;
					markerEyeList[i][j].setMap( map );
				}				
			}
		}
		$("#panelEyeList").find("div#panelEyeItem").eq(i).find("div#eyeCount").text( cnt );
	}	
}
function fnNewsAnalytics( ){
	onNewsAnalyticsShowChart();
	$("#newsAnalyticsContainer").show();
	$("#socialPart").hide();
	$("#main_Panel_back_button").hide();
	$("#globalIcon").hide();
	$("#globalList").css("width", "0px");
	$("#globalIcon").css("right", "0px");
	isGlobal = false;
}
function fnCloseModal(){
	onSignUpClose();
	onSignInClose();
	onProfileClose();
	onClosePlanTripPopup();
	onCloseTripList();
	onCloseBucketList();
	onCloseShareLink();
}
function fnCreateSocialFB( url ){
    var elem = $(document.createElement("fb:like"));
    elem.attr("href", url);
    elem.attr("layout", "button_count");
    elem.attr("action", "like");
    elem.attr("show_faces", "false");
    elem.attr("share", "false");
    $("#locationSocialFB").empty().append(elem);
    FB.XFBML.parse($("#locationSocialFB").get(0));
}
function fnCreateSocialTW( url ){
	$('#locationSocialTW').empty();
	
	var elem = $(document.createElement("a"));
	elem.attr("data-url", url); 
	elem.attr("data-counturl", url);
	elem.attr("class", "twitter-share-button");
	elem.attr("data-count", "none");
	elem.attr("data-dnt", "true");
	
	$('#locationSocialTW').append(elem);
	$.getScript("http://platform.twitter.com/widgets.js");	
}
function fnCreateSocialGP( url ){
	$('#locationSocialGP').empty();
    $.getScript('https://apis.google.com/js/plusone.js');	
    $('#locationSocialGP').append('<div data-href="' + url + '" class="g-plusone" data-size="medium" data-annotation="none"></div>');
    
}

function fnCreateSocialFB1( url ){
    var elem = $(document.createElement("fb:like"));
    elem.attr("href", url);
    elem.attr("layout", "button_count");
    elem.attr("action", "like");
    elem.attr("show_faces", "false");
    elem.attr("share", "false");
    $("#locationSocialFB1").empty().append(elem);
    FB.XFBML.parse($("#locationSocialFB1").get(0));
}
function fnCreateSocialTW1( url ){
	$('#locationSocialTW1').empty();
	
	var elem = $(document.createElement("a"));
	elem.attr("data-url", url); 
	elem.attr("data-counturl", url);
	elem.attr("class", "twitter-share-button");
	elem.attr("data-count", "none");
	elem.attr("data-dnt", "true");
	
	$('#locationSocialTW1').append(elem);
	$.getScript("http://platform.twitter.com/widgets.js");	
}
function fnCreateSocialGP1( url ){
	$('#locationSocialGP1').empty();
    $.getScript('https://apis.google.com/js/plusone.js');	
    $('#locationSocialGP1').append('<div data-href="' + url + '" class="g-plusone" data-size="medium" data-annotation="none"></div>');
    
}
function onOpenRightBarPlace(){
	$("#rightArrow").click();
	$("#btnPlaces").click();
}
function onOpenRightBarNews(){
	$("#rightArrow").click();
	$("#btnNews").click();
}
function onOpenRightBarEye(){
	$("#rightArrow").click();
	$("#btnEye").click();
}
function fnAddFirstCommentOnPopup( id, photo, username, comment, comment_rate,  createdTime, type, likeCnt, unlikeCnt, liked ){
	if( type == 1 ){
		var objClone = $("#cloneLocationInfoCommentItem").clone();
		objClone.show();
		objClone.attr("id", "locationInfoCommentItem");
		var uaPhoto = photo;
		if( uaPhoto == "" )
			uaPhoto = $("#noProfileImg").val();
		
		objClone.find("#locationInfoCommentId").val( id );		
		objClone.find("div#locationInfoCommentItemPhoto").find("img").attr( "src", uaPhoto );
		objClone.find("div#locationInfoCommentItemUsername").text( username );
		if(comment_rate != "" && comment_rate != "0"){
			objClone.find("div#locationInfoCommentItemUserRate").find("button.btn-success").text( comment_rate + '.0' );
			$("div.location-comment-rate-wrap").find("button#locationCommentRate").removeClass("comment-scored btn-success");
		}else
			objClone.find("div#locationInfoCommentItemUserRate").addClass("hide");
		
		objClone.find("div#locationInfoCommentItemDate").text( createdTime );
		objClone.find("p#locationInfoCommentItemComment").text( comment );
		objClone.find("#commentLike").text( likeCnt );
		objClone.find("#commentUnlike").text( unlikeCnt );
	
		if( liked == 1 ){
			objClone.find("#commentLikeArea").addClass("liked");
		}else if( liked == -1 ){
			objClone.find("#commentUnlikeArea").addClass("liked");			
		}		
		
		$("div#locationInfoCommentFirstItem").prepend( objClone );		
	}else if( type == 2){
		var objClone = $("#cloneBlogInfoCommentItem").clone();
		objClone.show();
		objClone.attr("id", "blogInfoCommentItem");
		var uaPhoto = photo;
		if( uaPhoto == "" )
			uaPhoto = $("#noProfileImg").val();
		
		objClone.find("#blogInfoCommentId").val( id );
		objClone.find("div#blogInfoCommentItemPhoto").find("img").attr( "src", uaPhoto );
		objClone.find("div#blogInfoCommentItemUsername").text( username );
		objClone.find("div#blogInfoCommentItemDate").text( createdTime );
		objClone.find("p#blogInfoCommentItemComment").text( comment );
		
		objClone.find("#commentLike").text( likeCnt );
		objClone.find("#commentUnlike").text( unlikeCnt );
	
		if( liked == 1 ){
			objClone.find("#commentLikeArea").addClass("liked");
		}else if( liked == -1 ){
			objClone.find("#commentUnlikeArea").addClass("liked");			
		}
		$("div#locationInfoCommentList").prepend( objClone );		
		
	}

}
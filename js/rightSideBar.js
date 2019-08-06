function onClickRightSidePlanTripTab( obj ){
	$(obj).parents("#rightSideButtonArea").eq(0).find("button").removeClass("btn-danger");
	$(obj).addClass("btn-danger");
	$("#rightSidePlanTrip").show();
	$("#rightSidePlaces").hide();	
	$("#rightSideNews").hide();
	$("#rightSideEye").hide();		
	if( isLoadPlanTrip == false ) return;
	
	var objList = $("#planTripLocationList").find("div#planTripLocationItem");
	for( var i = 0; i < objList.size(); i ++ ){
		if( objList.eq(i).find("#planTripLocationId").val() == "" ){
			$("#rightSidePlanTripList").html("<div style='text-align:center; font-size: 20px; margin-top: 20px;'>" + _lang("Please complete plan trip.")+ "</div>");
			return;
		}
	}
	
	$("#rightSidePlanTripList").html("");

	for( var i = 0; i < objList.size() - 1; i ++ ){
		var lat1 = objList.eq(i).find("#planTripLocationLat").val();
		var lon1 = objList.eq(i).find("#planTripLocationLon").val();
		var lat2 = objList.eq(i + 1).find("#planTripLocationLat").val();
		var lon2 = objList.eq(i + 1).find("#planTripLocationLon").val();
		var departure = lat1 + "," + lon1;
		var destination = lat2 + "," + lon2;
		if( departure == "," || destination == ","){
			continue;
		}
	    $.ajax({
	        url: "/async-getPlanTripDetailInfo.php",
	        dataType : "json",
	        type : "POST",
	        data : { departure : departure, destination : destination, pos : i },
	        success : function(data){
	            if(data.result == "success"){
	            	var distance = data.info.routes[0].legs[0].distance.value;
	            	var duration = data.info.routes[0].legs[0].duration.value;
	        		var tripName = objList.eq( data.pos - 1 ).find("#txtTripLocation").val();
	        		
	            	if( distance < 1000 ) distance = distance + "m";
	            	else distance = Math.floor( distance / 1000 ) + "km";
				  
	            	var hour = Math.floor( duration / 3600 );
	            	var min = Math.floor((duration % 3600) / 60);
	            	if( hour != 0 ) duration = hour + "h ";
	            	if( min != 0 ) duration = duration + min + "m";
	            	
	            	var objClone = $("#cloneRightSidePlanTripItem").clone();
	            	objClone.attr( "id", "rightSidePlanTripItem" );
	            	objClone.show( );
	            	objClone.find("#rightPlanTripDistance").text( distance );
	            	objClone.find("#rightPlanTripDuration").text( duration );
	            	objClone.find("#rightPlanTripName").text( tripName );
	            	objClone.find("#rightPlanTripNo").text( "Trip " + Number(data.pos) );
	            	
	            	var objSteps = data.info.routes[0].legs[0].steps;
	            	for( var j = 0; j < objSteps.length; j ++ ){
	            		var objCloneItem = $("#cloneRightPlanTripItemBodyItem").clone();
	            		objCloneItem.show();
	            		objCloneItem.attr("id", "rightPlanTripItemBodyItem");
	            		objCloneItem.html( Number(j + 1 ) + ". " + objSteps[j].html_instructions );
	            		objClone.find("#rightPlanTripItemBodyList").append( objCloneItem );
	            	}
	            	$("#rightSidePlanTripList").append(objClone);

	            }
	        }
	    });
	    isLoadPlanTrip = false;
	}
}
function fnLoadPlaces( ){
	if( canLoadPlaces == false ) return;
	$("#panelFindPlacesListOverlay").show();
	var locationIds = [];
	for( var i = 0 ; i < markerFindPlaceList.length; i ++ ){
		for( var j = 0; j < markerFindPlaceList[i].length; j ++ ){
			for( var k = 0; k < markerFindPlaceList[i][j].length; k ++ ){
				if( markerFindPlaceList[i][j][k] != null){
					var selectedRegionId = $("#regionList").val();
					if( ( selectedRegionId == "" ) || ( markerFindPlaceList[i][j][k].regionId != "" && markerFindPlaceList[i][j][k].regionId == selectedRegionId )){
						locationIds[ locationIds.length ] = markerFindPlaceList[i][j][k].locationId;
					}
				}
			}
		}
	}

	var strIds = "";
	for( var i = 0; i < locationIds.length; i ++ ){
		strIds += locationIds[ i ];
		if( i < locationIds.length - 1 )
			strIds += ",";
	}
	canLoadPlaces = false;
	$.ajax({
        url: "/async-getLocationInfoByIds.php",
        dataType : "json",
        type : "POST",
        data : { locationIds : strIds, cntPlacesLoaded : cntPlacesLoaded},
        success : function(data){
            if(data.result == "success"){
            	isLoadPlaces = false;
            	
            	cntPlacesLoaded = Number( cntPlacesLoaded ) + Number( data.locationList.length );
            	
            	if( $("#rightSidePlacesList").find("#rightSidePlacesItem").length == 0 && data.locationList.length == 0){
            		$("#rightSidePlacesList").html("<div id='rightSideNoPlaces'>" + _lang("There is no places.") + "</div>");
            	}else if( $("#rightSidePlacesList").find("#rightSidePlacesItem").length == 0 && data.locationList.length != 0){
            		$("#rightSidePlacesList").find("#rightSideNoPlaces").remove();
            	}
            	canLoadPlaces = true;
            	$("#panelFindPlacesListOverlay").hide();
            	if( data.locationList.length == 0 ){
            		canLoadPlaces = false;
            		return;
            	}
            	
            	for( var i = 0 ; i < data.locationList.length; i ++ ){
            		var placeItem = data.locationList[i];
            		fnAddPlaceOnRightBar( placeItem.ua_location, placeItem.ua_location_title, placeItem.ua_location_photo, placeItem.ua_location_description,
            				placeItem.ua_category_title, placeItem.ua_comment_cnt, placeItem.ua_score, placeItem.ua_created_time, placeItem.ua_highlight, placeItem.ua_hour, placeItem.ua_minute, placeItem.ua_second );
            	}
            }
        }
    });	
}
function onClickRightSidePlacesTab( obj ){
	$(obj).parents("#rightSideButtonArea").eq(0).find("button").removeClass("btn-danger");
	$(obj).addClass("btn-danger");
	$("#rightSidePlanTrip").hide();
	$("#rightSidePlaces").show();	
	$("#rightSideNews").hide();
	$("#rightSideEye").hide();
	if( isLoadPlaces == false ) return;
	fnLoadPlaces( );
}

function onClickRightSideNewsTab( obj ){
	$(obj).parents("#rightSideButtonArea").eq(0).find("button").removeClass("btn-danger");
	$(obj).addClass("btn-danger");
	$("#rightSidePlanTrip").hide();
	$("#rightSidePlaces").hide();	
	$("#rightSideNews").show();
	$("#rightSideEye").hide();
	if( isLoadNews == false ) return;
	fnLoadNews( );
}
function onClickRightSideEyeTab( obj ){
	$(obj).parents("#rightSideButtonArea").eq(0).find("button").removeClass("btn-danger");
	$(obj).addClass("btn-danger");
	$("#rightSidePlanTrip").hide();
	$("#rightSidePlaces").hide();	
	$("#rightSideNews").hide();
	$("#rightSideEye").show();	
	if( isLoadEye == false ) return;
	fnLoadEye( );
}
function onClickLocationLike( ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this."));
		onSignInPopup();
		return;
	}
	
	var locationId = $("#locationInfoContainer").find("#locationInfoLocationId").val();
	var likeType;
	var score = Number( $("#locationLikeScore").text( ) );
	// Check current stuatus
	if( $("#btnLocationLike").hasClass("btnLocationLike") ){
		$("#btnLocationLike").removeClass("btnLocationLike");
		$("#btnLocationLike").find("i").removeClass("icon-white");
		score--;
		likeType = 0;
	}else if( $("#btnLocationDislike").hasClass("btnLocationDislike") ){
		$("#btnLocationDislike").removeClass("btnLocationDislike");
		$("#btnLocationDislike").find("i").removeClass("icon-white");
		$("#btnLocationLike").addClass("btnLocationLike");
		$("#btnLocationLike").find("i").addClass("icon-white");		
		score+=2;
		likeType = 1;
	}else{
		$("#btnLocationLike").addClass("btnLocationLike");
		$("#btnLocationLike").find("i").addClass("icon-white");		
		score++;
		likeType = 1;
	}
	$("#locationLikeScore").text( score );
	if( score > 30 ){
		$("#locationLikeArrow").css("-webkit-transform", "rotate(90deg)");
		$("#locationLikeArrow").css("-moz-transform", "rotate(90deg)");
	}else{
		$("#locationLikeArrow").css("-webkit-transform", "rotate(" + String(90 / 30 * score) +"deg)");
		$("#locationLikeArrow").css("-moz-transform", "rotate(" + String(90 / 30 * score) +"deg)");
	}	
		
	$("#rightSidePanel").find("#rightSideNews").find("#rightSideNewsId[value='" + locationId + "']").parents("#rightSideNewsItem").eq(0).find("div#rightSideNewsScore").text( score );
	$("#rightSidePanel").find("#rightSidePlaces").find("#rightSideLocationId[value='" + locationId + "']").parents("#rightSidePlacesItem").eq(0).find("div#rightSidePlacesScore").text( score );
	
    $.ajax({
        url: "/async-setLocationLike.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, likeType : likeType },
        success : function(data){
            if(data.result == "success"){
            	
            }
        }
    });
}
function onClickLocationDislike( ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this."));
		onSignInPopup();
		return;
	}
	var locationId = $("#locationInfoContainer").find("#locationInfoLocationId").val();
	var likeType;	
	var score = Number( $("#locationLikeScore").text( ) );
	// Check current stuatus
	if( $("#btnLocationDislike").hasClass("btnLocationDislike") ){
		$("#btnLocationDislike").removeClass("btnLocationDislike");
		$("#btnLocationDislike").find("i").removeClass("icon-white");
		score++;
		likeType = 0;
	}else if( $("#btnLocationLike").hasClass("btnLocationLike") ){
		$("#btnLocationLike").removeClass("btnLocationLike");
		$("#btnLocationLike").find("i").removeClass("icon-white");
		$("#btnLocationDislike").addClass("btnLocationDislike");
		$("#btnLocationDislike").find("i").addClass("icon-white");		
		score-=2;
		likeType = -1;
	}else{
		$("#btnLocationDislike").addClass("btnLocationDislike");
		$("#btnLocationDislike").find("i").addClass("icon-white");		
		score--;
		likeType = -1;
	}
	$("#locationLikeScore").text( score );
	if( score > 30 ){
		$("#locationLikeArrow").css("-webkit-transform", "rotate(90deg)");
		$("#locationLikeArrow").css("-moz-transform", "rotate(90deg)");
	}else{
		$("#locationLikeArrow").css("-webkit-transform", "rotate(" + String(90 / 30 * score) +"deg)");
		$("#locationLikeArrow").css("-moz-transform", "rotate(" + String(90 / 30 * score) +"deg)");
	}
		
	$("#rightSidePanel").find("#rightSideNews").find("#rightSideNewsId[value='" + locationId + "']").parents("#rightSideNewsItem").eq(0).find("div#rightSideNewsScore").text( score );
	$("#rightSidePanel").find("#rightSidePlaces").find("#rightSideLocationId[value='" + locationId + "']").parents("#rightSidePlacesItem").eq(0).find("div#rightSidePlacesScore").text( score );
	
    $.ajax({
        url: "/async-setLocationLike.php",
        dataType : "json",
        type : "POST",
        data : { locationId : locationId, likeType : likeType },
        success : function(data){
            if(data.result == "success"){
            	return;
            }
        }
    });	
}
function onLocationHightlight( obj ){
	var locationId = $(obj).parents("#rightSidePlacesItem").eq(0).find("#rightSideLocationId").val();
	fnHightlightMap( locationId );
}
function onNewsHightlight( obj ){
	var locationId = $(obj).parents("#rightSideNewsItem").find("#rightSideNewsId").val();
	fnHightlightMap( locationId );
}
function onEyeHightlight( obj ){
	var locationId = $(obj).parents("#rightSideEyeItem").find("#rightSideEyeId").val();
	fnHightlightMap( locationId );
}
function fnLoadNews( ){
	if( canLoadNews == false ) return;
	$("#panelNewsListOverlay").show();
	var newsIds = [];	
	for( var i = 0 ; i < markerNewsList.length; i ++ ){
		for( var j = 0; j < markerNewsList[i].length; j ++ ){
			if( markerNewsList[i][j] != null ){
				var selectedRegionId = $("#regionList").val();
				if( ( selectedRegionId == "" ) || ( markerNewsList[i][j].regionId != "" && markerNewsList[i][j].regionId == selectedRegionId )){
					newsIds[ newsIds.length ] = markerNewsList[i][j].locationId;
				}
			}
		}
	}		
	var strIds = "";
	for( var i = 0; i < newsIds.length; i ++ ){
		strIds += newsIds[ i ];
		if( i < newsIds.length - 1 )
			strIds += ",";
	}
	canLoadNews = false;
    $.ajax({
        url: "/async-getNewsInfoByIds.php",
        dataType : "json",
        type : "POST",
        data : { newsIds : strIds, cntNewsLoaded : cntNewsLoaded },
        success : function(data){
            if(data.result == "success"){
            	isLoadNews = false;
            	cntNewsLoaded = Number( cntNewsLoaded) + Number( data.newsList.length );
            	
            	if( $("#rightSideNewsList").find("#rightSideNewsItem").length == 0 && data.newsList.length == 0){
            		$("#rightSideNewsList").html("<div id='rightSideNoNews'>" + _lang("There is no news.") + "</div>");
            	}
            	if( $("#rightSideNewsList").find("#rightSideNewsItem").length == 0 && data.newsList.length != 0){
            		$("#rightSideNewsList").find("#rightSideNoNews").remove();
            	}
            	canLoadNews = true;
            	$("#panelNewsListOverlay").hide();
            	if( data.newsList.length == 0 ){
            		canLoadNews = false;
            		return;
            	}
            	for( var i = 0 ; i < data.newsList.length; i ++ ){
            		var newsItem = data.newsList[i];
            		fnAddNewsOnRightBar( newsItem.ua_location, newsItem.ua_location_title, newsItem.ua_location_photo, newsItem.ua_location_description,
            				newsItem.ua_category_title, newsItem.ua_comment_cnt, newsItem.ua_score, newsItem.ua_created_time);
            	}

            }
        }
    });
}

function fnLoadEye( ){
	if( canLoadEye == false ) return;
	
	var eyeIds = [];
	for( var i = 0 ; i < markerEyeList.length; i ++ ){
		for( var j = 0; j < markerEyeList[i].length; j ++ ){
			if( markerEyeList[i][j] != null ){
				var selectedRegionId = $("#regionList").val();
				if( ( selectedRegionId == "" ) || ( markerEyeList[i][j].regionId != "" && markerEyeList[i][j].regionId == selectedRegionId )){
					eyeIds[ eyeIds.length ] = markerEyeList[i][j].locationId;
				}
				
			}
		}
	}		
	var strIds = "";
	for( var i = 0; i < eyeIds.length; i ++ ){
		strIds += eyeIds[ i ];
		if( i < eyeIds.length - 1 )
			strIds += ",";
	}
	canLoadEye = false;
	
    $.ajax({
        url: "/async-getEyeInfoByIds.php",
        dataType : "json",
        type : "POST",
        data : { eyeIds : strIds, cntEyeLoaded : cntEyeLoaded },
        success : function(data){
            if(data.result == "success"){            	
            	isLoadEye = false;
            	cntEyeLoaded = Number( cntEyeLoaded) + Number( data.eyeList.length );
            	if( $("#rightSideEyeList").find("#rightSideEyeItem").length == 0 && data.eyeList.length == 0){
            		$("#rightSideEyeList").html("<div id='rightSideNoEye'>" + _lang("There is no eye.") + "</div>");
            	}
            	if( $("#rightSideEyeList").find("#rightSideEyeItem").length == 0 && data.eyeList.length != 0){
            		$("#rightSideEyeList").find("#rightSideNoEye").remove();
            	}
            	canLoadEye = true;            	
            	if( data.eyeList.length == 0 ){
            		canLoadEye = false;
            		return;
            	}
            	for( var i = 0 ; i < data.eyeList.length; i ++ ){
            		var eyeItem = data.eyeList[i];
            		fnAddEyeOnRightBar( eyeItem.ua_location, eyeItem.ua_location_title, eyeItem.ua_location_photo, eyeItem.ua_location_description,
            				eyeItem.ua_category_title, eyeItem.ua_comment_cnt, eyeItem.ua_score, eyeItem.ua_created_time);
            	}

            }
        }
    });		
}
function onClickPanelFindPlacesItem(obj){

	if($(obj).parents("div#panelFindPlacesItem").find("div#panelFindPlacesItemList").css("display") == "none"){
		$(obj).parents("div#panelFindPlacesItem").find("div#panelFindPlacesItemList").show();
		$(obj).parents("div#panelFindPlacesItem").find("i#panelFindPlacesItemParentImage").attr("class","icon-chevron-down");
	}else{
		$(obj).parents("div#panelFindPlacesItem").find("div#panelFindPlacesItemList").hide();
		$(obj).parents("div#panelFindPlacesItem").find("i#panelFindPlacesItemParentImage").attr("class","icon-chevron-right");
	}
}

function onClickFindMainCategory( obj ){
	onCountFindSubCategory( $(obj).find("a#SubCategoryCheckCount").get( 0 ) );
}

// Find Places Category Check All / UnCheck All
function onCountFindSubCategory( obj ){
	 var firstIndex = $("div#panelFindPlacesList").find("div#panelFindPlacesItem").index( $(obj).parents("div#panelFindPlacesItem").eq(0) );
	 
	 var cntSelected = $(obj).parents("div#panelFindPlacesItem").eq(0).find("div.guideItemSelected").length;	 
	 var objList = $( obj ).parents("div#panelFindPlacesItem").eq(0).find("div#panelFindPlacesItemList");
	 var cntSubCategory = objList.length;
	 
	 if( cntSubCategory == cntSelected ){
		 for( var i = 0; i < cntSubCategory; i ++ ){
			 if( i == 0 && firstIndex == 0 ) isLoadCategoryPlace[i] = true;
			 else isLoadCategoryPlace[i] = false;
		 }
	 }else{
		 for( var i = 0; i < cntSubCategory; i ++ ){
			 if( objList.eq(i).hasClass("guideItemSelected") ){
				 isLoadCategoryPlace[i] = true;
			 }else { 
				 isLoadCategoryPlace[i] = false; 
			 }
		 }
	 }
	 
	if( cntSubCategory == cntSelected ){
		// make all deselect
		for( var i = 0; i < cntSubCategory; i ++ ){
			if( i == 0 && firstIndex == 0 ) continue;
			objList.eq(i).trigger("click");
		}
	}else{
		// make all select
		for( var i = 0; i < cntSubCategory; i ++ ){
			 if( objList.eq(i).hasClass("guideItemSelected") ) continue;
			 if( i == 0 && firstIndex == 0 ) continue;
			 objList.eq(i).trigger("click");
		}
	}
}
function fnLoadPlacesOnMap( obj, placeCategory, placeSubCategory, findPlacesUaBucketId, cntLoaded ){
	$("#panelFindPlacesListOverlay").show();
	var firstIndex = $("div#panelFindPlacesList").find("div#panelFindPlacesItem").index( $(obj).parents("div#panelFindPlacesItem").eq(0) );
	var secondIndex = $(obj).parents("div#panelFindPlacesItem").eq(0).find("div#panelFindPlacesItemList").index( $(obj) );
	 
	$.ajax({
        url: "/async-getCategoryLocationInfo.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { placeCategory : placeCategory , placeSubCategory : placeSubCategory , findPlacesUaBucketId : findPlacesUaBucketId, cntLoaded : cntLoaded },
        success : function(data){
            if(data.result == "success"){

             var myLatlng;
             var locationNumbers = data.locationInfo.length;			           
             var lat, lon, locationId;
             var cntPlace = 0;
             
             for(var i = 0; i < locationNumbers ; i++){
   	      		  lat = data.locationInfo[i]['ua_location_lat'];
   	    		  lon = data.locationInfo[i]['ua_location_lon'];
   	    		  locationId = data.locationInfo[i]['ua_location'];
   	    		  regionId = data.locationInfo[i]['ua_region'];
   	    		  myLatlng = new google.maps.LatLng(lat, lon);
	   	    	  var imageUrl;
	   	    	  
	   	    	  if( firstIndex == 0 )
	   	    		  imageUrl = '/img/markerBucket.png';
	   	    	  else
	   	    		  imageUrl = data.locationInfo[i]['ua_category_marker']
	   	    	  var image = {
    			  	url: imageUrl,
    			    size: new google.maps.Size(29, 40),
    			    origin: new google.maps.Point(0,0),
    			    anchor: new google.maps.Point(15, 37)
    	  			};
	   	    	  var pos = i + cntLoaded;
   	    		  markerFindPlaceList[firstIndex][secondIndex][pos] = new google.maps.Marker({
   	    			  position: myLatlng,
				   	  map: map,
				   	  icon: image,
				   	  locationId: locationId,
				   	  regionId: regionId
   	    		  });
   	    		  var selectedRegionId = $("#regionList").val();
   	    		  if( selectedRegionId != "" && selectedRegionId != regionId ){
   	    			  markerFindPlaceList[firstIndex][secondIndex][pos].setMap( null );
   	    		  }else{
   	    			  cntPlace ++;
   	    		  }
   	    		  fnAddMarker( markerFindPlaceList[firstIndex][secondIndex][pos], "NORMAL" );
	   	    	}
             	cntPlace = Number( $(obj).find("div#findCountPlaces").eq(0).text() ) + cntPlace;
             	$(obj).find("div#findCountPlaces").eq(0).text( cntPlace );
             	

             	if( isLoadCategoryPlace.length == 0 ){
                 	// if single select             		
        		 	// Right Side Bar News
        		 	if( data.locationInfo.length == 0 && $("#rightSidePanelContainer").css("display") != "none" && $("#rightSidePanelContainer").find("#btnPlaces").hasClass("btn-danger") ){
        		 		$("#rightSidePanelContainer").find("#btnPlaces").trigger( "click" );
        		 	}
             	}else{
             		if( data.locationInfo.length == 0 ){
             			isLoadCategoryPlace[ secondIndex ] = true;
             			var isDone = true;
             			for( var j = 0; j < isLoadCategoryPlace.length; j ++ ){
             				if( isLoadCategoryPlace[j] == false ){
             					isDone = false;
             					continue;
             				}
             			}
             			if( isDone ){
             				isLoadCategoryPlace = [];
             				fnLoadPlaces( );
             			}
             		}
             	}
    		 	if( data.locationInfo.length != 0 ){
    		 		fnLoadPlacesOnMap( obj, placeCategory, placeSubCategory, findPlacesUaBucketId, Number( cntLoaded ) + Number( data.locationInfo.length ) );
    		 	}else{
    		 		$("#panelFindPlacesListOverlay").hide();
    		 	}
            }
        }
    });	
}
 function onClickFindLocationItem(obj){
	 var firstIndex = $("div#panelFindPlacesList").find("div#panelFindPlacesItem").index( $(obj).parents("div#panelFindPlacesItem").eq(0) );
	 var secondIndex = $(obj).parents("div#panelFindPlacesItem").eq(0).find("div#panelFindPlacesItemList").index( $(obj) );
	 if( firstIndex == 0 && secondIndex == 0 ){ return; }
	 
	 isLoadPlaces = true;
	 canLoadPlaces = true;
	 cntPlacesLoaded = 0;

	 if( $(obj).hasClass("hide") ){
		 	 $("#rightSidePlacesList").html("");		 
			 $(obj).removeClass("hide");
		 	 $(obj).addClass("guideItemSelected");
			 $(obj).find("i#findPlacesCheck").removeClass("hide");
			 $(obj).find("div#findCountPlaces").removeClass("hide");
			 $(obj).parents("div#panelFindPlacesItem").find("div#panelFindPlacesItemParent").eq(0).find("i#findPlacesAllcheck").addClass("icon-blue");
		 
			 var placeCategory = $(obj).find("input#placeCategory").val();
			 var placeSubCategory = $(obj).find("input#placeSubCategory").val();
			 var findPlacesUaBucketId = $(obj).find("input#findPlacesUaBucketId").val();
			 fnLoadPlacesOnMap( obj, placeCategory, placeSubCategory, findPlacesUaBucketId, 0 );
	}else{
		if( $("#rightSidePlacesList").find("div#rightSidePlacesItem").length == 0 ){
			$("#rightSidePlacesList").html("<div id='rightSideNoPlaces'>" + _lang("There is no places.") + "</div>");
		}
		fnRemoveMarkers( markerFindPlaceList[firstIndex][secondIndex] );
		$(obj).addClass("hide");
		$(obj).removeClass("guideItemSelected");
		$(obj).find("i#findPlacesCheck").addClass("hide");
		$(obj).find("div#findCountPlaces").addClass("hide");
		$(obj).find("div#findCountPlaces").eq(0).text(0);	
		
		isLoadCategoryPlace[ secondIndex ] = true;
		var isDone = true;
		for( var j = 0; j < isLoadCategoryPlace.length; j ++ ){
			if( isLoadCategoryPlace[j] == false ){
				isDone = false;
				continue;
			}
		}
		if( isDone ){
			isLoadCategoryPlace = [];
			$("#rightSidePlacesList").html("")
			fnLoadPlaces( );
		}			
		
		if($( obj ).parents("div#panelFindPlacesItem").eq(0).find("div#panelFindPlacesItemList").hasClass("guideItemSelected")){ return; }
			 $(obj).parents("div#panelFindPlacesItem").find("div#panelFindPlacesItemParent").eq(0).find("i#findPlacesAllcheck").removeClass("icon-blue");

	}
 }
 
 function onFindPlacesAddBucketList( bucketList ){
	 
	 	for( var i = 0 ; i < bucketList.length ; i ++){ 	
	 		var obj = $("#clonePanelFindPlacesItemList").clone();
	 		obj.attr("id","panelFindPlacesItemList");
	 		obj.show();
	 		obj.find("div#panelFindPlacesItemListItem").find("span#findPlacesBucketName").text( bucketList[i].ua_bucket_title );
	 		obj.find("input#findPlacesUaBucketId").val(bucketList[i].ua_user_bucket);
 			$( "#panelFindPlacesList" ).find("div#panelFindPlacesItem").eq(0).append( obj );	 		
	 	}
	 	
}   
function onFindPlacesRemoveBucketList(){

	 var objList = $( "#panelFindPlacesList").find("div#panelFindPlacesItem").eq(0).find("div#panelFindPlacesItemList");
	 for ( var i = 1; i < objList.size(); i ++ ){
		 objList.eq(i).remove();
	 }
 }
function onDeleteBucketItem( obj , ev){
	ev.preventDefault();
	var bucketId = $(obj).parents("#panelFindPlacesItemListItem").eq(0).find("#findPlacesUaBucketId").val();
	$.ajax({
        url: "/async-deleteUserBucketItem.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { bucketId : bucketId },
        success : function(data){
        	$(obj).parents("div#panelFindPlacesItemList").eq(0).remove();
        }
	});
}

function onLocationCommentLike( obj ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this."));onSignInPopup();
		return;
	}
	var commentId = $(obj).parents("#locationInfoCommentItem").eq(0).find("#locationInfoCommentId").val();
	var commentType = 1;
	var likeCount = Number( $(obj).find("#commentLike").text() );
	var unlikeCount = Number( $(obj).next().find("#commentUnlike").text() );
	var ratingType = 0;
	if( $(obj).hasClass("liked") ){
		$(obj).removeClass("liked");
		$(obj).find("#commentLike").text( likeCount - 1 );
	}else if( $(obj).next().hasClass("liked") ){
		$(obj).addClass("liked");
		$(obj).next().removeClass("liked");
		$(obj).find("#commentLike").text( likeCount + 1 );
		$(obj).next().find("#commentUnlike").text( unlikeCount - 1 );
		ratingType = 1;
	}else{
		$(obj).addClass("liked");
		$(obj).find("#commentLike").text( likeCount + 1 );
		ratingType = 1;
	}
	fnCommentRating( commentId, commentType, ratingType );
}
function onLocationCommentUnlike( obj ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this."));onSignInPopup();
		return;
	}	
	var commentId = $(obj).parents("#locationInfoCommentItem").eq(0).find("#locationInfoCommentId").val();
	var commentType = 1;
	var likeCount = Number( $(obj).prev().find("#commentLike").text() );
	var unlikeCount = Number( $(obj).find("#commentUnlike").text() );
	var ratingType = 0;
	if( $(obj).hasClass("liked") ){
		$(obj).removeClass("liked");
		$(obj).find("#commentUnlike").text( unlikeCount - 1 );
	}else if( $(obj).prev().hasClass("liked") ){
		$(obj).addClass("liked");
		$(obj).prev().removeClass("liked");
		$(obj).prev().find("#commentLike").text( likeCount - 1 );
		$(obj).find("#commentUnlike").text( unlikeCount + 1 );
		ratingType = -1;
	}else{
		$(obj).addClass("liked");
		$(obj).find("#commentUnlike").text( unlikeCount + 1 );
		ratingType = -1;
	}
	fnCommentRating( commentId, commentType, ratingType );
}
function onMainDescriptionLike(obj) {
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this."));onSignInPopup();
		return;
	}
	var locationId = $("input#locationInfoLocationId").val();
	var commentType = 1;
	var likeCount = Number( $(obj).find("#commentLike").text() );
	var unlikeCount = Number( $(obj).next().find("#commentUnlike").text() );
	var ratingType = 0;
	if( $(obj).hasClass("liked") ){
		$(obj).removeClass("liked");
		$(obj).find("#commentLike").text( likeCount - 1 );
	}else if( $(obj).next().hasClass("liked") ){
		$(obj).addClass("liked");
		$(obj).next().removeClass("liked");
		$(obj).find("#commentLike").text( likeCount + 1 );
		$(obj).next().find("#commentUnlike").text( unlikeCount - 1 );
		ratingType = 1;
	}else{
		$(obj).addClass("liked");
		$(obj).find("#commentLike").text( likeCount + 1 );
		ratingType = 1;
	}
	fnMainDescriptionRating( locationId, commentType, ratingType );
}

function onMainDescriptionUnlike(obj) {
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this."));onSignInPopup();
		return;
	}	
	var locationId = $("input#locationInfoLocationId").val();
	var commentType = 1;
	var likeCount = Number( $(obj).prev().find("#commentLike").text() );
	var unlikeCount = Number( $(obj).find("#commentUnlike").text() );
	var ratingType = 0;
	if( $(obj).hasClass("liked") ){
		$(obj).removeClass("liked");
		$(obj).find("#commentUnlike").text( unlikeCount - 1 );
	}else if( $(obj).prev().hasClass("liked") ){
		$(obj).addClass("liked");
		$(obj).prev().removeClass("liked");
		$(obj).prev().find("#commentLike").text( likeCount - 1 );
		$(obj).find("#commentUnlike").text( unlikeCount + 1 );
		ratingType = -1;
	}else{
		$(obj).addClass("liked");
		$(obj).find("#commentUnlike").text( unlikeCount + 1 );
		ratingType = -1;
	}
	fnMainDescriptionRating( locationId, commentType, ratingType );
}
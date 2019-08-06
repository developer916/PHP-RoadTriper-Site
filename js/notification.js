$(document).ready(function() {
	setInterval(function(){
		var lastNotificationId = $("#lastNotificationId").val();
		$.ajax({
	        url: "/async-getNotificationList.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : {lastNotificationId: lastNotificationId},
	        success : function(data){
	            if(data.result == "success"){
	            	if( data.notificationList.length > 0){
	            		$("#lastNotificationId").val(data.notificationList[0].ua_notification);	            		
	            	}
            		for( var i=0; i<data.notificationList.length; i++){
            			var objClone = $("div#cloneNotificationItem").clone();
		            	var start=Date.now();
		            	objClone.show( );
		            	objClone.attr("id", "notificationItem");
		            	objClone.find("input#notificationTime").val(start);
		            	
		            	
		            	// 2:Location , 3:News , 4:Eye
		            	var url = "";
		            	if( data.notificationList[i].ua_notification_type == 2 )
		            		url = "locations";
		            	else if( data.notificationList[i].ua_notification_type == 3 )
		            		url = "news";
		            	else if( data.notificationList[i].ua_notification_type == 4 )
		            		url = "eye";
		            	
		            	var objA;
		            	if( url != "" ){
		            		var title = data.notificationList[i].ua_content;
		            		var arrTitle = data.notificationList[i].ua_content.split(" ) is");
		            		arrTitle = arrTitle[0].split("( ");
		            		arrTitle = arrTitle[1].split(" ").join("-");
		            		url = "/" + url + "/" + translateEn(arrTitle) + "/" + base64_encode( data.notificationList[i].ua_description );
		            		objA = $("<a href='" + url + "' class='js-link'>" + data.notificationList[i].ua_content + "</a>");
		            		objA.click(function (event){
		                		event.preventDefault();
		                		objA.parents("#notificationItem").eq(0).find("#closeNotificationPanelItem").find("a").click();
								fnJsLink( this );
			              	});		            		
		            	}else
		            		objA = $(data.notificationList[i].ua_content);
		            	
		            	objClone.find("span#spanNotification").append( objA );
		            	objClone.find("input#notificationId").val( data.notificationList[i].ua_description );
		            	
		            	fnHighlightMarker( data.notificationList[i].ua_description, data.notificationList[i].ua_notification_type );
		            	
	       	 		 	$("div#notificationList").prepend( objClone );
	            	}
	            }
	        }
	   });
	},$("#notificationCycle").val() * 1000 );
	
	setInterval( function(){ 
		var objList=$("div#notificationList").find("div#notificationItem");
		for(var i=0; i<objList.length; i++){
			var countCurrentTime=objList.eq(i).find("input#notificationTime").val();
			if(parseInt(countCurrentTime)+parseInt(40000)<parseInt(Date.now())){
				objList.eq(i).fadeOut( "slow", function() {
					objList.eq(i).remove();
				});
			}
		}
	},1500);
});

function onRemoveNotification(obj){
	$(obj).parents("div#notificationItem").eq(0).remove();
}
function onClickNotificationItem( obj ){
	
}
function fnHighlightMarker( id, type ){
	// 1:Default Message , 2:Location , 3:News , 4:Eye
	if( !(type == 2 || type == 3 || type == 4) )
		return;
	if( type == 2){
		$.ajax({
	        url: "/async-getLocationInfo.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { locationId : id, detail : 1 },
	        success : function(data){
	        	var categoryId = data.categoryList[0].ua_place_subcategory;
	        	var objCategory = $("#panelFindPlacesList").find("#placeSubCategory[value="+ categoryId +"]").eq(0).parents("#panelFindPlacesItemList").eq(0);
	        	if( !objCategory.hasClass("guideItemSelected") ) return;
	        	var placesCount = Number(objCategory.find("div#findCountPlaces").html());
	        	placesCount ++;
	        	objCategory.find("div#findCountPlaces").html( placesCount );
	        	
		    	var lat = data.location.ua_location_lat;
		    	var lon = data.location.ua_location_lon;
		    	var locationId = data.location.ua_location;
		    	var regionId = data.location.ua_region;
		    	var myLatlng = new google.maps.LatLng( lat, lon);
		    	var imageURL = data.categoryList[0].ua_category_marker;
		    		
		    	var image = {
	    			    url: imageURL,
	    			    size: new google.maps.Size(29, 40),
	    			    origin: new google.maps.Point(0,0),
	    			    anchor: new google.maps.Point(15, 37)
		    	};
		    	var firstIndex = $("div#panelFindPlacesList").find("div#panelFindPlacesItem").index( $(objCategory).parents("div#panelFindPlacesItem").eq(0) );
		    	var secondIndex = $(objCategory).parents("div#panelFindPlacesItem").eq(0).find("div#panelFindPlacesItemList").index( $(objCategory) );		    	
		    	
		    	var len = markerFindPlaceList[firstIndex][secondIndex].length;
		    	markerFindPlaceList[firstIndex][secondIndex][ len ] = new google.maps.Marker({
		    	      position: myLatlng,
		    	      map: map,
		    	      icon: image,
		    	      locationId : locationId,
		    	      regionId : regionId
		    	});
		    	
		    	map.setCenter(new google.maps.LatLng( lat, lon ) );
		    	
		    	fnAddMarker( markerFindPlaceList[firstIndex][secondIndex][ len ], "NORMAL" );
		    	
	        	if( $("#panelFindPlacesList").find("#placeSubCategory[value="+ categoryId +"]").size() == 0 )
	        		return;
	        	isLoadPlaces = true;
	        	cntPlacesLoaded = 0;
	        	canLoadPlaces = true;
	        	onClickRightSidePlacesTab( $("#rightSideButtonArea").find("#btnPlaces").get(0) );
	        	/*
		    	fnAddPlaceOnRightBar( locationId, data.location.ua_location_title, data.location.ua_location_photo, data.location.ua_location_description,
		    			data.categoryList[0].ua_name, data.commentList.length, data.location.ua_location_like_score, data.location.ua_created_time );
		    	*/
	        }
		});		
	}else if( type == 3 ){
		$.ajax({
	        url: "/async-getLocationInfo.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { locationId : id, detail : 1 },
	        success : function(data){
	        	var categoryId = data.categoryList[0].ua_place_subcategory;
	        	var objCategory = $("#panelNewsList").find("#panelNewsItem[data="+ categoryId +"]").eq(0);
	        	if( !objCategory.hasClass("panelNewsItemSelected") ) return;
	        	
	        	var newsCount = Number(objCategory.find("div#newsCount").html());
	        	newsCount ++;
	        	objCategory.find("div#newsCount").html( newsCount );
	        	
		    	var lat = data.location.ua_location_lat;
		    	var lon = data.location.ua_location_lon;
		    	var locationId = data.location.ua_location;
		    	var regionId = data.location.ua_region;
		    	var myLatlng = new google.maps.LatLng( lat, lon);
		    	var imageURL = data.categoryList[0].ua_category_marker;
		    		
		    	var image = {
	    			    url: imageURL,
	    			    size: new google.maps.Size(30, 30),
	    			    origin: new google.maps.Point(0,0),
	    			    anchor: new google.maps.Point(15, 30)
		    	};
		    	var firstInd = $(objCategory).parents("#panelNewsList").eq(0).find("div#panelNewsItem").index( $(objCategory) );
		    	var len = markerNewsList[firstInd].length;
		    	markerNewsList[firstInd][ len ] = new google.maps.Marker({
		    	      position: myLatlng,
		    	      map: map,
		    	      icon: image,
		    	      locationId : locationId,
		    	      regionId : regionId
		    	});
		    	
		    	map.setCenter(new google.maps.LatLng( lat, lon ) );
		    	
		    	fnAddMarker( markerNewsList[firstInd][ len ], "NEWS" );
	        	if( $("#panelNewsList").find("#panelNewsItem[data="+ categoryId +"]").size() == 0 )
	        		return;
	        	
	        	isLoadNews = true;
	        	cntNewsLoaded = 0;
	        	canLoadNews = true;
	        	onClickRightSidePlacesTab( $("#rightSideButtonArea").find("#btnNews").get(0) );	        	
	        	
	        	/*
		    	fnAddNewsOnRightBar( locationId, data.location.ua_location_title, data.location.ua_location_photo, data.location.ua_location_description,
		    			data.categoryList[0].ua_name, data.commentList.length, data.location.ua_location_like_score, data.location.ua_created_time );
	        	 */
	        }
		});
	}else if( type == 4 ){
		$.ajax({
	        url: "/async-getLocationInfo.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { locationId : id, detail : 1 },
	        success : function(data){
	        	var categoryId = data.categoryList[0].ua_place_subcategory;
	        	var objCategory = $("#panelEyeList").find("#panelEyeItem[data="+ categoryId +"]").eq(0);
	        	if( !objCategory.hasClass("panelEyeItemSelected") ) return;
	        	
	        	var eyeCount = Number(objCategory.find("div#eyeCount").html());
	        	eyeCount ++;
	        	objCategory.find("div#eyeCount").html( eyeCount );
	        	
		    	var lat = data.location.ua_location_lat;
		    	var lon = data.location.ua_location_lon;
		    	var locationId = data.location.ua_location;
		    	var regionId = data.location.ua_region;
		    	var myLatlng = new google.maps.LatLng( lat, lon);
		    	var imageURL = data.categoryList[0].ua_category_marker;
		    		
		    	var image = {
	    			    url: imageURL,
	    			    size: new google.maps.Size(30, 30),
	    			    origin: new google.maps.Point(0,0),
	    			    anchor: new google.maps.Point(15, 30)
		    	};
		    	var firstInd = $(objCategory).parents("#panelEyeList").eq(0).find("div#panelEyeItem").index( $(objCategory) );
		    	var len = markerEyeList[firstInd].length;
		    	markerEyeList[firstInd][ len ] = new google.maps.Marker({
		    	      position: myLatlng,
		    	      map: map,
		    	      icon: image,
		    	      locationId : locationId,
		    	      regionId : regionId
		    	});
		    	
		    	map.setCenter(new google.maps.LatLng( lat, lon ) );
		    	
		    	fnAddMarker( markerEyeList[firstInd][ len ], "EYE" );
	        	if( $("#panelEyeList").find("#panelEyeItem[data="+ categoryId +"]").size() == 0 )
	        		return;
	        	
	        	isLoadEye = true;
	        	cntEyeLoaded = 0;
	        	canLoadEye = true;
	        	onClickRightSidePlacesTab( $("#rightSideButtonArea").find("#btnEye").get(0) );
	        	
	        	/*
		    	fnAddEyeOnRightBar( locationId, data.location.ua_location_title, data.location.ua_location_photo, data.location.ua_location_description,
		    			data.categoryList[0].ua_name, data.commentList.length, data.location.ua_location_like_score, data.location.ua_created_time );
		    	*/
	        }
		});
	}
}
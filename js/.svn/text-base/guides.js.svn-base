function onClickPanelGuideItem( obj ){
	
	if( $(obj).parents("div#panelGuideItem").eq(0).find("div#panelGuideItemList").css("display") == "none" ){
		$(obj).parents("div#panelGuideItem").eq(0).find("i#panelGuideItemimage").attr("class","icon-chevron-down");
		$(obj).parents("div#panelGuideItem").eq(0).find("div#panelGuideItemList").show();
		$(obj).parents("div#panelGuideItem").eq(0).find("i#topLevelMenu").addClass("hide");
	}else{
		$(obj).parents("div#panelGuideItem").eq(0).find("i#panelGuideItemimage").attr("class","icon-chevron-right");
		$(obj).parents("div#panelGuideItem").eq(0).find("div#panelGuideItemList").hide();
		$(obj).parents("div#panelGuideItem").eq(0).find("i#topLevelMenu").removeClass("hide");
	}
}

function onClickBucketItem( obj ){
	var guideBucket;
	var mapLength;
	var firstInd = $("#panelGuideList").find("div#panelGuideItem").index( $(obj).parents("div#panelGuideItem").eq(0) );
	var secondInd = $(obj).parents("div#panelGuideItemBucketList").eq(0).find("div#panelGuideItemBucketItem").index( $(obj) );	
	if( $(obj).find("i").eq(0).hasClass("hide") ){
		$(obj).find("i").eq(0).removeClass("hide");
		$(obj).addClass("guideItemSelected");
		guideBucket = $(obj).find("input#guideBucketId").val();
		 $.ajax({
		        url: "/async-getGuideBucketLocation.php",
		        cache : false,
		        dataType : "json",
		        type : "POST",
		        data : {guideBucket: guideBucket },
		        success : function(data){
		            if(data.result == "success"){		            	
		            	for( var i = 0; i < data.location.length; i++){
		            		  
		            		  var lat = data.location[i].ua_location_lat;
		        	    	  var lon = data.location[i].ua_location_lon;
		        	    	  var locationId = data.location[i].ua_location;
		        	    	  
		        	    	  var myLatlng = new google.maps.LatLng( lat, lon);
		        	    	  
		        	    	  var image = {
		        	    			    url: '/img/markerBucket.png',
		        	    			    size: new google.maps.Size(29, 40),
		        	    			    origin: new google.maps.Point(0,0),
		        	    			    anchor: new google.maps.Point(15, 37)
		        	    	  			};
		        	    	   
		        	    	  
		        	    	  var markerTemp = new google.maps.Marker({
		        	    	      position: myLatlng,
		        	    	      map: map,
		        	    	      icon: image,
		        	    	      locationId : locationId
		        	    	  });
		        	    	  
		        	    	  fnAddMarker( markerTemp, "NORMAL" );
		        	    	  markerGuideBucketList[firstInd][secondInd][i] = markerTemp;
		            	}
		            		
		            }
		        }
		    });		
	}else{
		$(obj).find("i").eq(0).addClass("hide");
		$(obj).removeClass("guideItemSelected");
		guideBucket = $(obj).find("input#guideBucketId").val();
    	for( var i =0; i < markerGuideBucketList[firstInd][secondInd].length; i++){ 
	    		markerGuideBucketList[firstInd][secondInd][i].setMap(null); 
	    }
    	markerGuideBucketList[firstInd][secondInd] = [];
	}
}


function onClickTripItem( obj ){
	var firstInd;
	var secondInd;
	var objSelected = $("#panelGuideList").find("div#panelGuideItemTripList").find("div.guideItemSelected");
	if( objSelected.length != 0 ){
		var firstOldInd = $("#panelGuideList").find("div#panelGuideItem").index( objSelected.parents("div#panelGuideItem").eq(0) );
		var secondOldInd = $(objSelected).parents("div#panelGuideItemTripList").eq(0).find("div#panelGuideItemTripItem").index( objSelected );
		for(  var i = 0; i< markerGuideTripList[firstOldInd][secondOldInd].length; i++){ 
			markerGuideTripList[firstOldInd][secondOldInd][i].setMap(null);
		}
		markerGuideTripList[firstOldInd][secondOldInd] = [];
		fnRemoveDirection( directionGuideTripDisplayList );
		directionGuideTripDisplayList = [];
		objSelected.removeClass("guideItemSelected");
		objSelected.find("i").addClass("hide");
	}
	var firstInd = $("#panelGuideList").find("div#panelGuideItem").index( $(obj).parents("div#panelGuideItem").eq(0) );
	var secondInd = $(obj).parents("div#panelGuideItemTripList").eq(0).find("div#panelGuideItemTripItem").index( $(obj) );
	
	if( firstInd == firstOldInd && secondInd == secondOldInd){ return; }

	$(obj).find("i").eq(0).removeClass("hide");
	$(obj).addClass("guideItemSelected");	
	var guideTrip = $(obj).find("input#guideTripId").val();

	$.ajax({
			url: "/async-getGuideTripLocation.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : {guideTrip: guideTrip },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0; i < data.location.length; i++){
	            		var lat = data.location[i].ua_location_lat;
	        	    	var lon = data.location[i].ua_location_lon;
	        	    	var locationId = data.location[i].ua_location;
	        	    	var myLatlng = new google.maps.LatLng( lat, lon);
	        	    	
	        	    	var imageURL;
	        	    	if( i == 0 )
	        	    		imageURL = '/img/markerDeparture.png';
	        	    	else if( i == data.location.length - 1 )
	        	    		imageURL = '/img/markerDestination.png';
	        	    	else
	        	    		imageURL = '/img/marker' + i + '.png';
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
	        	    		locationId : locationId
	        	    	});

	        	    	fnAddMarker( markerTemp, "NORMAL" );
	        	    	markerGuideTripList[firstInd][secondInd][i] = markerTemp;
	            	}
	            	directionGuideTripDisplayList = fnAddDirections( markerGuideTripList[firstInd][secondInd], false );
	            }
	       }
	});	
}
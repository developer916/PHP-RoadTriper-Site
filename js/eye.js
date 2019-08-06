function onClickPanelEyeItem( obj ){
	if( isLoadingEyeOnMap == true ) return; 
	var firstInd = $(obj).parents("#panelEyeList").eq(0).find("div#panelEyeItem").index( $(obj) );
	isLoadEye = true;
	canLoadEye = true;
	cntEyeLoaded = 0;
	$("#rightSideEyeList").html("");
	
	if( $(obj).hasClass("panelEyeItemSelected") ){
		$(obj).removeClass("panelEyeItemSelected");
		$(obj).find("#eyeCount").hide( );
		$(obj).find("#eyeCount").text( 0 );
		fnRemoveMarkers( markerEyeList[firstInd] );
    	// Right Side Bar Eye
    	if( $("#rightSidePanelContainer").css("display") != "none" && $("#rightSidePanelContainer").find("#btnEye").hasClass("btn-danger") ){
    		$("#rightSidePanelContainer").find("#btnEye").trigger( "click" );
    	}
	}else{
		$(obj).addClass("panelEyeItemSelected");
		var eyeCategoryId = $(obj).attr("data");
		fnLoadEyeOnMap( obj, eyeCategoryId, 0 );
	}
}

function fnLoadEyeOnMap( obj, eyeCategoryId, cntLoaded ){
	isLoadingEyeOnMap = true;
	var firstInd = $(obj).parents("#panelEyeList").eq(0).find("div#panelEyeItem").index( $(obj) );
	$.ajax({
        url: "/async-getEyeListByCategory.php",
        dataType : "json",
        type : "POST",
        data : { eyeCategoryId : eyeCategoryId, cntLoaded : cntLoaded },
        success : function(data){
            if(data.result == "success"){
            	// var eyeCount = Number( $(obj).find("div#eyeCount").text() );
        		// $(obj).find("div#eyeCount").text( eyeCount + data.eyeList.length );
            	var eyeCount = 0;
        		$(obj).find("div#eyeCount").show( );
            	for( var i = 0 ; i < data.eyeList.length; i ++ ){
  			    	var lat = data.eyeList[i].ua_location_lat;
  			    	var lon = data.eyeList[i].ua_location_lon;
  			    	var locationId = data.eyeList[i].ua_location;
  			    	var regionId = data.eyeList[i].ua_region;
			    	var myLatlng = new google.maps.LatLng( lat, lon);
			    	var imageURL = data.eyeList[i].ua_category_marker;
			    	
			    	if( imageURL == "")
			    		imageURL = '/img/markerEye.png';
			    	
			    	var image = {
		    			    url: imageURL,
		    			    size: new google.maps.Size(30, 30),
		    			    origin: new google.maps.Point(0,0),
		    			    anchor: new google.maps.Point(15, 30)
			    	};
			    	markerEyeList[firstInd][ i + cntLoaded ] = new google.maps.Marker({
			    	      position: myLatlng,
			    	      map: map,
			    	      icon: image,
			    	      locationId : locationId,
			    	      regionId : regionId
			    	});
			    	
   	    		  	var selectedRegionId = $("#regionList").val();
   	    		  	if( selectedRegionId != "" && selectedRegionId != regionId ){
   	    		  		markerEyeList[firstInd][ i + cntLoaded ].setMap( null );
   	    		  	}else{
   	    		  		eyeCount ++;
   	    		  	}			    				    	
			    	
			    	fnAddMarker( markerEyeList[firstInd][ i + cntLoaded ], "EYE" );
            	}
            	eyeCount = Number( $(obj).find("div#eyeCount").eq(0).text() ) + eyeCount;
             	$(obj).find("div#eyeCount").eq(0).text( eyeCount );            	
            	// Right Side Bar Eye
            	if( data.eyeList.length == 0 && $("#rightSidePanelContainer").css("display") != "none" && $("#rightSidePanelContainer").find("#btnEye").hasClass("btn-danger") ){
            		$("#rightSidePanelContainer").find("#btnEye").trigger( "click" );
            	}
    		 	if( data.eyeList.length != 0 ){
    		 		fnLoadEyeOnMap( obj, eyeCategoryId, Number( cntLoaded ) + Number( data.eyeList.length ) );
    		 	}else{
    		 		isLoadingEyeOnMap = false;
    		 	}
            }
        }
    });	
}
$(document).ready(function() {
	
});
function onClickTripItemDelete( obj ){
	if( $("#planTripLocationList").find("div#planTripLocationItem").size() <= 2 ){
		$(obj).parents("#planTripLocationItem").eq(0).find("#tripItemAdd").click();
		$(obj).parents("#planTripLocationItem").eq(0).find("#tripItemDelete").click();
	}else{
		$(obj).parents("#planTripLocationItem").eq(0).remove();
		fnResetPlanTripItemNo();
	}
	isLoadPlanTrip = true;	

	fnSavePlanTripLocationList();
	var objList = $("#planTripLocationList").find("div#planTripLocationItem");
	var cnt = 0;
	for( var i = 0; i < objList.length; i ++ ){
		if( objList.eq(i).find("#txtTripLocation").val() != "" )
			cnt ++;
	}
	if( cnt > 2 ){
		$("#locationInfoButton").find(".btnDeleteTrip").hide();
		$("#locationInfoButton").find(".btnAddToTrip").show();		
	}
	
}
function onClickTripItemAdd( obj , autoComplete ){
	isLoadPlanTrip = true;
	var objClone = $("#clonePlanTripLocationItem").clone();
	objClone.show();
	objClone.attr("id", "planTripLocationItem");
	if( obj == null || obj == undefined ){		
		$("div#planTripLocationList").append(objClone);
	}else{
		$(obj).parents("div#planTripLocationItem").eq(0).find("div#tripItemDistance").html( "&nbsp;" );
		$(obj).parents("div#planTripLocationItem").eq(0).find("div#tripItemTime").html( "&nbsp;" );
		$(obj).parents("div#planTripLocationItem").eq(0).find("div#tripItemFuelPrice").html( "&nbsp;" );
		
		$(obj).parents("div#planTripLocationItem").eq(0).after( objClone );
	}
	
	if ( autoComplete ) {
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
		    	  isLoadPlanTrip = true;
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
	if( !(obj == null || obj == undefined ) )
		fnDrawPlanTrip();
	fnResetPlanTripItemNo();	
}
function onCloseShareLink( ){
	  $("#modal-shareLink").hide();
	  $("#modalBackground").hide();	
}
function onShareTrip() {
	var planTripId = $("#planTripId").val( );
	var currentURL = window.location.protocol + "//" + window.location.host + "/trips/" + base64_encode( planTripId );
	
	var shareFB = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent( currentURL );
	$("#shareOnFB").attr("href", shareFB);
	var shareVK = "http://vkontakte.ru/share.php?url=" + encodeURIComponent(currentURL); 
	$("#shareOnVK").attr("href", shareVK);
	
	var shareGP = "https://plus.google.com/share?url=" + encodeURIComponent(currentURL);
	$("#shareOnGP").attr("href", shareGP);
	
	$("#txtShareURL").val( currentURL );
	$("#modal-shareLink").show();
	$("#modalBackground").show();	
}
function onSavedTrip(){
	var isLogin = $("#isLogin").val();
	if( isLogin == "N" ){ alert( _lang("You have to sign in for this.") );onSignInPopup();return; }
	
	$.ajax({
		  url: "/async-savedPlanTrip.php",
		  dataType : "json",
		  type : "POST",
		  success : function( data ){
			  $("#modalTripList").html("");
			  for( var i = 0; i < data.tripList.length; i ++ ){
				  var objClone = $("#cloneModalTripItem").clone();
				  objClone.show();
				  objClone.attr("id", "modalTripItem");
				  objClone.find("a").attr( "href", "/trips/" + base64_encode( data.tripList[i].ua_plan_trip ) );
				  objClone.find("a").text(data.tripList[i].ua_trip_title );
				  objClone.find("a").attr( "pageTitle", data.tripList[i].ua_page_title);
				  objClone.find("a").click(function (event){
					  event.preventDefault();
					  fnJsLink( this );
             	  });				  
				  
				  objClone.find("#modalTripDescription").html( data.tripList[i].ua_description.split("\n").join("<br/>") );
				  objClone.find("#modalPlanTripId").val( data.tripList[i].ua_plan_trip );
				  $("#modalTripList").append( objClone );
				  
			  }
			  if( data.tripList.length == 0 ){
				  $("#modalTripList").html( "<h5>" + _lang("There is no Trip List.") + "</h5>" );
			  }
			  $("#modal-tripList").show();
			  $("#modalBackground").show();			  
		  }
	});
}
function onSavePlanTripSubmit(){
	var planTripId = $("#planTripId").val();
	var planTripTitle = $("#txtPlanTripTitle").val();
	var planTripDescription= $("#txtPlanTripDescription").val();
	var planTripPageTitle= $("#txtPlanTripPageTitle").val();
	if( planTripTitle == "" ){ alert( _lang("Please input Trip title.") ); return; }
	
	$.ajax({
		  url: "/async-savePlanTrip.php",
		  dataType : "json",
		  type : "POST",
		  data : { planTripId : planTripId, planTripTitle : planTripTitle, planTripDescription : planTripDescription, planTripPageTitle : planTripPageTitle },
		  success : function( data ){
			  $("#planTripId").val( data.planTripId );
			  fnClearMapForNewTrip();
			  onClosePlanTripPopup();
			  alert( _lang("Plan Trip saved successfully.") );
			  
			  var cntPlanTrip = Number( $("#cntPlanTrip").text() );
			  cntPlanTrip++;
			  $("#cntPlanTrip").text( cntPlanTrip );
		  }
	});
}
function onClickPlanTripSavePopup(){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this.") );
		onSignInPopup();
		return;
	}
	
	if( isSavedTrips == true ){
		
		var deptPlace = $("#planTripLocationList").find("div#planTripLocationItem:first").find("#txtTripLocation").val();
		var destPlace = $("#planTripLocationList").find("div#planTripLocationItem:last").find("#txtTripLocation").val();
		var distance = $("#planTripLocationList").find("div#planTripLocationItem:last").find("#tripItemDistance").text();
		var duration = $("#planTripLocationList").find("div#planTripLocationItem:last").find("#tripItemTime").text();
		var fuelCost = $("#planTripLocationList").find("div#planTripLocationItem:last").find("#tripItemFuelCost").text();
		
		if( deptPlace == "" || destPlace == "" || distance == "" || duration == "" || fuelCost == ""){
			alert( _lang("Please complete the plan trip.") );
			return;
		}
		
		$("#txtPlanTripTitle").val( "");
		var strDescription = _lang("Departure Place") + " : " + deptPlace + "\n";
		var strPageTitle = deptPlace + " - " + destPlace;
		strDescription += _lang("Destination Place") + " : " + destPlace + "\n";
		strDescription += _lang("Distance") + " : " + distance + "\n";
		strDescription += _lang("Duration") + " : " + duration + "\n";
		strDescription += _lang("Fuel Cost") + " : " + fuelCost;
		$("#txtPlanTripDescription").val( strDescription );
		$("#txtPlanTripPageTitle").val( strPageTitle );
		$("#modal-planTrip").show();
		$("#modalBackground").show();
	}else{
		alert( _lang("Plan Trip updated successfully.") );
	}

}
function onClosePlanTripPopup(){
	$("#modal-planTrip").hide();
	$("#modalBackground").hide();	
}

function onClickPlanTripNew(){
	if( confirm( _lang("Are you sure?")) ){
		fnClearMapForNewTrip( );
		isSavedTrips = true;
		fnCreateNewPlanTrip( );		
	}
}
function onDeleteSavedPlanTrip( obj ){
	var id = $(obj).parents("#modalTripItem").eq(0).find("#modalPlanTripId").val();
	$.ajax({
		  url: "/async-deleteSavedPlanTrip.php",
		  dataType : "json",
		  type : "POST",
		  data : { planTripId : id },
		  success : function( data ){
			  $(obj).parents("#modalTripItem").remove();
			  var cntPlanTrip = Number( $("#cntPlanTrip").text() );
			  cntPlanTrip--;
			  $("#cntPlanTrip").text( cntPlanTrip );
		  }
	});
}

function onClickAddBucketSubmit( ){
	var txtBucketName = $("#txtBucketName").val();
	if( txtBucketName == "" ){ alert( _lang("Please input bucket name.") ); return; }
    $.ajax({
        url: "/async-addUserBucket.php",
        dataType : "json",
        type : "POST",
        data : { bucketName : txtBucketName },
        success : function(data){
            if(data.result == "success"){
            	$("#txtBucketName").val("");
            	fnAddBucketItemOnPopup( data.bucket.ua_user_bucket, data.bucket.ua_bucket_title, 0 );
            	
    	 		var obj = $("#clonePanelFindPlacesItemList").clone();
    	 		obj.show();
    	 		obj.attr("id","panelFindPlacesItemList");
    	 		obj.find("div#panelFindPlacesItemListItem").find("span#findPlacesBucketName").text( data.bucket.ua_bucket_title );
    	 		obj.find("input#findPlacesUaBucketId").val( data.bucket.ua_user_bucket );
     			$( "#panelFindPlacesList" ).find("div#panelFindPlacesItem").eq(0).append( obj );	            	            	
            }
        }
    });	
}
function onClickAddMyBucketList( obj ){
	var bucketItemId = $(obj).parents("#modalBucketItem").eq(0).find("#bucketItemId").val();
	var locationId = $(obj).parents("#modal-bucketList").eq(0).find("#locationIdBucket").val();
	if( locationId == -1 ){ return;	}

	var mode;
	if( $(obj).parents("#modalBucketItem").eq(0).find("i").hasClass("hide") )
		mode = "add";
	else
		mode = "delete";
    $.ajax({
        url: "/async-addLocationToUserBucket.php",
        dataType : "json",
        type : "POST",
        data : { bucketItemId : bucketItemId, locationId : locationId, mode : mode },
        success : function(data){
            if(data.result == "success"){
            	if( mode == "add" )
            		$(obj).parents("#modalBucketItem").eq(0).find("i").removeClass("hide");
            	else
            		$(obj).parents("#modalBucketItem").eq(0).find("i").addClass("hide");
            }
        }
    });		
}
function onCloseBucketList( ){
	$("#modal-bucketList").hide();
	if( $("#locationInfo").css("opacity") == 0 ){
		$("#locationInfo").css("opacity",1);
		$("#modalBackground").hide();
	}else{
		$("#modalBackground").hide();
	}
	
}

function onCloseTripList( ){
	$("#modal-tripList").hide();
	$("#modalBackground").hide();
}
function onClickBucketList( obj ){
	if( $("#isLogin").val() == "Y" ){
		var locationId = $(obj).parents("#infobox").eq(0).find("input#infoboxLocationId").val();
		fnBucketList( locationId );
	}else{
		alert( _lang("You have to sign in for this.") );
		onSignInPopup();
		return;
	}
}
function onClickLocationInfoBucketList( obj ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this.") );
		onSignInPopup();
		return;
	}
	var locationId = $(obj).parents("div#locationInfo").eq(0).find("#locationInfoLocationId").val();
	fnBucketList( locationId );
	$("#locationInfo").css("opacity",0);
}
function onSendEmailShareLink( ){
	var email = $("#shareLinkEmailAddress").val( );
	var message = $("#shareLinkMessage").val( );
	var shareLink = $("#txtShareURL").val( );
	
	if( email == "" ){ alert(_lang("Please input the email address.")); return; }
	if( !validateEmail( email ) ){ alert(_lang("Please input the email address correctly.")); return; }
	
    $.ajax({
        url: "/async-sendEmailShareLink.php",
        dataType : "json",
        type : "POST",
        data : { email : email, message : message, shareLink : shareLink },
        success : function(data){
            if(data.result == "success"){
            	alert( _lang("Email has been sent successfully."));
            }
        }
    });			
}
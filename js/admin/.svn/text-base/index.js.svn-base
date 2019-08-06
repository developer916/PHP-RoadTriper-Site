var geocoder;

var map;

var markerLocation = null;

var mapLocation = null;

var markerSearch = [];

var markerGuideBucketList = [];

var markerGuideTripList = [];

var markerPlanTripList = [];

var markerFindPlaceList = [];

var markerNewsList = [];

var markerEyeList = [];

var markerCurrentLocation = null;

var directionGuideTripDisplayList = [];

var directionPlanTripDisplayList = [];

var infobox;

var isOpenInfobox = 0;

var languageList = [];

var History;

var siteName;

var fuelPrice;

var weatherLayer;

var cloudLayer;

var noProfilePhoto;

var isLoadPlanTrip = true;

var isOpenRightBar = false;

var titleSuffix;



var isLoadingNewsOnMap = false;

var isLoadNews = true;		// for reloading check

var canLoadNews = true;		// for ajax loading check

var cntNewsLoaded = 0;		// for loaded news count



var isLoadingEyeOnMap = false;

var isLoadEye = true;

var canLoadEye = true;

var cntEyeLoaded = 0;



var isLoadingPlacesOnMap = false;

var isLoadPlaces = true;

var canLoadPlaces = true;

var cntPlacesLoaded = 0;



var isLoadCategoryPlace = [];

var isLoadCategoryNews = [];

var isLoadCategoryNews1 = [];

var isSavedTrips = true;



var infowindow;



function fnJsLink( obj ){

	var url = $(obj).attr('href');

	var arrURL = url.split( "/" );

	var pageType = arrURL[1];

	fnCloseRightBar( );

	if( pageType == "newsAnalytics" ){

  	  	var state;

  	  	state = { type : "newsAnalytics" };

  	  	ga('send', 'pageview', {'page': url, 'title': siteName });

  	  	History.pushState(state, siteName, url );		

	}else if( pageType == "profile" ){

  	  	var state;

  	  	state = { type : "profile" };

  	  	ga('send', 'pageview', {'page': url, 'title': siteName });

  	  	History.pushState(state, siteName, url );		

	}else if( pageType == "myPlaces" ){

  	  	var state;

  	  	state = { type : "myPlaces" };

  	  	ga('send', 'pageview', {'page': url, 'title': siteName });

  	  	History.pushState(state, siteName, url );		

	}else if( pageType == "editPlace"){

		var locationId = arrURL[2];

		locationId = base64_decode( locationId );

		var pageTitle = $("#pageTitle").val();

  	  	state = { id: locationId, type : pageType };

  	  	ga('send', 'pageview', {'page': url, 'title': pageTitle + " | " + titleSuffix});		

  	  	History.pushState(state, pageTitle + " | " + titleSuffix, url );		

	}else if( pageType == "addPlace"){
		
		$("#add_place_bar").show();

		$("#addLocationScoreArea").hide();

  	  	state = { type : pageType };

  	  	ga('send', 'pageview', {'page': url, 'title': siteName});

  	  	History.pushState(state, siteName, url );		

	}else if( pageType == "trips"){

		var tripId = arrURL[2];

		tripId = base64_decode( tripId );

		var pageTitle = $(obj).attr("pageTitle");

  	  	var state;

  	  	state = { id: tripId, type : pageType };

  	  	ga('send', 'pageview', {'page': url, 'title': pageTitle + " | " + titleSuffix});

  	  	History.pushState(state, pageTitle + " | " + titleSuffix, url );

	}else if( pageType == "blogs" ){

		var pageId = arrURL[3];

		var pageTitle = arrURL[2];

		if( pageId == "all" && pageTitle == "category" ){

			onClickBlogCategoryAll( obj );

		}else if( pageTitle == "category"){

			onClickBlogCateogryItem( obj );

		}else{

			onClickBlogDetail( obj );

		}

	}else if( pageType == "locations" || pageType == "news" || pageType == "eye"){

		var pageId = arrURL[3];

		pageId = base64_decode( pageId );

		$.ajax({

	        url: "/async-getLocationTitle.php",

	        dataType : "json",

	        type : "POST",

	        data : { locationId : pageId },

	        success : function(data){

	            if(data.result == "success"){

	        		var pageTitle = data.title;

	          	  	var state;

	          	  	state = { id: pageId, type : pageType };

	          	  	ga('send', 'pageview', {'page': url, 'title': pageTitle + " | " + titleSuffix});

	          	  	History.pushState(state, pageTitle + " | " + titleSuffix, url );	            	

	            }

	        }

		});

	}else if( pageType == "places" || pageType == "newsCategory" || pageType == "eyeCategory" || pageType == "group" ){

		var pageId = arrURL[3];

		pageId = base64_decode( pageId );

		

		$.ajax({

	        url: "/async-getCategoryTitle.php",

	        dataType : "json",

	        type : "POST",

	        data : { id : pageId, type : pageType },

	        success : function(data){

	            if(data.result == "success"){

	        		var pageTitle = data.title;

	          	  	var state;

	          	  	state = { id: pageId, type : pageType };

	          	  	ga('send', 'pageview', {'page': url, 'title': pageTitle + " | " + titleSuffix});

	          	  	History.pushState(state, pageTitle + " | " + titleSuffix, url );	            	

	            }

	        }

		});

	}else if( pageType == "placesList" || pageType == "newsList" || pageType == "eyeList"){

	  	var state;

	  	state = { type : pageType };

	  	ga('send', 'pageview', {'page': url, 'title': siteName});

	  	History.pushState(state, siteName, url );		

	}

}



$( document ).ajaxStart(function() {

	$("#loadingContainer").fadeIn();

});

$( document ).ajaxStop(function() {

	$("#loadingContainer").fadeOut();

});



$(document).ready(function() {

	// loadLanguage();

	/*

	$('#newsAnalyticsMain, #myPlacesMain, #locationInfo, #addLocationMain, #blogThumbInfo, #blogInfo, #groupInfo, #placesListInfo, #newsListInfo, #newsCategoryInfo, #placesInfo, #pageInfo, #eyeListInfo, #eyeCategoryInfo').click(function(ev) {

		ev.stopPropagation();

	});



	$('#pageInfoContainer').click(function(ev) {

		onClosePageDetailPopup();

	});	

	

	$("#rightSidePanelContainer").dblclick( function(ev){

		$("#rightArrow").trigger("click");

	});

	*/
	//document ready function init as clone
	DocInit.init();
	
	$("input#imageUpload").change( function(){
		var imageUploadObj = $(this);
		$(this).parents("form").ajaxForm({
			success: function(data) {
				var targetId ='#' + imageUploadObj.parents("form").find("#imagePrevDiv").val();
				var htmlObj = "<div class='img-wrap'>" + data + "<div class='close-button'></div></div>";
				$(targetId).append(htmlObj);

				$("#previewLocationImage").find(".img-wrap").each(function(){
					$(this).find(".close-button").click(function(){
						$(this).parent().remove();
					});
				});
			}

		}).submit();

	});	

	var objTempCnt = $("div#addLocationBody").find('textarea#addLocationDescription').size();

	if( objTempCnt != 0 ){

		$('#addLocationDescription').liveEdit({

		fileBrowser: '/texteditor/assetmanager/asset.php?type=location&userId=' + $("#UA_USER").val(),

	        height: 500,

	        css: ['/texteditor/bootstrap/css/bootstrap.min.css', '/texteditor/bootstrap/bootstrap_extend.css'],            

	        groups: [

	                ["group1", "", ["Bold", "Italic", "Underline", "ForeColor", "RemoveFormat"]],

	                ["group2", "", ["Paragraph", "FontSize", "FontDialog", "TextDialog","Bullets", "Numbering"]],

	                ["group3", "", ["ImageDialog", "LinkDialog", "SourceDialog" ]]

	                ]

	    });	

	    $('#addLocationDescription').data('liveEdit').startedit();

	}

	$("#rightSideNewsList").scroll(function(e){

	    var scrollTop = $("#rightSideNewsList").scrollTop();

	    var scrollHeight = $("#rightSideNewsList").height();

	    var absoluteHeight = $("#rightSideNewsList").get(0).scrollHeight;

	    if( scrollTop + scrollHeight > absoluteHeight - 50 ){

	    	fnLoadNews();

	    }

	});

	

	$("#rightSidePlacesList").scroll(function(e){

	    var scrollTop = $("#rightSidePlacesList").scrollTop();

	    var scrollHeight = $("#rightSidePlacesList").height();

	    var absoluteHeight = $("#rightSidePlacesList").get(0).scrollHeight;

	    if( scrollTop + scrollHeight > absoluteHeight - 50 ){

	    	fnLoadPlaces();

	    }

	});

	

	infowindow = new google.maps.InfoWindow({ content: "" });	

	

	geocoder = new google.maps.Geocoder();

	siteName = $("#siteName").val();

	titleSuffix = $("#titleSuffix").val();

	fuelPrice = Number( $("#fuelPrice").val() );

	noProfilePhoto = $("#noProfileImg").val();

	History = window.History;

	if( $("#isNormal").val() == "N"){

		sleep( 3000 );

		window.location.href = "/";

		return;	

	}



	$('a.js-link').click(function (event){ 

		event.preventDefault();

		fnJsLink( this );

	});

	$('a.js-display').click(function (event){ 

		event.preventDefault();

	});	

	var cntFindPlaceCategory = $("div#panelFindPlacesList").find("div#panelFindPlacesItem").size();

	for( var i = 0; i < cntFindPlaceCategory; i ++){

		markerFindPlaceList[i] = [];

		var cntFindPlaceSubCategory = $("div#panelFindPlacesList").find("div#panelFindPlacesItem").eq( i ).find("div#panelFindPlacesItemList").size();

		for( var j = 0; j < cntFindPlaceSubCategory; j ++ ){

			markerFindPlaceList[i][j] = [];

		}

	}



	var cntGuideCategory = $("div#panelGuideList").find("div#panelGuideItem").size();

	for( var i = 0; i < cntGuideCategory; i ++){

		markerGuideBucketList[i] = [];

		var cntGuideSubCategory = $("div#panelGuideList").find("div#panelGuideItem").eq( i ).find("div#panelGuideItemBucketItem").size();

		for( var j = 0; j < cntGuideSubCategory; j ++ ){

			markerGuideBucketList[i][j] = [];

		}

	}

	

	cntGuideCategory = $("div#panelGuideList").find("div#panelGuideItem").size();

	for( var i = 0; i < cntGuideCategory; i ++){

		markerGuideTripList[i] = [];

		var cntGuideSubCategory = $("div#panelGuideList").find("div#panelGuideItem").eq( i ).find("div#panelGuideItemTripItem").size();

		for( var j = 0; j < cntGuideSubCategory; j ++ ){

			markerGuideTripList[i][j] = [];

		}

	}


	var cntNewsCategory = $("#panelNewsList").find("div#panelNewsItem").size();

	for( var i = 0; i < cntNewsCategory; i ++){

		markerNewsList[i] = [];

	}

	

	var cntEyeCategory = $("#panelEyeList").find("div#panelEyeItem").size();

	for( var i = 0; i < cntEyeCategory; i ++){

		markerEyeList[i] = [];

	}	

	var mapOptions = {

			zoom: 7,

			center: new google.maps.LatLng( 48.87779, 31.56319),

			mapTypeId: google.maps.MapTypeId.ROADMAP

	};

	map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

	

	mapLocation = new google.maps.Map(document.getElementById('mapCanvasLocation'), mapOptions);	

	

	// Left Main Menu Clicked : 2013.10.16 by Jeni

	$("div#menuItem").click(function(){

		

		if( $(this).find("i").hasClass("icon-blue") ){

			onClickPanelHandler();

			return;

		}

		

		// Set Item Clicked with Blue, excepts are White

		$("#mainMenu").find("div#menuItem").removeClass("menuItemSelected");

		$("#mainMenu").find("div#menuItem").find("i").removeClass("icon-blue");

		$("#mainMenu").find("div#menuItem").find("i").addClass("icon-white");

		

		$(this).find("i").removeClass("icon-white");

		$(this).find("i").addClass("icon-blue");

		$(this).addClass("menuItemSelected");

		

		var ind = $("#mainMenu").find("div#menuItem").index( $(this) );

		$("#mainPanel").find(".panel").hide();

		$("#mainPanel").find(".panel").eq(ind).show();	

	});

	

	$('#socialPart').hover( function () {

		$(this).animate({width: "140px"},200);

		$("#socialBody").show();

	},function () {

		$(this).animate({width:"35px"},200);

		$("#socialBody").hide();

	});	

	

	$('#rightArrow').click( function () {

		

		if( $("#rightSidePanel").hasClass("rightSidePanelOpen") ){

			

			$("#rightSidePanel").removeClass("rightSidePanelOpen");

			$("#rightArrow").removeClass("rightArrowOpen");

			// $("#rightSidePanelContainer").hide();

			isOpenRightBar = false;

		}else{

			isOpenRightBar = true;

			$("#rightSidePanelContainer").show();

			$("#rightSidePanel").addClass("rightSidePanelOpen");

			$("#rightArrow").addClass("rightArrowOpen");

			if( $("#rightSideButtonArea").find("#btnPlanTrip").hasClass("btn-danger") ){

				$("#rightSideButtonArea").find("#btnPlanTrip").trigger("click");

			}else if( $("#rightSideButtonArea").find("#btnPlaces").hasClass("btn-danger") ){

				$("#rightSideButtonArea").find("#btnPlaces").trigger("click");

			}else if( $("#rightSideButtonArea").find("#btnNews").hasClass("btn-danger") ){

				$("#rightSideButtonArea").find("#btnNews").trigger("click");

			}else if( $("#rightSideButtonArea").find("#btnEye").hasClass("btn-danger") ){

				$("#rightSideButtonArea").find("#btnEye").trigger("click");

			}

		}

	});

	

	$("#mainMenu").find("div#menuItem").eq(1).click();

	

	$("#profileArea").click( function(e){

		if( $("#profileAreaLogin").css("display") == "none")

			return;

		if( $("#profileMenu").css("display") == "none" )

			$("#profileMenu").show();

		else

			$("#profileMenu").hide();

		e.stopPropagation();

	});

	onClickTripItemAdd( null, true);

	onClickTripItemAdd( null, true);

	

	$( "#searchLocation" ).autocomplete({

	      source: function( request, response ) {

	        $.ajax({

	          url: "/async-searchLocation.php",

	          dataType: "json",

	          data: {

	              maxRows: 12,

	              keyword: request.term,

	              searchAll : true

	          },

	          type : "POST",

	          success: function( data ) {

	        	  if( data.location != null ){

	  	            response( $.map( data.location, function( item ) {

	  	              return {

	  	            	locationList : data.location,

	  	                location: item.ua_location,

	  	                title: item.ua_location_title,

	  	                lat : item.ua_location_lat,

	  	                lon : item.ua_location_lon,

	  	                value: item.ua_location_title

	  	              }

	  	            }));

	        	  }

	          }

	        });

	      },

	      minLength: 2,

	      select: function( event, ui ) {

	    	  if( ui.item.lat == 0 && ui.item.lon == 0 ){

		    	  for( var i = 0 ; i < markerSearch.length; i ++ ){

		    		  markerSearch[i].setMap( null );

		    	  }

		    	  markerSearch = [];		    	  

		    	  for( var i = 1 ; i < ui.item.locationList.length; i ++ ){

			    	  var lat = ui.item.locationList[i].ua_location_lat;

			    	  var lon = ui.item.locationList[i].ua_location_lon;

			    	  var locationId = ui.item.locationList[i].ua_location;

			    	  fnAddMarkerSearch( lat, lon, locationId );

		    	  }

	    	  }else{

		    	  // if searched, set marker and move focus

		    	  var lat = ui.item.lat;

		    	  var lon = ui.item.lon;

		    	  var locationId = ui.item.location;

		    	  

		    	  for( var i = 0 ; i < markerSearch.length; i ++ ){

		    		  markerSearch[i].setMap( null );

		    	  }

		    	  markerSearch = [];		    	  

		    	  fnAddMarkerSearch( lat, lon, locationId );

	    	  }

	      },

	      open: function() {

	        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );

	        $(this).autocomplete('widget').css('z-index', 300);

	      },

	      close: function() {

	        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );

	      }

	});	



	infobox = new InfoBox({

			content: document.getElementById("infobox"),

			disableAutoPan: false,

			maxWidth: 150,

			pixelOffset: new google.maps.Size(-120, 0),

			zIndex: null,

			boxStyle: {

				opacity: 1,

				width: "252px"},

			closeBoxMargin: "0px 0px 0px 0px",

			closeBoxURL: "/img/infoBoxClose.png",

			infoBoxClearance: new google.maps.Size(1, 1)

		});

	

	google.maps.event.addListener(map, "click", function(){

		isOpenInfobox = 0;

		infobox.close();

	});

	

	$("#profileBalanceAmount").click( function(event){

		event.stopPropagation();

	});

	

	$('#modalBackgroundTransparent').click(function(e) {

		ga('send', 'pageview', {'page': "/", 'title': siteName});

		History.pushState( {type:"closeLocations"}, siteName , "/");

	});

	

	$('.popupContainer, #locationContainerClose').click(function(ev) {
	
		ga('send', 'pageview', {'page': "/", 'title': siteName});

		History.pushState( {type:"none"}, siteName , "/");

	});	



	$('#newsAnalyticsMain, #myPlacesMain, #locationInfo, #addLocationMain, #blogThumbInfo, #blogInfo, #groupInfo, #placesListInfo, #newsListInfo, #newsCategoryInfo, #placesInfo, #pageInfo, #eyeListInfo, #eyeCategoryInfo').click(function(ev) {

		ev.stopPropagation();

	});



//	$('#pageInfoContainer').click(function(ev) {
//
//		onClosePageDetailPopup();
//
//	});	

	

	$("#rightSidePanelContainer").dblclick( function(ev){

		$("#rightArrow").trigger("click");

	});

	

	// Regarding URL process

	var currentURL = $("#currentURL").val();

	var arrURL = currentURL.split("/");

	var pageType = arrURL[1];

	if( pageType == "newsAnalytics" ){

  	  	state = { type : pageType };

  	  	ga('send', 'pageview', {'page': currentURL, 'title': siteName });

  	  	History.replaceState(state, siteName, currentURL );

	}else if( pageType == "profile"){

  	  	state = { type : pageType };

  	  	ga('send', 'pageview', {'page': currentURL, 'title': siteName });

  	  	History.replaceState(state, siteName, currentURL );

	}else if( pageType == "myPlaces"){

		state = { type : pageType };

		ga('send', 'pageview', {'page': currentURL, 'title': "My Place List"});

		History.replaceState(state, siteName, currentURL );		

	}else if( pageType == "editPlace" ){

		$('#addLocationDescription').data('liveEdit').putHTML($("#addLocationDescriptionTxt").val());

		fnDrawMapOnLocationPopup();

		var pageId = base64_decode(arrURL[2]);

		state = { id: pageId, type : pageType };

		var pageTitle = $("#pageTitle").val().split(" ").join("-");

		ga('send', 'pageview', {'page': currentURL, 'title': pageTitle + " | " + titleSuffix});

		History.replaceState(state, pageTitle + " | " + titleSuffix, currentURL );		

	}else if( pageType == "addPlace"){

		fnNewPlace();

		state = { type : pageType };

		ga('send', 'pageview', {'page': currentURL, 'title': siteName});

		History.replaceState(state, siteName, currentURL );		

	}else if( pageType == "placesList" || pageType == "newsList" || pageType == "eyeList" ){

		state = { id: groupId, type : pageType };

		ga('send', 'pageview', {'page': currentURL, 'title': siteName});

		History.replaceState(state, siteName, currentURL );

	}else if( pageType == "group" || pageType == "places" || pageType == "newsCategory" || pageType == "eyeCategory"){

		var groupId = arrURL[3];

		groupId = base64_decode( groupId );



		$.ajax({

	        url: "/async-getCategoryTitle.php",

	        dataType : "json",

	        type : "POST",

	        data : { id : groupId, type : pageType },

	        success : function(data){

	            if(data.result == "success"){

	        		var pageTitle = data.title;

	          	  	var state;

	          	  	state = { id: groupId, type : pageType };

	          	  	ga('send', 'pageview', {'page': currentURL, 'title': pageTitle + " | " + titleSuffix});

	          	  	History.replaceState(state, pageTitle + " | " + titleSuffix, currentURL );

	            }

	        }

		});

	}else if( pageType == "locations" || pageType == "news" || pageType == "eye" ){

		var pageId = base64_decode(arrURL[3]);

		fnOpenLocationDetailPopup( pageId );

	}else if( pageType == "trips" ){

		var planTripId = arrURL[2];

		planTripId = base64_decode( planTripId );

		fnDrawPlanTripById( planTripId );

		

		var pageTitle = document.title;

		state = { id: planTripId, type : pageType };

		ga('send', 'pageview', {'page': currentURL, 'title': pageTitle });

		History.replaceState(state, pageTitle, currentURL );

	}else if( pageType == "pages" ){

		var pageId = arrURL[3];

		pageId = base64_decode( pageId );

		var pageTitle = document.title;

		state = { id: pageId, type : pageType };

		ga('send', 'pageview', {'page': currentURL, 'title': pageTitle});

		History.replaceState(state, pageTitle, currentURL );		

	}else if( pageType == "blogs" ){

		var pageId = arrURL[3];

		if( pageId != "all" )

			pageId = base64_decode( pageId );

		var pageTitle = document.title;

		if( arrURL[2] == "category" ){

			state = { id: pageId, type : "blogThumb" };

			ga('send', 'pageview', {'page': currentURL, 'title': pageTitle});

			History.replaceState(state, pageTitle, currentURL );			

		}else{

			state = { id: pageId, type : "blogs" };

			ga('send', 'pageview', {'page': currentURL, 'title': pageTitle});

			History.replaceState(state, pageTitle, currentURL );

		}

	}else if( currentURL == "/" ){

		state = { "type": "none" };

		History.replaceState(state, siteName, "/" );

	}else{

		sleep( 3000 );

		window.location.href = "/";

		return;

	}

	// Create New Plan Trip ID

	if( pageType != "trips"){

		fnCreateNewPlanTrip();		

	}
	
});







$(document).click(function() {

    $('#profileMenu').hide();
});



function onClickPanelHandler(){

	var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';	

	if( !$( "#mainPanel" ).hasClass("mainPanelHide") ){

		/*

		  $( "#mainPanel" ).animate({ left: "-=275"}, 300);

		  $( "#mainMap" ).animate({ left: "-=275"}, 300);

		  $( "#mapCanvas" ).animate({ left: "-=275"}, 300, function(){

			  google.maps.event.trigger(map, 'resize');

		  });

		  $( ".popupContainer" ).animate({ left: "-=275"}, 300);

		  */

		$( "#mainPanel" ).addClass( "mainPanelHide" );

		$( "#mainMap" ).addClass( "mapExpand" );

		$( "#mapCanvas" ).addClass( "mapExpand" );

		$( "#mainPanel").on(transitionEnd, function(){

			google.maps.event.trigger(map, 'resize');

		});

		$( ".popupContainer" ).addClass("containerExpand");

	}else{

		$( "#mainPanel" ).removeClass( "mainPanelHide" );

		$( "#mainMap" ).removeClass( "mapExpand" );

		$( "#mapCanvas" ).removeClass( "mapExpand" );

		$( "#mainPanel" ).on(transitionEnd, function(){

			google.maps.event.trigger(map, 'resize');

		});

		$( ".popupContainer" ).removeClass("containerExpand");

		/*

		  $( "#mainPanel" ).animate({ left: "+=275"}, 300);

		  $( "#mainMap" ).animate({ left: "+=275"}, 300);

		  $( "#mapCanvas" ).animate({ left: "+=275"}, 300, function(){

			  google.maps.event.trigger(map, 'resize');

		  });

		  $( ".popupContainer" ).animate({ left: "+=275"}, 300);

		*/

	}

}

function onProfile(){



}

function onAdvancedMode(){

	if( $("#planTripLocationList").find("div#itemAction").eq(0).css("display") == "none" ){

		$("#planTripLocationList").find("div#itemAction").fadeIn( 200 );

	}else{

		$("#planTripLocationList").find("div#itemAction").fadeOut( 200 );

	}

}

function onClickTripItemRoadType( obj ){

	if( $(obj).find("i").eq(0).hasClass("icon-road") ){

		$(obj).find("i").eq(0).attr("class", "icon-leaf");

	}else{

		$(obj).find("i").eq(0).attr("class", "icon-road");

	}

}



function onSignInPopup(){

	$("#signInUsername").val("");

	$("#signInPassword").val("");

	

	$("#modal-signIn").show();

	$("#modalBackground").show();

	$("#signInUsername").focus();

}

function onSignInClose(){

	$("#modalBackground").fadeOut();

	$("#modal-signIn").fadeOut();

}

function onSignInSubmit(){

	var username = $("#signInUsername").val();

	var password = $("#signInPassword").val();

	if( $("#signInUsername").val() == "" ){

		alert(_lang("Please input Username."));

		return;

	}

	if( $("#signInPassword").val() == "" ){

		alert(_lang("Please input Password."));

		return;		

	}

	

    $.ajax({

        url: "/async-signIn.php",

        dataType : "json",

        type : "POST",

        data : {username : username, password : password },

        success : function(data){

            if(data.result == "success"){

            	fnAfterSignIn( data );

            }else{

                alert(_lang("Login Failed"));

                return;

            }

        }

    });

}



function onSignUpPopup(){

	$("#signUpUsername").val("");

	$("#signUpPassword").val("");

	$("#modal-signUp").show();

	$("#modalBackground").show();

	$("#signUpUsername").focus();

}

function onSignUpClose(){

	$("#modalBackground").fadeOut();

	$("#modal-signUp").fadeOut();

}

function onSignUpSubmit(){

	var username = $("#signUpUsername").val();

	var password = $("#signUpPassword").val();

	var email = $("#signUpEmail").val();

	

	var captchaCode = $("div#signUpCaptchaCode").text();

	var captchaText = $("#signUpCaptchaInput").val();

	if( captchaText == "" ){ alert(_lang("Please input captcha code.")); return; }

	if( captchaText.toUpperCase() != captchaCode.toUpperCase() ){ alert(_lang("Please input captcha code correctly.")); return; }	

	

	if( $("#signUpUsername").val() == "" ){ alert(_lang("Please input Username.")); return; }

	if( $("#signUpPassword").val() == "" ){	alert(_lang("Please input Password.")); return; }

	if( email == "" ){ alert(_lang("Please input Email Address.")); return; }

	if( !validateEmail( email ) ){ alert(_lang("Please input Email Address correctly.")); return; }

	

    $.ajax({

        url: "/async-signUp.php",

        dataType : "json",

        type : "POST",

        data : {username : username, password : password, email : email },

        success : function(data){

            if(data.result == "success"){

            	alert("User successfully sign up.");

            	fnAfterSignIn( data );

            	$("#modal-signUp").hide();

            	// $("#signUpUsername").val("");

            	// $("#signUpPassword").val("");

            	// $("#signUpEmail").val("");

                return;

            }else{

            	alert("Email Address or Username is already registered.");

                return;

            }

        }

    });

}

function onKeyUpSignInPassword( evt ){

	if( evt.keyCode == 13 ){

		onSignInSubmit();

		return;

	}

}

function onSignOut(){

    $.ajax({

        url: "/async-signOut.php",

        dataType : "json",

        type : "POST",

        success : function(data){

            if(data.result == "success"){

            	$("#addLocationDescription").parents("div.control-group").eq(0).remove();

                $("#profileAreaLogin").hide();

                $("#profileAreaNotLogin").show();

                $("#isLogin").val("N");

                $("#UA_USER").val("");

                $("#cntPlanTrip").hide();

                onFindPlacesRemoveBucketList();

                

                $("#blogInfoPhoto").attr("src", noProfilePhoto );

                $("#locationInfoPhoto").attr("src", noProfilePhoto );

                $("div#locationInfoCommentItemRating").find("button").removeClass("liked");
                $("div#locationDescriptionItemRating").find("button").removeClass("liked");

                onSignInClose();

                return;

            }else{

                return;

            }

        }

    });	

}

function onProfilePopup(){

    $.ajax({

        url: "/async-getUserInfo.php",

        dataType : "json",

        type : "POST",

        success : function(data){

            if(data.result == "success"){

            	$("#profileUsername").val( data.user.ua_username );

            	$("#profileEmail").val( data.user.ua_email );

            	$("#profilePassword").val( "" );

            	var imgPath = data.user.ua_photo;

            	$("#previewProfileImage").find("img").attr("src", imgPath);



            	$("#modal-profile").show();

            	$("#modalBackground").show();                

                return;

            }else{

                return;

            }

        }

    });

}

function onProfileClose(){

	ga('send', 'pageview', {'page': "/", 'title': siteName});

	History.pushState( {type:"none"}, siteName , "/");	

}

function fnCloseProfile(){

	$("#modalBackground").fadeOut();

	$("#modal-profile").fadeOut();

}

function onProfileSubmit(){

	var username = $("#profileUsername").val( );

	var password = $("#profilePassword").val( );

	var email = $("#profileEmail").val( );

	var photo = $("#previewProfileImage").find("img").attr( "src" );

	

	if( username == "" ){ alert(_lang("Please input Username.")); return;}

	if( password == "" ){ alert(_lang("Please input Password.")); return;}

	if( email == "" ){ alert(_lang("Please input Email Address.")); return;}

	if( !validateEmail( email ) ){ alert(_lang("Please input Email Address correctly.")); return; }

	if( photo == "" ){ alert(_lang("Please select Photo.")); return;}

	

    $.ajax({

        url: "/async-saveUserInfo.php",

        dataType : "json",

        type : "POST",

        data : {username : username, password : password, email : email, photo : photo },

        success : function(data){

            if(data.result == "success"){

            	alert(_lang("User Profile saved successfully."));

            	

            	$("#profileAreaLogin").find("span#profileName").text( username );

            	$("#profileAreaLogin").find("img").attr( "src", photo );

            	onProfileClose();

                return;

            }else{

                return;

            }

        }

    });	

}

function onClickLocationInfoDelete( obj ){

	var locationId = $(obj).parents("#locationInfo").eq(0).find("input#locationInfoLocationId").val();	

	$("#planTripLocationList").find("div#planTripLocationItem").find("input#planTripLocationId[value='"+locationId+"']").eq(0).parents("div#planTripLocationItem").eq(0).find("#tripItemDelete").click();

	$("#locationInfoButton").find(".btnDeleteTrip").hide();

	$("#locationInfoButton").find(".addtotrip").show();	

}

function onClickLocationInfoAddToTrip( obj ){

	if( $("#isLogin").val() == "N" ){

		alert(_lang("You have to sign in for this."));

		onSignInPopup();

		return;

	}

	var locationId = $(obj).parents("div#locationInfo").eq(0).find("#locationInfoLocationId").val();

	fnAddToTrip( locationId );

	

	$("#locationInfoButton").find(".btnDeleteTrip").show();

	$("#locationInfoButton").find(".addtotrip").hide();

}



function onClickAddToTrip( obj ){

	if( $("#isLogin").val() == "Y" ){

		var locationId = $(obj).parents("#infobox").eq(0).find("input#infoboxLocationId").val();

		fnAddToTrip( locationId );

	}else{

		alert(_lang("You have to sign in for this."));

		onSignInPopup();

		return;

	}

}



function onClickRemoveToTrip( obj ){

	var locationId = $(obj).parents("#infobox").eq(0).find("input#infoboxLocationId").val();

	

	$("#planTripLocationList").find("div#planTripLocationItem").find("input#planTripLocationId[value='"+locationId+"']").eq(0).parents("div#planTripLocationItem").eq(0).find("#tripItemDelete").click();

	infobox.close();

}



function onClickViewMore( obj ){

	if( $("#isLogin").val() == "Y" ){

		var locationId = $(obj).parents("#infobox").eq(0).find("input#infoboxLocationId").val();

  	  	var locationTitle = $(obj).parents("#infobox").eq(0).find("div#infoboxLocationTitle").text();

  	  	var url = $(obj).attr("href");

  	  	var arrURL = url.split("/");

  	  	var state;

  	  	if( arrURL[1] == "locations" )

  	  		state = { id: locationId, type : "locations" };

  	  	else if( arrURL[1] == "news" )

  	  		state = { id: locationId, type : "news" };

  	  	ga('send', 'pageview', {'page': url, 'title': locationTitle + " | " + titleSuffix});

  	  	History.pushState(state, locationTitle + " | " + titleSuffix, url );

	}else{

		alert(_lang("You have to sign in for this."));

		onSignInPopup();

		return;

	}

}



function fnCloseAllPopupPopup(){

	$("div.popupContainer").hide();

	$("#socialPart").show();
	
	$("#main_Panel_back_button").show();

	$("#globalIcon").show();

	$("#modalBackgroundTransparent").hide();

	$("#blogCategoryPanel").find(".blogCategorySelected").removeClass("blogCategorySelected");

	$("#locationInfo").find("div#locationInfoYouTube").html("");

}



// Submit when Location Info Popup Submit button clicked

function onClickLocationInfoComment( obj ){
	var commentRate = "0";
	if( $("#isLogin").val() == "N" ){

		alert(_lang("You have to sign in for this."));

		onSignInPopup();

		return;

	}

	var comment = "";

	comment = $(obj).parents("#locationInfoComment").eq(0).find("#locationInfoCommentText").val();

	var locationId = $(obj).parents("#locationInfo").eq(0).find("#locationInfoLocationId").val();

	//get commentRate
	commentRate = $(obj).parent().find("div.location-comment-rate-wrap").find("button.comment-scored").text();
	
	//if( comment == "" ){ alert(_lang("Please input comment.")); return; }

    $.ajax({

        url: "/async-saveLocationComment.php",

        dataType : "json",

        type : "POST",

        data : { locationId : locationId, comment : comment, commentRate : commentRate },

        success : function(data){

            if(data.result == "success"){

            	$(obj).parents("#locationInfoComment").eq(0).find("#locationInfoCommentText").val("");
            	if(comment != "")
            		fnAddCommentOnPopup( data.comment.ua_location_comment, data.comment.ua_photo, data.comment.ua_username, data.comment.ua_comment, data.comment.ua_comment_rate,  data.comment.ua_created_time, 1, 0, 0, 0 );
            	else
            		$("div.location-comment-rate-wrap").find("button#locationCommentRate").removeClass("comment-scored btn-success");

            }

        }

    });	

}







function onClickSearchRemove( ){

	$("#searchLocation").val( "" );

}

function onClickDisplayWeather( obj ){

	if( $(obj).find("i").hasClass("icon-white") ){

		$(obj).find("i").removeClass("icon-white");

		$(obj).find("i").addClass("icon-blue");

		$(obj).find("span").css("color","#359FE6");

		

		weatherLayer = new google.maps.weather.WeatherLayer({ temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS});

		weatherLayer.setMap(map);	

		cloudLayer = new google.maps.weather.CloudLayer();

		cloudLayer.setMap(map);

	}else{

		$(obj).find("i").removeClass("icon-blue");		

		$(obj).find("i").addClass("icon-white");

		$(obj).find("span").css("color","#FFF");

		weatherLayer.setMap(null);

		cloudLayer.setMap(null);

	}

		

}

function onReloadSignUpCaptcha( ){

	$("#signUpCaptchaArea").eq(0).find("div#signUpCaptchaCode").text( getRandomString(7) );

}



function onAddToTripCurrentLocation( lat, lon, location ){

	$.ajax({

		url: "/async-addNewLocation.php",

		dataType : "json",

		type : "POST",

		data : {title : location, lat : lat, lon : lon, locationType : 2},

		success : function(data){

			if(data.result == "success"){

				var objList = $("#planTripLocationList").find("div#planTripLocationItem");

				var isCreate = true;

				for( var i = 0; i < objList.length; i ++ ){

					if( objList.eq(i).find("#planTripLocationId").val() == "" ){

						isCreate = false;

						objList.eq(i).find("#planTripLocationType").val( 2 );

						objList.eq(i).find("#planTripLocationLat").val( lat );

						objList.eq(i).find("#planTripLocationLon").val( lon );

						objList.eq(i).find("#planTripLocationId").val( data.locationId );

						objList.eq(i).find("#txtTripLocation").val( location );

						objList.eq(i).find("#txtTripLocation").prop( "readonly", true );

						break;

					}

				}

				if( isCreate ){

					fnAddPlanTripLocationItem( location, data.locationId, lat, lon, 2 );

				}

				fnSavePlanTripLocationList();

			}else{
				alert(_lang("Login Failed"));

				return;

			}

		}

	});	

}



function onClickMyLocation( obj ){

	if( $(obj).find("i").hasClass("icon-white") ){

		$(obj).find("i").removeClass("icon-white");

		$(obj).find("i").addClass("icon-blue");

		$(obj).find("span").css("color", "#359FE6");

		fnHighlightCurrentLocation( );

		nIntervalId = setInterval( function(){ 

			fnHighlightCurrentLocation( );

		},$("#currentLocationCycle").val() * 1000 );

	}else{

		$(obj).find("i").removeClass("icon-blue");

		$(obj).find("i").addClass("icon-white");

		$(obj).find("span").css("color", "#FFF");

		clearInterval( nIntervalId );

		markerCurrentLocation.setMap( null );

	}

}



function onAccountDeposit( ){

	var amount = $("#profileDepositAmount").val();

	if( (String(Number(amount)) != String(amount)) || (amount == "")){

		alert(_lang("Please input amount correctly."));

		return;

	}

	$("#paymentForm").find("#amount").val( amount );

	$("#paymentForm").find("#return").val( window.location.href );

	var invoice = $("#paymentForm").find("#invoice").val(); 

	$.ajax({

		url: "/async-savePaymentHistory.php",

		dataType : "json",

		type : "POST",

		data : { invoice : invoice, amount : amount, type : 1, subId : '' },

		success : function(data){	

			$("#paymentForm").submit();

		}

	});	

}

function fnEditPlace( locationId ){

	$("#socialPart").hide();
	
	$("#main_Panel_back_button").hide();

	$("#globalIcon").hide();

	$("#globalList").css("width", "0px");

	$("#globalIcon").css("right", "0px");

	isGlobal = false;

	$.ajax({

		url: "/async-getLocationInfo.php",

		dataType : "json",

		type : "POST",

		data : { locationId : locationId, detail : 0 },

		success : function(data){

			if(data.result == "success"){

				$("#addLocationId").val(data.location.ua_location);

				$("#addLocationTitle").val(data.location.ua_location_title);

				$("#addLocationSubtitle").val(data.location.ua_location_subtitle);

				$("#addLocationAddress").val(data.location.ua_location_street_address);

				$("#addLocationLat").val(data.location.ua_location_lat);

				$("#addLocationLon").val(data.location.ua_location_lon);

				$("#addLocationSubCategory").val(data.location.ua_place_subcategory);

				$("#addLocationCity").val(data.location.ua_location_city);

				$("#addLocationZipCode").val(data.location.ua_location_zip);

				$("#addLocationCountry").val(data.location.ua_location_country);

				$("#addLocationState").val(data.location.ua_location_state);

				$("#addLocationPhone").val(data.location.ua_location_phone);

				$("#addLocationEmail").val(data.location.ua_location_email);

				$("#addLocationWebsite").val(data.location.ua_location_website);

				$("#addLocationKeywords").val(data.location.ua_keywords);

			    $('#addLocationDescription').data('liveEdit').putHTML(data.location.ua_location_description);

			    $("#addLocationScore").text( data.location.ua_location_like_score ); 

			    $("#previewLocationImage").find("img").attr("src", data.location.ua_location_photo );

			    if( $("#UA_USER").val() == data.location.ua_created_by ){

			    	$("#addLocationScoreArea").show();

					$("#add_place_bar").hide();

			    }else{

			    	$("#addLocationScoreArea").hide();

					$("#add_place_bar").show();

			    }

			    fnCloseAllPopupPopup();

			    $("#socialPart").hide();
				
				$("#main_Panel_back_button").hide();

				$("#globalList").css("width", "0px");

				$("#globalIcon").css("right", "0px");

			    $("#globalIcon").hide();

			    isGlobal = false;

			    $("#addLocationContainer").show();

			    fnDrawMapOnLocationPopup();

								

			}

		}

	});

		

}

function fnNewPlace(){

	$("#socialPart").hide();
	
	$("#main_Panel_back_button").hide();

	$("#globalIcon").hide();

	$("#globalList").css("width", "0px");

	$("#globalIcon").css("right", "0px");

	isGlobal = false;

	

	$("#addLocationTitle").val("");

	$("#addLocationSubtitle").val("");

	$("#addLocationAddress").val("");

	$("#addLocationId").val("");

	$("#addLocationLat").val(48.87779);

	$("#addLocationLon").val(31.56319);

	$("#addLocationSubCategory").val("");

	$("#addLocationCity").val("");

	$("#addLocationZipCode").val("");

	$("#addLocationCountry").val("");

	$("#addLocationState").val("");

	$("#addLocationPhone").val("");

	$("#addLocationEmail").val("");

	$("#addLocationWebsite").val("");

	$("#addLocationKeywords").val("");

	var objTempCnt = $("div#addLocationBody").find('textarea#addLocationDescription').length;

	if( objTempCnt != 0 ){

		$('#addLocationDescription').data('liveEdit').putHTML("");

	}

    $("#addLocationScoreArea").hide();

	$("#add_place_bar").show();

    $("#previewLocationImage").find("img").attr( "src", $("#defaultPlace").val() );

    fnCloseAllPopupPopup();

    $("#socialPart").hide();
	
	$("#main_Panel_back_button").hide();

    $("#globalIcon").hide();

	$("#globalList").css("width", "0px");

	$("#globalIcon").css("right", "0px");

	isGlobal = false;

	$("#addLocationContainer").show();
	$("div.previewMultiImage").empty();
	fnDrawMapOnLocationPopup();

}



function onSavePlace(){
	var locationPhoto = [];
	var imageIndex = 0;
	
	if( $("#isLogin").val() == "N" ){

		alert( _lang("You have to sign in for this."));

		onSignInPopup();

		return;

	}	

	var locationTitle = $("#addLocationTitle").val();

	var locationSubtitle = $("#addLocationSubtitle").val();

	var locationAddress = $("#addLocationAddress").val();

	var locationLat = $("#addLocationLat").val();

	var locationLon = $("#addLocationLon").val();

	var locationSubCategory = $("#addLocationSubCategory").val();

	//var locationPhoto = $("#previewLocationImage").find("img").attr("src");
	$("#previewLocationImage").find(".img-wrap").each(function(){
		locationPhoto[imageIndex] = $(this).find("img").attr("src");
		imageIndex ++;
	});
	var locationCity = $("#addLocationCity").val();

	var locationZipCode = $("#addLocationZipCode").val();

	var locationCountry = $("#addLocationCountry").val();

	var locationState = $("#addLocationState").val();

	var locationPhone = $("#addLocationPhone").val();

	var locationEmail = $("#addLocationEmail").val();

	var locationWebsite = $("#addLocationWebsite").val();

	var locationKeywords = $("#addLocationKeywords").val();

	var locationDescription = $('#addLocationDescription').data('liveEdit').getXHTMLBody().trim();

	var locationId = $("#addLocationId").val();

	var locationType = 1;

	

	if( locationTitle == "" ){ alert(_lang("Please input location title.")); return; }

	if( locationSubtitle == "" ){ alert(_lang("Please input location Sub title.")); return; }

	if( locationAddress == "" ){ alert(_lang("Please input location address.")); return; }

	if( locationLat == "" ){ alert(_lang("Please select location correctly.")); return; }

	if( locationSubCategory == "" ){ alert(_lang("Please select category.")); return; }

	if( locationEmail != "" && !validateEmail(locationEmail) ){ alert(_lang("Please input Email correctly.")); return; }	

	// if( locationWebsite != "" && !isUrl(locationWebsite) ){ alert(_lang("Please input Website correctly.")); return; }

	

	$.ajax({   	

		url: "/async-savePlace.php",

		cache : false,

		dataType : "json",

		type : "POST",

		data : { locationTitle:locationTitle, locationSubtitle:locationSubtitle, locationAddress:locationAddress,

			locationLat:locationLat, locationLon:locationLon, locationSubCategory:locationSubCategory, locationPhoto:locationPhoto,

			locationCity:locationCity, locationZipCode:locationZipCode, locationCountry:locationCountry, locationState:locationState,

			locationPhone:locationPhone, locationEmail:locationEmail, locationWebsite:locationWebsite, locationKeywords:locationKeywords,

			locationDescription: locationDescription, locationType:locationType, locationId:locationId},

		success : function(data){

			if( data.result == "success" ){

				if( data.actionType == "add" ){

					if( data.validYn == "Y" ){

						alert(_lang("Location saved successfully."));

						var pageTitle = locationTitle.split(" ").join("-");

						var url = "/editPlace/" + base64_encode( data.locationId + "" );

				  	  	state = { type : "editPlace", id : data.locationId };

				  	  	ga('send', 'pageview', {'page': url, 'title': pageTitle + " | " + titleSuffix});

				  	  	History.pushState(state, pageTitle + " | " + titleSuffix, url );

						fnBalanceAmount( data.priceAddLocation );						

					}else if( data.validYn == "N" ){

						var url = "/editPlace/" + base64_encode( data.locationId + "" );

						$("#paymentForm").find("#amount").val( data.priceAddLocation );

						$("#paymentForm").find("#return").val( window.location.protocol + "//" + window.location.host + url );

						

						var invoice = $("#paymentForm").find("#invoice").val();

						var amount = data.priceAddLocation;

						var subId = data.locationId;

						$.ajax({

							url: "/async-savePaymentHistory.php",

							dataType : "json",

							type : "POST",

							data : { invoice : invoice, amount : amount, type : 2, subId : data.locationId },

							success : function(data){	

								$("#paymentForm").submit();

							}

						});

					}

				}else{

					alert(_lang("Location saved successfully."));

				}

			}else{

				if( data.error == "ERROR_DEPOSIT" ){

					alert(_lang("Your account amount is not enough for this."));

					return;					

				}else if( data.error == "ERROR_UPDATE" ){

					alert(_lang("You can not update this place."));

					return;

				}

				

			}

		}

	});

}

function onKeyUpLocationAddress( ev ){

	if( ev.keyCode == 13 ){

		var address = $("#addLocationAddress").val();

		  $.ajax({   	

		        url: "/async-getLocationInfoFromAddress.php",

		        cache : false,

		        dataType : "json",

		        type : "POST",

		        data : { address : address },

		        success : function(data){

		        	if( data.result == "success" ){

			        	var lat = data.location[0].geometry.location.lat;

			        	var lng = data.location[0].geometry.location.lng;

			        	$("#addLocationLat").val( lat );

			        	$("#addLocationLon").val( lng );

			    		if( markerLocation != null )

			    			markerLocation.setMap( null );

		                

			    		markerLocation = new google.maps.Marker({

			    	      position: new google.maps.LatLng( lat, lng ),

			    	      map: mapLocation

			        	});

			    		mapLocation.setCenter(new google.maps.LatLng( lat, lng ) );		        		

		        	}else{

		        		alert(_lang("There is no location with this address."));

		        		return;

		        	}

	        	

		        }

		  });

	}

}

function onLocationScoreUp( obj ){

	var locationId = $(obj).parents("#addLocationMain").eq(0).find("#addLocationId").val();

	$.ajax({

		url: "/async-setLocationScoreUp.php",

	    cache : false,

	    dataType : "json",

	    type : "POST",

	    data : { locationId : locationId },

	    success : function(data){

	    	if( data.result == "success" ){

	    		var locationScore = Number($(obj).parents("#addLocationMain").eq(0).find("#addLocationScore").text());

	    		locationScore++;

	    		$(obj).parents("#addLocationMain").eq(0).find("#addLocationScore").text( locationScore );

	    		fnBalanceAmount( data.priceLocationScoreUp );



	        	isLoadPlaces = true;

	        	cntPlacesLoaded = 0;

	        	canLoadPlaces = true;

	        	$("#rightSidePlacesList").html("");

	        	$("#btnPlaces").click();

	    		

	    	}else if( data.result == "failed" ){

	    		$("#paymentForm").find("#amount").val( data.priceLocationScoreUp );

	    		$("#paymentForm").find("#return").val( window.location.href );

	    		var invoice = $("#paymentForm").find("#invoice").val();

	    		var amount = data.priceLocationScoreUp;

	    		$.ajax({

	    			url: "/async-savePaymentHistory.php",

	    			dataType : "json",

	    			type : "POST",

	    			data : { invoice : invoice, amount : amount, type : 3, subId : locationId },

	    			success : function(data){	

	    				$("#paymentForm").submit();

	    			}

	    		});	    		

	    	}

	    }

	});	

}

function onChangeRegion(){

	var latLng =  $("#regionList option:selected").attr("data");

	if( latLng != "" ){

		var arr = latLng.split(",");

		var lat = arr[0];

		var lng = arr[1];

		map.setCenter(new google.maps.LatLng( lat, lng ) );

		map.setZoom( 11 );

	}else{

		map.setCenter(new google.maps.LatLng( 48.87779, 31.56319 ) );

		map.setZoom( 7 );

	}

	var regionId = $("#regionList").val();

	fnSetRegion( regionId );



	$("#rightSidePlacesList").html("");

	isLoadPlaces = true;

	canLoadPlaces = true;

	cntPlacesLoaded = 0;	



	$("#rightSideNewsList").html("");

	isLoadNews = true;

	canLoadNews = true;

	cntNewsLoaded = 0;	



	$("#rightSideEyeList").html("");

	isLoadEye = true;

	canLoadEye = true;

	cntEyeLoaded = 0;

	

	if( $("#rightSidePanelContainer").css("display") != "none" && $("#btnPlaces").hasClass("btn-danger") ){		

		onClickRightSidePlacesTab( $("#btnPlaces").get(0) );

	}else if( $("#rightSidePanelContainer").css("display") != "none" && $("#btnNews").hasClass("btn-danger") ){

		onClickRightSideNewsTab( $("#btnNews").get(0) );

	}else if( $("#rightSidePanelContainer").css("display") != "none" && $("#btnEye").hasClass("btn-danger") ){

		onClickRightSideEyeTab( $("#btnEye").get(0) );

	}

}

function onChangeLanguage( lang ){

	$.ajax({

		url: "/async-setLanguage.php",

	    cache : false,

	    dataType : "json",

	    type : "POST",

	    data : { lang : lang },

	    success : function(data){

	    	window.location.reload();

	    }

	});

}

$( document ).ready( function() {    
    $("#addplace_desc_adv span, #addplace_desc_how span, #addplace_desc_examples span, #addplace_desc_price span, #locationUpToTop span").hide();

    $("#addplace_desc_adv, #addplace_desc_how, #addplace_desc_examples, #addplace_desc_price, #locationUpToTop").hoverIntent({
        over: showSummary, 
        timeout: 50, 
        out: hideSummary
    });
    
    //give rate about comment
    $("div.location-comment-rate-wrap").find("button#locationCommentRate").each(function () {
    	$(this).click(function(){
    		$("div.location-comment-rate-wrap").find("button#locationCommentRate").removeClass("comment-scored");
    		$("div.location-comment-rate-wrap").find("button#locationCommentRate").removeClass("btn-success");
    		$(this).addClass("comment-scored");
    		$(this).addClass("btn-success");
    	});
    });
    
    ///top comment append(like-unlike)
    var flagRate = false;
    
    if(!$("div#locationInfoCommentFirstItem").find("div#locationInfoCommentItem").length){
		$("div#locationInfoCommentFirstItem").css("padding", "0px");
		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
	}else{
		$("div#locationInfoCommentFirstItem").css("padding", "0px");
		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
	}
    
    //nearbyListLoadMore
    $("div#nearbyListLoadMore").click(function() {
    	var loadedLength = $("div#locationInfoNearbyList").find("div#locationInfoNearbyItem").length;
    	var locationId = $("input#locationInfoLocationId").val();
    	var currentTime = $("input#currentTime").val();
    	$.ajax({
    		url: "/async-getNearbyListMore.php",
    	    cache : false,
    	    dataType : "json",
    	    type : "POST",
    	    data : { loadedLength : loadedLength, locationId : locationId, currentTime : currentTime },
    	    success : function(data){
    	    	if(data.result == "success"){    
	    	    	for( var i = 0; i < data.nearbyList.length; i ++ ){
	            		var objClone = $("#cloneLocationInfoNearbyItem").clone();
	            		objClone.show();
	            		objClone.attr("id", "locationInfoNearbyItem");
	            		objClone.find("#locationInfoNearbyItemDistance").text( data.nearbyList[i].distance + " Km");
	            		objClone.find("#locationInfoNearbyItemImage").find("img").attr("src", data.nearbyList[i].ua_location_photo );
	            		objClone.find("#locationInfoNearbyItemTitle").html( data.nearbyList[i].ua_location_title );
	            		objClone.find("#locationInfoNearbyItemSubTitle").html( data.nearbyList[i].ua_location_subtitle );
	            		objClone.find("a.js-link").attr("href", "/" + data.locationType + "/" + translateEn(data.nearbyList[i].ua_location_title).split(" ").join("-") + "/" + base64_encode( data.nearbyList[i].ua_location ));
	            		objClone.find("a.js-link").click(function (event){
	                		event.preventDefault();
							fnJsLink( this );
		              	});
	            		$("div#locationInfoNearbyList").append( objClone );
	            	}
    	    	}else
    	    		alert("Failed!");
    	    }
    	});
    });
    $("div#commentListLoadMore").find("button").click(function() {
    	var loadedLength = $("div#locationInfoCommentList").find("div#locationInfoCommentItem").length;
    	var locationId = $("input#locationInfoLocationId").val();
    	var currentTime = $("input#currentTime").val();
    	var firstItemId = 0;
    	if($("div#locationInfoCommentFirstItem").find("div#locationInfoCommentItem").length)
    		firstItemId = $("div#locationInfoCommentFirstItem").find("div#locationInfoCommentItem").find("input#locationInfoCommentId").val();
    	
    	$.ajax({
    		url: "/async-getCommentListMore.php",
    	    cache : false,
    	    dataType : "json",
    	    type : "POST",
    	    data : { loadedLength : loadedLength, locationId : locationId, currentTime : currentTime, firstItemId : firstItemId },
    	    success : function(data){
    	    	if(data.result == "success"){    
    	    		if (data.commentList != null) {
    	    			var ratedShown = false;
                		var userLastRate = 0;
                    	for( var i = 0; i < data.commentList.length; i ++ ){
                    		if (i > 0) {
    	                		if (data.commentList[i].ua_user != data.commentList[i-1].ua_user) {
    	                			ratedShown = false;
    	                			userLastRate = 0;
    	                		}
                    		}
                    		if (data.commentList[i].ua_comment_rate != 0 && !ratedShown) {
                                userLastRate = data.commentList[i].ua_comment_rate;
                                ratedShown = true;
                    		}
                    		fnAddCommentOnPopup( data.commentList[i].ua_location_comment, data.commentList[i].ua_photo, data.commentList[i].ua_username, data.commentList[i].ua_comment, data.commentList[i].ua_comment_rate,
                    				data.commentList[i].ua_created_time, 3, data.commentList[i].ua_like_count, data.commentList[i].ua_unlike_count, data.commentList[i].ua_liked);
                    	}
                    	
                    	if(!$("div#locationInfoCommentFirstItem").find("div#locationInfoCommentItem").length){
            	    		$("div#locationInfoCommentFirstItem").css("padding", "0px");
            	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
                    	}else{
                    		$("div#locationInfoCommentFirstItem").css("padding", "0px");
            	    		$("div#locationInfoCommentFirstItem").css("box-shadow", "none");
                    	}
                	}
    	    	}else
    	    		alert("Failed!");
    	    }
    	});
    });
    //when mouse hover location div child items have to work
    $("div#locationInfoAddress2,div#locationUpToTop").hover(
    	function() {
    		$(this).parent().find("div#zoomIcon").removeClass("zoom-icon");
    	}, function() {
    		$(this).parent().find("div#zoomIcon").addClass("zoom-icon");
    	}
    );
});

function showSummary(){ $(this).find("span").fadeIn("fast");
$(this).find("span").show();  }
function hideSummary(){ $(this).find("span").fadeOut("fast");
$(this).find("span").hide(); }

var DocInit = function () {
	function locationThumbFancy() {
		//location main thumbnail 
		$("a[rel=location_thumb]").fancybox({
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'titlePosition' 	: 'over',
			'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
				return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
			}
		});
	}
	return {
        init: function () {
        	locationThumbFancy();
        },
	};
}();
function onShowLocationPin(event) {
	var lat = $("input#locationPinLat").val();
	var lon = $("input#locationPinLon").val();
	var myLatlng = new google.maps.LatLng(lat, lon);
	map.setCenter(myLatlng);
	event.stopPropagation();
	event.preventDefault();
	return false;
}
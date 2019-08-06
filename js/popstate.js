History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
	var State = History.getState();
	var type = State.data.type;
	if( type == "pages" ){
		fnPageDetailPopup( State.data.id );		
	}else if( type == "newsAnalytics" ){
		fnNewsAnalytics( );
	}else if( type == "profile" ){
		onProfilePopup();
	}else if( type == "myPlaces" ){
		fnMyPlaces( );
	}else if( type == "editPlace" ){
		fnEditPlace( State.data.id );
	}else if( type == "addPlace"){
		fnNewPlace();
	}else if( type == "trips" ){
		if( State.data.reset == 0 ){
			
		}else{
			fnCloseAllPopup();
			fnDrawPlanTripById( State.data.id );
			onCloseTripList( );			
		}
	}else if( type == "blogThumb" ){
		fnBlogListPopup( State.data.id );
	}else if( type == "blogs" ){	
		fnBlogDetailPopup( State.data.id );
	}else if( type == "locations"){
		fnGetLocationInfoDetail( State.data.id );
	}else if( type == "news"){
		fnGetNewsInfoDetail( State.data.id );
	}else if( type == "eye"){
		fnGetEyeInfoDetail( State.data.id );
	}else if( type == "group"){
		fnGroupDetailPopup( State.data.id );
	}else if( type == "places" ){
		fnPlacesDetailPopup( State.data.id );
	}else if( type == "placesList" ){
		fnPlacesListPopup( );
	}else if( type == "newsList" ){
		fnNewsListPopup( );
	}else if( type == "eyeList" ){
		fnEyeListPopup( );
	}else if( type == "newsCategory" ){
		fnNewsCategoryPopup( State.data.id );
	}else if( type == "eyeCategory" ){
		fnEyeCategoryPopup( State.data.id );
	}else if( type == "closeBlogDetail" ){
		fnCloseAllPopup( );
	}else if( type == "closeBlogThumb" ){
		fnCloseAllPopup( );
	}else if( type == "closeLocations" ){
		fnCloseAllPopup( );		
	}else if( type == "closeGroup" ){
		fnCloseAllPopup( );
	}else if( type == "closePlaces" ){
		fnCloseAllPopup( );
	}else if( type == "closeNewsCategory" ){
		fnCloseAllPopup( );
	}else if( type == "closePlacesList" ){
		fnCloseAllPopup( );
	}else if( type == "closeNewsList" ){
		fnCloseAllPopup( );
	}else if( type == "none" ){
		fnCloseAllPopup( );
		if( isOpenRightBar == true ){
			// $("#rightArrow").trigger("click");
			$("#rightArrow").click();
		}			
	}
	// alert( type );
});
function fnCloseAllPopup( ){
	onCloseTripList( );
	fnCloseAllPopupPopup();
	fnCloseProfile();
}
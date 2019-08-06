var newsChart;

$(document).ready(function() {

	

	$('#newsStartDate, #newsEndDate, #newsAnalysticsStartDate, #newsAnalysticsEndDate').datepicker({format: 'yyyy-mm-dd'});	

		

	var curDate = new Date();

	var year = curDate.getFullYear();

	var month = curDate.getMonth() + 1;

	if( month < 10 ) month = "0" + month;

	var date = curDate.getDate();

	if( date < 10 ) date = "0" + date;

	var strDate = year + "-" + month + "-" + date;

	$('#newsStartDate, #newsEndDate').val( strDate );

	

	var startDate = String( Number(year) - 1 ) + "-" + month + "-" + date;

	if( month == "02" && date == "29" ){

		startDate = String( Number(year) - 1 ) + "-" + "02" + "-" + "28";

	}

		

	$('#newsAnalysticsStartDate').val( startDate );

	$('#newsAnalysticsEndDate').val( strDate );

	

	

    newsChart = $('#newsAnalysticsChart').highcharts({

        title: {

            text: _lang('News Analytics'),

            x: -20 //center

        },

        xAxis: {

            categories: ['']

        },

        yAxis: {

            title: {

                text: _lang('News Count')

            },

            plotLines: [{

                value: 0,

                width: 1,

                color: '#808080'

            }]

        },

        tooltip: {

            valueSuffix: ''

        },

        legend: {

            layout: 'vertical',

            align: 'right',

            verticalAlign: 'middle',

            borderWidth: 0

        },

        series: []

    });

});

function fnLoadNewsOnMap( obj, newsCategoryId, startDate, endDate, cntLoaded ){

	// isLoadingNewsOnMap = true;

	$("#panelNewsListOverlay").show();

	var firstInd = $(obj).parents("#panelNewsList").eq(0).find("div#panelNewsItem").index( $(obj) );

	$.ajax({

        url: "/async-getNewsListByCategory.php",

        dataType : "json",

        type : "POST",

        data : { newsCategoryId : newsCategoryId, startDate : startDate, endDate : endDate, cntLoaded : cntLoaded },

        success : function(data){

            if(data.result == "success"){

            	// var newsCount = Number( $(obj).find("div#newsCount").text() );

            	var newsCount = 0;

        		// $(obj).find("div#newsCount").text( newsCount + data.newsList.length );

        		$(obj).find("div#newsCount").show( );

            	for( var i = 0 ; i < data.newsList.length; i ++ ){

  			    	var lat = data.newsList[i].ua_location_lat;

  			    	var lon = data.newsList[i].ua_location_lon;

  			    	var locationId = data.newsList[i].ua_location;

  			    	var regionId = data.newsList[i].ua_region;

			    	var myLatlng = new google.maps.LatLng( lat, lon);

			    	var imageURL = data.newsList[i].ua_category_marker;

			    	

			    	if( imageURL == "")

			    		imageURL = '/img/markerNews.png';

			    	

			    	var image = {

		    			    url: imageURL,

		    			    size: new google.maps.Size(30, 30),

		    			    origin: new google.maps.Point(0,0),

		    			    anchor: new google.maps.Point(15, 30)

			    	};

			    	markerNewsList[firstInd][ i + cntLoaded ] = new google.maps.Marker({

			    	      position: myLatlng,

			    	      map: map,

			    	      icon: image,

			    	      locationId : locationId,

			    	      regionId : regionId

			    	});

   	    		  	var selectedRegionId = $("#regionList").val();

   	    		  	if( selectedRegionId != "" && selectedRegionId != regionId ){

   	    		  		markerNewsList[firstInd][ i + cntLoaded ].setMap( null );

   	    		  	}else{

   	    		  		newsCount ++;

   	    		  	}			    	

			    	fnAddMarker( markerNewsList[firstInd][ i + cntLoaded ], "NEWS" );

            	}

            	newsCount = Number( $(obj).find("div#newsCount").eq(0).text() ) + newsCount;

             	$(obj).find("div#newsCount").eq(0).text( newsCount );

				$(obj).find("i#findPlacesAllcheck").addClass("icon-red");

             	

            	// Right Side Bar News 

            	if( data.newsList.length == 0 && $("#rightSidePanelContainer").css("display") != "none" && $("#rightSidePanelContainer").find("#btnNews").hasClass("btn-danger") ){

            		if( isLoadCategoryNews1.length > 0 ){

            			isLoadCategoryNews1[firstInd] = true;

            			var isTemp = true;

            			for( var i = 0 ; i < isLoadCategoryNews1.length; i ++ ){

            				if( isLoadCategoryNews1[i] == false){

            					isTemp = false;

            					break;

            				}

            			}

            			if( isTemp == true ){            				

            				isLoadCategoryNews1 = [];

            				isLoadNews = true;

            				canLoadNews = true;

            				$("#rightSidePanelContainer").find("#btnNews").trigger( "click" );

            			}

            		}else{

                		$("#rightSidePanelContainer").find("#btnNews").trigger( "click" );            			

            		}

            	}

    		 	if( data.newsList.length != 0 ){

    		 		fnLoadNewsOnMap( obj, newsCategoryId, startDate, endDate, Number( cntLoaded ) + Number( data.newsList.length ) );

    		 	}else{

    		 		// isLoadingNewsOnMap = false;

    		 		$("#panelNewsListOverlay").hide();

    		 	}

            }

        }

    });	

}

function onClickPanelNewsItem( obj ){

	if( isLoadingNewsOnMap == true ) return; 

	var firstInd = $(obj).parents("#panelNewsList").eq(0).find("div#panelNewsItem").index( $(obj) );

	isLoadNews = true;

	canLoadNews = true;

	cntNewsLoaded = 0;

	$("#rightSideNewsList").html("");

	

	if( $(obj).hasClass("panelNewsItemSelected") ){

		$(obj).removeClass("panelNewsItemSelected");

		$(obj).find("#newsCount").hide( );

		$(obj).find("#newsCount").text( 0 );

		$(obj).find("i#findPlacesAllcheck").removeClass("icon-red");

		fnRemoveMarkers( markerNewsList[firstInd] );

    	// Right Side Bar News

    	if( $("#rightSidePanelContainer").css("display") != "none" && $("#rightSidePanelContainer").find("#btnNews").hasClass("btn-danger") ){

    		if( isLoadCategoryNews.length > 0 ){

    			isLoadCategoryNews[firstInd] = true;

    			var isTemp = true;

    			for( var i = 0 ; i < isLoadCategoryNews.length; i ++ ){

    				if( isLoadCategoryNews[i] == false){

    					isTemp = false;

    					break;

    				}

    			}

    			if( isTemp == true ){

    				isLoadCategoryNews = [];    				

    				$("#rightSidePanelContainer").find("#btnNews").trigger( "click" );

    			}

    		}else{

    			$("#rightSidePanelContainer").find("#btnNews").trigger( "click" );

    		}

			

    	}

	}else{

		$(obj).addClass("panelNewsItemSelected");

		var newsCategoryId = $(obj).attr("data");

		var startDate = $("#newsStartDate").val();

		var endDate = $("#newsEndDate").val();

		fnLoadNewsOnMap( obj, newsCategoryId, startDate, endDate, 0 );			

	}



}



function onClickNewsSearch( ){

	var startDate = $('#newsStartDate').val();

	var endDate = $('#newsEndDate').val();

	if( startDate != "" && endDate != "" && startDate > endDate ){

		alert( _lang("Start Date should be before than End Date."));

		return;

	}

	var objList1 = $("#panelNewsList").find("div#panelNewsItem");

	var objList = $("#panelNewsList").find(".panelNewsItemSelected");

	

	for( var i = 0; i < objList1.length; i ++ ){

		if( objList1.eq(i).hasClass("panelNewsItemSelected")){

			isLoadCategoryNews[i] = false;

			isLoadCategoryNews1[i] = false;			

		}else{

			isLoadCategoryNews[i] = true;

			isLoadCategoryNews1[i] = true;			

		}



	}	

	for( var i = 0; i < objList.length; i ++ ){

		objList.eq(i).click();

	}

	for( var i = 0; i < objList.length; i ++ ){

		objList.eq(i).click();

	}

}

function onClickNewsReset( ){

	$('#newsStartDate').val("");

	$('#newsEndDate').val("");

}

function onNewsAnalyticsShowChart( ){

	var startDate = $("#newsAnalysticsStartDate").val();

	var endDate = $("#newsAnalysticsEndDate").val();

	var region = $("#newsAnalysticsRegionList").val();

	if( startDate != "" && endDate != "" && startDate > endDate ){ alert(_lang("Start Date should be before than End Date.")); return; }

	

	$.ajax({

        url: "/async-getNewsAnalyticsData.php",

        dataType : "json",

        type : "POST",

        data : { startDate : startDate, endDate : endDate, region : region },

        success : function(data){

        	if( data.dataList.length > 0 ){

        		$("#newsAnalysticsChartNoData").hide();

            	var cntDateList = data.dateList.length;

            	var cntNewsList = data.dataList.length / cntDateList;

            	var arrCountListByNews = [];

            	var arrNewsList = [];

            	for( var i = 0; i < cntNewsList; i ++ ){

            		arrCountListByNews[ i ] = [];

            		for( var j = 0; j < cntDateList; j ++ ){

            			if( j == 0 ){

					arrNewsList[ i ] = data.dataList[ i * cntDateList ].ua_news_title;
}

            			arrCountListByNews[i][j] = Number( data.dataList[ j * cntNewsList + i ].cnt );

            		}

            	}

            	newsChart = $('#newsAnalysticsChart').highcharts();

            	/*newsChart.xAxis[0].update({

            		categories: data.dateList

            	});*/

            	newsChart.xAxis[0].setCategories( data.dateList );

            	if( newsChart.series != undefined && newsChart.series != null ){

                	for (var i = newsChart.series.length; i > 0 ; i--) {

                		newsChart.series[ i - 1 ].remove( );

                    }

                	

            	}



            	for (var i = 0; i < arrCountListByNews.length; i++) {

            		newsChart.addSeries({

            		    id : i,                        

            		    name: arrNewsList[i],

            		    data: arrCountListByNews[i]

            		});

            	}

            	newsChart.redraw();            		

        	}else{

        		$("#newsAnalysticsChartNoData").show();

        		if( newsChart.series != undefined && newsChart.series != null ){

                	for (var i = newsChart.series.length; i > 0 ; i--) {

                		newsChart.series[ i - 1 ].remove();

                    }

                	newsChart.redraw();        			

        		}

        	}

    	

        }

	});

}
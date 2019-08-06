var map;
var marker;
var addedSubCategoryId;
var addedName = [];

function initialize() {
	var tempLat = document.getElementById("locationLat").value;
	var tempLon = document.getElementById("locationLon").value;
	if (tempLat == "" & tempLon == ""){
		tempLat = "50.4501";
		tempLon = "30.5234";
	}
	
	var myLatlng = new google.maps.LatLng( Math.round(tempLat*100000)/100000, Math.round(tempLon*100000)/100000);
	var mapOptions = {
			zoom: 8,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('partmap-Canvas'), mapOptions);
	 
	 marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map	      
	});
	
	 var geocoder = new google.maps.Geocoder();

	 google.maps.event.addListener(map, 'click', function(e) {
          geocoder.geocode(
              {'latLng': e.latLng},
              function(results , status ) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                    if (marker) {
                      marker.setMap(map);
                      marker.setPosition(e.latLng);        
                      document.getElementById("locationLat").value = Math.round(results[0].geometry.location.lat()*100000)/100000;;
                      document.getElementById("locationLon").value = Math.round(results[0].geometry.location.lng()*100000)/100000;;
                    } else {
                      marker = new google.maps.Marker({
                         position: e.latLng,
                         map: map});                
                    }                 
                  } else {                   
                       alert( 'No results found');
                       return;
                  }
                } else {              
                      alert('Geocoder failed due to: ' + status );
                      return;
                }
              });
        });
}
$(document).ready(function() {
	var placeSubCategory = [];
	
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
	
	$('#locationDescription').liveEdit({
    	fileBrowser: '/texteditor/assetmanager/asset.php?type=location&userId=' + $("#userId").val(),
        height: 500,
        css: ['/texteditor/bootstrap/css/bootstrap.min.css', '/texteditor/bootstrap/bootstrap_extend.css'],            
        groups: [
                ["group1", "", ["Bold", "Italic", "Underline", "ForeColor", "RemoveFormat"]],
                ["group2", "", ["Bullets", "Numbering", "Indent", "Outdent"]],
                ["group3", "", ["Paragraph", "FontSize", "FontDialog", "TextDialog"]],
                ["group4", "", ["ImageDialog", "LinkDialog", "SourceDialog" ]] //,
                // ["group4", "", ["LinkDialog", "ImageDialog", "TableDialog", "Snippets"]] //,
                // ["group5", "", ["Undo", "Redo", "FullScreen", "SourceDialog"]]
                ]
    });
	var temp = $("input#getLocationDescription").val();
    $('#locationDescription').data('liveEdit').startedit();
    $('#locationDescription').data('liveEdit').putHTML(temp);
    
	$( "#locationCategorySearch" ).autocomplete({
	      source: function( request, response ) {
	        $.ajax({
	          url: "/admin/async-categoryLocation.php",
	          dataType: "json",
	          data: {
	        	  type : 1,
	              maxRows: 12,
	              keyword: request.term
	          },
	          type : "POST",
	          success: function( data ) {	        	
	            response( $.map(data.location, function( item ) {
	              return {	            	 
	            	subcategory:item.ua_place_subcategory,	            	
	            	value : item.ua_name  
	              }	            
	            }));
	          }
	        });
	      },
	      minLength: 2,
	      select: function( event, ui ) {
	    	  
	    	  (addedSubCategoryId = ui.item.subcategory);
	    	  (strCateLocation = ui.item.value);

	    		var it = 0;
	    		var out = false;
	    		
	    		$("div#addedCategory").each(function(){
	    			addedName[it] = $("div#addedCategory").find("input#addedName").eq(it).val();
	    			if(strCateLocation == addedName[it]){ out = true;}
	    			it++;
	    		});
	    		
	    		if( out == true ) {alert("This subcategory is already exist.");ui.item.value = "";return;}	    			    		
	    		if (strCateLocation == ""){alert("Please input Category!"); return;}
	    		else{	    			
		    		$("div#location-category").append("<div id='addedCategory' class='addedCategory'> <div id ='addedCategorytitle'> <input type='hidden' id='addedName' value='"+strCateLocation+"'><input type='hidden' id='addedSubCategoryId' value='"+addedSubCategoryId+"'>"+strCateLocation+"</div><div class='icon-remove-circle' id='removeAddedCategory' onclick='onDeleteaddCate(this)'></div></div>");
		    		ui.item.value = "";
	    		}	        	     
	      },
	      open: function() {
	        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	      },
	      close: function() {
	        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	      }
	});	
	$("#previewLocationImage").find(".img-wrap").each(function(){
		$(this).find(".close-button").click(function(){
			$(this).parent().remove();
		});
	});

});


function onLocationSave(){	
	var locationImage = [];
	var imageIndex = 0;

	var locationId = $(" #locationId ").val();
	var locationInfo  = "a";
	var locationTitle = $("#locationTitle").val();
	var locationLat = $("#locationLat").val();
	var locationLon = $("#locationLon").val();	
	var locationStreetAddress = $("#locationStreetAddress").val();
	var locationCity = $("#locationCity").val();
	var locationZip = $("#locationZip").val();
	var locationCountry = $("#locationCountry").val();
	var locationState = $("#locationState").val();
	var locationPhone = $("#locationPhone").val();
	var locationEmail = $("#locationEmail").val();
	$("#previewLocationImage").find(".img-wrap").each(function(){
		locationImage[imageIndex] = $(this).find("img").attr("src");
		imageIndex ++;
	});
	
	//var locationImage = $("#previewLocationImage").find("img").attr("src");
	var locationWebsite = $("#locationWebsite").val();
	var locationSubtitle = $("#locationSubtitle").val();
	var locationDescription = $('#locationDescription').data('liveEdit').getXHTMLBody().trim();
	var locationKeyWords = $("#locationKeyWords").val();
	var locationScore = "0";
	var ittr = 0;
	var locationCategory = $("#locationSubCategory").val();
	var locationPaid = $("#locationPaid").val();
	
	//value empty check
	if( locationTitle == "" ){ alert("Please input Location Title ."); return;}
	if( locationLat == "" ){ alert("Please select the place correctly."); return;}
	if( locationLon == "" ){ alert("Please select the place correctly."); return;}
	if( locationImage == ""){alert("Please input location image.");return;}
	if( locationCategory == "" ){ alert( "Please select location category."); return; }
	//validation check
	if( IsNumeric(locationLat ) == false || IsNumeric(locationLon) == false){ alert("Please select the place correctly.");return;}
	if( locationLat >90 || locationLat <- 90){alert("Please select the place correctly."); return;}
	if( locationLon >180 || locationLon <- 180){alert("Please select the place correctly."); return;}
	if( locationEmail != "" && !validateEmail( locationEmail ) ){ alert("Please input Email Address correctly."); return; }
	if( locationWebsite != "" && !isUrl(locationWebsite) ){ alert("Please input Website url correctly."); return;}
	  $.ajax({   	
        url: "/admin/async-saveLocation.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { locationId : locationId , locationInfo  : locationInfo  , locationTitle : locationTitle , locationLat : locationLat , locationLon : locationLon, locationStreetAddress : locationStreetAddress , locationCity : locationCity , locationZip : locationZip , locationCountry : locationCountry , locationState : locationState , locationPhone : locationPhone , locationEmail : locationEmail , locationImage : locationImage , locationWebsite : locationWebsite , locationSubtitle : locationSubtitle , locationDescription : locationDescription , locationKeyWords : locationKeyWords , locationScore : locationScore , locationCategory : locationCategory, locationPaid: locationPaid },
        success : function(data){
            if(data.result == "success"){
            	if( locationId == ""){
                    alert("Location saved successfully.");   
                    $("#locationInfo").val("");
                    $("#locationTitle").val("");
                    $("#locationLat").val("");
                    $("#locationLon").val("");
                    $("#previewLocationImage").find("img").attr("src", "");
                    $("#locationStreetAddress").val("");
                    $("#locationCity").val("");
                    $("#locationZip").val("");
                    $("#locationCountry").val("");
                    $("#locationState").val("");
                    $("#locationPhone").val("");
                    $("#locationEmail").val("");
                    $("#locationWebsite").val("");
                    $("#locationSubtitle").val("");
                    $('#locationDescription').data('liveEdit').putHTML("");
                    $("#locationKeyWords").val("");
                    $("#locationCategory").val("");
                    $("#locationSubCategory").val("");
                    marker.setMap(null);
            	}else{
            		alert("Location updated successfully.");
            	}
            }
        }
    });		
}

google.maps.event.addDomListener(window, 'load', initialize);


function onFindOnMap( ){
	var address = $("#locationStreetAddress").val();
	  $.ajax({   	
	        url: "/admin/async-getLocationInfoFromAddress.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { address : address },
	        success : function(data){
	        	if( data.result == "success" ){
		        	var lat = data.location[0].geometry.location.lat;
		        	var lng = data.location[0].geometry.location.lng;
		        	$("#locationLat").val( lat );
		        	$("#locationLon").val( lng );
		        	marker.setMap( null );
	                
		        	marker = new google.maps.Marker({
		    	      position: new google.maps.LatLng( lat, lng ),
		    	      map: map
		        	});
		        	map.setCenter(new google.maps.LatLng( lat, lng ) );	        		
	        	}else{
	        		alert("There is no location with this address.");
	        		return;
	        	}
	        	
	        }
	  });
}
function onChangeLocationCategory( obj ){
	var locationCategory = $(obj).val( );
	  $.ajax({   	
	        url: "/admin/async-getSubLocationCategory.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { locationCategory : locationCategory },
	        success : function(data){
	        	if( data.result == "success" ){
	        		var strHTML = '<option value="">Please select category.</option>';
	        		for( var i = 0; i < data.subCategoryList.length; i ++ ){
	        			strHTML += '<option value='+data.subCategoryList[i].ua_place_subcategory+'>'+data.subCategoryList[i].ua_name+'</option>';
	        		}
	        		$("#locationSubCategory").html( strHTML );
	        	}	        	
	        }
	  });	
}
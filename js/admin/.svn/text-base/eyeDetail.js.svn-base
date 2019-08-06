var marker;
$(document).ready(function() {
	$("input#imageUpload").change( function(){
		var imageUploadObj = $(this);
		$(this).parents("form").ajaxForm({
			success: function(data) {
				var targetId ='#' + imageUploadObj.parents("form").find("#imagePrevDiv").val();
				var htmlObj = "<div class='img-wrap'>" + data + "<div class='close-button'></div></div>";
				$(targetId).append(htmlObj);

				$("#previewEyeImage").find(".img-wrap").each(function(){
					$(this).find(".close-button").click(function(){
						$(this).parent().remove();
					});
				});
			}
		}).submit();
	});
	
	$('#eyeContent').liveEdit({
	    	fileBrowser: '/texteditor/assetmanager/asset.php?type=eye&userId=' + $("#userId").val(),
	        height: 500,
	        css: ['/texteditor/bootstrap/css/bootstrap.min.css', '/texteditor/bootstrap/bootstrap_extend.css'],            
	        groups: [
	                ["group1", "", ["Bold", "Italic", "Underline", "ForeColor", "RemoveFormat"]],
	                ["group2", "", ["Bullets", "Numbering", "Indent", "Outdent"]],
	                ["group3", "", ["Paragraph", "FontSize", "FontDialog", "TextDialog"]],
	                ["group4", "", ["ImageDialog", "LinkDialog", "Undo", "Redo", "SourceDialog" ]] //,
	                // ["group4", "", ["LinkDialog", "ImageDialog", "TableDialog", "Snippets"]] //,
	                // ["group5", "", ["Undo", "Redo", "FullScreen", "SourceDialog"]]
	                ]
	    });
		var temp = $('input#getEyeContent').val();
	    $('#eyeContent').data('liveEdit').startedit();
	    $('#eyeContent').data('liveEdit').putHTML(temp);
	    
	    $("#previewEyeImage").find(".img-wrap").each(function(){
			$(this).find(".close-button").click(function(){
				$(this).parent().remove();
			});
		});
});
function initialize() {
	//lat lon primitive setting
	var tempLat = document.getElementById("eyeLat").value;
	var tempLon = document.getElementById("eyeLon").value;
	if (tempLat == "" & tempLon == "")
		{tempLat = "50.4501";tempLon = "30.5234";}	
	var myLatlng = new google.maps.LatLng(Math.round(tempLat*100000)/100000, Math.round(tempLon*100000)/100000);
	var mapOptions = {
			zoom: 8,
			center: myLatlng,
			panControl: false,
		    zoomControl: true,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.SMALL
		      },
		    rotateControl:false,
		    scaleControl: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('eyePartMap-Canvas'), mapOptions);
	 
	marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map      
	});
	var geocoder = new google.maps.Geocoder();
	  //autocomplete position(search box)
	
	  google.maps.event.addListener(map, 'click', function(e) {
          geocoder.geocode(
              {'latLng': e.latLng},
              function(results , status ) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                    if (marker) {
                      marker.setMap(map);              
                      marker.setPosition(e.latLng);
                    
                      document.getElementById("eyeLat").value = Math.round(results[0].geometry.location.lat()*100000)/100000;;
                      document.getElementById("eyeLon").value = Math.round(results[0].geometry.location.lng()*100000)/100000;;
          			
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
function onEyeSave(){
	//get value
	var eyeImage = [];
	var imageIndex = 0;
	
	var eyeLocationId = $("#eyeLocationId").val();	
	var eyeCategoryId = $("#choiceEyeCategory option:selected").val();		
	var eyeTitle = $("#eyeTitle").val();
	var eyeLat = $("#eyeLat").val();
	var eyeLon = $("#eyeLon").val();	
	var eyeKeyWords = $("#eyeKeyWords").val();
	var eyeAddress = $("#eyeStreetAddress").val();
	//var eyeImage = $("#previewEyeImage").find("img").attr("src");
	$("#previewEyeImage").find(".img-wrap").each(function(){
		eyeImage[imageIndex] = $(this).find("img").attr("src");
		imageIndex ++;
	});
	var eyeContent = $('#eyeContent').data('liveEdit').getXHTMLBody().trim();
	var eyeVideo = $("#eyeVideo").val();
	//empty checking
	if( eyeTitle == "" ){ alert("Please input Eye Title."); return;}	
	if( eyeCategoryId == ""){alert("Please Choose Eye Category"); return;}
	if( eyeLat == "" ){ alert("Please select Eye location."); return;}
	if( eyeLon == "" ){ alert("Please select Eye location."); return;}
	if( eyeImage == ""){alert("Please input Eye image.");return;}
	if( eyeVideo == ""){alert("Please input Eye Video.");return;}
	
	if( IsNumeric(eyeLat ) == false || IsNumeric(eyeLon) == false){ alert("Please select Eye location.");return;}
	if( eyeLat >90 || eyeLat <- 90){alert("Please select Eye location."); return;}
	if( eyeLon >180 || eyeLon <- 180){alert("Please select Eye location."); return;}
    $.ajax({
        url: "/admin/async-saveEye.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { eyeLocationId : eyeLocationId , eyeCategoryId : eyeCategoryId , eyeTitle : eyeTitle , eyeLat : eyeLat,
        		eyeLon : eyeLon , eyeKeyWords : eyeKeyWords , eyeAddress : eyeAddress, eyeContent : eyeContent, eyeImage : eyeImage, eyeVideo : eyeVideo },
        success : function(data){
            if(data.result == "success"){
            	if( eyeLocationId == ""){ 
            		
            		 $("#eyeTitle").val("");
            		 $('#choiceEyeCategory option:eq(0)').attr('selected', true);
            		 $("#previewEyeImage").find("img").attr("src", "");
            		 $('#eyeContent').data('liveEdit').putHTML("");
            		 $("#eyeLat").val("");
            		 $("#eyeLon").val("");
            		 $("#eyeKeyWords").val("");
            		 $("#eyeStreetAddress").val("");
            		 marker.setMap(null);
            		
            		 alert("Eye saved successfully.");
            	}else{
            		alert("Eye updated successfully.");
            	}
            }
        }
    });		
}

google.maps.event.addDomListener(window, 'load', initialize);

function onFindOnMap( ){
	var address = $("#eyeStreetAddress").val();
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
		        	$("#eyeLat").val( lat );
		        	$("#eyeLon").val( lng );
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
var marker;
$(document).ready(function() {
	$("input#imageUpload").change( function(){
		var imageUploadObj = $(this);
		$(this).parents("form").ajaxForm({
			success: function(data) {
				var targetId ='#' + imageUploadObj.parents("form").find("#imagePrevDiv").val();
				var htmlObj = "<div class='img-wrap'>" + data + "<div class='close-button'></div></div>";
				$(targetId).append(htmlObj);

				$("#previewNewsImage").find(".img-wrap").each(function(){
					$(this).find(".close-button").click(function(){
						$(this).parent().remove();
					});
				});
			}
		}).submit();
	});
	
	$('#newsContent').liveEdit({
	    	fileBrowser: '/texteditor/assetmanager/asset.php?type=news&userId=' + $("#userId").val(),
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
		var temp = $('input#getNewsContent').val();
	    $('#newsContent').data('liveEdit').startedit();
	    $('#newsContent').data('liveEdit').putHTML(temp);
	    
	    $("#previewNewsImage").find(".img-wrap").each(function(){
			$(this).find(".close-button").click(function(){
				$(this).parent().remove();
			});
		});
	 
});
function initialize() {
	//lat lon primitive setting
	var tempLat = document.getElementById("newsLat").value;
	var tempLon = document.getElementById("newsLon").value;
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
	map = new google.maps.Map(document.getElementById('newsPartMap-Canvas'), mapOptions);
	 
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
                    
                      document.getElementById("newsLat").value = Math.round(results[0].geometry.location.lat()*100000)/100000;;
                      document.getElementById("newsLon").value = Math.round(results[0].geometry.location.lng()*100000)/100000;;
          			
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
function onNewsSave(){
	//get value
	var newsImage = [];
	var imageIndex = 0;
	
	var newsLocationId = $("#newsLocationId").val();	
	var newsCategoryId = $("#choiceNewsCategory option:selected").val();		
	var newsTitle = $("#newsTitle").val();
	var newsRegion = $("#newsRegion").val();
	var newsWho = $("#newsWho").val();
	var newsWhat = $("#newsWhat").val();
	var newsWhere = $("#newsWhere").val();
	var newsWhen = $("#newsWhen").val();
	var newsBds = $("#newsBds").val();
	var newsActionTaken = $("#newsActionTaken").val();
	//var newsImage = $("#previewNewsImage").find("img").attr("src");
	$("#previewNewsImage").find(".img-wrap").each(function(){
		newsImage[imageIndex] = $(this).find("img").attr("src");
		imageIndex ++;
	});
	var newsContent = $('#newsContent').data('liveEdit').getXHTMLBody().trim();
	var newsLat = $("#newsLat").val();
	var newsLon = $("#newsLon").val();	
	var newsKeyWords = $("#newsKeyWords").val();
	var newsAddress = $("#newsStreetAddress").val();
	//empty checking
	if( newsTitle == "" ){ alert("Please input News Title."); return;}	
	if( newsCategoryId == ""){alert("Please Choose News Category"); return;}
	if( newsLat == "" ){ alert("Please news location."); return;}
	if( newsLon == "" ){ alert("Please news location."); return;}
	if( newsRegion == ""){ alert("Please input News Region."); return;}
	if( newsWho == ""){ alert("Please input News Who."); return;}
	if( newsWhat == ""){ alert("Please input News What."); return;}
	if( newsWhere == ""){ alert("Please input News Where."); return;}
	if( newsWhen == ""){ alert("Please input News When."); return;}
	if( newsBds == ""){ alert("Please input News Bda."); return;}
	if( newsActionTaken == ""){ alert("Please input News Action Taken."); return;}
	if( newsImage == ""){alert("Please input News image.");return;}
	
	if( IsNumeric(newsLat ) == false || IsNumeric(newsLon) == false){ alert("Please news location.");return;}
	if( newsLat >90 || newsLat <- 90){alert("Please news location."); return;}
	if( newsLon >180 || newsLon <- 180){alert("Please news location."); return;}
    $.ajax({
        url: "/admin/async-saveNews.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { newsLocationId : newsLocationId , newsCategoryId : newsCategoryId , newsTitle : newsTitle , newsRegion : newsRegion,
        		 newsWho : newsWho , newsWhat : newsWhat , newsWhere : newsWhere , newsWhen : newsWhen , newsBds : newsBds ,
        		 newsActionTaken : newsActionTaken , newsImage : newsImage , newsContent : newsContent ,
        		 newsLat : newsLat , newsLon : newsLon , newsKeyWords : newsKeyWords, newsAddress : newsAddress },
        success : function(data){
            if(data.result == "success"){
            	if( newsLocationId == ""){ 
            		
            		 $("#newsTitle").val("");
            		 $('#choiceNewsCategory option:eq(0)').attr('selected', true);
            		 $("#newsRegion").val("");
            		 $("#newsWho").val("");
            		 $("#newsWhat").val("");
            		 $("#newsWhere").val("");
            		 $("#newsWhen").val("");
            		 $("#newsBds").val("");
            		 $("#newsActionTaken").val("");
            		 $("#previewNewsImage").find("img").attr("src", "");
            		 $('#newsContent').data('liveEdit').putHTML("");
            		 $("#newsLat").val("");
            		 $("#newsLon").val("");
            		 $("#newsKeyWords").val("");
            		 marker.setMap(null);
            		
            		 alert("News saved successfully.");
            	}else{
            		alert("News updated successfully.");
            	}
            }
        }
    });		
}

google.maps.event.addDomListener(window, 'load', initialize);

function onFindOnMap( ){
	var address = $("#newsStreetAddress").val();
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
		        	$("#newsLat").val( lat );
		        	$("#newsLon").val( lng );
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
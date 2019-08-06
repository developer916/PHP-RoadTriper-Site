$(document).ready(function() {
	$('#example1').dataTable( {
		"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sLengthMenu": "_MENU_ records per page"
		}
	} );		
});
function onGuidesave(){
	var guideId=$("#guideId").val();
	var guideName = $("#guideName").val();
	if( guideName == "" ){ alert("Please input Guide Name."); return;}
	
 
    $.ajax({
        url: "./async-saveGuid.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { guideId: guideId, guideName : guideName},
        success : function(data){
            if(data.result == "success"){
            	if( guideId == ""){
                    alert("Guide saved successfully."); 
                    $("#guideName").val("");
            	}else{
            		alert("Guide updated successfully.");
            	}

            }
        }
    });		
	
}

function ontriplocationSave(){
	var guidetripId = $("#tripId").val();
	var guidetripLocationId = $("#tripLocationId").val();
	var previousind=$("#previousind").val();
	var locationId=$("#locationId").val();
	var location = $("#location").val();
	var locationind = $("#locationind").val();
    var maxinput=$("#maxinput").val();
    
    if( parseInt(maxinput) < parseInt(locationind))
    	{ 
    		alert("Please input location index correctly.");
    		return; 
    	}
    if(locationId=="")
    	{
    	alert("Please input location index correctly.");
		return; 
    	}

	if( location == "" ) { alert("Please input Trip Location."); return;}
	if( locationind == "" ){ alert("Please Trip Location Index."); return;}
	if(guidetripLocationId == "")
	{
		
		document.getElementById("location").value = "";
		document.getElementById("locationind").value = "";
	}

    $.ajax({
        url: "./async-saveTripLocation.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { guidetripId : guidetripId , guidetripLocationId : guidetripLocationId , location : location, locationind: locationind,locationId: locationId,previousind:previousind },
        success : function(data){
            if(data.result == "success"){
            	if( guidetripLocationId == ""){
            		alert("Trip Location saved successfully.");
            		$("#maxinput").val( Number($("#maxinput").val()) + 1 );
            		$("#locationind").val( $("#maxinput").val() );
            		$("#locationid").val("");
            		
            	}else{
            		alert("Trip Location updated successfully.");
            	}

            }
        }
    });		
	
}
function onguidetripSave(){
	var guideId = $("#guideId").val();
	var guidetripId = $("#guidetripId").val();
	var tripname = $("#tripname").val();
	
if(guidetripId == "")
		{
			document.getElementById("tripname").value = "";
			
		}
	if( tripname == "" ){ alert("Please input Trip Name."); return;}
	
	
    $.ajax({
        url: "./async-saveTrip.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { guideId : guideId , guidetripId : guidetripId , tripname : tripname},
        success : function(data){
            if(data.result == "success"){
            	if( guidetripId == ""){
                    alert("Trip saved successfully.");            		
            	}else{
            		alert("Trip updated successfully.");
            	}

            }
        }
    });		
	
	
}
function onguideBucketSave(){
	var guideId = $("#guideId").val();
	var guidebucketId = $("#guideBucketId").val();
	var bucketname = $("#bucketname").val();

	
if(guidebucketId == "")
		{
			document.getElementById("bucketname").value = "";
			
		}
	if( bucketname == "" ){ alert("Please input Bucket Name."); return;}
	
    $.ajax({
        url: "./async-saveBucket.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { guideId : guideId , guidebucketId : guidebucketId , bucketname : bucketname},
        success : function(data){
            if(data.result == "success"){
            	if( guidebucketId == ""){
                    alert("Bucket saved successfully.");            		
            	}else{
            		alert("Bucket updated successfully.");
            	}

            }
        }
    });		
	
	
}
function onBucketLocationSave(){
	var guidebucketId = $("#bucketId").val();
	var guidebucketLocationId = $("#bucketLocationId").val();

	var location = $("#location").val();
	var locationId=$("#locationId").val();

	
	if(guidebucketLocationId == "")
		{
			
			document.getElementById("location").value = "";
			
		}
	
	if( location == "" ) { alert("Please input Bucket Location."); return;}
	

    $.ajax({
        url: "./async-saveBucketLocation.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { guidebucketId : guidebucketId , guidebucketLocationId : guidebucketLocationId , location : location,	locationId:	locationId}	,
        success : function(data){
            if(data.result == "success"){
            	if( guidebucketLocationId == ""){
                    alert("Bucket Location saved successfully.");            		
            	}else{
            		alert("Bucket Location updated successfully.");
            	}

            }
        }
    });		
	
}


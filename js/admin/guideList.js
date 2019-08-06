function onDeleteGuide(){
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select category to delete."); return;}
	var strGuideIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strGuideIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strGuideIds += ",";
	}

    $.ajax({
        url: "./async-deleteGuide.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : {strGuideIds : strGuideIds },
        success : function(data){
            if(data.result == "success"){
            	alert("Guide deleted successfully.");
            	window.location.reload();
            	for( var i = 0 ; i < objList.size(); i ++ ){
            	objList.parents("tr").eq(i).remove();}
            }
        }
    });		
}
function onDeleteTrip(){
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select Trip to delete."); return;}
	var strGuideIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strGuideIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strGuideIds += ",";
	}

    $.ajax({
        url: "./async-deleteTrip.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : {strGuideIds : strGuideIds },
        success : function(data){
            if(data.result == "success"){
            	alert("Trip deleted successfully.");
            	window.location.reload();
            	for( var i = 0 ; i < objList.size(); i ++ ){
            	objList.parents("tr").eq(i).remove();}
            }
        }
    });		
}
function onDeleteTripLocation(){
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select Trip to delete."); return;}
	var strGuideIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strGuideIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strGuideIds += ",";
	}
    var guidetripId = $("#guidetripId").val();
    
 
    $.ajax({
        url: "./async-deleteTripLocation.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : {strGuideIds : strGuideIds, guidetripId:guidetripId },
        success : function(data){
            if(data.result == "success"){
            	alert("Trip  Location deleted successfully.");            	
            	window.location.reload();
            	
            	for( var i = 0 ; i < objList.size(); i ++ ){
            		objList.parents("tr").eq(i).remove();
            	}
            }
        }
    });		
}
function onDeleteBucket(){

	var objList = $("table#example1").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select Bucket to delete."); return;}
	var strGuideIds = "";
	
	for( var i = 0 ; i < objList.size(); i ++ ){
		strGuideIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strGuideIds += ",";
	}


    $.ajax({
        url: "./async-deleteBucket.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : {strGuideIds : strGuideIds },
        success : function(data){
            if(data.result == "success"){
            	
            	window.location.reload();
            	for( var i = 0 ; i < objList.size(); i ++ ){
            	objList.parents("tr").eq(i).remove();}
            	alert("Bucket deleted successfully.");
            }
        }
    });		
}
function onDeleteBucketLocation(){
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select Bucket to delete."); return;}
	var strGuideIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strGuideIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strGuideIds += ",";
	}

    $.ajax({
        url: "./async-deleteBucketLocation.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : {strGuideIds : strGuideIds },
        success : function(data){
            if(data.result == "success"){
            	alert("Bucket Location deleted successfully.");
            	window.location.reload();
            	for( var i = 0 ; i < objList.size(); i ++ ){
            	objList.parents("tr").eq(i).remove();}
            }
        }
    });		
}

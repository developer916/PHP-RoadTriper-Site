function onRegionSave(){
	var regionId = $("#regionId").val();
	var regionTitle = $("#regionTitle").val();	
	var regionDescription = $("#regionDescription").val();
	var regionCode = $("#regionCode").val();
	var regionOrder = $("#regionOrder").val();
	
	if( regionTitle == "" ){ alert("Please input Region Title."); return;}
	
    $.ajax({
        url: "/admin/async-saveRegion.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { regionId : regionId , regionTitle : regionTitle , regionDescription : regionDescription , regionCode : regionCode, regionOrder : regionOrder },
        success : function(data){
            if(data.result == "success"){
            	if( regionId == ""){
            	    alert("Region saved successfully.");
            		$("#regionTitle").val("");
            		$("#regionDescription").val("");
            		$("#regionCode").val("");
            		$("#regionOrder").val("");
            	}else{
            		alert("Region updated successfully.");
            	}

            }
        }
    });		
}



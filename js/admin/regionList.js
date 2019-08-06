function onDeleteRegion(){
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select News to delete."); return;}
	
	var strRegionIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strRegionIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strRegionIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteRegion.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strRegionIds : strRegionIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            	objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("Region deleted successfully.");
	            }
	        }
	    });
}

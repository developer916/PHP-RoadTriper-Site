
function onDeleteLocation(){
	
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select Location  to delete."); return;}
	var strLocationIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strLocationIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strLocationIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteLocation.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strLocationIds : strLocationIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            	objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("Location deleted successfully.");
	            }
	        }
	    });
}
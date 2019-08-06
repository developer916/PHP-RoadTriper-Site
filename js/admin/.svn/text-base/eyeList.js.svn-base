function onDeleteEye(){
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select Eye to delete."); return;}
	
	var strEyeIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strEyeIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strEyeIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteEye.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strEyeIds : strEyeIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            	objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("Eye deleted successfully.");
	            }
	        }
	    });
}

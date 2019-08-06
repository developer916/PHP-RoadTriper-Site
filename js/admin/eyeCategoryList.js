function onDeleteEyeCategory(){
	
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select Eye Category to delete."); return;}
	
	var strEyeCategoryIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strEyeCategoryIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strEyeCategoryIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteEyeCategory.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strEyeCategoryIds : strEyeCategoryIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            		objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("Eye Category deleted successfully.");
	            }
	        }
	    });
}

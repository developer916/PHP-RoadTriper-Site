
function onDeleteNewsCategory(){
	
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select News Category to delete."); return;}
	
	var strNewsCategoryIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strNewsCategoryIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strNewsCategoryIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteNewsCategory.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strNewsCategoryIds : strNewsCategoryIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            		objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("News Category deleted successfully.");
	            }
	        }
	    });
}

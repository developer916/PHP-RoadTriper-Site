function onDeleteNews(){
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select News to delete."); return;}
	
	var strNewsIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strNewsIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strNewsIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteNews.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strNewsIds : strNewsIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            	objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("News deleted successfully.");
	            }
	        }
	    });
}

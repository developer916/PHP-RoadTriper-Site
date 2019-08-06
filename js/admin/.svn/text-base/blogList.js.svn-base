function onDeleteBlog(){
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select Blog to delete."); return;}
	
	var strBlogIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strBlogIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strBlogIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteBlog.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strBlogIds : strBlogIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            	objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("Blog Category deleted successfully.");
	            }
	        }
	    });
}


function onDeleteBlogCategory(){
	
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select Blog Category to delete."); return;}
	
	var strBlogCategoryIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strBlogCategoryIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strBlogCategoryIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteBlogCategory.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strBlogCategoryIds : strBlogCategoryIds },
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

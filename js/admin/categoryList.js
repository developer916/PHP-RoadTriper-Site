function onDeleteCategory(){
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select category to delete."); return;}
	var strCategoryIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strCategoryIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strCategoryIds += ",";
	}

    $.ajax({
        url: "/admin/async-deleteCategory.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { strCategoryIds : strCategoryIds },
        success : function(data){
            if(data.result == "success"){
            	for( var i = 0 ; i < objList.size(); i ++ ){
            	objList.parents("tr").eq(0).remove();
            	}
            	window.location.reload();
            	alert("Category deleted successfully.");
            }
        }
    });		
}
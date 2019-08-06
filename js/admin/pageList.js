function onDeletePage(){
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select page to delete."); return;}
	var strPageIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strPageIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strPageIds += ",";
	}

    $.ajax({
        url: "/admin/async-deletePage.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { strPageIds : strPageIds },
        success : function(data){
            if(data.result == "success"){
            	alert("Page deleted successfully.");
            	for( var i = 0 ; i < objList.size(); i ++ ){
            		objList.parents("tr").eq(0).remove();
            	}
            }
        }
    });			
}
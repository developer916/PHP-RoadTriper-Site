function onDeleteUser(){
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select user to delete."); return;}
	var strUserIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strUserIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strUserIds += ",";
	}

    $.ajax({
        url: "/admin/async-deleteUser.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { strUserIds : strUserIds },
        success : function(data){
            if(data.result == "success"){
            	alert("User deleted successfully.");
            	for( var i = 0 ; i < objList.size(); i ++ ){
            	objList.parents("tr").eq(0).remove();
            	}
            }
        }
    });		
}
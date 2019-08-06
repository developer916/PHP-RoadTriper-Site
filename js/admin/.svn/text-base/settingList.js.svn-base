function onDeleteSetting(){
	var objList = $("table#tblExample").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select setting to delete."); return;}
	var strSettingIds = "";
	for( var i = 0 ; i < objList.size(); i ++ ){
		strSettingIds += objList.eq(i).val();
		if( i != objList.size() - 1)
			strSettingIds += ",";
	}

    $.ajax({
        url: "/admin/async-deleteSetting.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { strSettingIds : strSettingIds },
        success : function(data){
            if(data.result == "success"){
            	alert("Setting deleted successfully.");
            	window.location.reload();
            }
        }
    });		
}
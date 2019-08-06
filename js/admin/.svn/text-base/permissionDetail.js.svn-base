function onPermissionSave(){
	var objList = $("table#menuList").find("input:checkbox:checked");
	var menuId = [];
	var userId = $("#userId").val();
	for( var i = 0; i < objList.length; i ++ ){
		menuId[i] = objList.eq(i).val();
	}
    $.ajax({
        url: "/admin/async-savePermission.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { userId : userId, menuId : menuId },
        success : function(data){
            if(data.result == "success"){	
            	alert("Permission successfully saved.");
            	window.location.reload();
            	return;
            }
        }
    });
}
function onCheckAll( obj ){
	if( obj.checked ){
		$("table#menuList").find("input#menuId").prop("checked", true);
	}else{
		$("table#menuList").find("input#menuId").prop("checked", false);
	}
}
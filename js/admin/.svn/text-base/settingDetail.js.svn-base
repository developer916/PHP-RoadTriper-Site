function onSettingSave(){
	var settingId = $("#settingId").val();
	var code = $("#code").val();
	var value = $("#value").val();
	var description = $("#description").val();
	
	if( code == "" ){ alert("Please input the code."); return; }
	if( value == "" ){ alert("Please input the value."); return; }
	
    $.ajax({
        url: "/admin/async-saveSetting.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { settingId : settingId, code : code, value : value, description : description },
        success : function(data){
            if(data.result == "success"){
            	alert("Setting saved successfully.");
            	$("#settingId").val( data.settingId );
            }
        }
    });		
	
}

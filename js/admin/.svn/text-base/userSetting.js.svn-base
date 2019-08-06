function onUaSettingSave()
{
	var settingLabel = [];
	var settingCodeValue = [];
	var settingDescription = [];
	var settingCode = [];
	var i = 0;
	$(".control-group").each(function(){
		settingLabel[i] = $(this).find("#settingLabel").text();
		settingCodeValue[i] = $(this).find("input#settingCodeValue").val();
		settingDescription[i] = $(this).find("input#settingDescription").val();
		settingCode[i] = $(this).find("input#settingCode").val();
		 i ++;
	});
	$.ajax({
        url: "/admin/async-saveSetting.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { settingLabel : settingLabel , settingCodeValue : settingCodeValue , settingDescription :settingDescription , settingCode :settingCode},
        success : function(data){
            if(data.result == "success"){
            	alert("Setting updated  successfully.");
            }
        }
    });
}

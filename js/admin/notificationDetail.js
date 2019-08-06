function onNotificationSave(){
	
	var notificationContent = $("#notificationContent").val();
	var notificationDescription = $("#notificationDescription").val();
	
	if( notificationContent == "" ){ alert("Please input Notification Content."); return;}

    $.ajax({
        url: "/admin/async-saveNotification.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { notificationContent : notificationContent , notificationDescription : notificationDescription },
        success : function(data){
            if(data.result == "success"){
                    alert("Notification saved successfully.");       
                    $("input#notificationContent").val('');
                    $("#notificationDescription").val('');
            }
        }
    });		
}
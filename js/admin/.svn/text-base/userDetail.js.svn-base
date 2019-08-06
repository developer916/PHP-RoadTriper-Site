$(document).ready(function() {
	$("input#imageUpload").change( function(){
		$(this).parents("form").ajaxForm({
			target: '#' + $(this).parents("form").find("#imagePrevDiv").val()
		}).submit();
	});
});
function onUserSave(){
	var userId = $("#userId").val();
	var userName = $("#userName").val();
	var email = $("#email").val();
	var userType = $("#userType").val();
	var photo = $("#previewProfileImage").find("img").attr("src");
	var admin = $("#adminYn").val();
	var currentPassword = $("#currentPassword").val();
	var newPassword = $("#newPassword").val();
	
	if( userName == "" ) {alert("Please input Username."); return; }
	if( email == "" ) { alert("Please input Email Address"); return; }
	if( !validateEmail( email ) ){ alert("Please input Email Address correctly."); return; }
	if( userType == "") { alert("Please select User type"); return; }
	if( photo == "") { alert("Please select Photo"); return; }
	if( admin == "") { alert("Please select Admin Y/N"); return; }
	
	if( $("#chkPassword").eq(0).prop("checked") ){
		if( $("#currentPassword").val() == "" ){ alert("Please input current Password."); return;}
		if( $("#newPassword").val() == "" ){ alert("Please input new Password."); return;}
		if( $("#confirmPassword").val() == "" ){ alert("Please input confirm Password."); return;}
		if( $("#newPassword").val() != $("#confirmPassword").val() ){ alert("Please input confirm Password correctly."); return;}
	}else{
		if( userId == "" ){
			if( $("#newPassword").val() == "" ){ alert("Please input new Password."); return;}
		}else{
			
		}
	}
	
    $.ajax({
        url: "/admin/async-saveUser.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { userId : userId, userName : userName, email : email, userType : userType, photo : photo, admin : admin, currentPassword : currentPassword, newPassword : newPassword },
        success : function(data){
            if(data.result == "success"){
                alert("User saved successfully.");
            	if( userId == ""){
                    $("#userName").val("");
                    $("#email").val("");
                    $("#userType").val("");
                    $("#previewProfileImage").find("img").attr("src", "");
                    $("#adminYn").val("");
            	}
            }else{
            	alert("Current Password is incorrect.");
            }
        }
    });		
}
function onClickPasswordChange( obj ){
	if( obj.checked )
		$("div#divPassword").show();
	else{
		$("div#divPassword").hide();
		$("#currentPassword").val("");
		$("#newPassword").val("");
		$("#confirmPassword").val("");
	}

}
function onSignIn(){
    var userid = $("#userid").val();
    var password = $("#password").val();
	if( userid == ""){ alert("Please input Username."); return;}
	if( password == ""){ alert("Please input Password."); return;}	
    $.ajax({
        url: "/admin/async-logIn.php",
        dataType : "json",
        type : "POST",
        data : {userid : userid, password : password },
        success : function(data){
            if(data.result == "success"){
                window.location.href = "index.php";
                return;
            }else{
                alert("Username or Password is incorrect!");
                return;
            }
        }
    });
}
function onUseridKeydown(evt){
	if( evt.keyCode == 13 ){
		 $('#password').focus();
	}
}
function onPasswordKeydown(evt){
	if( evt.keyCode == 13 ){
		onSignIn();
	}
}

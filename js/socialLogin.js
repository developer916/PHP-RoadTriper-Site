
function onFacebookLogin( ){
    FB.login(function(response) {
   	   if (response.authResponse) {
   		   var accessToken = FB.getAuthResponse()['accessToken'];
   	     FB.api('/me', function(response) {
 	  	   	$.ajax({
 	  			type: "POST",
 	  			url: "/async-facebookSignIn.php",
 	  			data : { response : response, accessToken : accessToken },
 	  			success: function(data) {
 	  				if (data.result == 'success'){
 	  					fnAfterSignIn( data );
 	  				}
 	  			}
 	  		});	  	       
   	     });
   	   } else {
   	   }
   	 }, {scope: 'publish_actions, email, publish_stream'});
}
var googleLoad = 0;
function googleLoginCallback(authResult) {
	googleLoad++;
	if( googleLoad > 1){
	  if (authResult['access_token']) {
		var token1 = authResult['access_token'];
		var token2 = authResult['id_token'];
		gapi.auth.setToken( authResult );
	    gapi.client.load('oauth2', 'v2', function() {
	    	var request = gapi.client.oauth2.userinfo.get();
	    	request.execute(function(resp){
				if(resp['email']){
			    	var email = resp['email'];
					gapi.client.load('plus','v1', function(){
						var request = gapi.client.plus.people.get({
						   'userId': 'me'
						});
						request.execute(function(response) {
					  	   	$.ajax({
					  			type: "POST",
					  			url: "/async-googleSignIn.php",
					  			data : { response : response, token1 : token1, token2 : token2, email : email },
					  			success: function(data) {
					  				if (data.result == 'success'){
					  					fnAfterSignIn( data );
					  				}
					  			}
					  		});						   
						});
					});			    	
				}
		    });
	    });	
		
	  } else if (authResult['error']) {
	    // console.log('There was an error: ' + authResult['error']);
	  }
	}
}
function onVkLogin( response ){
	var uid;
	var token;
	var token2;
	if (response.session) {
		uid = response.session.mid;
		token = response.session.sid;
		token2 = response.session.sig;
		VK.Api.call('users.get', {uid: uid, access_token : token, fields : 'photo_100,nickname'}, function(r) {
			if(r.response) {
		  	   	$.ajax({
		  			type: "POST",
		  			url: "/async-vkSignIn.php",
		  			data : { response : r.response[0], uid : uid, token : token, token2 : token2 },
		  			success: function(data) {
		  				if (data.result == 'success'){
		  					fnAfterSignIn( data );
		  				}
		  			}
		  		});    
			}
		});
		
	} else {
		alert('not auth');
	}
}
function onCommentSave( ){
	var commentText = $("#commentTxt").val( );
	if( commentText == "" ){ alert("Please input comment."); return; }	
	var commentId = $("#commentId").val();
	var commentType = $("#commentType").val();
	$.ajax({
        url: "/admin/async-saveCommentItem.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { commentId : commentId, commentType : commentType, commentText : commentText },
        success : function(data){
            if(data.result == "success"){
            	alert("Comment updated successfully.");
            }
        }
    });		
}
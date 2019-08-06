function onDeleteComment( ){
	var objList = $("table#example").find("input:checkbox:checked");

	if( objList.size() == 0 ){alert("Please select Comments to delete."); return;}
	
	var strCommentLocationIds = "";
	var strCommentBlogIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		var arr = objList.eq(i).val().split("|");
		if( arr[1] == '1' ){
			strCommentLocationIds += arr[0] + ",";
		}else if( arr[1] == '2')
			strCommentBlogIds += arr[0] + ",";
	}
	strCommentLocationIds = strCommentLocationIds.substring( 0, strCommentLocationIds.length - 1 );
	strCommentBlogIds = strCommentBlogIds.substring( 0, strCommentBlogIds.length - 1 );
	$.ajax({
        url: "/admin/async-deleteComment.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { strCommentLocationIds : strCommentLocationIds, strCommentBlogIds : strCommentBlogIds },
        success : function(data){
            if(data.result == "success"){
            	alert("Comment deleted successfully.");
            	window.location.reload();
            }
        }
    });	
}
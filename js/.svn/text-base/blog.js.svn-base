
function onClickBlogCateogryItem( obj ){ 
	var blogCategoryId;
	$("#blogCategoryList").find("a#blogCategoryItem").removeClass("blogCategorySelected");
	
	$(obj).addClass("blogCategorySelected");
	if( $(obj).attr("id") == "blogCategoryAll" ){
		blogCategoryId = "";
	}else{
		$("#blogCategoryAll").removeClass("blogCategorySelected");
		blogCategoryId = $(obj).attr("data");		
	}
	
	var state = { "type": "blogThumb", id : blogCategoryId };
	
	var url;
	if( blogCategoryId == "" )
		url = "/blogs/category/all";
	else
		url = "/blogs/category/" + base64_encode( blogCategoryId );
	ga('send', 'pageview', {'page': url, 'title': siteName});
	History.pushState(state, siteName , url );

}
function onClickBlogCategoryAll( obj ){
	onClickBlogCateogryItem( obj );
}
function onClickBlogDetail( obj ){
	var blogId = $(obj).parents("#blogThumbItem").find("#blogThumbId").val();
	
	var uaTitle = $(obj).parents("#blogThumbItem").find("#blogThumbTitle").text();
	var url = translateEn(uaTitle).split(" ").join("-");
	var state = { id: blogId, type : "blogs", time : getTime() };
	url = "/blogs/" + url + "/" + base64_encode( blogId );
	
	ga('send', 'pageview', {'page': url, 'title': uaTitle + " | " + titleSuffix});
	History.pushState(state, uaTitle + " | " + titleSuffix, url );

}

function onClickBlogSearch( ){
	var startDate = $("#blogStartDate").val();
	var endDate = $("#blogEndDate").val();
	if( startDate > endDate && startDate != "" && endDate != "" ){
		alert( _lang("Start Date should be before than End Date."));
		return;
	}
	$("#blogCategoryPanel").find(".blogCategorySelected").click();
}
function onClickBlogReset( ){
	$("#blogStartDate").val("");
	$("#blogEndDate").val("");	
}

function onBlogCommentLike( obj ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this.") );onSignInPopup();
		return;
	}	
	var commentId = $(obj).parents("#blogInfoCommentItem").eq(0).find("#blogInfoCommentId").val();
	var commentType = 2;
	var likeCount = Number( $(obj).find("#commentLike").text() );
	var unlikeCount = Number( $(obj).next().find("#commentUnlike").text() );
	var ratingType = 0;
	if( $(obj).hasClass("liked") ){
		$(obj).removeClass("liked");
		$(obj).find("#commentLike").text( likeCount - 1 );
	}else if( $(obj).next().hasClass("liked") ){
		$(obj).addClass("liked");
		$(obj).next().removeClass("liked");
		$(obj).find("#commentLike").text( likeCount + 1 );
		$(obj).next().find("#commentUnlike").text( unlikeCount - 1 );
		ratingType = 1;
	}else{
		$(obj).addClass("liked");
		$(obj).find("#commentLike").text( likeCount + 1 );
		ratingType = 1;
	}
	fnCommentRating( commentId, commentType, ratingType );
}
function onBlogCommentUnlike( obj ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this.") );onSignInPopup();
		return;
	}	
	var commentId = $(obj).parents("#blogInfoCommentItem").eq(0).find("#blogInfoCommentId").val();
	var commentType = 2;
	var likeCount = Number( $(obj).prev().find("#commentLike").text() );
	var unlikeCount = Number( $(obj).find("#commentUnlike").text() );
	var ratingType = 0;
	if( $(obj).hasClass("liked") ){
		$(obj).removeClass("liked");
		$(obj).find("#commentUnlike").text( unlikeCount - 1 );
	}else if( $(obj).prev().hasClass("liked") ){
		$(obj).addClass("liked");
		$(obj).prev().removeClass("liked");
		$(obj).prev().find("#commentLike").text( likeCount - 1 );
		$(obj).find("#commentUnlike").text( unlikeCount + 1 );
		ratingType = -1;
	}else{
		$(obj).addClass("liked");
		$(obj).find("#commentUnlike").text( unlikeCount + 1 );
		ratingType = -1;
	}
	fnCommentRating( commentId, commentType, ratingType );
}

//Submit when Blog Info Popup Submit button clicked
function onClickBlogInfoComment( obj ){
	if( $("#isLogin").val() == "N" ){
		alert( _lang("You have to sign in for this.") );onSignInPopup();
		return;
	}	
	
	var comment = $(obj).parents("#blogInfoComment").eq(0).find("#blogInfoCommentText").val();
	var blogId = $(obj).parents("#blogInfoContainer").eq(0).find("#blogInfoId").val();
	if( comment == "" ){ alert("Please input comment."); return; }	
    $.ajax({
        url: "/async-saveBlogComment.php",
        dataType : "json",
        type : "POST",
        data : { blogId : blogId, comment : comment },
        success : function(data){
            if(data.result == "success"){
            	$(obj).parents("#blogInfoComment").eq(0).find("#blogInfoCommentText").val("");
            	fnAddCommentOnPopup( data.comment.ua_blog_comment, data.comment.ua_photo, data.comment.ua_username, data.comment.ua_comment, data.comment.ua_created_time, 2, 0, 0, 0 );
            }
        }
    });	
}
function onBlogCategorySave(){
	
	var blogCategoryId = $("#blogCategoryId").val();
	var blogCategoryTitle = $("#blogCategoryTitle").val();	
	var metaDescription = $("#metaDescription").val();
	
	if( blogCategoryTitle == "" ){ alert("Please input Blog Category Title."); return;}
	
    $.ajax({
        url: "/admin/async-saveBlogCategory.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { blogCategoryId : blogCategoryId , blogCategoryTitle : blogCategoryTitle, metaDescription : metaDescription },
        success : function(data){
            if(data.result == "success"){
            	if( blogCategoryId == ""){
            		$("#blogCategoryTitle").val("");
                    alert("Blog Category saved successfully.");            		
            	}else{
            		alert("Blog Category updated successfully.");
            	}

            }
        }
    });		
}



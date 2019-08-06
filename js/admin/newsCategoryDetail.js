$(document).ready(function() {
	$("input#imageUpload").change( function(){
		$(this).parents("form").ajaxForm({
			target: '#' + $(this).parents("form").find("#imagePrevDiv").val()
		}).submit();
	});
});

function onNewsCategorySave(){	
	var newsCategoryId = $("#newsCategoryId").val();
	var newsCategoryTitle = $("#newsCategoryTitle").val();	
	var newsCategoryDescription = $("#newsCategoryDescription").val();
	var newsCategoryImage = $("#previewNewsCategoryImage").find("img").attr("src");
	var newsMarkerImage = $("#previewNewsCategoryMarker").find("img").attr("src");
	var metaDescription = $("#metaDescription").val();
	
	if( newsCategoryTitle == "" ){ alert("Please input News Category Title."); return;}
	if( newsCategoryImage == "" ){ alert("Please select News Category Image."); return;}
	if( newsMarkerImage == "" ){ alert("Please select News Marker Image."); return;}
	
    $.ajax({
        url: "/admin/async-saveNewsCategory.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { newsCategoryId : newsCategoryId , newsCategoryTitle : newsCategoryTitle , newsCategoryImage : newsCategoryImage, 
        		newsMarkerImage : newsMarkerImage , newsCategoryDescription : newsCategoryDescription, metaDescription : metaDescription },
        success : function(data){
            if(data.result == "success"){
            	if( newsCategoryId == ""){
            		$("#newsCategoryTitle").val("");
            		$("#previewNewsCategoryImage").find("img").attr("src", "");
            		$("#previewNewsCategoryMarker").find("img").attr("src", "");					$("#metaDescription").val("");					
                    alert("News Category saved successfully.");            		
            	}else{
            		alert("News Category updated successfully.");
            	}

            }
        }
    });		
}



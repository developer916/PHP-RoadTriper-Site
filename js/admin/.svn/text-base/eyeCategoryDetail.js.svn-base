$(document).ready(function() {
	$("input#imageUpload").change( function(){
		$(this).parents("form").ajaxForm({
			target: '#' + $(this).parents("form").find("#imagePrevDiv").val()
		}).submit();
	});
});

function onEyeCategorySave(){	
	var eyeCategoryId = $("#eyeCategoryId").val();
	var eyeCategoryTitle = $("#eyeCategoryTitle").val();	
	var eyeCategoryDescription = $("#eyeCategoryDescription").val();
	var eyeCategoryImage = $("#previewEyeCategoryImage").find("img").attr("src");
	var eyeMarkerImage = $("#previewEyeCategoryMarker").find("img").attr("src");
	var metaDescription = $("#metaDescription").val();
	
	if( eyeCategoryTitle == "" ){ alert("Please input Eye Category Title."); return;}
	if( eyeCategoryImage == "" ){ alert("Please select Eye Category Image."); return;}
	if( eyeMarkerImage == "" ){ alert("Please select Eye Marker Image."); return;}
	
    $.ajax({
        url: "/admin/async-saveEyeCategory.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { eyeCategoryId : eyeCategoryId , eyeCategoryTitle : eyeCategoryTitle , eyeCategoryImage : eyeCategoryImage, 
        		eyeMarkerImage : eyeMarkerImage , eyeCategoryDescription : eyeCategoryDescription , metaDescription : metaDescription },
        success : function(data){
            if(data.result == "success"){
            	if( eyeCategoryId == ""){
            		$("#eyeCategoryTitle").val("");
            		$("#previewEyeCategoryImage").find("img").attr("src", "");
            		$("#previewEyeCategoryMarker").find("img").attr("src", "");
            		$("#eyeCategoryDescription").val("");										$("#metaDescription").val("");
                    alert("Eye Category saved successfully.");            		
            	}else{
            		alert("Eye Category updated successfully.");
            	}

            }
        }
    });		
}



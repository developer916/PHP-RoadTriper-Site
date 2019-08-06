$(document).ready(function() {
	$("input#imageUpload").change( function(){
		$(this).parents("form").ajaxForm({
			target: '#' + $(this).parents("form").find("#imagePrevDiv").val()
		}).submit();
	});
});
function onCategorySave(){
	var categoryId = $("#categoryId").val();
	var categoryName = $("#categoryName").val();
	var categoryCode = "-1";
	var categoryImage = $("#previewCategoryImage").find("img").attr("src");
	var markerImage = $("#previewCategoryMarker").find("img").attr("src");
	var metaDescription = $("#metaDescription").val();
	
	if( categoryName == "" ){ alert("Please input Category Name."); return;}
	if( categoryImage == "" ){ alert("Please select Category Image."); return;}
	if( markerImage == "" ){ alert("Please select Marker Image."); return;}
	//if( metaDescription == "" ){ alert("Please input Meat."); return;}
	
    $.ajax({
        url: "/admin/async-saveCategory.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { categoryId : categoryId , categoryName : categoryName, categoryCode : categoryCode, 
        		categoryImage : categoryImage, markerImage : markerImage, metaDescription : metaDescription },
        success : function(data){
            if(data.result == "success"){
            	if( categoryId == ""){
                    alert("Category saved successfully.");
            		$("#categoryName").val("");
            		$("#previewCategoryImage").find("img").attr("src","");
            		$("#previewCategoryMarker").find("img").attr("src","");
            		$("#metaDescription").val("");
            	}else{
            		alert("Category updated successfully.");
            		}

            }
        }
    });		
}

// by panda 2013.10.18 11:58

function onDeleteSubCategory(){
	
	var objList = $("table#example").find("input:checkbox:checked");
	if( objList.size() == 0 ){alert("Please select subcategory to delete."); return;}
	
	var strSubCategoryIds = "";
	for(var i = 0 ; i < objList.size() ; i ++ )
	{
		strSubCategoryIds += objList.eq(i).val();
		if(i != objList.size() - 1)
			strSubCategoryIds += ",";
	}
		$.ajax({
	        url: "/admin/async-deleteSubCategory.php",
	        cache : false,
	        dataType : "json",
	        type : "POST",
	        data : { strSubCategoryIds : strSubCategoryIds },
	        success : function(data){
	            if(data.result == "success"){
	            	for(var i = 0 ; i < objList.size() ; i ++ ){
	            	objList.parents("tr").eq(i).remove();
	            	}
	            	window.location.reload();
	            	alert("SubCategory deleted successfully.");
	            }
	        }
	    });
}
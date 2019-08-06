$(document).ready(function() {
	$("input#imageUpload").change( function(){
		$(this).parents("form").ajaxForm({
			target: '#' + $(this).parents("form").find("#imagePrevDiv").val()
		}).submit();
	});
});
function onsubCategorySave(){
	var categoryId = $("#categoryId").val();
	var subcategoryId = $("#subcategoryId").val();
	var subcategoryName = $("#subcategoryName").val();
	var subcategoryImage = $("#previewSubCategoryImage").find("img").attr("src");
	var subcategoryCode ="-1";
	var metaDescription = $("#metaDescription").val();
	
	if( subcategoryName == "" ){ alert("Please input Subcategory Name."); return;}
	
    $.ajax({
        url: "/admin/async-saveSubcategory.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { categoryId : categoryId , subcategoryId : subcategoryId , subcategoryName : subcategoryName, 
        	subcategoryImage : subcategoryImage , subcategoryCode : subcategoryCode, metaDescription : metaDescription },
        success : function(data){
            if(data.result == "success"){
            	if( subcategoryId == ""){
                    alert("Subcategory saved successfully.");       
                    $("input#subcategoryName").val('');
                    $("#previewSubCategoryImage").find("img").attr("src","");
					$("#metaDescription").val("");
            	}else{
            		alert("Subcategory updated successfully.");
            	}
            }
        }
    });		
	
	
}
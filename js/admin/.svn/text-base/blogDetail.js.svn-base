$(document).ready(function() {
	$("input#imageUpload").change( function(){
		$(this).parents("form").ajaxForm({
			target: '#' + $(this).parents("form").find("#imagePrevDiv").val()
		}).submit();
	});
	$('#blogContent').liveEdit({
	    	fileBrowser: '/texteditor/assetmanager/asset.php?type=blog&userId=' + $("#userId").val(),
	        height: 500,
	        css: ['/texteditor/bootstrap/css/bootstrap.min.css', '/texteditor/bootstrap/bootstrap_extend.css'],            
	        groups: [
	                ["group1", "", ["Bold", "Italic", "Underline", "ForeColor", "RemoveFormat"]],
	                ["group2", "", ["Bullets", "Numbering", "Indent", "Outdent"]],
	                ["group3", "", ["Paragraph", "FontSize", "FontDialog", "TextDialog"]],
	                ["group4", "", ["ImageDialog", "LinkDialog", "Undo", "Redo", "SourceDialog" ]] //,
	                // ["group4", "", ["LinkDialog", "ImageDialog", "TableDialog", "Snippets"]] //,
	                // ["group5", "", ["Undo", "Redo", "FullScreen", "SourceDialog"]]
	                ]
	    });
		var temp = $('input#getBlogContent').val();
	    $('#blogContent').data('liveEdit').startedit();
	    $('#blogContent').data('liveEdit').putHTML(temp);
	   
	 
});

function onBlogSave(){
	var blogId = $("#blogId").val();
	var blogCategoryId = $("#choiceBlogCategory option:selected").val();	
	var blogTitle = $("#blogTitle").val();
	var blogImage = $("#previewBlogImage").find("img").attr("src");
	var blogContent = $('#blogContent').data('liveEdit').getXHTMLBody().trim();
	var blogKeyWords = $("#blogKeyWords").val();
	
	if( blogTitle == "" ){ alert("Please input Blog Title."); return;}
	if( blogCategoryId == ""){ alert("Please Choose Blog Category."); return;}
	if( blogImage == ""){ alert("Please input Blog Image."); return; }
	if( blogContent == "" ){ alert("Please input Blog Content."); return;}
	
    $.ajax({
        url: "/admin/async-saveBlog.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { blogId : blogId , blogCategoryId : blogCategoryId , blogTitle : blogTitle , blogImage : blogImage , blogContent : blogContent , blogKeyWords : blogKeyWords},
        success : function(data){
            if(data.result == "success"){
            	if( blogId == ""){              
            		 alert("Blog saved successfully.");
            		 $("#blogTitle").val("");
            		 $('#choiceBlogCategory option:eq(0)').attr('selected', true);	
            		 $('#blogContent').data('liveEdit').putHTML("");
            		 $("#previewBlogImage").find("img").attr("src", "");
            		 $("#blogKeyWords").val("");
            	}else{
            		alert("Blog  updated successfully.");
            	}
            }
        }
    });		
}




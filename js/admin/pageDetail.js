$(document).ready(function() {
	$('#pageContent').liveEdit({
    	fileBrowser: '/texteditor/assetmanager/asset.php?type=page&userId=' + $("#userId").val(),
        height: 500,
        width: 615,
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
	var temp = $('#txtContent').val();
    $('#pageContent').data('liveEdit').startedit();
    $('#pageContent').data('liveEdit').putHTML(temp);
});
function onPageSave(){
	var pageContent = $('#pageContent').data('liveEdit').getXHTMLBody().trim();
	var pageTitle = $('#pageTitle').val();
	var pageId = $('#pageId').val();
	if( pageTitle == "" ){alert("Please input page title."); return;}
	if( pageContent == "" ){alert("Please input page content."); return;}
	
    $.ajax({
        url: "/admin/async-savePage.php",
        cache : false,
        dataType : "json",
        type : "POST",
        data : { pageId : pageId , pageTitle : pageTitle , pageContent : pageContent },
        success : function(data){
            if(data.result == "success"){
            	if( pageId == ""){
            		 $("#pageTitle").val("");
            		 $('#pageContent').data('liveEdit').putHTML("");
            		 alert("Page saved successfully.");
            	}else{
            		alert("Page  updated successfully.");
            	}
            }
        }
    });		
}
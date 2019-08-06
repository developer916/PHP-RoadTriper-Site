<!DOCTYPE html>
<html>
  <head>
  	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>	
	<script>
		$(function(){
		    $("a.ajax_link").click(function(e){
		        ajaxLink(this, e);
		    });
		});
		function ajaxLink(item, e) {
		    var container = $("#ajax_container_wrapper");
		    var link;

		    if (e != null) {
		        e.preventDefault();
		    }
		    link = $(item).attr("href");
		    container.load(link);
		    history.pushState(null,"","/test3.php");
		}		
	</script>
	<meta name="Description" content="Description of Parent">	
  </head>
<body>
	<a class="ajax_link" href="test.php">Ajax Link</a>
	<div id="ajax_container_wrapper">
	
	</div>
</body>
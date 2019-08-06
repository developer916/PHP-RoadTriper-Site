$(document).ready(function(){

$( "#location" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "/async-searchLocation.php",
          dataType: "json",
          data: {
              maxRows: 12,
              keyword: request.term
          },
          type : "POST",
          success: function( data ) {
            response( $.map( data.location, function( item ) {
              return {
                location: item.ua_location,
                value: item.ua_location_title
              }
            }));
          }
        });
      },
      minLength: 2,
      select: function( event, ui ) {
    	   $("#locationId").val( ui.item.location );
    	  // alert(' $("#locatio alert(ui.item.location);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
});
});
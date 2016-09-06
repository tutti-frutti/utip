$(document).ready(function(){
    $(".nav__lang").click(function(event){
        event.preventDefault();
        $(".nav__sub").css("display", "block");
    });
});

$(function(){
		$('#menu').slicknav({
            duration: 500,
        });
	});

$(function(){
		$('#menu-2').slicknav({
            duration: 500,
        });
	});

$('.timeline').timelify();

$( function() {
    $( "#accordion" ).accordion();
  } );
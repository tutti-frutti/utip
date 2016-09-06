$(document).ready(function(){
    $(".nav__lang").click(function(event){
        event.preventDefault();
        $(".nav__sub").css("display", "block");
    });
});

$(function(){
		$('#menu').slicknav();
	});
$('.timeline').timelify();
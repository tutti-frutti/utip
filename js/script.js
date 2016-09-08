$(document).ready(function(){
    $(".nav__lang a").click(function(event){
        event.preventDefault();
        //$(".nav__sub").css("display", "block");
        $(".nav__sub").slideToggle(200);
        $(this).toggleClass('active');
    });
    
    $(".open-menu").click(function(event){
        event.preventDefault();
        $(".toogle-menu").show("500");
        $(".close-menu").click(function(event){
            event.preventDefault;
            $(".toogle-menu").hide("500");
        });
    });
    
    $('.nav__sub-link').on('click',function(e){
        var lang = $(this).attr('data-lang');
        console.log(lang)
        $('.lang_show').text(lang);
        $('.lang_show').removeClass('active');
        $(".nav__sub").slideUp();
        e.preventDefault();
    });
    
});

$(function(){
		$('#menu').slicknav({
            duration: 500,
        });
	});

$('.timeline').timelify();

$( function() {
    $( "#accordion" ).accordion();
  });
$(document).ready(function(){
    $(".nav__lang a").click(function(event){
        event.preventDefault();
        //$(".nav__sub").css("display", "block");
        $(".nav__sub").slideToggle(200);
        $(this).toggleClass('active');
    });
    
    $(".footer__lang a").click(function(event){
        event.preventDefault();
        $(".footer__sub").slideToggle(200);
        $(this).toggleClass('active');
    });
    
    $(".footer__sub-link").on('click', function(e){
        var bottomlang = $(this).attr('data-speech');
        $(".drop_lang").text(bottomlang);
        $(".drop_lang").removeClass('active');
        $(".footer__sub").slideUp();
        e.preventDefault();
    });
    
    $(".open-menu").click(function(event){
        event.preventDefault();
        $("html").css("overflow", "hidden");
        $(".toogle-menu").show("500");
        $(".close-menu").click(function(event){
            event.preventDefault;
            $(".toogle-menu").hide("500");
            $("html").css("overflow", "auto");
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
    $('.open-menu').click(function(){
        console.log(true)
    })
});

$(function(){
		$('#menu').slicknav({
            duration: 500,
        });
	});

$('.timeline').timelify();

$('select').selectric();


$( function() {
    $( "#accordion" ).accordion({
        heightStyle: "content",
    });
  });


//});
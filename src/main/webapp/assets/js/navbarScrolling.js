$(document).ready(function() {
    
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 45) {
            $('#navbar').addClass('fixar-ads-list-navbar');
            $('#ads-list').addClass('float-right');
        } else {
            $('#navbar').removeClass('fixar-ads-list-navbar');
            $('#ads-list').removeClass('float-right');
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 15) {
            $('#sidenote').addClass('fixar-ads-post-navbar');
            $('#ads-post').addClass('float-left');
        } else {
            $('#sidenote').removeClass('fixar-ads-post-navbar');
            $('#ads-post').removeClass('float-left');
        }
    });

});


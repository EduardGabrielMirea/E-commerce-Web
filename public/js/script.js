$(document).ready(function() {
    $('#nav-toggle').click(function() {
        var nav = $('#main-nav');
        if (nav.hasClass('expanded')) {
            nav.removeClass('expanded');
            nav.animate({ maxHeight: 0 }, 300);
        } else {
            nav.addClass('expanded');
            nav.animate({ maxHeight: 500 }, 300); // Asegúrate de que este valor coincida con el del CSS
        }
    });
});

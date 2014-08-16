$(document).ready(function() {
  "use strict"

  function navScrollTo(id) {
    // remove link from id
    id = id.replace('link', '');
    $('html,body').animate(
      {
        scrollTop: $('#'+id).offset().top
      },
      'slow'
    );
  }

  $('.nav > li > a').click(function() {
    navScrollTo($(this).attr('class'));
  });
});

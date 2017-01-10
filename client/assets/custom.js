
$(".modal-fullscreen").on('show.bs.modal', function () {
  setTimeout( function() {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
  }, 0);
});
$(".modal-fullscreen").on('hidden.bs.modal', function () {
  $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
});

$(window).scroll(function(){
      if ($(this).scrollTop() > 135) {
          $("#my_toolbar").addClass('fixed');
          $("#my_toolbar .dialogs").addClass('fixed');
      } else {
          $("#my_toolbar").removeClass('fixed');
          $("#my_toolbar .dialogs").removeClass('fixed');
      }
  });

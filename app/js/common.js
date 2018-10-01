 var parallax = function() {
     $(window).on('scroll', function() {
         var st = $(this).scrollTop();
         $('.js-parallax').each(function() {
             var speed = $(this).data('speed') || 10,
                 shift = st / speed;
             $(this).css({
                 "transform": "translate(0%, " + shift + "%"
             })
         });
     });
 }

 $(function() {

     parallax()

 });
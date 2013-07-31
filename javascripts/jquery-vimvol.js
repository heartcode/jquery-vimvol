;(function($, window, document, undefined) {

  $.fn.vimvol = function(options) {
      var settings = $.extend({
          current:  0.5,
          steps:    6,
          el:       'body'
      }, options);

      return this.each( function() {
        var $this = $(this),
            $spinner,
            $body = $('body'),
            steps = settings.steps,
            el = settings.el;

        function init() {
          $slider = $("<div class='vslider'><div class='vslider_bar'></div><ul class='vslider_sticks'></div>").appendTo(el);

          for (var i = 0; i < steps; i++) {
            var $stick = $('<li><div class="vslider_stick"a></div></li>').appendTo($slider.find('.vslider_sticks'));
            $stick.on('mouseenter', function(){
              $(this).addClass('active');
            }).on('mouseleave', function(){
              $(this).removeClass('active');
            });
          }

          renderUI(settings.current);
          $slider.on('mousedown', startDrag);
        };

        function startDrag(event) {
          $body.on('mousemove', onDrag);
          $body.on('mouseup', stopDrag);

          renderUI(getPercent(event));
        };

        function onDrag(event) {
          renderUI(getPercent(event));
        };

        function stopDrag(event) {
          $body.off('mouseup', stopDrag);
          $body.off('mousemove', onDrag);
        };

        function renderUI(percent) {
          var index = Math.round(percent * steps);
          index = index < steps ? index : steps;
          
          $('.vslider_sticks > li').find('div').css('opacity', 0);

          for(var i = 0; i < index; i++) {
            $('.vslider_sticks > li:eq(' + i + ')').find('div').css('opacity', 1);
          }
        };
    
        function getPercent(event) {
          var percent = (event.pageX - $slider.offset().left) / $('.vslider_sticks').width();
          percent = percent >= 0 ? percent : 0;
          percent = percent <= 1 ? percent : 1;
          return percent;
        };

        init();
      });
  }

}(jQuery, window, document));
;(function($, window, document, undefined) {

  $.fn.vimvol = function(options) {
      var settings = $.extend({
          class:        'vimvol',
          current:      0.5,
          steps:        12,
          height:       '26px',
          stickWidth:   '5px',
          stickPadding: '3px',
          stickColor:   '#0099ff'
      }, options);

      return this.each( function() {
        var $this = $(this).css({
              'visible': 'hidden',
              'display': 'none',
              'width': 0,
              'height': 0
            }),
            $body = $('body'),
            steps = $this.attr('max') || settings.steps,
            value = $this.attr('value') || settings.current,
            $el = $('<span>').appendTo($this.parent()).addClass(settings.class);

        $this = $this.detach().appendTo($el);

        $el.height(settings.height);

        function init() {
          $slider = $("<span class='vimvol'><ul class='vimvol_sticks'></ul></span>").appendTo($el);

          for (var i = 0; i < steps; i++) {
            var $stick = $('<li><span class="vimvol_stick"></span></li>').appendTo($slider.find('.vimvol_sticks'));

            $stick.width(settings.stickWidth);
            $stick.find('.vimvol_stick').css('background-color', settings.stickColor);

            if(i < steps - 1) {
              $stick.css('margin-right', settings.stickPadding);
            }

            $stick.on('mouseenter', function(){
              $(this).addClass('active');
            }).on('mouseleave', function(){
              $(this).removeClass('active');
            });
          }

          renderUI(value / steps);
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
          
          $el.find('.vimvol_stick').css('opacity', 0);

          for(var i = 0; i < index; i++) {
            $el.find('.vimvol_stick:eq(' + i + ')').css('opacity', 1);
          }
          $this.val(percent * steps).change();
        };
    
        function getPercent(event) {
          var percent = (event.pageX - $slider.offset().left) / $('.vimvol_sticks').width();
          percent = percent >= 0 ? percent : 0;
          percent = percent <= 1 ? percent : 1;
          return percent;
        };

        init();
      });
  }

}(jQuery, window, document));
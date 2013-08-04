;(function($, window, document, undefined) {

  $.fn.vimvol = function(options) {
      var settings = $.extend({
          class:        'vimvol',
          value:        0.5,
          steps:        12,
          height:       '26px',
          stickWidth:   '5px',
          stickPadding: '3px',
          activeColor:   'rgba(26, 183, 234, 1)',
          inactiveColor: 'rgba(255, 255, 255, 0.3)'
      }, options);

      return this.each( function() {
        var $this = $(this),
            $body = $('body'),
            steps = $this.attr('max') || settings.steps,
            value = $this.attr('value') || settings.value,
            $el = $('<span>').appendTo($this.parent()).addClass(settings.class);

        $this = $this.detach().appendTo($el);
        // Resets the min/max/value attributes, so that the output
        // will make sense when used as a volume control
        $this.attr('max', 1);
        $this.attr('step', $this.attr('max')/steps);

        $el.height(settings.height);

        function init() {
          $slider = $("<span class='vimvol'><ul class='vimvol_sticks'></ul></span>").appendTo($el);

          for (var i = 0; i < steps; i++) {
            var $stick = $('<li><span class="vimvol_stick"></span></li>').appendTo($slider.find('.vimvol_sticks'));

            $stick.width(settings.stickWidth);
            $stick.css('background-color', settings.inactiveColor);
            $stick.find('.vimvol_stick').css('background-color', settings.activeColor);

            if(i < steps - 1) {
              $stick.css('margin-right', settings.stickPadding);
            }

            $stick.on('mouseenter', function(){
              $(this).addClass('active');
            }).on('mouseleave', function(){
              $(this).removeClass('active');
            });
          }

          hideInput();
          renderUI(value / steps);
          $slider.on('mousedown', startDrag);
        };

        function hideInput() {
          $this.css({
            position:     'absolute',
            visibility:   'hidden',
            width:        0,
            height:       0
          });
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
    
        function getPercent(event) {
          var percent = (event.pageX - $slider.offset().left) / $('.vimvol_sticks').width();
          percent = percent >= 0 ? percent : 0;
          percent = percent <= 1 ? percent : 1;
          return percent;
        };

        function renderUI(percent) {
          var index = Math.round(percent * steps);
          index = index < steps ? index : steps;
          
          $el.find('.vimvol_stick').css('opacity', 0);

          for(var i = 0; i < index; i++) {
            $el.find('.vimvol_stick:eq(' + i + ')').css('opacity', 1);
          }

          $this.val(percent).change();
        };

        init();
      });
  }

}(jQuery, window, document));
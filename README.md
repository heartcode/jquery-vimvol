##Vimvol

Vimvol is a cheeky jQuery plugin, which makes is super easy to create a Vimeo-like volume slider controllers for JavaScript based video players.

<br>
**Be warned, this is very early stages and the plugin will most likely change, so watch this space :)**

<br>

##An early code example:
	<input id="vslider" type="range" min="0" max="10" value="4" step="1" />
	<script src="javascripts/jquery-1.10.2.js"></script>
	<script src="javascripts/jquery-vimvol.js"></script>
	
	<script type="text/javascript">
	  $(document).ready(function(){
	  	var slider = $('#vslider').vimvol({
	      height: '30px',
    	  stickWidth: '6px',
	      stickPadding: '3px',
	      activeColor: '#d41700',
	      inactiveColor: 'rgba(0, 0, 0, 0.1)'
	    });
	    
	   	$('#vslider').on('change', function(e){
	      console.log('New volume value: ' + e.currentTarget.value);
    	});
      });
    </script>
    
    
Have a look at the plugin code and the `index.html` to get a better idea.

##Licenced under the MIT licence
<br>
Copyright (C) 2013 Robert Pataki (robert@robertpataki.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
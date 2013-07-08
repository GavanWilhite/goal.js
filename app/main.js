goaljs = {};

$(function() {
	var $graph = $('.goal-graph');
	goaljs.$graph = $graph;
	var width = $graph.width();
	var height = $graph.height()
	var rows = 10;
	var columns = 10; // -1 for even rows;
	var gapX = width / (columns + 1);
	var gapY = height / (rows + 1);
	var offsetX = gapX;
	var offsetY = gapY;
	for(var i = 0, imax = rows; i < imax; i++){
		for(var j = 0, jmax = columns - 1 + i % 2; j < jmax; j++){
			var peg = new Peg(offsetX * (1.5 - 0.5 * (i % 2)) + gapX * j, offsetY + gapY * i);
		}
	}
	//$.fn.editable.defaults.mode = 'inline';
});

(function(window) {
  function Peg(x, y) {
		var $peg = $('\
	        <div class="peg">\
	        </div>');
		var $icon = $('\
	            <div class="peg-icon">\
	            </div>\
	            ');
		var $container = $('\
						<div class="centered-content-container">\
	          </div>');
		$peg.append($container);
		$container.append($icon);

		TweenLite.set($peg, {x: x, y: y});
		goaljs.$graph.append($peg);
		var self = this;
		$peg.on('mouseover', function(event){
			TweenMax.to($icon, 0.2, {className:'node-icon'});
		});
		$peg.on('mouseout', function(event){
			TweenMax.to($icon, 0.2, {className:'peg-icon'});
		});
		$peg.on('click', function(event){
			var node = new Node(self.x, self.y);
		});

		this.$element = $peg;
		this.x = x;
		this.y = y;
  }
  var p = Peg.prototype;

  window.Peg = Peg;
}(window));

(function(window) {
  function Node(x, y) {
		var $node = $('\
	        <div class="node">\
	        </div>');
		var $content = $('\
	            <div class="node-icon">\
	            <p class="node-text">New Goal </p\
	            </div>\
	            ');
		var $container = $('\
						<div class="centered-content-container">\
	          </div>');
		$node.append($container);
		$container.append($content);

		TweenMax.to($content, 0.2, {className:'node-text-box'});

		$content.editable({
		    type: 'text',
		    title: 'Enter Goal',
		    success: function(response, newValue) {
		        //userModel.set('username', newValue); //update backbone model
		    }
		});

		goaljs.$graph.append($node);
		TweenLite.set($node, {x: x, y: y});
  }
  var p = Node.prototype;

  window.Node = Node;
}(window));

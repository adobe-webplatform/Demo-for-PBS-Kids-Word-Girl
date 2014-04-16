/*global define $ requestAnimationFrame Snap*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        BubbleCircle = require('app/views/objects/bubble-circle'),
        DomView;

    require('snap');

    DomView = Backbone.View.extend({

        initialize: function () {
		    this.el = document.getElementById('dom-view');
            this.cells = this.options.cells;

            this.layout();
			
			AppEvent.on('domhide', this.hide.bind(this));
			AppEvent.on('domupdate', this.update.bind(this));
        },

        addBubbles: function (el) {
            var s,
                i,
                bubbles = el.querySelectorAll('.bubble--round');
            
            s = new Snap(el.offsetWidth, el.offsetHeight);
            s.node.className = "bubble-canvas";
            
            for (i = 0; i < bubbles.length; i += 1) {
                new BubbleCircle(s, bubbles[i]);
            }

            el.appendChild(s.node);
        },
        
        layout: function () {
            var i,
                s,
                cell,
                element;

            for (i = 0; i < this.cells.length; i += 1) {
                cell = this.cells.at(i);
                element = document.getElementById(cell.get('name'));

                if (element) {
                    element.style.width = cell.get('w') + 'px';
                    element.style.height = cell.get('h') + 'px';

                    element.style.webkitTransform = 'translate(' + cell.get('x') + 'px, ' + cell.get('y') + 'px)';
                    element.style.MozTransform = 'translate(' + cell.get('x') + 'px, ' + cell.get('y') + 'px)';
                    element.style.transform = 'translate(' + cell.get('x') + 'px, ' + cell.get('y') + 'px)';

                    if (element.querySelectorAll('.bubble--round')) {
                        this.addBubbles(element);
                    }
                }
            }
        },

		hide: function () {
			$('.frame').removeClass('in');
		},

		update: function () {
			this.x = Vars.get('x');
            this.y = Vars.get('y');
            this.scale = Vars.get('scale');

            this.currentElement = $(document.getElementById(this.cells.at(Vars.get('currentFrame')).get('name')));

			if (!this.currentElement.hasClass('in')) {
                $('.frame').removeClass('in');
                this.currentElement.addClass('in');
            }

            this.el.style.webkitTransform = 'translate(' + this.x + 'px, ' + this.y + 'px) scale(' + this.scale + ')';
	        this.el.style.MozTransform = 'translate(' + this.x + 'px, ' + this.y + 'px) scale(' + this.scale + ')';
            this.el.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px) scale(' + this.scale + ')';
		},

		/*
        render: function () {
            this.x = Vars.get('x');
            this.y = Vars.get('y');
            this.scale = Vars.get('scale');

			this.currentElement = $(document.getElementById(this.cells.at(Vars.get('currentFrame')).get('name')));

			if (!this.currentElement.hasClass('in')) {
				$('.frame').removeClass('in');
				this.currentElement.addClass('in');
			}
            
			this.el.style.webkitTransform = 'translate(' + this.x + 'px, ' + this.y + 'px) scale(' + this.scale + ')';
	        this.el.style.MozTransform = 'translate(' + this.x + 'px, ' + this.y + 'px) scale(' + this.scale + ')';
            this.el.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px) scale(' + this.scale + ')';
		},
		*/

        resize: function () {
        
        }

    });

	return DomView;
});

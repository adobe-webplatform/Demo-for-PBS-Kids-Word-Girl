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

            UserEvent.on('resize', this.resize.bind(this));
            AppEvent.on('render', this.render.bind(this));
            //AppEvent.on('animate', this.animate.bind(this));
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
                    element.style.webkitTransform = 'translate3d(' + cell.get('x') + 'px, ' + cell.get('y') + 'px, 0px)';

                    if (element.querySelectorAll('.bubble--round')) {
                        this.addBubbles(element);
                    }
                }
            }
        },

        updateVisible: function () {
            
            this.currentElement = $(document.getElementById(this.cells.at(Vars.get('currentFrame')).get('name')));
            
            if (!this.currentElement.hasClass('in')) {
                $('.frame').removeClass('in');
                this.currentElement.addClass('in');
            }
        },

        render: function () {
            this.x = Vars.get('x');
            this.y = Vars.get('y');
            this.scale = Vars.get('scale');

            this.updateVisible();

            this.el.style.webkitTransform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px) scale(' + this.scale + ')';
		},

        resize: function () {
        
        }

    });

	return DomView;
});

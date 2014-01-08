/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        BubbleCircle = require('app/views/objects/bubble-circle'),
        DomView;

    DomView = Backbone.View.extend({

        initialize: function () {
		    this.el = document.getElementById('dom-view');
            this.cells = this.options.cells;

            this.addBubbles();
            this.layout();

            UserEvent.on('resize', this.resize.bind(this));
            AppEvent.on('render', this.render.bind(this));
            //AppEvent.on('animate', this.animate.bind(this));
        },

        addBubbles: function () {
            $('.bubble--round').each(function () {
                new BubbleCircle(this);
            });
        },

        layout: function () {
            var i,
                cell,
                element;

            for (i = 0; i < this.cells.length; i += 1) {
                cell = this.cells.at(i);
                element = document.getElementById(cell.get('src'));
                if (element) {
                    element.style.width = cell.get('w') + 'px';
                    element.style.height = cell.get('h') + 'px';
                    element.style.webkitTransform = 'translate3d(' + cell.get('x') + 'px, ' + cell.get('y') + 'px, 0px)';
                }
            }
        },

        updateVisible: function () {
            
            this.currentElement = $(document.getElementById(this.cells.at(Vars.get('currentFrame')).get('src')));
            
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

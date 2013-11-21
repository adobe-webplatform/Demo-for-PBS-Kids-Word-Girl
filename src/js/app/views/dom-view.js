/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        DomView;

    DomView = Backbone.View.extend({

        initialize: function () {
		    this.el = document.getElementById('dom-view');
            this.cells = this.options.cells;

            this.layout();

            UserEvent.on('resize', this.resize.bind(this));
            AppEvent.on('render', this.render.bind(this));
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

        render: function () {
            this.x = Vars.get('x');
            this.y = Vars.get('y');
            this.scale = Vars.get('scale');

            this.el.style.webkitTransform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
		},

        resize: function () {
        
        }

    });

	return DomView;
});

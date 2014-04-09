/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        UserEvent = require('app/events/user-event'),
        Vars = require('app/models/vars'),
        CellView = require('app/views/cells/cell-view'),
        Cell;

    Cell = Backbone.Model.extend({
        defaults: {
            view: null
        },

        initialize: function (options) {
            var vName = options.layer.name,
                vNum = options.num,
                vVectorMask = options.layer.vectorMask ? options.layer.vectorMask : null,
                vView;

            if (options.view) {
                vView = options.view;
            } else {
                vView = CellView;
            }

            this.set('view', new vView({cell: this, layers: options.layer.layers, num: vNum}));
            this.set('name', vName);
            this.set('vectorMask', vVectorMask);

            if (options.layer.path) {
                this.set('y', options.layer.path.bounds.top);
                this.set('x', options.layer.path.bounds.left);
                this.set('h', options.layer.path.bounds.bottom - options.layer.path.bounds.top);
                this.set('w', options.layer.path.bounds.right - options.layer.path.bounds.left);
            } else {
                this.set('y', options.layer.bounds.top);
                this.set('x', options.layer.bounds.left);
                this.set('h', options.layer.bounds.bottom - options.layer.bounds.top);
                this.set('w', options.layer.bounds.right - options.layer.bounds.left);
            }
            
        },

        center: function () {
            var _x = (this.get('w') / 2) + this.get('x') * Vars.get('scale'),
                _y = (this.get('h') / 2) + this.get('y') * Vars.get('scale');

            return {x: _x, y: _y};
        }

    });

	return Cell;
});

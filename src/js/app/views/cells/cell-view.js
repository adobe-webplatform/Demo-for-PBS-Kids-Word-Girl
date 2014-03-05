/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        Layer = require('app/views/objects/layer'),
        CellView;

    CellView = Backbone.View.extend({

        initialize: function () {
            var i,
                layer;

            this.cell = this.options.cell;
            this.alpha = 1;
            this.layers = [];

            for (i = 0; i < this.options.layers.length; i += 1) {
                layer = new Layer();
                layer.init(this.options.layers[i]);
                this.layers.push(layer);
            }
		},

        render: function (ctx) {
            var i;

            for (i = this.layers.length - 1; i > -1; i -= 1) {
                this.layers[i].render(ctx);
            }
        }

    });

	return CellView;
});

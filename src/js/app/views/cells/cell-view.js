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
            this.cell = this.options.cell;
            this.alpha = 1;
            this.delta = 0;
            this.loaded = false;
            this.layersLoaded = 0;
            this.layers = [];
 	    },

        handle_LAYER_LOAD: function () {
            this.layersLoaded += 1;
			
            if (this.layersLoaded == this.layers.length) {
                this.loaded = true;
                this.callback();
            }
        },

        load: function (callback) {
            var i,
                layer;

            this.callback = callback;

			if (typeof(this.options.layers) == 'undefined') {
				return;
			}

            for (i = 0; i < this.options.layers.length; i += 1) {
                layer = new Layer();
                this.options.layers[i].vectorMask = this.cell.get('vectorMask'); //apply cell mask to layers
                layer.init(this.options.layers[i]);
                this.layers.push(layer);
                layer.load(this.handle_LAYER_LOAD.bind(this));
            }

        },

        render: function (ctx) {
            var i,
				currentFrame = this.options.num == Vars.get('currentFrame');

			if (currentFrame && this.layers.length > 0 && Vars.get('tweening') === false) {
				this.animate();
			} else {
				this.freeze();
			}

            for (i = this.layers.length - 1; i > -1; i -= 1) {
                this.layers[i].render(ctx);
            }
        },

		animate: function () {
			
		},
		
		freeze: function () {
			
		}

    });

	return CellView;
});

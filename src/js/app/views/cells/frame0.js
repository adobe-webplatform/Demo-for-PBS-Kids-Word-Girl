/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cells/cell-view'),
        Frame;

    Frame = CellView.extend({
        initialize: function () {
            CellView.prototype.initialize.call(this);
        },

        render: function (ctx) {
            var currentFrame = this.options.num == Vars.get('currentFrame');

            if (currentFrame && this.layers.length > 0) {	
				this.delta += 1;
                this.layers[2].y = this.layers[2].origin.y + Math.sin(this.delta / 50) * 10;
                this.layers[1].y = this.layers[1].origin.y + Math.sin(this.delta / 10) * 20;
            } else {
				this.delta = 0;
            }

            CellView.prototype.render.call(this, ctx);
        }
    });

	return Frame;
});

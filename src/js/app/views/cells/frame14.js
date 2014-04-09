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
                this.delta += 0.1;
                this.layers[1].x = this.layers[1].x < this.layers[1].origin.x + 20 ? this.layers[1].x + 0.3 : this.layers[1].origin.x + 20;
                this.layers[2].x = this.layers[2].x > this.layers[2].origin.x - 20 ? this.layers[2].x - 0.3 : this.layers[2].origin.x - 20;
                this.layers[3].y = this.layers[3].origin.y + Math.sin(this.delta / 2) * 20;
            } else {
                this.delta = 0;
                this.layers[1].x = this.layers[1].origin.x;
                this.layers[2].x = this.layers[2].origin.x;
                this.layers[3].x = this.layers[3].origin.x;
            }

            CellView.prototype.render.call(this, ctx);
        }
    });

	return Frame;
});


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
                //this.delta = !isNaN(this.delta) ? this.delta + 0.5 : 0;

                this.delta += 0.5;
                this.layers[3].x = this.layers[3].x > this.layers[3].origin.x - 150 ? this.layers[3].x -= 4 : this.layers[3].origin.x - 150;
                this.layers[3].y = this.layers[3].y < this.layers[3].origin.y + 150 ? this.layers[3].y += 4 : this.layers[3].origin.y + 150;
                this.layers[0].scale = this.layers[0].scale < 1.1 ? this.layers[0].scale + 0.001 : 1.1;
                this.layers[0].rotation = Math.sin(this.delta) * 0.5;
            } else {
                this.delta = 0;
                this.layers[3].x = this.layers[3].origin.x;
                this.layers[3].y = this.layers[3].origin.y;
                this.layers[0].scale = 1;
                this.layers[0].rotation = 0;
            }

            CellView.prototype.render.call(this, ctx);
        }
    });

	return Frame;
});


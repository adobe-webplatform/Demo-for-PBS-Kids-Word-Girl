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
                this.layers[0].y = this.layers[0].y > this.layers[0].origin.y - 300 ? this.layers[0].y - 9 : this.layers[0].origin.y + 500;
                this.layers[1].y = this.layers[1].y > this.layers[1].origin.y - 300 ? this.layers[1].y - 8.5 : this.layers[1].origin.y + 500;
                this.layers[2].y = this.layers[2].y > this.layers[2].origin.y - 500 ? this.layers[2].y - 8.2 : this.layers[2].origin.y + 400;
                this.layers[3].y = this.layers[3].y > this.layers[3].origin.y - 500 ? this.layers[3].y - 9.4 : this.layers[3].origin.y + 500;
            } else {
                this.layers[0].y = this.layers[0].origin.y;
                this.layers[1].y = this.layers[1].origin.y;
                this.layers[2].y = this.layers[2].origin.y;
                this.layers[3].y = this.layers[3].origin.y;
            }

            CellView.prototype.render.call(this, ctx);
        }
    });

	return Frame;
});


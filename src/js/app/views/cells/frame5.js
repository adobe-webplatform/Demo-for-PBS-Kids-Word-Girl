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
                this.layers[0].x = this.layers[0].x < this.layers[0].origin.x + 30 ? this.layers[0].x + 0.2 : this.layers[0].origin.x + 30;
                this.layers[1].x = this.layers[1].x < this.layers[1].origin.x + 70 ? this.layers[1].x + 0.5 : this.layers[1].origin.x + 70;
                this.layers[4].x = this.layers[4].x < this.layers[4].origin.x + 70 ? this.layers[4].x + 0.3 : this.layers[4].origin.x + 70;
                this.layers[5].x = this.layers[5].x < this.layers[5].origin.x + 10 ? this.layers[5].x + 0.1 : this.layers[5].origin.x + 10;

            } else {
                this.layers[0].x = this.layers[0].origin.x;
                this.layers[1].x = this.layers[1].origin.x;
                this.layers[4].x = this.layers[4].origin.x;
                this.layers[5].x = this.layers[5].origin.x;
            }

            CellView.prototype.render.call(this, ctx);
        }
    });

	return Frame;
});


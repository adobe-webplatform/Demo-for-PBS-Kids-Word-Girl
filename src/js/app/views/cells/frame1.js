/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cells/cell-view'),
        CellView2;

    CellView2 = CellView.extend({
        initialize: function () {
            CellView.prototype.initialize.call(this);
        },

        render: function (ctx) {
            var currentFrame = this.options.num == Vars.get('currentFrame');

            //TODO: check if current frame otherwise reset
            if (currentFrame) {
                this.layers[1].x -= 1;
                this.layers[2].x += 1;
            }

            CellView.prototype.render.call(this, ctx);
        }
    });

	return CellView2;
});

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

		animate: function () {
            this.delta += 0.1;
            this.layers[0].y = this.layers[0].origin.y + Math.sin(this.delta / 4) * 50;
            this.layers[2].y = this.layers[2].origin.y + Math.sin(this.delta / 4) * 50;
		},
		
		freeze: function () {
            this.delta = 0;
            this.layers[0].y = this.layers[0].origin.y;
            this.layers[2].y = this.layers[2].origin.y;
		}
    });

	return Frame;
});


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
            this.layers[2].scale = this.layers[2].scale > 0.95 ? this.layers[2].scale - 0.0005 : 0.95;
            this.layers[0].scale = this.layers[0].scale < 1.1 ? this.layers[0].scale + 0.001 : 1.1;
		},
		
		freeze: function () {
            this.layers[2].scale = 1;
            this.layers[0].scale = 1;
		}
    });

	return Frame;
});


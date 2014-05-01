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
            $('#home-btn').click(this.click.bind(this));
        },

        click: function (e) {
            //go to first frame
            console.log('goto..');
            AppEvent.trigger('goto', 0);
        },

		animate: function () {
            this.layers[3].x = this.layers[3].x < this.layers[3].origin.x + 60 ? this.layers[3].x + 0.5 : this.layers[3].origin.x + 60;
		},
		
		freeze: function () {
			var i;
            for (i = 0; i < this.layers.length; i += 1) {
                this.layers[i].x = this.layers[i].origin.x;
                this.layers[i].y = this.layers[i].origin.y;
                this.layers[i].rotation = 0;
            }
		}
    });

	return Frame;
});


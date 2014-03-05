/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView;

    CellView = Backbone.View.extend({

        initialize: function () {
            this.cell = this.options.cell;
            this.alpha = 1;

		    var image;
            
            //image = new Image();
            //image.src = 'assets/images/png/' + this.cell.get('src') + '.png';
            //image.addEventListener('load', this.handle_LOAD.bind(this));
            //this.cell.set('img', image);
        },

        render: function (ctx) {
            if (this.cell.get('loaded') !== false) {
                ctx.globalAlpha = this.cell.get('alpha');
			    ctx.drawImage(this.cell.get('img'), this.cell.get('x'), this.cell.get('y'));
            }
        },

        handle_LOAD: function () {
            this.cell.set('loaded', true);
        }

    });

	return CellView;
});

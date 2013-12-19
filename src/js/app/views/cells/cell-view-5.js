/*global define $ requestAnimationFrame Snap*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cell-view'),
        Cell5View;

    require('snap');

    Cell5View = CellView.extend({

        initialize: function () {
            
            this.id = 5;
            this.cell = this.options.cell;
            this.alpha = 1;

            this.animating = false;
            this.svg = Snap('#svg-grr');
            this.path = this.svg.select('#grr-path');
            this.pathStart = this.svg.select('#grr-path-start');
            this.pathStop = this.svg.select('#grr-path-stop');

		    var image;
            
            image = new Image();
            image.src = 'assets/images/png/' + this.cell.get('src') + '.png';
            image.addEventListener('load', this.handle_LOAD.bind(this));
            this.cell.set('img', image);

            //AppEvent.on('animate', this.animate.bind(this)); //DESKTOP ONLY!
        },

        render: function (ctx) {
            if (this.cell.get('loaded') !== false) {
                ctx.globalAlpha = this.cell.get('alpha');
			    ctx.drawImage(this.cell.get('img'), this.cell.get('x'), this.cell.get('y'));
            }
        },

        pathIn: function () {
            if (this.animating) {
                this.path.animate({path: this.pathStop.attr("path")}, 2000, this.pathOut.bind(this));
            }
        },

        pathOut: function () {
            if (this.animating) {
                this.path.animate({path: this.pathStart.attr("path")}, 2000, this.pathIn.bind(this));
            }
        },

        animate: function () {
            if (Vars.get('currentFrame') == this.id) {

                if (this.animating !== true) {
                    this.animating = true;
                    this.pathIn();
                }

            } else {
                this.animating = false;
                this.path.stop();
                this.path.attr({path: this.pathStart.attr("path")});
            }
        },

        handle_LOAD: function () {
            this.cell.set('loaded', true);
        }

    });

	return Cell5View;
});

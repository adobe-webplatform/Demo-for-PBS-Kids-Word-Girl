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
            this.images = [];
            this.loadedImages = 0;
            this.layers = [
                {x: 0, y: 0},
                {x: 50, y: 10},
                {x: 200, y: 30},
                {x: 100, y: 20},
                {x: 0, y: 0},
                {x: 0, y: 0}
            ];

            this.animating = false;
            this.svg = Snap('#svg-grr');
            this.path = this.svg.select('#grr-path');
            this.pathStart = this.svg.select('#grr-path-start');
            this.pathStop = this.svg.select('#grr-path-stop');

            var i,
                image;

            for (i = 0; i < 5; i += 1) {
                image = new Image();
                image.src = 'assets/images/png/' + this.cell.get('src') + '-' + (i + 1) + '.png';
                image.addEventListener('load', this.handle_LOAD.bind(this));
                this.images.push(image);
            }

            AppEvent.on('animate', this.animate.bind(this));
        },

        render: function (ctx) {
            if (this.cell.get('loaded') !== false) {
                ctx.globalAlpha = this.cell.get('alpha');
			    

                //mask this part
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(this.cell.get('x') + 95, this.cell.get('y') + 20);
                ctx.lineTo(this.cell.get('x') + 480, this.cell.get('y') + 20);
                ctx.lineTo(this.cell.get('x') + 475, this.cell.get('y') + 375);
                ctx.lineTo(this.cell.get('x') + 55, this.cell.get('y') + 345);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(this.images[0], this.cell.get('x') + this.layers[0].x, this.cell.get('y') + this.layers[0].y);
                ctx.drawImage(this.images[1], this.cell.get('x') + this.layers[1].x, this.cell.get('y') + this.layers[1].y);
                ctx.drawImage(this.images[2], this.cell.get('x') + this.layers[2].x, this.cell.get('y') + this.layers[2].y);
                ctx.drawImage(this.images[3], this.cell.get('x') + this.layers[3].x, this.cell.get('y') + this.layers[3].y);
                
                ctx.restore();
                
                ctx.drawImage(this.images[4], this.cell.get('x') + this.layers[4].x, this.cell.get('y') + this.layers[4].y);

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
                this.layers[1].x = this.layers[1].x > 0 ? this.layers[1].x - 1 : 0;
                this.layers[1].y = this.layers[1].y > 0 ? this.layers[1].y - 0.2 : 0;
                this.layers[2].x = this.layers[2].x > 0 ? this.layers[2].x - 1 : 0;
                this.layers[2].y = this.layers[2].y > 0 ? this.layers[2].y - 0.15 : 0;
                this.layers[3].x = this.layers[3].x > 0 ? this.layers[3].x - 0.5 : 0;
                this.layers[3].y = this.layers[3].y > 0 ? this.layers[3].y - 0.1 : 0;

                //if (this.animating !== true) {
                //    this.animating = true;
                //    this.pathIn();
                //}

            } else {
                this.layers = [
                    {x: 0, y: 0},
                    {x: 50, y: 10},
                    {x: 200, y: 30},
                    {x: 100, y: 20},
                    {x: 0, y: 0},
                    {x: 0, y: 0}
                ];
                
                //this.animating = false;
                //this.path.stop();
                //this.path.attr({path: this.pathStart.attr("path")});
            }
        },

        handle_LOAD: function () {
            this.cell.set('loaded', true);
        }

    });

	return Cell5View;
});

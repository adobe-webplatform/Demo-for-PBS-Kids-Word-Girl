/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cell-view'),
        CellView2;

    CellView2 = CellView.extend({

        initialize: function () {
            this.id = 1;
            this.cell = this.options.cell;
            this.images = [];
            this.loadedImages = 0;
            this.layers = [
                {x: -100, y: 0},
                {x: -20, y: 0},
                {x: 0, y: 0}
            ];

            var i,
                image;

            for (i = 0; i < 3; i += 1) {
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
                ctx.moveTo(this.cell.get('x') + 5, this.cell.get('y') + 5);
                ctx.lineTo(this.cell.get('x') + 475, this.cell.get('y') + 5);
                ctx.lineTo(this.cell.get('x') + 455, this.cell.get('y') + 620);
                ctx.lineTo(this.cell.get('x') + 5, this.cell.get('y') + 620);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(this.images[0], this.cell.get('x') + this.layers[0].x, this.cell.get('y') + this.layers[0].y);
			    ctx.drawImage(this.images[1], this.cell.get('x') + this.layers[1].x, this.cell.get('y') + this.layers[1].y);
                
                ctx.restore();
			   
                ctx.drawImage(this.images[2], this.cell.get('x'), this.cell.get('y'));
            }
        },

        animate: function () { 
            //check if current frame is this frame

            if (Vars.get('currentFrame') == this.id) {
                this.layers[0].x = this.layers[0].x < 0 ? this.layers[0].x + 1 : 0;
                this.layers[1].x = this.layers[1].x > -100 ? this.layers[1].x - 1 : -100;
            } else {
                this.layers[0].x = -100;
                this.layers[1].x = -20;
            }
        }, 

        handle_LOAD: function () {
            this.loadedImages += 1;
            if (this.loadedImages == this.images.length) {
                this.cell.set('loaded', true);
            }
        }

    });

	return CellView2;
});

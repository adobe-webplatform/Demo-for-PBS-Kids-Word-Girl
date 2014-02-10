/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cell-view'),
        CellView7;

    CellView7 = CellView.extend({

        initialize: function () {
            var i,
                image;

            this.id = 7;
            this.cell = this.options.cell;
            this.delta = 0;
            this.images = [];
            this.loadedImages = 0;
            this.layers = [
                {x: 0, y: 0},
                {x: 0, y: 0},
                {x: 0, y: 0}
            ];

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
                var half_w = this.cell.get('x') + this.cell.get('w') / 2,
                    half_h = this.cell.get('y') + this.cell.get('h') / 2;

                ctx.globalAlpha = this.cell.get('alpha');

                ctx.drawImage(this.images[0], this.cell.get('x'), this.cell.get('y'));

                //mask
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.cell.get('x') + 6, this.cell.get('y') + 20, 600, 521);
                ctx.clip();
                ctx.closePath();

                ctx.drawImage(this.images[1], this.cell.get('x') + this.layers[1].x, this.cell.get('y') + this.layers[1].y);
                ctx.drawImage(this.images[2], this.cell.get('x') + this.layers[2].x, this.cell.get('y') + this.layers[2].y);
                
                ctx.restore();

            }
        },

        animate: function () { 
            //check if current frame is this frame

            if (Vars.get('currentFrame') == this.id) {
                this.delta += 1;

                this.layers[1].y = 10 + Math.sin(this.delta / 20) * 10;
                this.layers[2].y = 10 + Math.sin(this.delta / 5) * 10;

            } else {
                
            }
        }, 

        handle_LOAD: function () {
            this.loadedImages += 1;
            if (this.loadedImages == this.images.length) {
                this.cell.set('loaded', true);
            }
        }

    });

	return CellView7;
});

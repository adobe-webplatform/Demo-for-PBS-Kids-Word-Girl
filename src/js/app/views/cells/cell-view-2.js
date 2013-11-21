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
                {scale: 1},
                {scale: 1},
                {scale: 0.5}
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
                var half_w = this.cell.get('x') + this.cell.get('w') / 2,
                    half_h = this.cell.get('y') + this.cell.get('h') / 2;

                //mask this part
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.cell.get('x') + 50, this.cell.get('y') + 50, 700, 550);
                ctx.clip();
                ctx.closePath();

                //scale this part
                ctx.translate(half_w, half_h);
                ctx.scale(this.layers[0].scale, this.layers[0].scale);
                ctx.drawImage(this.images[0], -this.cell.get('w') / 2, -this.cell.get('h') / 2);
                ctx.restore();

                //static image
			    ctx.drawImage(this.images[1], this.cell.get('x'), this.cell.get('y'));

                //scale this part
                ctx.save();
                ctx.translate(half_w, half_h);
                ctx.scale(this.layers[2].scale, this.layers[2].scale);
			    ctx.drawImage(this.images[2], -this.cell.get('w') / 2, -this.cell.get('h') / 2);
                ctx.restore();
            }
        },

        animate: function () { 
            //check if current frame is this frame

            if (Vars.get('currentFrame') == this.id) {
                this.layers[0].scale = this.layers[0].scale > 0.9 ? this.layers[0].scale - 0.001 : 0.9;
                this.layers[2].scale = this.layers[2].scale < 1 ? this.layers[2].scale + 0.01 : 1;
            } else {
                this.layers[0].scale = 1;
                this.layers[2].scale = 0.5;
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

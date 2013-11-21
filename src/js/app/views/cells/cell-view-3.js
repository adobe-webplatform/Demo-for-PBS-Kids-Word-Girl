/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cell-view'),
        CellView3;

    CellView3 = CellView.extend({

        initialize: function () {
            var i,
                image;

            this.id = 2;
            this.cell = this.options.cell;
            this.delta = 0;
            this.images = [];
            this.loadedImages = 0;
            this.layers = [
                {scale: 1},
                {x: 100, y: -100, scale: 1},
                {x: 0, y: 0, scale: 1},
                {x: 100, y: -100, scale: 1},
                {x: 0, y: 0, scale: 1},
                {x: 0, y: 0, scale: 1, rotation: 0, originX: 120, originY: 80},
                {x: 0, y: 0, scale: 1}
            ];

            for (i = 0; i < 6; i += 1) {
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

                //static image
                ctx.drawImage(this.images[0], this.cell.get('x'), this.cell.get('y'));

                //mask image
                ctx.save();
                this.getMask(ctx);
			    ctx.drawImage(this.images[1], this.cell.get('x') + this.layers[1].x, this.cell.get('y') + this.layers[1].y);
                ctx.restore();

			    ctx.drawImage(this.images[2], this.cell.get('x') + this.layers[2].x, this.cell.get('y') + this.layers[2].y);

                //mask image
                ctx.save();
                this.getMask(ctx);
			    ctx.drawImage(this.images[3], this.cell.get('x') + this.layers[3].x, this.cell.get('y') + this.layers[3].y);
                ctx.restore();

			    ctx.drawImage(this.images[4], this.cell.get('x') + this.layers[4].x, this.cell.get('y') + this.layers[4].y);

                //rotate & scale
                ctx.save();
                ctx.translate(this.cell.get('x') + this.layers[5].originX, this.cell.get('y') + this.layers[5].originY);
                ctx.rotate(this.layers[5].rotation * Math.PI / 180);
                ctx.scale(this.layers[5].scale, this.layers[5].scale);
			    ctx.drawImage(this.images[5], -this.layers[5].originX, -this.layers[5].originY);
                ctx.restore();

            }
        },

        getMask: function (ctx) {
            ctx.beginPath();
            ctx.rect(this.cell.get('x') + 50, this.cell.get('y') + 20, 270, 550);
            ctx.clip();
            ctx.closePath();
        },

        animate: function () { 
            //check if current frame is this frame

            if (Vars.get('currentFrame') == this.id) {
                this.delta += 1;
                this.layers[1].x = this.layers[3].x = this.layers[1].x > 0 ? this.layers[1].x - 2 : 0;
                this.layers[1].y = this.layers[3].y = this.layers[1].y < 0 ? this.layers[1].y + 2 : 0;
                
                if (this.delta > 70) {
                    this.layers[5].rotation = Math.sin(this.delta / 2) * 20;
                    this.layers[5].scale = 0.9 + Math.sin(this.delta / 10) * 0.1;
                }

            } else {
                this.delta = 0;
                this.layers[1].x = this.layers[3].x = 100;
                this.layers[1].y = this.layers[3].y = -100;
                
                this.layers[5].rotation = 0;
                this.layers[5].scale = 0;
            }
        }, 

        handle_LOAD: function () {
            this.loadedImages += 1;
            if (this.loadedImages == this.images.length) {
                this.cell.set('loaded', true);
            }
        }

    });

	return CellView3;
});

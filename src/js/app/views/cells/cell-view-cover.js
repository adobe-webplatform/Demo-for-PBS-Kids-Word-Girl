/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cell-view'),
        CellViewCover;

    CellViewCover = CellView.extend({
        initialize: function () {
            this.id = 0;
            this.cell = this.options.cell;
            this.alpha = 1;
            this.images = [];
            this.loadedImages = 0;
            this.delta = 0;
            this.stars = [
                {x: 0, y: 0, color: '#2d565c', scale: 20},
                {x: 0, y: 0, color: '#31646c', scale: 18},
                {x: 0, y: 0, color: '#34727d', scale: 16},
                {x: 0, y: 0, color: '#35a6c0', scale: 14},
                {x: 0, y: 0, color: '#5aafc7', scale: 12},
                {x: 0, y: 0, color: '#75b9ce', scale: 10},
                {x: 0, y: 0, color: '#8fc4d5', scale: 8},
                {x: 0, y: 0, color: '#a7cfdd', scale: 6},
                {x: 0, y: 0, color: '#c0dce5', scale: 4},
                {x: 0, y: 0, color: '#d8e9ee', scale: 2},
                {x: 0, y: 0, color: '#d8e9ee', scale: 0.5}
            ];
            this.layers = [
                {x: 130, y: 20, scale: 1},
                {x: 100, y: 400, scale: 0.7},
                {x: 600, y: 50, scale: 0.8}
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
            var i;

            if (this.cell.get('loaded') !== false) {

                ctx.globalAlpha = this.cell.get('alpha');

                ctx.fillStyle = '#2d565c';
                ctx.beginPath();
                ctx.rect(this.cell.get('x'), this.cell.get('y'), this.cell.get('w'), this.cell.get('h'));
                ctx.closePath();
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.rect(this.cell.get('x'), this.cell.get('y'), this.cell.get('w'), this.cell.get('h'));
                ctx.closePath();
                ctx.clip();
                
                //draw stars
                for (i = 0; i < this.stars.length; i += 1) {
                    ctx.save();
                    ctx.globalAlpha = 0.5 * this.cell.get('alpha');
                    ctx.translate(this.stars[i].x + this.cell.get('x') + this.cell.get('w') / 2, this.stars[i].y + this.cell.get('y') + this.cell.get('h') / 2);
                    ctx.scale(this.stars[i].scale, this.stars[i].scale);

                    ctx.fillStyle = this.stars[i].color;
                    ctx.beginPath();
                    ctx.moveTo(-36, 8);
                    ctx.lineTo(-64, -26);
                    ctx.lineTo(-19, -27);
                    ctx.lineTo(4, -65);
                    ctx.lineTo(19, -22);
                    ctx.lineTo(63, -10);
                    ctx.lineTo(27, 16);
                    ctx.lineTo(29, 61);
                    ctx.lineTo(-7, 35);
                    ctx.lineTo(-49, 52);
                    ctx.lineTo(-36, 8);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }

                ctx.save();
                ctx.scale(this.layers[1].scale, this.layers[1].scale);
                ctx.drawImage(this.images[1], this.layers[1].x + this.cell.get('x'), this.layers[1].y + this.cell.get('y'));
                ctx.restore();
                
                ctx.save();
                ctx.scale(this.layers[2].scale, this.layers[2].scale);
                ctx.drawImage(this.images[2], this.layers[2].x + this.cell.get('x'), this.layers[2].y + this.cell.get('y'));
                ctx.restore();

                ctx.save();
                ctx.scale(this.layers[0].scale, this.layers[0].scale);
                ctx.drawImage(this.images[0], this.layers[0].x + this.cell.get('x'), this.layers[0].y + this.cell.get('y'));
                ctx.restore();

                ctx.restore();
            }
        },

        animate: function () { 
            var i;

            //check if current frame is this frame
            if (Vars.get('currentFrame') == this.id) {

                this.delta += 1;

                //check for accelerometer and use this
                for (i = 0; i < this.stars.length; i += 1) {
                    this.stars[i].x = Math.sin(this.delta / 30) * this.stars[i].scale * 10;     
                    this.stars[i].y = Math.cos(this.delta / 30) * this.stars[i].scale * 10;     
                }

                this.layers[2].y = Math.sin(this.delta / 30) * 30;

            } else {

                this.delta = 0;

                for (i = 0; i < this.stars.length; i += 1) {
                    this.stars[i].x = Math.sin(this.delta / 30) * this.stars[i].scale * 10;     
                    this.stars[i].y = Math.cos(this.delta / 30) * this.stars[i].scale * 10;     
                }

                this.layers[2].y = Math.sin(this.delta / 30) * 30;

            }
        }, 

        handle_LOAD: function () {
            this.loadedImages += 1;
            if (this.loadedImages == this.images.length) {
                this.cell.set('loaded', true);
            }
        }

    });

	return CellViewCover;
});

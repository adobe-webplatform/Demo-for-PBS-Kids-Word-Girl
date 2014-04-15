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
	
	        this.mouse = {x: 0, y: 0};
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
	
	        if (Modernizr.touch !== false && window.DeviceOrientationEvent) {
                UserEvent.on('deviceorientation', this.deviceorientation.bind(this)); 
            } else {
                UserEvent.on('mousemove', this.mousemove.bind(this)); 
            }
	
            CellView.prototype.initialize.call(this);
        },

		drawStars: function(ctx) {
			
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

			ctx.restore();
		},

        render: function (ctx) {
            var dx, 
				dy,
				currentFrame = this.options.num == Vars.get('currentFrame');

			this.drawStars(ctx);

            if (currentFrame && this.layers.length > 0) {
	
	            dx = this.mouse.x - window.innerWidth / 2;
                dy = this.mouse.y - window.innerHeight / 2;
	
				this.delta += 1;
                this.layers[2].y = this.layers[2].origin.y + Math.sin(this.delta / 50) * 10;
                this.layers[1].y = this.layers[1].origin.y + Math.sin(this.delta / 10) * 20;
            	/*
                for (i = 0; i < this.stars.length; i += 1) {
                    this.stars[i].x = dx * (this.stars[i].scale / 100);
                    this.stars[i].y = dy * (this.stars[i].scale / 100);
                }
				*/
			} else {
				this.delta = 0;
            }

            CellView.prototype.render.call(this, ctx);
        },

        mousemove: function (e) {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        },

        deviceorientation: function (e) {
            this.mouse.x = e.gamma * 10;
            this.mouse.y = e.beta * 10;
        }
    });

	return Frame;
});

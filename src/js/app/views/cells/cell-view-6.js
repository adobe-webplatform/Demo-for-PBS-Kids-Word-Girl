/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cell-view'),
        CellView3,
        ParticleObj;

    ParticleObj = function (map) {
        this.ox = map.ox;
        this.oy = map.oy;
        this.w = map.w;
        this.h = map.h;
        this.speed = 5 + Math.random() * 5;
        this.scale = 2 - (this.speed / 10);
        this.rotation = Math.random() * 180;
    };

    CellView3 = CellView.extend({

        initialize: function () {
            var i,
                image,
                randomMap,
                particle;

            this.id = 6;
            this.cell = this.options.cell;
            this.delta = 0;
            this.images = [];
            this.loadedImages = 0;
            this.particles = [];
            this.particleMaps = [
                {ox: 0, oy: 0, w: 175, h: 167},
                {ox: 175, oy: 0, w: 151, h: 167},
                {ox: 0, oy: 167, w: 175, h: 124},
                {ox: 175, oy: 167, w: 151, h: 124}
            ];

            //load images
            for (i = 0; i < 2; i += 1) {
                image = new Image();
                image.src = 'assets/images/png/' + this.cell.get('src') + '-' + (i + 1) + '.png';
                image.addEventListener('load', this.handle_LOAD.bind(this));
                this.images.push(image);
            }

            //add particles
            for (i = 0; i < 10; i += 1) {
                randomMap = this.particleMaps[Math.floor(Math.random() * this.particleMaps.length)];
                particle = new ParticleObj(randomMap);
                this.particles.push(particle);
                this.particles[i].x = 30 + this.cell.get('x') + ((this.cell.get('w') / 2) * Math.random());
                this.particles[i].y = this.cell.get('y') + (this.cell.get('h') * Math.random()) - this.particles[i].h;
            }
            
            this.particles.sort(function (a, b) {
                if (a.scale < b.scale) {
                    return -1;
                } else if (a.scale > b.scale) {
                    return 1;
                } else {
                    return 0;
                }
            });

            AppEvent.on('animate', this.animate.bind(this));
        },

        render: function (ctx) {
            var i;

            if (this.cell.get('loaded') !== false) {
                
                ctx.globalAlpha = this.cell.get('alpha');

                //static image
                ctx.drawImage(this.images[0], this.cell.get('x'), this.cell.get('y'));

                //mask
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.cell.get('x') + 15, this.cell.get('y') + 20, 335, 640);
                ctx.clip();
                ctx.closePath();

                //draw particle
                for (i = 0; i < this.particles.length; i += 1) {
                    ctx.save();
                    ctx.translate(this.particles[i].x + (this.particles[i].w / 2), this.particles[i].y + (this.particles[i].h / 2));
                    ctx.rotate(this.particles[i].rotation * Math.PI / 180);
                    ctx.scale(this.particles[i].scale, this.particles[i].scale);
                    ctx.drawImage(this.images[1], this.particles[i].ox, this.particles[i].oy, this.particles[i].w, this.particles[i].h, -this.particles[i].w / 2, -this.particles[i].h / 2, this.particles[i].w, this.particles[i].h);
                    ctx.restore();
                }

                ctx.restore();
            }
        },

        animate: function () { 
            //check if current frame is this frame
            var i;

            if (Vars.get('currentFrame') == this.id) {
                for (i = 0; i < this.particles.length; i += 1) {
                    this.particles[i].y -= this.particles[i].speed;
                    this.particles[i].rotation += this.particles[i].speed / 10;
                    if (this.particles[i].y < this.cell.get('y') - this.particles[i].h) {
                        this.particles[i].y += this.cell.get('h') + (this.particles[i].h * this.particles[i].scale);
                    }
                }
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

	return CellView3;
});

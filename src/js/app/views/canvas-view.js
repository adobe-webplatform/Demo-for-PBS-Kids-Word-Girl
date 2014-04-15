/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CanvasView;

    CanvasView = Backbone.View.extend({

        initialize: function () {
		    this.el = document.getElementById('canvas-view');
            this.ctx = this.el.getContext('2d');
            this.cells = this.options.cells;
            this.path = this.options.path;
            this.zoom = window.devicePixelRatio;

            this.resize();

            UserEvent.on('resize', this.resize.bind(this));
            UserEvent.on('orientationchange', this.orientationchange.bind(this));
            AppEvent.on('render', this.render.bind(this));
        },

		drawBackground: function () {
			//black background
            this.ctx.beginPath();
            this.ctx.fillStyle = 'black';
            this.ctx.rect(0, 0, this.el.width, this.el.height);
            this.ctx.fill();
            this.ctx.closePath();
		},

		drawOtherFrames: function () {
			this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.scale(this.scale, this.scale);
            this.ctx.globalAlpha = 1;

            //draw stuff
            for (i = 0; i < this.cells.length; i += 1) {
                if (i !== Vars.get('currentFrame')) {
                	cell = this.cells.at(i);
                	view = cell.get('view');

                	if (view.loaded !== false) {
                		cell.get('view').render(this.ctx);
                	}
                }
            }
            
            this.ctx.restore();
		},

		drawShading: function () {
			this.ctx.globalAlpha = 0.8;
            //this.ctx.fillStyle = 'black';
            this.ctx.beginPath();
            this.ctx.rect(0, 0, this.el.width, this.el.height);
            this.ctx.fill();
            this.ctx.closePath();
		},

		drawCurrentFrame: function () {
			this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.scale(this.scale, this.scale);
            this.ctx.globalAlpha = 1;

            cell = this.cells.at(Vars.get('currentFrame'));
            cell.get('view').render(this.ctx);

            this.ctx.restore();
		},

        render: function () {
            var i,
                cell,
                view;

            this.x = Vars.get('x') * this.zoom;
            this.y = Vars.get('y') * this.zoom;
            this.scale = Vars.get('scale') * this.zoom;

			this.ctx.clearRect(0, 0, this.el.width, this.el.height);

			//if tweening clear whole frame
			if (Vars.get('tweening') !== false) {
				//whole canvas
				//this.drawOtherFrames();
			} else {
				//current frame only
				this.drawCurrentFrame();
			}			
        },

        orientationchange: function () {
            this.resize();
        },

        resize: function () {
            this.el.width = window.innerWidth * window.devicePixelRatio;
            this.el.height = window.innerHeight * window.devicePixelRatio;
        }

    });

	return CanvasView;
});

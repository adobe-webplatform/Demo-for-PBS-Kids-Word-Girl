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

        render: function () {
            var i,
                cell;

            this.x = Vars.get('x') * this.zoom;
            this.y = Vars.get('y') * this.zoom;
            this.scale = Vars.get('scale') * this.zoom;

			this.ctx.clearRect(0, 0, this.el.width, this.el.height);
       
            this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.scale(this.scale, this.scale);

            //draw stuff
            for (i = 0; i < this.cells.length; i += 1) {
                if (i !== Vars.get('currentFrame')) {
                    cell = this.cells.at(i);
                    cell.get('view').render(this.ctx);
                }
            }
            
            this.ctx.restore();

            this.ctx.globalAlpha = 0.8;
            this.ctx.beginPath();
            this.ctx.fillStyle = 'black';
            this.ctx.rect(0, 0, this.el.width, this.el.height);
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.scale(this.scale, this.scale);

            cell = this.cells.at(Vars.get('currentFrame'));
            cell.get('view').render(this.ctx);

            /*
            //debug path
            for (i = 0; i < this.path.path.length; i += 1) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'red';
                this.ctx.rect(this.path.path[i].x, this.path.path[i].y, 10, 10);
                this.ctx.fill();
                this.ctx.closePath();
            }
            */

            this.ctx.restore();
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

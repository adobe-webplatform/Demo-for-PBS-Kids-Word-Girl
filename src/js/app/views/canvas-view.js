/*global define $ requestAnimationFrame*/
/**
 *
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CanvasView;

    CanvasView = Backbone.View.extend({

        initialize: function () {
			this.offscreenCanvas = document.createElement('canvas');
            this.ctx = this.offscreenCanvas.getContext('2d');
		    this.el = document.getElementById('canvas-view');
            this.context = this.el.getContext('2d');
            this.cells = this.options.cells;
            this.path = this.options.path;
            this.zoom = window.devicePixelRatio;
			this.pixelate = 1;  //to use for scaling of content

            this.resize();

            UserEvent.on('resize', this.resize.bind(this));
            UserEvent.on('orientationchange', this.orientationchange.bind(this));
            AppEvent.on('render', this.render.bind(this));
        },

		drawBackground: function () {
			//black background
            this.ctx.beginPath();
            this.ctx.fillStyle = 'black';
            this.ctx.rect(0, 0, this.w, this.h);
            this.ctx.fill();
            this.ctx.closePath();
		},

		drawOtherFrames: function () {
			var i,
                cell,
                view;

			this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.scale(this.scale, this.scale);
            this.ctx.globalAlpha = 1;

            //draw stuff
            for (i = 0; i < this.cells.length; i += 1) {
				//only draw frames next to current
	            if (i == Vars.get('currentFrame') + 1 || i == Vars.get('currentFrame') - 1) {
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
            this.ctx.rect(0, 0, this.w, this.h);
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
		
		drawCanvas: function () {			
			this.context.save();
			this.context.scale(this.pixelate, this.pixelate);
			this.context.drawImage(this.ctx.canvas, 0, 0);
			this.context.restore();
		},

        render: function () {

            this.x = Vars.get('x') * this.zoom;
            this.y = Vars.get('y') * this.zoom;
            this.scale = Vars.get('scale') * this.zoom;
			
			//this.ctx.clearRect(0, 0, this.el.width, this.el.height);
			this.drawBackground();
			this.drawOtherFrames();
			this.drawShading();
			this.drawCurrentFrame();

			this.drawCanvas();
        },

        orientationchange: function () {
            this.resize();
        },

        resize: function () {
			this.w = window.innerWidth * window.devicePixelRatio;
			this.h = window.innerHeight * window.devicePixelRatio;
			
            this.offscreenCanvas.width = this.w;
            this.offscreenCanvas.height = this.h;
			this.el.width = this.offscreenCanvas.width * this.pixelate;
			this.el.height = this.offscreenCanvas.height * this.pixelate;
        }

    });

	return CanvasView;
});

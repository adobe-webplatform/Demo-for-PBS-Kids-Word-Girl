/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        Layer,
        ASSET_URL = "assets/images/generated/";

    Layer = function () {};

    Layer.prototype = {
        init: function (data) {

            this.loaded = false;
            this.src = ASSET_URL + data.name;
            this.origin = {x: data.bounds.left, y: data.bounds.top};
            this.rotation = 0;
            this.scale = 1;
            this.x = data.bounds.left;
            this.y = data.bounds.top;
            //this.w = data.bounds.width;
            //this.h = data.bounds.height;

            if (data.vectorMask) {
                this.vectorMask = data.vectorMask;
            }

            //this.load();
        },

        load: function (callback) {
            this.callback = callback;
            this.img = new Image();
            this.img.src = this.src;
            this.img.addEventListener('load', this.loadComplete.bind(this));
        },

        loadComplete: function () {
            this.loaded = true;
            this.callback();
        },

        render: function (ctx) {
            var i,
                zoom = window.devicePixelRatio,
                globalX,
                globalY,
                globalScale;

            globalX = Vars.get('x') * zoom;
            globalY = Vars.get('y') * zoom;
            globalScale = Vars.get('scale') * zoom;

            //ctx.globalAlpha = 0.5;

            if (this.loaded === true) {
                if (this.vectorMask) {
                    ctx.save();
                    ctx.beginPath();
                    
                    for (i = 0; i < this.vectorMask.length; i += 1) {
                        if (i === 0) {
                            ctx.moveTo(this.vectorMask[0].anchor.x, this.vectorMask[0].anchor.y);
                        } else {
                            ctx.lineTo(this.vectorMask[i].anchor.x, this.vectorMask[i].anchor.y);
                        }
                    }

                    ctx.closePath();
                    ctx.clip();
                }

                if (this.scale !== 1) {
                    ctx.save();
                    ctx.translate(this.x + globalX + (this.img.width) * globalScale, globalY + (this.img.height / 2) * globalScale);
                    ctx.scale(this.scale, this.scale);
		            ctx.translate(-this.x - globalX - (this.img.width) * globalScale, -globalY - (this.img.height / 2) * globalScale);
                }

		        ctx.drawImage(this.img, this.x, this.y);
                
                if (this.scale !== 1) {
                    ctx.restore();
                }

                if (this.vectorMask) {
                    ctx.restore();
                }
            }
        }
    };

	return Layer;
});

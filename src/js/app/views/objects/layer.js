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
            this.x = data.bounds.left;
            this.y = data.bounds.top;
            
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
            var i;

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
                    //ctx.strokeStyle = "#FF0000";
                    //ctx.stroke();
                    ctx.clip();
                }

		        ctx.drawImage(this.img, this.x, this.y);
                
                if (this.vectorMask) {
                    ctx.restore();
                }
            }
        }
    };

	return Layer;
});

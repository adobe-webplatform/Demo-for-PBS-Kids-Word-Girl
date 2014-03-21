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
            if (this.loaded === true) {
		        ctx.drawImage(this.img, this.x, this.y);
            }
        }
    };

	return Layer;
});

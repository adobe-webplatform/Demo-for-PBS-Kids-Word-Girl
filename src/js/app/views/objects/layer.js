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
            this.src = ASSET_URL + data.name;
            this.x = data.bounds.left;
            this.y = data.bounds.top;

            this.load();
        },

        load: function () {
            this.img = new Image();
            this.img.src = this.src;
        },

        render: function (ctx) {
		    ctx.drawImage(this.img, this.x, this.y);
        }
    };

	return Layer;
});

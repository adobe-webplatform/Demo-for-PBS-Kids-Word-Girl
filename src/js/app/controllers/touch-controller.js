/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var TouchController,
        UserEvent = require('app/events/user-event');

    TouchController = function () {

        this.initialize = function () {
            document.addEventListener('touchstart', this.touchstart.bind(this));
            document.addEventListener('touchmove', this.touchmove.bind(this));
            document.addEventListener('touchend', this.touchend.bind(this));
            document.addEventListener('touchcancel', this.touchcancel.bind(this));
        };

        this.touchstart = function (e) {
            UserEvent.trigger('touchstart', e);
        };

        this.touchmove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            UserEvent.trigger('touchmove', e);
        };

        this.touchend = function (e) {
            UserEvent.trigger('touchend', e);
        };

        this.touchcancel = function (e) {
            UserEvent.trigger('touchcancel', e);
        };
        
        this.initialize();
    };

	return TouchController;
});

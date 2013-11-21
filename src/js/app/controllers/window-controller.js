/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var WindowController,
        UserEvent = require('app/events/user-event');

    WindowController = function () {

        this.initialize = function () {
            window.addEventListener('resize', this.resize.bind(this));
            window.addEventListener('orientationchange', this.orientationchange.bind(this));
        };

        this.resize = function (e) {
            UserEvent.trigger('resize');
        };

        this.orientationchange = function (e) {
            UserEvent.trigger('orientationchange');
        };

        this.initialize();
    };

	return WindowController;
});

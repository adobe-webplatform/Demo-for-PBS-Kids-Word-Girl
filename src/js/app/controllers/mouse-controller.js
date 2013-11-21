/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var MouseController,
        UserEvent = require('app/events/user-event');

    MouseController = function () {

        this.initialize = function () {
            document.addEventListener('mousewheel', this.mousewheel.bind(this));
        };

        this.mousewheel = function (e) {
            UserEvent.trigger('mousewheel', e);
        };
        
        this.initialize();
    };

	return MouseController;
});

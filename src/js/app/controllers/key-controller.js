/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var KeyController,
        UserEvent = require('app/events/user-event');

    KeyController = function () {

        this.initialize = function () {
            document.addEventListener('keydown', this.keydown.bind(this));
            document.addEventListener('keyup', this.keyup.bind(this));
        };

        this.keydown = function (e) {
            UserEvent.trigger('keydown', e);
        };

        this.keyup = function (e) {
            UserEvent.trigger('keyup', e);
        };

        this.initialize();
    };

	return KeyController;
});

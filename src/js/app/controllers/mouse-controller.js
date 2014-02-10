/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var MouseController,
        UserEvent = require('app/events/user-event');

    MouseController = function () {

        this.initialize = function () {
            document.addEventListener('mousewheel', this.mousewheel.bind(this));
            document.addEventListener('click', this.click.bind(this));
            document.addEventListener('mousedown', this.mousedown.bind(this));
            document.addEventListener('mouseup', this.mouseup.bind(this));
            document.addEventListener('mousemove', this.mousemove.bind(this));
        };

        this.mousewheel = function (e) {
            UserEvent.trigger('mousewheel', e);
        };

        this.click = function (e) {
            UserEvent.trigger('click', e);
        };

        this.mousedown = function (e) {
            UserEvent.trigger('mousedown', e);
        };

        this.mouseup = function (e) {
            UserEvent.trigger('mouseup', e);
        };

        this.mousemove = function (e) {
            UserEvent.trigger('mousemove', e);
        };

        
        this.initialize();
    };

	return MouseController;
});

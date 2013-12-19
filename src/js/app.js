/*global define $ requestAnimationFrame Modernizr*/

define(function (require) {
	
	var App,
		Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        AppRouter = require('app-router'),
        ComicView = require('app/views/comic-view'),
        MouseController = require('app/controllers/mouse-controller'),
        TouchController = require('app/controllers/touch-controller'),
        WindowController = require('app/controllers/window-controller'),
        AppEvent = require('app/events/app-event');

    App = Backbone.View.extend({

        initialize: function () {

            //controllers
            this.mouseController = new MouseController();
            this.windowController = new WindowController();

            if (Modernizr.touch !== false) {
                this.touchController = new TouchController();
            }           
 
            //router
            Vars.set('router', AppRouter);
            Backbone.history.start();
           
            //add views
            this.comicView = new ComicView();

            requestAnimationFrame(this.render.bind(this));
        },

        render: function () {
            AppEvent.trigger('render');
            requestAnimationFrame(this.render.bind(this));
        }
    });

	return new App();
});

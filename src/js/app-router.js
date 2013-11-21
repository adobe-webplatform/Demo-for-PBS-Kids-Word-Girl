/*global define*/
define(function (require) {
	
	var Backbone = require('backbone'),
        AppEvent = require('app/events/app-event'),
		AppRouter,
        router;

    AppRouter = Backbone.Router.extend({
		routes: {
            '': 'index',
            'frame/:id': 'frame'
		},

        index: function () {
            router.navigate('frame/0');
        },

        frame: function (id) {

        }
	});

    router = new AppRouter();
	
	return router;
});

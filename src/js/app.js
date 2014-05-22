/*global define $ requestAnimationFrame Modernizr*/
/**
 *
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
define(function (require) {
	
	var App,
		Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        AppRouter = require('app-router'),
        ComicView = require('app/views/comic-view'),
        MouseController = require('app/controllers/mouse-controller'),
        TouchController = require('app/controllers/touch-controller'),
        WindowController = require('app/controllers/window-controller'),
        KeyController = require('app/controllers/key-controller'),
        AppEvent = require('app/events/app-event');

    App = Backbone.View.extend({

        initialize: function () {

            //controllers
            this.keyController = new KeyController();
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

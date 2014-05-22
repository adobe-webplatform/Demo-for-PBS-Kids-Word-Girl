/*global define $ requestAnimationFrame*/
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

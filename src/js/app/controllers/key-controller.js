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

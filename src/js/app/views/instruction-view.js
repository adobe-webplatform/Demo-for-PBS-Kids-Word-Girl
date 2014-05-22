/*global define $ requestAnimationFrame Snap*/
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
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        InstructionView;

    require('snap');

    InstructionView = Backbone.View.extend({

        initialize: function () {
		    this.s = new Snap('#instructions-svg');
            this.circle = this.s.circle(window.innerWidth, window.innerHeight / 2, window.innerWidth / 2);
            this.circle.attr({
                fill: 'rgba(0, 0, 0, 0.5)', 
                stroke: 'rgba(255, 255, 255, 0.8)', 
                'stroke-width': '10', 
                'stroke-dasharray': '20, 10'
            });

            this.text = this.s.text(window.innerWidth - (window.innerWidth / 4), window.innerHeight / 2, 'click here');
            this.text.attr({
                'fill': 'white',
                'text-anchor': 'middle',
                'font-family': 'architects-daughter',
                'font-size': '20px'
            });
        }

    });

	return InstructionView;
});

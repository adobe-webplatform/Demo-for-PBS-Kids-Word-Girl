/*global define $ requestAnimationFrame Snap*/

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

/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        UserEvent = require('app/events/user-event'),
        Vars = require('app/models/vars'),
        CellView = require('app/views/cell-view'),
        Cell; 

    Cell = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            alpha: 1,
            src: '',
            img: null,
            loaded: false,
            view: null
        },

        initialize: function (options) {
            var vName = options.layer.name,
                vInt = options.layer.id,
                vView;

            console.log(options.layer);
            
            vView = CellView;
            this.set('view', new vView({cell: this, layers: options.layer.layers}));
            
            //this.windowWidth = window.innerWidth;
            //this.windowHeight = window.innerHeight;
            //UserEvent.on('resize', this.resize.bind(this));
        },

        center: function () {
            var _x = (this.get('w') / 2) + this.get('x') * Vars.get('scale'),
                _y = (this.get('h') / 2) + this.get('y') * Vars.get('scale');

            return {x: _x, y: _y};
        },

        resize: function () {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        }
    });

	return Cell;
});

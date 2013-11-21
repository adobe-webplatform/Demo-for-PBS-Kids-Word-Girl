/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        CellView = require('app/views/cell-view'),
        CellView2 = require('app/views/cells/cell-view-2'),
        CellView3 = require('app/views/cells/cell-view-3'),
        CellView6 = require('app/views/cells/cell-view-6'),
        Cell;

    Cell = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            src: '',
            img: null,
            loaded: false,
            view: null
        },

        initialize: function () {

            switch (this.get('src')) {
            case 'frame2':
                this.set('view', new CellView2({cell: this}));
                break;
            case 'frame3':
                this.set('view', new CellView3({cell: this}));
                break;
            case 'frame6':
                this.set('view', new CellView6({cell: this}));
                break;
            default:
                this.set('view', new CellView({cell: this}));
                break;
            }
        },

        center: function () {
            var _x = (window.innerWidth / 2) - ((this.get('w') / 2) + this.get('x') * Vars.get('scale')),
                _y = (window.innerHeight / 2) - ((this.get('h') / 2) + this.get('y') * Vars.get('scale'));

            return {x: _x, y: _y};
        }
    });

	return Cell;
});

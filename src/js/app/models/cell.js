/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        UserEvent = require('app/events/user-event'),
        Vars = require('app/models/vars'),
        CellView = require('app/views/cell-view'),
        CellViewCover = require('app/views/cells/cell-view-cover'),
        CellView1 = require('app/views/cells/cell-view-1'),
        CellView2 = require('app/views/cells/cell-view-2'),
        CellView3 = require('app/views/cells/cell-view-3'),
        CellView5 = require('app/views/cells/cell-view-5'),
        CellView6 = require('app/views/cells/cell-view-6'),
        CellView7 = require('app/views/cells/cell-view-7'),
        CellView8 = require('app/views/cells/cell-view-8'),
        CellView9 = require('app/views/cells/cell-view-9'),
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

        initialize: function () {
            switch (this.get('src')) {
            case 'cover':
                this.set('view', new CellViewCover({cell: this}));
                break;
            case 'frame1':
                this.set('view', new CellView1({cell: this}));
                break;
            case 'frame2':
                this.set('view', new CellView2({cell: this}));
                break;
            case 'frame3':
                this.set('view', new CellView3({cell: this}));
                break;
            case 'frame5':
                this.set('view', new CellView5({cell: this}));
                break;
            case 'frame6':
                this.set('view', new CellView6({cell: this}));
                break;
            case 'frame7':
                this.set('view', new CellView7({cell: this}));
                break;
            case 'frame8':
                this.set('view', new CellView8({cell: this}));
                break;
            case 'frame9':
                this.set('view', new CellView9({cell: this}));
                break;
            default:
                this.set('view', new CellView({cell: this}));
                break;
            }

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            UserEvent.on('resize', this.resize.bind(this));
        },

        center: function () {
            //var _x = (window.innerWidth / 2) - ((this.get('w') / 2) + this.get('x') * Vars.get('scale')),
            //    _y = (window.innerHeight / 2) - ((this.get('h') / 2) + this.get('y') * Vars.get('scale'));
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

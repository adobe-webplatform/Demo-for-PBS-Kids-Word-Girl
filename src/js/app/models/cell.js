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
        CellView10 = require('app/views/cells/cell-view-10'),
        CellView11 = require('app/views/cells/cell-view-11'),
        CellView12 = require('app/views/cells/cell-view-12'),
        CellView13 = require('app/views/cells/cell-view-13'),
        cellList = [
            CellViewCover,
            CellView1,
            CellView2,
            CellView3,
            null,
            CellView5,
            CellView6,
            CellView7,
            CellView8,
            CellView9,
            CellView10,
            CellView11,
            CellView12,
            CellView13
        ],
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
            var vName = this.get('src').replace('frame', ''),
                vInt,
                v;

            if (vName == 'cover') {
                vInt = 0;
            } else {
                vInt = vName;
            }

            if (cellList[vInt] !== null) {
                v = cellList[vInt];
            } else {
                v = CellView;
            }
            
            this.set('view', new v({cell: this}));

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

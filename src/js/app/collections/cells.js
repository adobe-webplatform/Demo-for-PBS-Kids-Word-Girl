/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Cell = require('app/models/cell'),
        data = require('text!app/data/document.json'),
        Cells,
        CellList = [
        	require('app/views/cells/frame0'),
            require('app/views/cells/frame1'),
            require('app/views/cells/frame2'),
            require('app/views/cells/frame3'),
            null,
            require('app/views/cells/frame3')
        ];

    Cells = Backbone.Collection.extend({
        model: Cell,
        initialize: function () {
            var c,
                i,
                layer;

            this.on('add', this.handle_ADD.bind(this));

            data = JSON.parse(data);

            for (i = 0; i < data.layers.length; i += 1) {
                layer = data.layers[i];

                if (CellList[i]) {
                    c = new Cell({layer: layer, num: i, view: CellList[i]});
                } else {
                    c = new Cell({layer: layer, num: i});
                }

                this.add(c);
            }
            
        },

        parse: function (resp, options) {
            return resp;
        },

        handle_ADD: function (m) {
            //console.log('add', m);
        }

    });

	return Cells;
});

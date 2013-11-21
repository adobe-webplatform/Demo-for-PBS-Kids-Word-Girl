/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Cell = require('app/models/cell'),
        Cells;

    Cells = Backbone.Collection.extend({
        model: Cell,
        url: 'js/app/data/cells.json',
        initialize: function () {
            this.on('add', this.handle_ADD.bind(this));
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

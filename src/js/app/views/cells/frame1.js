/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cells/cell-view'),
        CellView2;

    CellView2 = CellView.extend({
        initialize: function () {
            console.log('hi');
            CellView.prototype.initialize.call(this);
        }
    });

	return CellView2;
});

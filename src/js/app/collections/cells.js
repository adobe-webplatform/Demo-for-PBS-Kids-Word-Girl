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
            require('app/views/cells/frame5'),
            require('app/views/cells/frame6'),
            require('app/views/cells/frame7'),
            require('app/views/cells/frame8'),
            require('app/views/cells/frame9'),
            require('app/views/cells/frame10'),
            require('app/views/cells/frame11'),
            require('app/views/cells/frame12'),
            require('app/views/cells/frame13'),
            require('app/views/cells/frame14'),
            require('app/views/cells/frame15'),
            require('app/views/cells/frame16'),
            require('app/views/cells/frame17'),
            require('app/views/cells/frame18'),
            require('app/views/cells/frame19'),
            require('app/views/cells/frame20'),
            null,
            require('app/views/cells/frame22'),
            require('app/views/cells/frame23'),
            require('app/views/cells/frame24'),
            require('app/views/cells/frame25'),
            require('app/views/cells/frame26'),
            require('app/views/cells/frame27'),
            require('app/views/cells/frame28'),
            require('app/views/cells/frame29'),
            require('app/views/cells/frame30'),
            null,
            require('app/views/cells/frame32'),
            null,
            require('app/views/cells/frame34'),
            null,
            require('app/views/cells/frame36'),
            require('app/views/cells/frame37'),
            require('app/views/cells/frame38'),
            require('app/views/cells/frame39'),
            null,
            null,
            null,
            null,
            require('app/views/cells/frame44'),
			null,
			null,
            require('app/views/cells/frame47'),
            require('app/views/cells/frame48'),
            require('app/views/cells/frame49'),
            require('app/views/cells/frame50'),
			null,
			null,
			null,
            require('app/views/cells/frame54'),
            require('app/views/cells/frame55'),
            require('app/views/cells/frame56'),
            require('app/views/cells/frame57'),
			null,
			null,
            require('app/views/cells/frame60'),
            require('app/views/cells/frame61'),
			null,
			null,
			null,
			null,
			null,
			null,
            require('app/views/cells/frame68'),
            require('app/views/cells/frame69'),
            require('app/views/cells/frame70'),
            require('app/views/cells/frame71'),
			null,
            require('app/views/cells/frame73'),
			null,
			null,
			null,
			require('app/views/cells/frame77'),
            require('app/views/cells/frame78')
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

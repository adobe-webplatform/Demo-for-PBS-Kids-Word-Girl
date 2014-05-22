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
	
	var Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        BubbleCircle;

    require('snap');

    BubbleCircle = function (s, el) {
        var bubble,
            arrow,
            points,
            stroke = 3;

        function init() {

            var x,
                y,
                i,
                centerX = el.offsetLeft + el.offsetWidth / 2,
                centerY = el.offsetTop + el.offsetHeight / 2,
                radiusX = (el.offsetWidth / 2) - (stroke * 2),
                radiusY = (el.offsetHeight / 2) - (stroke * 2),
                point,
                points = [],
                pointString = "",
                numpoints = 50,
                a,
                angle,
                arr;


            //adjust inc part and numpoints
            for (i = 0; i < numpoints; i += 1) {
                a = 2 * Math.PI * i / numpoints;
                
                x = centerX + Math.sin(a) * radiusX;
                y = centerY + Math.cos(a) * radiusY;
                point = {x: x, y: y};

                if (i !== 0) {
                    pointString += " ";
                }

                if (el.getAttribute('data-point')) {
                    if (i == el.getAttribute('data-c')) {
                        arr = el.getAttribute('data-point').split(',');
                        pointString += arr[0] + "," + arr[1];
                    } else {
                        pointString += x + "," + y;
                        points.push(point);
                    }
                } else {
                    pointString += x + "," + y;
                    points.push(point);
                }
                
            }

            s.polygon(pointString).attr({
                fill: "#fff",
                stroke: "#000",
                strokeWidth: stroke
            });

            /*
            if (el.getAttribute('data-point')) {
                addArrow();
            }

            bubble = s.ellipse(el.offsetLeft + el.offsetWidth / 2, el.offsetTop + el.offsetHeight / 2, (el.offsetWidth / 2) - (stroke * 2), (el.offsetHeight / 2) - (stroke * 2));
            bubble.attr({
                fill: "#fff",
                stroke: "#000",
                strokeWidth: stroke
            });
            */

        }

        function addArrow() {
            var arr,
                center,
                p1,
                p2,
                p3,
                angle;

            arr = el.getAttribute('data-point').split(',');
            p1 = {x: arr[0], y: arr[1]};
            center = {x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2};
            p2 = {x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2};

            var dx = p2.x - p1.x,
                dy = p2.y - p1.y;
            angle = Math.atan(dy / dx) * 180 / Math.PI;

            p3 = {x: center.x + 30 * Math.cos(angle), y: center.y - 30 * Math.sin(angle)};
            //p2 = {x: center.x - 10 * Math.cos(-angle), y: center.y - 10 * Math.sin(-angle)};
            //p3 = {x: p2.x - 20, y: p2.y};

            points = [
                p1,
                p2,
                p3
            ];

            arrow = s.polygon(points[0].x + "," + points[0].y + " " + points[1].x + "," + points[1].y + " " + points[2].x + "," + points[2].y).attr({
                fill: "#fff",
                stroke: "#000",
                strokeWidth: stroke
            });
        }

        init();
    };

	return BubbleCircle;
});

/*global define $ requestAnimationFrame Snap*/

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
            //this.s = new Snap(1000, 1000);

            console.log(el);
            if (el.getAttribute('data-point')) {
                addArrow();
            }

            bubble = s.ellipse(el.offsetLeft + el.offsetWidth / 2, el.offsetTop + el.offsetHeight / 2, (el.offsetWidth / 2) - (stroke * 2), (el.offsetHeight / 2) - (stroke * 2));
            bubble.attr({
                fill: "#fff",
                stroke: "#000",
                strokeWidth: stroke
            });

            //el.appendChild(this.s.node);
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

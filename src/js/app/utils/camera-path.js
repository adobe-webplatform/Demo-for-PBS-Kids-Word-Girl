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
	
	var CameraPath,
        CameraPoint;

    CameraPoint = function (x, y, k, p) {
        this.x = x;
        this.y = y;

        if (typeof(k) !== 'undefined') {
            this.type = 'key';
            this.keyId = k;
            this.pointId = p;
        } else {
            this.type = 'point';
        }
    };

    CameraPath = function (keyPoints) {
        var i,
            j,
            center,
            keyPoint,
            key,
            point;

        this.currentPosition = 0;
        this.currentKey = 0;
        this.path = [];
        this.keys = [];

        /**
         * populate path
         */
        this.initialize = function () {
            
            for (i = 0; i < keyPoints.length; i += 1) {
                
                keyPoint = keyPoints.at(i);
                center = this.getCenterPoint(keyPoint);

                key = new CameraPoint(center.x, center.y, i, this.path.length);
                this.path.push(key);
                this.keys.push(key);

                if (i < keyPoints.length - 1) {
                    for (j = 0; j < 100; j += 1) {
                        point = this.getIntervalPoint(keyPoint, keyPoints.at(i + 1), j);
                        this.path.push(point);
                    }
                }
            }
        };

        /**
        * get point between two points at interval
        */
        this.getIntervalPoint = function (p1, p2, o) {
            var f,
                x,
                y,
                center1,
                center2;

            center1 = this.getCenterPoint(p1);
            center2 = this.getCenterPoint(p2);
            f = o / 100;
            x = center1.x + (center2.x - center1.x) * f;
            y = center1.y + (center2.y - center1.y) * f;
            
            return new CameraPoint(x, y);
        };

        /**
         * get center point
         */
        this.getCenterPoint = function (obj) {
            var _x,
                _y;

            _x = obj.get('x') + (obj.get('w') / 2);
            _y = obj.get('y') + (obj.get('h') / 2);

            return {x: _x, y: _y};
        };

        this.initialize();

    };

	return CameraPath;
});

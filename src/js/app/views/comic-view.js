/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        Anim = require('app/utils/anim/anim'),
        CellCollection = require('app/collections/cells'),
        CameraPath = require('app/utils/camera-path'),
        CanvasView = require('app/views/canvas-view'),
        DomView = require('app/views/dom-view'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        ComicView;

    ComicView = Backbone.View.extend({

        initialize: function () {
            this.position = {x: 0, y: 0};
            this.positionDelta = {x: 0, y: 0}; //delta for tracking
            this.touchDelta = {x: 0, y: 0}; //delta for tracking
            this.scale = 1;
            this.animating = true;

			this.cells = new CellCollection();
            this.cells.fetch({success: this.handle_CELLS_READY.bind(this)});
        },

        render: function () {
            Vars.set('x', this.position.x);
            Vars.set('y', this.position.y);
            Vars.set('scale', this.scale);

            if (this.animating !== false) {
                AppEvent.trigger('animate');
            }
        },

        handle_CELLS_READY: function () {

            this.cameraPath = new CameraPath(this.cells);

		    this.canvasView = new CanvasView({cells: this.cells, path: this.cameraPath});
            this.domView = new DomView({cells: this.cells});

            var cell = this.cells.at(Vars.get('currentFrame'));
            this.position = {x: cell.center().x, y: cell.center().y};

            UserEvent.on('mousewheel', this.handle_MOUSEWHEEL.bind(this));
            UserEvent.on('touchstart', this.handle_TOUCHSTART.bind(this));
            UserEvent.on('touchmove', this.handle_TOUCHMOVE.bind(this));
            UserEvent.on('touchend', this.handle_TOUCHEND.bind(this));
            AppEvent.on('render', this.render.bind(this));
        },

        handle_TOUCHSTART: function (e) {
			var touch = e.touches[0];
            
            //clearTimeout(ANIMATE_TIMEOUT);
            Anim.kill();
            
            if (e.touches.length > 1) {
                return;
            }
            
            this.positionDelta = {x: this.position.x, y: this.position.y};
            this.touchDelta = {x: touch.pageX, y: touch.pageY};
        },

        handle_TOUCHMOVE: function (e) {
		    var touch,
                difference;

            if (e.touches.length > 1) {
                return;
            }
            
            this.animating = false;

            touch = e.touches[0];
            difference = {x: 0, y: 0};
                            
            difference.x = this.touchDelta.x - touch.pageX;
            difference.y = this.touchDelta.y - touch.pageY;
            
            this.position.x = this.positionDelta.x - difference.x;	
            this.position.y = this.positionDelta.y - difference.y;
            
            this.prevTouchPos = {x: touch.pageX, y: touch.pageY};
        },

        handle_TOUCHEND: function (e) {
            var point;

            if (this.prevTouchPos) {
                this.navigateFrames(this.prevTouchPos.x, this.touchDelta.x);
            }

            point = this.cells.at(Vars.get('currentFrame')).center();
            Anim.to(this.position, 0.5, {
                x: point.x, 
                y: point.y
            }, {
                onComplete: function () {
                    this.animating = true;
                }.bind(this)
            });
        },

        /**
         * navigate along camera path with mousewheel
         */
        handle_MOUSEWHEEL: function (e) {

            var camera = this.cameraPath,
                pos = camera.currentPosition,
                path = camera.path;

            //mousewheel
            if (e.wheelDeltaY % 120 === 0) {
                return;
            }

            this.animating = false;

            e.preventDefault();
            
            Anim.kill();
            clearTimeout(this.MOUSEWHEEL_TIMEOUT);

            //track pad
            if (pos - e.wheelDeltaY > 0 && pos - e.wheelDeltaY < path.length - 1) {
                pos -= e.wheelDeltaY;
            } else if (pos - e.wheelDeltaY < 0) {
                pos = 0;
            } else if (pos - e.wheelDeltaY > path.length - 1) {
                pos = path.length - 1;
            }
            
            camera.currentPosition = pos;
            this.position.x = -(path[pos].x * this.scale) + (window.innerWidth / 2);
            this.position.y = -(path[pos].y * this.scale) + (window.innerHeight / 2);

            this.MOUSEWHEEL_TIMEOUT = setTimeout(this.cameraToClosestFrame.bind(this), 300);
        },

        /**
         * animate to the nearest keyframe
         */
        cameraToClosestFrame: function () {
            
            var closestKey,
                i,
                diff,
                pos = this.cameraPath.currentPosition,
                keys = this.cameraPath.keys,
                keyId;
                
            for (i = 0; i < keys.length; i += 1) {
                diff = Math.abs(keys[i].pointId - pos);
                    
                if (i === 0) {
                    closestKey = keys[i];
                    keyId = i;
                } else if (diff < Math.abs(closestKey.pointId - pos)) {
                    closestKey = keys[i];
                    keyId = i;
                }
            }	
            
            this.cameraPath.currentKey = keyId;
            this.cameraPath.currentPosition = closestKey.pointId;
            Vars.set('currentFrame', keyId);

            //checkScale();
    
            Anim.to(this.position, 0.5, {
                x: -closestKey.x * this.scale + (window.innerWidth / 2), 
                y: -closestKey.y * this.scale + (window.innerHeight / 2)
            }, {
                onComplete: function () {
                    this.animating = true;
                }.bind(this)
            });

        },

        navigateFrames: function (p, d) {
            var padding = 150,
                currentFrame = Vars.get('currentFrame');
            
            if (p < d - padding) {
                currentFrame = currentFrame < this.cells.length ? currentFrame + 1 : this.cells.length;
            } else if (p > d + padding) {
                currentFrame = currentFrame > 0 ? currentFrame - 1 : 0;
            }

            Vars.set('currentFrame', currentFrame);
        }

    });

	return ComicView;
});

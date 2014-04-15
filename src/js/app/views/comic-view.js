/*global define $ requestAnimationFrame Modernizr*/

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
            var frameNumber;

			this.zoomed = false;
            this.position = {x: 0, y: 0};
            this.positionDelta = {x: 0, y: 0}; //delta for tracking
            this.touchDelta = {x: 0, y: 0}; //delta for tracking
            this.scale = 1;
            this.animating = true;

			Vars.set('tweening', false);
            this.router = Vars.get('router');

            //determine initial frame
            if (Backbone.history.fragment && Backbone.history.fragment.search('frame') > -1) {
                frameNumber = Backbone.history.fragment.replace('frame/', '');
                Vars.set('currentFrame', parseFloat(frameNumber));
            }

			this.cells = new CellCollection();

            this.load(this.handle_CELLS_READY.bind(this)); // callback when first 3 are loaded
        },

        /*maybe consider waterfall loading instead*/
        load: function (callback) {
            var instance = this,
                framesLoaded = 0,
                currentFrame,
                currentView,
                currentFrameNumber = Vars.get('currentFrame');
            
            function loadFrame(num, cb) {
                
                if (num < 0 || num > instance.cells.length - 1) {
                    cb();
                    return;
                }

                currentFrame = instance.cells.at(num);
                currentView = currentFrame.get('view');

                if (currentView.loaded !== true) {
                    currentView.load(cb);
                } else {
                    cb();
                }
            }

            function loadFrameComplete() {
                framesLoaded += 1;

                if (framesLoaded == 3 && typeof(callback) == 'function') {
                    callback();
                }
            }

            loadFrame(currentFrameNumber, loadFrameComplete);
			loadFrame(currentFrameNumber - 1, loadFrameComplete);
			loadFrame(currentFrameNumber + 1, loadFrameComplete);
        
			//TODO:: waterfall in both directions
		},
		
		waterfallLoad: function (callback) {
			var instance = this,
				up,
				down;
				
			function loadUp() {
				up += 1;
				
				if (up > instance.cells.length - 1) {
                	return;
				}
				
	            var frame = instance.cells.at(up),
	            	view = currentFrame.get('view');
	
				view.load(loadUp);
 			}

			function loadDown() {
				down -= 1;
				
				if (down < 0 ) {
                	return;
				}
				
				var frame = instance.cells.at(down),
					view = currentFrame.get('view');
					
				view.load(loadDown);
			}
			
			//TODO:: load up and load down
		},

        render: function () {
            var i,
                cell,
                distance,
                alpha,
                divisor = 1000;

            Vars.set('x', this.position.x);
            Vars.set('y', this.position.y);
            Vars.set('scale', this.scale);

            if (this.animating !== false) {
                AppEvent.trigger('animate');
            }
        },

        handle_CELLS_READY: function () {

            this.cameraPath = new CameraPath(this.cells);
            this.cameraPath.currentKey = Vars.get('currentFrame');
            this.cameraPath.currentPosition = this.cameraPath.keys[this.cameraPath.currentKey].pointId;

		    this.canvasView = new CanvasView({cells: this.cells, path: this.cameraPath});
            this.domView = new DomView({cells: this.cells});

            var cell = this.cells.at(Vars.get('currentFrame'));
            this.scale = this.checkScale();
            this.set({x: cell.center().x, y: cell.center().y});

            if (Modernizr.touch !== false) {
                UserEvent.on('touchstart', this.handle_TOUCHSTART.bind(this));
                UserEvent.on('touchmove', this.handle_TOUCHMOVE.bind(this));
                UserEvent.on('touchend', this.handle_TOUCHEND.bind(this));
            } else {
                UserEvent.on('mousewheel', this.handle_MOUSEWHEEL.bind(this));
                UserEvent.on('click', this.handle_CLICK.bind(this));
            }
            
            UserEvent.on('keydown', this.handle_KEYDOWN.bind(this));
            UserEvent.on('resize', this.resize.bind(this));
            UserEvent.on('orientationchange', this.orientationchange.bind(this));
            
            AppEvent.on('render', this.render.bind(this));

			//hide preloader
			$('#preloader').addClass('hide');
			setTimeout(function () {
			    $('#preloader').css({display: 'none'});
			}, 500);
        },

        handle_CLICK: function (e) {
            if (e.x > window.innerWidth / 2) {
                this.next();
            } else {
                this.previous();
            }
        },

        handle_KEYDOWN: function (e) {
            switch (e.keyCode) {
            case 39:
                this.next();
                break;
            case 37:
                this.previous();
                break;
			case 32:
				this.zoom();
				break;
            }
        },

        handle_TOUCHSTART: function (e) {
			
            var touch = e.touches[0];
            
            if (touch.pageX > window.innerWidth / 2) {
                this.next();
            } else {
                this.previous();
            }
        },

        handle_TOUCHMOVE: function (e) {
            
        },

        handle_TOUCHEND: function (e) {
            
        },

        /**
         * navigate along camera path with mousewheel
         */
        handle_MOUSEWHEEL: function (e) {

            if (this.animating === true) {

                e.preventDefault();
                e.stopPropagation();
                
                Anim.kill();

                if (e.wheelDeltaY < -120 || e.wheelDeltaX < -120) {
                    this.next();
                } else if (e.wheelDeltaY > 120 || e.wheelDeltaX > 120) {
                    this.previous();
                }
            }
        },

		zoom: function () {
			var key,
                keys = this.cameraPath.keys;

			if (Vars.get('tweening') !== false) {
                return;
            }

			if (this.zoomed !== true) {
				this.zoomed = true;
				
				key = keys[keys.length];
				//this.router.navigate('frame/' + this.cameraPath.currentKey);
	            //Vars.set('currentFrame', this.cameraPath.currentKey);
	            this.tweento(key);
	            this.load();
			} else {
				this.zoomed = false;
				
	            key = keys[this.cameraPath.currentKey];
				this.router.navigate('frame/' + this.cameraPath.currentKey);
	            Vars.set('currentFrame', this.cameraPath.currentKey);
	            this.tweento(key);
	            this.load();
			}
		},

        next: function () {
            var key,
                keys = this.cameraPath.keys;

            if (Vars.get('tweening') !== false) {
                return;
            }

            this.cameraPath.currentKey = this.cameraPath.currentKey < keys.length - 1 ? this.cameraPath.currentKey + 1 : keys.length - 1;
            key = keys[this.cameraPath.currentKey];
			this.router.navigate('frame/' + this.cameraPath.currentKey);
            Vars.set('currentFrame', this.cameraPath.currentKey);
            this.tweento(key);
            this.load();
        },

        previous: function () {
            var key,
                keys = this.cameraPath.keys;

            if (Vars.get('tweening') !== false) {
                return;
            }

            this.cameraPath.currentKey = this.cameraPath.currentKey > 0 ? this.cameraPath.currentKey - 1 : 0;
            key = keys[this.cameraPath.currentKey];
			this.router.navigate('frame/' + this.cameraPath.currentKey);
            Vars.set('currentFrame', this.cameraPath.currentKey);
            this.tweento(key);
            this.load();
        },

        set: function (point) {
            var scale = this.checkScale();

            this.position.x = -point.x * scale + (window.innerWidth / 2);
            this.position.y = -point.y * scale + (window.innerHeight / 2);
            this.animating = true;
            Vars.set('tweening', false);
            this.load();
        },

        /**
         * tween to frame
         */
        tweento: function (point) {
            this.animating = false;
            Vars.set('tweening', true);
            
            var scale = this.checkScale();
            Anim.to(this, 0.5, {scale: scale}, {});

            Anim.to(this.position, 0.5, {
                x: -point.x * scale + (window.innerWidth / 2), 
                y: -point.y * scale + (window.innerHeight / 2)
            }, {
                onComplete: function () {
                    this.animating = true;
                    Vars.set('tweening', false);
                }.bind(this)
            });
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
                keyId,
                scale;
                
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
			this.router.navigate('frame/' + this.cameraPath.currentKey);
            this.cameraPath.currentPosition = closestKey.pointId;
            Vars.set('currentFrame', keyId);

            this.tweento(closestKey);
        },

        /**
         * set scale based on w/h ratio
         */
        checkScale: function () {
            var cell = this.cells.at(Vars.get('currentFrame')),
                _winHeight = window.innerHeight,
                _winWidth = window.innerWidth,
                widthDiff = 0,
                heightDiff = 0,
                scale = 1;

            if (cell.get('w') > _winWidth) {
                widthDiff = cell.get('w') - _winWidth;
            }

            if (cell.get('h') > _winHeight) {
                heightDiff = cell.get('h') - _winHeight;
            }

            if (widthDiff > heightDiff) {
                scale = _winWidth / cell.get('w');
            } else if (heightDiff > widthDiff) {
                scale = _winHeight / cell.get('h');
            } else {
                scale = 1;
            }

            scale = Math.round(scale * 100) / 100;

            return scale;
        },

        orientationchange: function () {
            this.resize();
        },

        resize: function () {
            var key,
                keys = this.cameraPath.keys;

            this.cameraPath.currentKey = Vars.get('currentFrame');
            key = keys[this.cameraPath.currentKey];
            this.tweento(key);
        }

    });

	return ComicView;
});

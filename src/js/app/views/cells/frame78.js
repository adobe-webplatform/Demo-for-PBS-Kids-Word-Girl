/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Backbone = require('backbone'),
        Vars = require('app/models/vars'),
        UserEvent = require('app/events/user-event'),
        AppEvent = require('app/events/app-event'),
        CellView = require('app/views/cells/cell-view'),
        Frame;

    Frame = CellView.extend({
        initialize: function () {
			this.videoLoaded = false;
            CellView.prototype.initialize.call(this);
        },
		
		handle_CANPLAYTHROUGH: function (e) {
			console.log('playthrough');
			this.videoLoaded = true;
		},
		
		handle_LOADEDDATA: function (e) {
			console.log('loadeddata');
			
		},
		
		load: function (callback) {
			
			this.video = document.createElement('video');
						
			this.video.addEventListener('canplaythrough', this.handle_CANPLAYTHROUGH.bind(this));
			this.video.addEventListener('loadeddata', this.handle_LOADEDDATA.bind(this));
			
			if (this.video.canPlayType) {
				if (this.video.canPlayType('video/mp4; codecs="mp4v.20.8"') || this.video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
					this.video.src = "assets/videos/final.mp4";
				} else if (this.video.canPlayType('video/ogg; codecs="theora"')) {
					this.video.src = "assets/videos/final.ogg";
				} else {
					this.video.src = "assets/videos/final.mov"; //safari
				}
			} else {
				//does not support
			}

			CellView.prototype.load.call(this, callback);
		},

        render: function (ctx) {
            var currentFrame = this.options.num == Vars.get('currentFrame');

            CellView.prototype.render.call(this, ctx);

            if (currentFrame && this.layers.length > 0) {
				if (this.videoLoaded !== false) {
					this.video.play();
					ctx.drawImage(this.video, this.cell.get('x'), this.cell.get('y'));
				}				
            } else {
				if (this.videoLoaded !== false) {
					this.video.pause();
					this.video.currentTime = 0;
				}
            }

        }
    });

	return Frame;
});


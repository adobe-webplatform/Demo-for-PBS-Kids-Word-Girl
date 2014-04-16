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
			this.ios = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
			this.ipad = ( navigator.userAgent.match(/iPad/g) ? true : false );
			this.iphone = ( navigator.userAgent.match(/(iPhone|iPod)/g) ? true : false );
			
			this.videoVisible = false;
			this.videoLoaded = false;
			this.videoPlaying = false;
			this.firstCall = false;
            CellView.prototype.initialize.call(this);
        },
		
		handle_CANPLAYTHROUGH: function (e) {
			console.log('playthrough');
			this.videoLoaded = true;
		},
		
		handle_LOADEDDATA: function (e) {
			console.log('loadeddata');
		},
		
		handle_EXITFULLSCREEN: function () {
			console.log('exitfullscreen');
			this.video.className = "";
			this.video.pause();
			this.videoPlaying = false;
		},
		
		click: function (e) {
			if (this.videoPlaying !== true) {
				e.preventDefault();
				e.stopPropagation();
				this.video.play();
				this.videoPlaying = true;
			} else {
				this.video.className = "";
				this.videoVisible = false;
				this.video.webkitExitFullscreen();
				this.video.pause();
				this.videoPlaying = false;	
			}
		},
		
		load: function (callback) {
			
			this.video = document.createElement('video');
			this.video.id = "video"
					
			this.video.addEventListener('canplaythrough', this.handle_CANPLAYTHROUGH.bind(this));
			this.video.addEventListener('loadeddata', this.handle_LOADEDDATA.bind(this));
			this.video.addEventListener('webkitendfullscreen', this.handle_EXITFULLSCREEN.bind(this));
			
			if (this.ios === true) {
				
				this.video.src = "assets/videos/final.m4v";
				this.video.addEventListener('touchstart', this.click.bind(this));
				document.body.appendChild(this.video);
				
			} else if (this.video.canPlayType) {
				
				if (this.video.canPlayType('video/mp4; codecs="mp4v.20.8"') || this.video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
					this.video.src = "assets/videos/final.mp4";
				} else if (this.video.canPlayType('video/ogg; codecs="theora"')) {
					this.video.src = "assets/videos/final.ogg";
				} else {
					this.video.src = "assets/videos/final.mov"; //safari
				}
				
			} else {
				
				alert('there was a problem detecting the correct video format');
				
			}
			
			CellView.prototype.load.call(this, callback);
		},

		play: function () {
			this.video.play();
			this.videoPlaying = true;
		},
		
		stop: function () {
			this.video.className = "";
			this.this.videoVisible = false;

			if (this.videoLoaded !== false && this.videoPlaying !== false) {
				this.video.pause();
				this.video.currentTime = 0;
			}
			
			this.videoPlaying = false;
		},

        render: function (ctx) {
            var currentFrame = this.options.num == Vars.get('currentFrame');

            CellView.prototype.render.call(this, ctx);
				
            if (currentFrame) {
				if (this.iphone === true && this.firstCall !== true) {	
					this.video.className = "in";
					this.videoVisible = true;
				}
				
				if (this.ipad === true && this.videoVisible !== true) {
					this.video.className = "in";
					this.videoVisible = true;
				} 
				
				if (this.ios !== true && this.videoLoaded !== false) {
					if (this.videoPlaying !== true) {
						this.play();
					}
					ctx.drawImage(this.video, this.cell.get('x'), this.cell.get('y'));
				}
				
				this.firstCall = true;

            } else {
	
				this.firstCall = false;
				
				if (this.videoPlaying !== false) {
					this.stop();
				}
			}
        }
    });

	return Frame;
});


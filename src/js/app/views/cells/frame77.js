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
			this.ios = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
			this.ipad = (navigator.userAgent.match(/iPad/g) ? true : false);
			this.iphone = (navigator.userAgent.match(/(iPhone|iPod)/g) ? true : false);
			
            this.holder = document.getElementById('video-holder');
            this.video = document.getElementById('video');
			this.videoVisible = false;
			this.videoLoaded = false;
			this.videoPlaying = false;
			this.firstCall = false;

            AppEvent.bind('domupdate', this.animationComplete.bind(this));

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
			
			this.video.addEventListener('canplaythrough', this.handle_CANPLAYTHROUGH.bind(this));
			this.video.addEventListener('loadeddata', this.handle_LOADEDDATA.bind(this));
			this.video.addEventListener('webkitendfullscreen', this.handle_EXITFULLSCREEN.bind(this));
			
			if (this.ios === true) {
				
				this.video.src = "assets/videos/final.m4v";
				this.video.addEventListener('touchstart', this.click.bind(this));
				//document.body.appendChild(this.video);
				
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
			this.holder.className = "";
			this.videoVisible = false;

			if (this.videoLoaded !== false && this.videoPlaying !== false) {
				this.video.pause();
				this.video.currentTime = 0;
			}
			
			this.videoPlaying = false;
		},

        animationComplete: function () {
            var currentFrame = this.options.num == Vars.get('currentFrame');
            
            if (currentFrame) {

                if (this.ios === true && 
                    this.videoVisible !== true) 
                {
                    this.holder.className = "in";
                    this.videoVisible = true;
                }

                if (this.iphone === true) {	
                    this.video.webkitEnterFullscreen();
                }

                if (this.ios !== true && 
                    this.videoLoaded !== false && 
                    this.videoPlaying !== true) 
                {
					this.play();
				}

            }
        },

        render: function (ctx) {
            var currentFrame = this.options.num == Vars.get('currentFrame');

            CellView.prototype.render.call(this, ctx);
				
            if (currentFrame) {

				if (this.ios !== true && this.videoLoaded !== false) {
					ctx.drawImage(this.video, this.cell.get('x'), this.cell.get('y'));
				}
				
            } else {
				if (this.videoPlaying !== false) {
					this.stop();
				}
			}
        }
    });

	return Frame;
});


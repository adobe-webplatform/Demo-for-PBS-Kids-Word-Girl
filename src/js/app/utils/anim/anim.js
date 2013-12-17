/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var Anim,
        Ease;

	Ease = {};
    Ease.none = function (t) {
        return t;
    };
    Ease.inOut = function (t) {
        return 0.5 - 0.5 * Math.cos(t * Math.PI);
    };
    Ease.out = function (t) {
        return Math.sin(t * (Math.PI / 2)) / 2;
    };

    /**
     * Anim
     */
    Anim = function () {
        var fps = 1000 / 60,
            idchar = 0,
            tweens = [],
            ease;

        function lerp(a, b, f) {
            return a + (b - a) * ease(f);
        }

        this.kill = function () {
            var i;

            for (i = 0; i < tweens.length; i += 1) {
                clearTimeout(tweens[i].timeout);
            }

            tweens = [];
        };

        this.to = function (item, dur, toProps, params) {
            var localTime = 0,
                prop,
                fromProps = {},
                tween = {id: idchar, timeout: null},
                i;
            
            tweens.push(tween);
            ease = params.ease || Ease.none;
            idchar += 1;

            for (prop in toProps) {
                if (typeof(item[prop]) !== 'undefined') {
                    fromProps[prop] = item[prop];
                }
            }

            function loop() {
                var key;

                localTime += fps * ((1 / dur) / 1000);
                
                for (key in fromProps) {
                    if (typeof(item[key]) !== 'undefined') {
                        item[key] = lerp(fromProps[key], toProps[key], localTime);
                    }
                }

                //continue loop or finish
                if (localTime < 1) {

                    tween.timeout = setTimeout(loop, fps);

                } else {
                    
                    //force resolve at last frame
                    for (key in fromProps) {
                        if (typeof(item[key]) !== 'undefined') {
                            item[key] = toProps[key];
                        }
                    }

                    //remove tween
                    for (i = 0; i < tweens.length; i += 1) {
                        if (tweens[i].id == tween.id) {
                            tweens.splice(i, 1);
                        }
                    }

                    if (typeof(params.onComplete) === 'function') {
                        params.onComplete();
                    }
                }
            }

            tween.timeout = setTimeout(loop, fps);
        };

    };

	return new Anim();
});

/*!
 * Progress Bar V 1.0 ~
 * Copyright (c) 2013 Vicky Gonsalves
 * http://vickygonsalves.vacau.com/license.html
 * Contact +91- 8097598395, +91-9766222843
 */

(function () {
    var B = [],
    // Constructor
        progressBar = function (wrapper, options) {

            var that = this,
                doc = document,
                i;

            // Default options


            that._target = doc.getElementById(wrapper);

            that.options = {
                imagesToPreload: 'all',
                showProgressBar: false,
                loaderImagePath: "http://mapsonline.dundeecity.gov.uk/DCC_GIS_Root/dcc_GIS_Config/images/loading.gif",
                showLoader: true,
                showLoadingText: false,
                loadingText: 'Loading',
                loadingTextClass: null,
                loaderStyle: 'opaque',
                transparency: 1,
                backgroundColor: '#000',
                initAnimation: null,
                destroyAnimation: null,
                initAnimationSpeed: 10,
                log: true
            }
            // User defined options
            for (i in options) that.options[i] = options[i];
            that._initLoader();


        };


// Prototype
    progressBar.prototype = {
        progress: 0,
        imagesLoaded: 0,
        imagesNotLoaded: 0,
        _loading: false,
        _start: function () {
            var that = this,
                doc = document;
            if (that.options.showProgressBar) {
                that._showProgressBar();
            }
            that._preloadAllImages(that._collectAllImages());
        },
        _collectAllImages: function () {
            var that = this,
                doc = document;
            that._getallBgimages();
            return B;
        },
        _initLoader: function () {
            var that = this,
                doc = document, __load, __loadImage, __width, __height, __transBG, __loadText;
            that._target.style.display = 'none';
            if (that.options.showLoadingText) {
                __loadText = doc.createElement('div');
                __loadText.setAttribute('id', '__defaultLoadingText');
                __loadText.innerHTML = that.options.loadingText;
                __loadText.style.width = "100%";
                __loadText.style.position = 'absolute';
                __loadText.style.textAlign = 'center';
                __loadText.style.top = "50%";
                __loadText.style.left = "0";
                __loadText.className = that.options.loadingTextClass;
                __loadText.style.zIndex = '99999999999999';
                doc.body.insertBefore(__loadText, doc.body.firstChild);
            }

            if (that.options.showLoader) {
                __loadImage = new Image();
                __loadImage.src = that.options.loaderImagePath;
                __loadImage.onload = function () {
                    __width = __loadImage.width;
                    __height = __loadImage.height;
                    __load = doc.createElement('div');
                    __load.setAttribute('id', '__defaultLoader');
                    __load.style.width = __width + "px";
                    __load.style.height = __height + "px";
                    __load.style.position = 'absolute';
                    __load.style.left = "50%";
                    __load.style.marginLeft = -(__width / 2) + 'px';
                    __load.style.top = "50%";
                    __load.style.marginTop = -(__height / 2) + 'px';
                    __load.style.zIndex = '99999999999998';
                    __load.style.background = "url('" + that.options.loaderImagePath + "') center no-repeat";
                    doc.body.insertBefore(__load, doc.body.firstChild);
                    if (that.options.loaderStyle == 'transparent') {
                        __transBG = doc.createElement('div');
                        __transBG.setAttribute('id', '__defaultTransBG');
                        __transBG.style.width = "100%";
                        __transBG.style.height = "100%";
                        __transBG.style.position = 'fixed';
                        __transBG.style.webkitBackfaceVisibility = 'hidden';
                        __transBG.style.left = "0px";
                        __transBG.style.top = "0px";
                        __transBG.style.zIndex = '99999999999997';
                        __transBG.style.background = that.options.backgroundColor;
                        __transBG.style.opacity = that.options.transparency;
                        if (that.options.initAnimation == 'fadein') {
                            __transBG.style.opacity = 0;
                        }

                        doc.body.insertBefore(__transBG, doc.body.firstChild);
                        that._target.style.display = 'block';
                    }


                    if (that.options.loaderStyle == 'transparent' && that.options.initAnimation == 'fadein') {
                        var __i = 0;
                        var __fadeInInterval = setInterval(function () {
                            __i++;
                            if ((__i / 100) < that.options.transparency) {
                                __transBG.style.opacity = __i / 100;
                            } else {
                                clearInterval(__fadeInInterval);
                            }
                        }, that.options.initAnimationSpeed)
                    }
                    that._start();
                }
            } else {
                that._start();
            }

        },
        _destroyLoader: function () {
            var that = this,
                doc = document, __load, _element;


            if (that.options.showLoader) {
                if (that.options.loaderStyle == 'transparent' && that.options.destroyAnimation == 'fadeout') {
                    var __i = that.options.transparency;
                    var __fadeOutInterval = setInterval(function () {
                        __i = __i - 0.01;
                        if (__i >= 0) {
                            document.getElementById("__defaultTransBG").style.opacity = __i;
                        } else {
                            clearInterval(__fadeOutInterval);
                            _element = document.getElementById("__defaultLoader");
                            _element.parentNode.removeChild(_element);
                            _element = document.getElementById("__defaultTransBG");
                            _element.parentNode.removeChild(_element);
                            if (that.options.showLoadingText) {
                                _element = document.getElementById("__defaultLoadingText");
                                _element.parentNode.removeChild(_element);
                            }
                        }
                    }, that.options.initAnimationSpeed)
                } else {
                    if (that._loading) {
                        _element = document.getElementById("__defaultLoader");
                        _element.parentNode.removeChild(_element);
                        if (that.options.loaderStyle == 'transparent') {
                            _element = document.getElementById("__defaultTransBG");
                            _element.parentNode.removeChild(_element);
                        }
                        if (that.options.showLoadingText) {
                            _element = document.getElementById("__defaultLoadingText");
                            _element.parentNode.removeChild(_element);
                        }
                    }
                }

            }

        },
        _getallBgimages: function () {
            var that = this,
                doc = document, url, A = (that._target).getElementsByTagName('*');
            A = B.slice.call(A, 0, A.length);
            while (A.length) {
                url = that._deepCss(A.shift(), 'background-image');
                if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
                url = url[1];
                if (url && B.indexOf(url) == -1) B[B.length] = url;
            }
            that._getallImages();
        },
        _getallImages: function () {
            var that = this,
                doc = document, src, C = that._target.getElementsByTagName('img');
            C = B.slice.call(C, 0, C.length);
            while (C.length) {
                src = that._deepSrc(C.shift());
                if (src) src = src || [];
                if (src && B.indexOf(src) == -1) B[B.length] = src;
            }
        },
        _deepSrc: function (who) {
            if (!who || !who.src) return '';
            return who.src;
        },
        _deepCss: function (who, css) {
            if (!who || !who.style) return '';
            var sty = css.replace(/\-([a-z])/g, function (a, b) {
                return b.toUpperCase();
            });
            if (who.currentStyle) {
                return who.style[sty] || who.currentStyle[sty] || '';
            }
            var dv = document.defaultView || window;
            return who.style[sty] ||
                dv.getComputedStyle(who, "").getPropertyValue(css) || '';
        },
        _preloadAllImages: function (images) {
            var that = this,
                doc = document, imgSet = [], counter = 0, successcounter = 0, errorcounter = 0;

            if (that.options.log) {
                try {
                    console.warn("Images Preloading Started");
                } catch (e) {
                }
            }

            for (var i = 0; i < images.length; i++) {

                imgSet[i] = new Image();
                imgSet[i].src = images[i];

                if (that.options.log) {
                    try {
                        console.log("Retriving Image :" + imgSet[i].src);
                    } catch (e) {
                    }
                }
                imgSet[i].onerror = function () {
                    ++counter;
                    ++errorcounter;
                    that.imagesNotLoaded = errorcounter;
                    that.progress = (counter * 100) / images.length;
//                    document.getElementById('progress').innerHTML = that.progress;

                    if (counter == images.length) {
                        if (document.readyState == "complete") {
                            that._destroyLoader();
                            that.onLoad();
                            that._target.style.display = 'block';
                        } else {
                            that._destroyLoader();
                            that.onLoad();
                            that._target.style.display = 'block';
                        }
                        if (that.options.log) {
                            try {
                                console.warn('Total images loaded : ' + successcounter + '/' + counter);
                                console.warn('Total images Failed : ' + errorcounter + '/' + counter);
                            } catch (e) {
                            }
                        }
                    }

                    that._loading = true;
                    that.onError();
                    that.onProgress();
                }
                imgSet[i].onload = function () {
                    ++counter;
                    ++successcounter;
                    that.imagesLoaded = successcounter;
                    that.progress = (counter * 100) / images.length;
//                    document.getElementById('progress').innerHTML = that.progress;
                    if (that.options.log) {
                        try {
                            console.log("Image Loaded :" + images[counter - 1]);
                        } catch (e) {
                        }
                    }
                    if (counter == images.length) {
                        if (document.readyState == "complete") {
                            that._destroyLoader();
                            that.onLoad();
                            that._target.style.display = 'block';
                        } else {
                            that._destroyLoader();
                            that.onLoad();
                            that._target.style.display = 'block';
                        }
                        if (that.options.log) {
                            try {
                                console.warn('Total images loaded : ' + successcounter + '/' + counter);
                                console.warn('Total images Failed : ' + errorcounter + '/' + counter);
                            } catch (e) {
                            }
                        }
                    }


                    that._loading = true;
                    that.onProgress();

                }

            }
        },
        _showProgressBar: function () {
            var that = this,
                doc = document;

        },
        onLoad: function () {
            //user defined function
        },
        onProgress: function () {
            //user defined function
        },
        onError: function () {
            //user defined function
        }
    };

    Array.prototype.indexOf = Array.prototype.indexOf ||
        function (what, index) {
            index = index || 0;
            var L = this.length;
            while (index < L) {
                if (this[index] === what) return index;
                ++index;
            }
            return -1;
        }

    if (typeof exports !== 'undefined') exports.progressBar = progressBar;
    else window.progressBar = progressBar;

})(window, document);
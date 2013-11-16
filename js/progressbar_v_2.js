/*!
 * Progress Bar V 2.0 ~
 * Copyright (c) 2013 Vicky Gonsalves
 * http://stackoverflow.com/users/1548301/vicky-gonsalves
 * http://vickygonsalves.vacau.com/license.html
 * Contact +91- 8097598395, +91-9766222843
 */
(function () {
    var B = [], ProgressBar = function (wrapper, options) {
        var that = this, doc = document, i;
        that._target = doc.getElementById(wrapper);
        that.options = {imagesToPreload: 'all', showProgressBar: false, loaderImagePath: null, showLoader: true, showLoadingText: true, loadingText: 'Loading', loadingTextClass: null, loaderStyle: 'opaque', transparency: 1, backgroundColor: '#000', initAnimation: null, destroyAnimation: null, initAnimationSpeed: 10, log: true}
        for (i in options)that.options[i] = options[i];
        if (that._target == null) {
            if (that.options.log) {
                console.log("ID '" + wrapper + "' not found in html")
            }
            alert("ID '" + wrapper + "' not found in html");
            return false
        }
        that._initLoader()
    };
    ProgressBar.prototype = {progress: 0, imagesLoaded: 0, imagesNotLoaded: 0, _loading: false, _start: function () {
        var that = this;
        if (that.options.showProgressBar) {
            that._showProgressBar()
        }
        that._preloadAllImages(that._collectAllImages())
    }, _collectAllImages: function () {
        var that = this;
        that._getallBgimages();
        return B
    }, _initLoader: function () {
        var that = this, doc = document, __load, __loadImage, __width, __height, __transBG, __loadText;
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
            doc.body.insertBefore(__loadText, doc.body.firstChild)
        }
        if (that.options.showLoader && that.options.loaderImagePath != null) {
            __loadImage = new Image();
            __loadImage.src = that.options.loaderImagePath;
            __loadImage.onload = function () {
                __width = __loadImage.width;
                __height = __loadImage.height;
                __load = doc.createElement('div');
                __load.setAttribute('id', '__defaultLoader');
                __load.style.width = __width + "px";
                __load.style.height = __height + "px";
                __load.style.position = 'fixed';
                __load.style.webkitBackfaceVisibility = 'hidden';
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
                        __transBG.style.opacity = 0
                    }
                    doc.body.insertBefore(__transBG, doc.body.firstChild);
                    that._target.style.display = 'block'
                }
                if (that.options.loaderStyle == 'transparent' && that.options.initAnimation == 'fadein') {
                    var __i = 0;
                    var __fadeInInterval = setInterval(function () {
                        __i++;
                        if ((__i / 100) < that.options.transparency) {
                            __transBG.style.opacity = __i / 100
                        } else {
                            clearInterval(__fadeInInterval)
                        }
                    }, that.options.initAnimationSpeed)
                }
                that._start()
            }
        } else {
            that._start()
        }
    }, _destroyLoader: function () {
        var that = this, _element;
        if (that.options.showLoader) {
            if (that.options.loaderStyle == 'transparent' && that.options.destroyAnimation == 'fadeout') {
                var __i = that.options.transparency;
                var __fadeOutInterval = setInterval(function () {
                    __i = __i - 0.01;
                    if (__i >= 0) {
                        document.getElementById("__defaultTransBG").style.opacity = __i
                    } else {
                        clearInterval(__fadeOutInterval);
                        _element = document.getElementById("__defaultLoader");
                        _element.parentNode.removeChild(_element);
                        _element = document.getElementById("__defaultTransBG");
                        _element.parentNode.removeChild(_element);
                        if (that.options.showLoadingText) {
                            _element = document.getElementById("__defaultLoadingText");
                            _element.parentNode.removeChild(_element)
                        }
                    }
                }, that.options.initAnimationSpeed)
            } else {
                if (that._loading) {
                    if (that.options.loaderImagePath != null) {
                        _element = document.getElementById("__defaultLoader");
                        _element.parentNode.removeChild(_element);
                        if (that.options.loaderStyle == 'transparent') {
                            _element = document.getElementById("__defaultTransBG");
                            _element.parentNode.removeChild(_element)
                        }
                    }
                    if (that.options.showLoadingText) {
                        _element = document.getElementById("__defaultLoadingText");
                        _element.parentNode.removeChild(_element)
                    }
                }
            }
        }
    }, _getallBgimages: function () {
        var that = this, url, A = (that._target.parentNode).getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = that._deepCss(A.shift(), 'background-image');
            if (url)url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1)B[B.length] = url
        }
        that._getallImages()
    }, _getallImages: function () {
        var that = this, src, C = that._target.parentNode.querySelectorAll('img:not([src=""])');
        C = B.slice.call(C, 0, C.length);
        while (C.length) {
            src = that._deepSrc(C.shift());
            if (src)src = src || [];
            if (src && B.indexOf(src) == -1)B[B.length] = src
        }
    }, _deepSrc: function (who) {
        if (!who || !who.src)return'';
        return who.src
    }, _deepCss: function (who, css) {
        if (!who || !who.style)return'';
        var sty = css.replace(/\-([a-z])/g, function (a, b) {
            return b.toUpperCase()
        });
        if (who.currentStyle) {
            return who.style[sty] || who.currentStyle[sty] || ''
        }
        var dv = document.defaultView || window;
        return who.style[sty] || dv.getComputedStyle(who, "").getPropertyValue(css) || ''
    }, _preloadAllImages: function (images) {
        var that = this, imgSet = [], counter = 0, successcounter = 0, errorcounter = 0;
        if ((images.length) > 0) {
            if (that.options.log) {
                try {
                    console.warn("Images Preloading Started")
                } catch (e) {
                }
            }
            for (var i = 0; i < images.length; i++) {
                imgSet[i] = new Image();
                imgSet[i].src = images[i];
                if (that.options.log) {
                    try {
                        console.log("Retriving Image :" + imgSet[i].src)
                    } catch (e) {
                    }
                }
                imgSet[i].onerror = function () {
                    ++counter;
                    ++errorcounter;
                    that._loading = true;
                    that.onError();
                    that.onProgress();
                    that.imagesNotLoaded = errorcounter;
                    that.progress = (counter * 100) / images.length;
                    if (counter == images.length) {
                        that._destroyLoader();
                        that._target.style.display = 'block';
                        that.onLoad();
                        if (that.options.log) {
                            try {
                                console.warn('Total images loaded : ' + successcounter + '/' + counter);
                                console.warn('Total images Failed : ' + errorcounter + '/' + counter)
                            } catch (e) {
                            }
                        }
                    }
                };
                imgSet[i].onload = function () {
                    ++counter;
                    ++successcounter;
                    that.imagesLoaded = successcounter;
                    that.progress = (counter * 100) / images.length;
                    if (that.options.log) {
                        try {
                            console.log("Image Loaded :" + images[counter - 1])
                        } catch (e) {
                        }
                    }
                    if (counter == images.length) {
                        that._loading = true;
                        that.onProgress();
                        that._destroyLoader();
                        that._target.style.display = 'block';
                        that.onLoad();
                        if (that.options.log) {
                            try {
                                console.warn('Total images loaded : ' + successcounter + '/' + counter);
                                console.warn('Total images Failed : ' + errorcounter + '/' + counter)
                            } catch (e) {
                            }
                        }
                    }
                }
            }
        } else {
            that._loading = true;
            that.onProgress();
            if (that.options.log) {
                console.warn("No Images Found!");
                that._destroyLoader();
                that._target.style.display = 'block';
                that.onLoad()
            }
        }
    }, _showProgressBar: function () {
    }, onLoad: function () {
    }, onProgress: function () {
    }, onError: function () {
    }};
    Array.prototype.indexOf = Array.prototype.indexOf || function (what, index) {
        index = index || 0;
        var L = this.length;
        while (index < L) {
            if (this[index] === what)return index;
            ++index
        }
        return-1
    }
    if (typeof exports !== 'undefined') {
        exports.ProgressBar = ProgressBar;
    } else {
        window.ProgressBar = ProgressBar;
    }
})(window, document);
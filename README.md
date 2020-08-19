# ProgressBar2
Images Loader Plugin for Javascript

### Installation
Download `progressbar_v_2.min.js` from `js` directory of the project


### How to use

**1. Include progressbar_v_2_min.js in the `<head>` of your html page.**
  
```
<!DOCTYPE HTML>
<html>
<head>
  <title>Progress Bar 2</title>
  <script type="text/javascript" src="js/progressbar_v_2.min.js"></script>
</head>
<body>
  ...
</body>
</html>
```

**2. Wrap the content for which you want to show loading with id `main`**
```
<div id='main'>
 <img src=".../someimage"/>
 <img src=".../someimage"/>
 <img src=".../someimage"/>
 <img src=".../someimage"/>
</div>
```

**3. Initialize the progress bar by adding following script in the <head> of your html page. Make sure you add id of element in the code for which you want to initialize progress bar.**

```
<script>
    document.addEventListener('DOMContentLoaded', init, false);
    function init() {
      var ProgressBar = new progressBar('main', { loaderImagePath: "loading.gif" });
    }
</script>
```

**Note: `loading.gif` is the placeholder image to show page loading progress. You can use your favorite image here.**

**4. Thats it!**



### Options
-----------------------------
There are few options you can pass at initialization.
```
 var ProgressBar = new progressBar('main', { loaderImagePath: "loading.gif" });
 ```
 
### showLoader [Optional] [Boolean] [default : true]
Useage: This variable show and hide loading screen.
```
showLoader : true | false
```

### loaderImagePath [Optional] [String] [default : '../loading.gif']
Useage: This variable is used to configure loading animation image's path
if loading image is not provided, `../loading.gif` is default path applied.
```
loaderImagePath: '../loading.gif'
```

### showLoadingText [Optional] [Boolean] [default : true]
Useage: This variable is used to show and hide Loading text at the loading screen.
```
showLoadingText : true | false
```

### loadingText [Optional] [String] [default: 'Loading']
Useage: This variable is used to Configure Loading text message at the loading screen.
```
loadingText : 'Loading'
```

### loadingTextClass [Optional] [String] [default: null]
Useage: This variable is used to Configure class of Loading text message at the loading screen.
```
loadingTextClass: 'some-awsome-css-class'
```

### loaderStyle [Optional] [String] [default: 'opaqe']
Useage: This variable is used to Configure loading screen's transparency.
```
loaderStyle: 'opaqe' | 'transparent'
```

### transparency [Optional] [Number] [default: 1]
Useage: This variable is used to Configure loading screen's transparency amount.

### backgroundColor [Optional] [String] [default: '#000']
Useage: This variable is used to Configure loading screen's background color.
```
backgroundColor :  '#000'
```

### initAnimation [Optional] [String] [default: null]
Useage: This variable is used to Configure loading screen's initial animation.
```
initAnimation : 'fadein' | null
```

### destroyAnimation [Optional] [String] [default: null]
Useage: This variable is used to Configure loading screen's destroy animation.
```
initAnimation : 'fadeout' | null
```

### initAnimationSpeed [Optional] [Number] [default: 10]
Useage: This variable is used to Configure loading screen's animation speed.
```
initAnimationSpeed : 10
```

### log [Optional] [Boolean] [default: true]
Useage: This variable is used to enable disable log.
```
log : true
```

### API
-----------------------------
#### onProgress
This api is useful to get current progress of images being loaded.

```
ProgressBar.onProgress = function() {
      console.log("Images Loaded:" + ProgressBar.imagesLoaded);
      console.log("Images Not Loaded:" + ProgressBar.imagesNotLoaded);
      console.log("Current Progress:" + ProgressBar.progress);
}
```

### onLoad
This api is useful to check if everything is loaded

```
ProgressBar.onLoad = function () {
      console.log("Load Finished");
      console.log("Images Loaded:"+ProgressBar.imagesLoaded);
      console.log("Images Not Loaded:"+ProgressBar.imagesNotLoaded);
      console.log("Current Progress:"+ProgressBar.progress);
}
```


### onError
This api is useful to check if any image is not loaded.
```
 ProgressBar.onError = function () {
      console.log("Images Not Loaded:"+ProgressBar.imagesNotLoaded)
}
```


    

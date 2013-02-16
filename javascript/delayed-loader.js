requirejs.config({
    baseUrl: 'javascript',
    paths: {
        app: '/colorpicker'
    }
});

function required(file, callback) {
  if (!require.defined(file)) {
    require([file], function() {
      if (callback)
        callback(true);
    });
  }
  else if (callback)
    callback(false);
}

function requiredColorPicker(callback) {
  required('/colorpicker/js/colorpicker.js', function(loaded) {
    if (loaded)
      colorPickerLoaded();
    if (callback)
      callback();
  });
}

function requiredTutorial() {
  required('/javascript/tutorial.js', function(loaded) {
    if (loaded)
      startTutorial();
  });
}

$(document).ready(function() {
  setTimeout(function() {
    require(["filesystem", "google-analytics", "storage-updates"]);
  }, 1000);
});

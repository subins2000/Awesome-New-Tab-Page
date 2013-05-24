/** Awesome New Tab Page
  *   antp.co
  *   Copyright 2011-2013 Michael Hart (h4r7.me)
  * Want to make it even more awesome?
  *   github.antp.co
  *
  * Licensed under GPL v3:
  *   http://www.gnu.org/licenses/gpl-3.0.txt
  *   Further Restrictions:
  *     To make use of or modify the below code in any way:
  *     - You agree to leave this copyright and license notice intact without
  *       modification.
  *     - You agree to mark your modified versions as modified from the original
  *       version.
  *     - You agree not to misrepresent the origin of this material or your
  *       relationship with the authors of this project or the project itself.
  *       You agree not to use the "Awesome New Tab Page" name (or a confusingly
  *       similar name) or logo.
  **/


storageFunctions = {};

storageFunctions.onLeftClickUpdate = function() {
  for (var i in widgets) {
    if ( (typeof(widgets[i].type) !== "undefined" && (widgets[i].type === "shortcut" || widgets[i].type === "app"))
      || (typeof(widgets[i].isApp) !== "undefined" && widgets[i].isApp == true)) {
      if (typeof(widgets[i].pin) !== "undefined" && widgets[i].pin == true) {
        widgets[i].onleftclick = "pin";
        delete widgets[i].pin;
      }
      else {
        widgets[i].onleftclick = null;
      }
    }
  }
};

// if widget paths are old, update them to new one
storageFunctions.updateOldPaths = function() {
  var oldPathReg = /widgets\/(widget.([^.\/]*).[^\/]*)/;
  for (var i in widgets) {
    if (widgets[i].name === "Awesome New Tab Page" || widgets[i].stock) {
      if (widgets[i].path || widgets[i].img || widgets[i].simg) {
        var oPath = widgets[i].path || widgets[i].img || widgets[i].simg,
          result;
        result = oldPathReg.exec(oPath);
        if (result) {
          var newPath = "/widgets/" + result[2] + "/" + result[1];
          pathChanged = true;
          //update path
          if (widgets[i].path) {
            widgets[i].path = newPath;
          }
          if (widgets[i].img) {
            widgets[i].img = newPath;
          }
          if (widgets[i].simg) {
            widgets[i].simg = newPath;
          }
        }
      }
    } else if (widgets[i].id === "tabs" || widgets[i].path === "widgets/tabs.html"
      || widgets[i].path === "chrome-extension://" + chrome.extension.getURL("").substr(19, 32) + "/widgets/tabs.html") {
      pathChanged = true;
      widgets[i].path = "widgets/tabs/tabs.html";
    }
  }
  localStorageSync(false);
};

// add offlineEnabled property to stored apps
storageFunctions.addOfflineEnabledProp = function (argument) {
  chrome.management.getAll(function(installed_apps) {
    for (var i=0, app; app = installed_apps[i]; i++) {
      for (var j in widgets) {
        if (widgets[j].id == app.id) {
          widgets[j].offlineEnabled = app.offlineEnabled;
        }
      }
    }
  });
  localStorageSync(false);
};

(function() {
  var
    storageVersion = parseFloat(store.get("storageVersion"));

  if ( isNaN(storageVersion) )
    storageVersion = 0;

  // Prevent unnecessary checks
  // Must be updated with future storage updates
  if ( storageVersion === 2 )
    return;

  if ( storageVersion < 1 ) {
    storageFunctions.updateOldPaths();
    storageFunctions.onLeftClickUpdate();

    store.set("storageVersion", 1);
  }

  if ( storageVersion < 2 ) {
    storageFunctions.addOfflineEnabledProp();

    store.set("storageVersion", 2);
  }
})();

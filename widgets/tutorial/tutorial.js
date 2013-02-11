$(window).load(function() {
  loadPlusOneScript();
  loadTwitterScript();
});

function loadPlusOneScript() {
  var po = document.createElement("script");
  po.type = "text/javascript";
  po.async = true;
  po.src = "https://apis.google.com/js/plusone.js";
  var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);
}

function loadTwitterScript() {
  var twitterScriptTag = document.createElement("script");
  twitterScriptTag.type = "text/javascript";
  twitterScriptTag.async = true;
  twitterScriptTag.src = "https://platform.twitter.com/widgets.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(twitterScriptTag, s);
}


$(document).on("click", "#tutorial-start", function(event) {
  $(".social").fadeIn(2000);
  if ( parent.startTutorial ) {
    $(document).trigger("tutorial-reset");
    parent.startTutorial();
  } else {
    parent.requiredTutorial();
  }
});

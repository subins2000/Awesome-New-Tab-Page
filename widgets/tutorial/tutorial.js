$(document).on("click", "#tutorial-start", function(event) {
  $(".social").fadeIn(5000);
  if ( parent.startTutorial ) {
    $(document).trigger("tutorial-reset");
    parent.startTutorial();
  } else {
    parent.requiredTutorial();
  }
});

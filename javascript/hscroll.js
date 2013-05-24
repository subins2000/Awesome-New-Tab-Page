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


/* START :: Horizontal Scrolling */

  var hscroll = true;
  $(document).on({
    mouseleave: function() {
      hscroll = true;
    },
    mouseenter: function() {
      hscroll = false;
    }
  }, "body > .ui-2, body > #recently-closed-tabs-menu");

  function scrollHorizontal(event) {
    var delta = 0;

    if ( preference.get("disableHscroll") )
      return;

    if ( !event )
      event = window.event;

    if ( event.originalEvent )
      event = event.originalEvent;

    if ( hscroll === false ) {
      if ( event.preventDefault )
        event.preventDefault();

      event.returnValue = false;
      return;
    }

    if ( event.wheelDelta ) {
      delta = event.wheelDelta/120;
    }

    if (delta < 0)
      window.scrollBy(150, 0);
    else if (delta > 0)
      window.scrollBy(-150, 0);

    if ( event.preventDefault )
      event.preventDefault();

    event.returnValue = false;
  }
  $(document).on("mousewheel", scrollHorizontal);

  /* START :: Options Window */

    $(window).bind("antp-config-first-open", function() {
      var option = preference.get("disableHscroll");

      $("#disableHscroll").prop("checked", option);
      $(document).on("change", "#disableHscroll", disableHorizontalScrolling);
    });

    function disableHorizontalScrolling(e) {
      if ( e )
        preference.set("disableHscroll", $(this).is(":checked"));
    }

    /* END :: Options Window */

  /* END :: Horizontal Scrolling */

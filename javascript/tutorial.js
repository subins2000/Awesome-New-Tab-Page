function startTutorial() {
  var next = "<a href='#' class='tutorial-next bubble'>" + chrome.i18n.getMessage("ui_tutorial2_next") + "</a>";
  var steps = [
    { target: $("#app-drawer-button"), title: chrome.i18n.getMessage("ui_tutorial2_app_window_title"), content: chrome.i18n.getMessage("ui_tutorial2_app_drawer") + next },
    { target: $("#widget-drawer-button"), title: chrome.i18n.getMessage("ui_tutorial2_widgets_window_title"), content: chrome.i18n.getMessage("ui_tutorial2_widget_drawer") + next },
    { target: $("#unlock-button"), title: chrome.i18n.getMessage("ui_tutorial2_lock_title"), content: chrome.i18n.getMessage("ui_tutorial2_lock_grid") },
    { target: $("#tutorial #delete"), title: chrome.i18n.getMessage("ui_tutorial2_delete_widget"), content: chrome.i18n.getMessage("ui_tutorial2_delete_widget_string") },
    { target: $(".tile#0x0"), title: chrome.i18n.getMessage("ui_tutorial2_empty_grid_title"), content: chrome.i18n.getMessage("ui_tutorial2_empty_grid_string") }
  ];

  $(document.body).qtip({
    id: "tutorial-tip",
    content: {
      text: steps[0].content,
      title: {
        text: "<b>" + steps[0].title + "</b>",
        button: true
      }
    },
    position: {
      my: "left center",
      at: "right center",
      target: steps[0].target,
      viewport: $(window)
    },
    show: {
      event: false,
      ready: true
    },
    style: {
      classes: "qtip-light qtip-bootstrap qtip-shadow"
    },
    hide: false,
    events: {
      render: function(event, api) {
        var tooltip = api.elements.tooltip;
        api.step = 0;

        $(document).unbind("tutorial-next").bind('tutorial-next', function(event) {
          api.step++;
          var current = steps[api.step];
          if (current) {
            api.set('content.text', current.content);
            api.set('content.title.text', "<b>" + current.title + "</b>");
            api.set('position.target', current.target);
          }

          if ( current === undefined ) {
            api.destroy();
            var
              title = chrome.i18n.getMessage("ui_tutorial2_completed_title");
              message = $("<span />", { text: chrome.i18n.getMessage("ui_tutorial2_completed_string") }),
              ok = $("<button />", { text: chrome.i18n.getMessage("ui_tutorial2_finish_string"), "class": "full bubble" });

            dialogue( message.add(ok), title );
          }

          switch(api.step) {
            case 2:
              api.set('position.target', current.target.addClass("tutorial-next"));
              break;
            case 3:
              $("#unlock-button").removeClass("tutorial-next");
              api.set('position.target', current.target.show().addClass("tutorial-next"));
              break;
            case 4:
              $(".tile#0x0").removeClass("tutorial-next");
              api.set('position.target', current.target.addClass("tutorial-next"));
              break;
          }
        });
      },
      hide: function(event, api) { api.destroy(); }
    }
  });
}

$(document).on("click", ".tutorial-next", function(event) {
  $(document).trigger("tutorial-next");
});

function dialogue(content, title) { // this will soon be moved to UI
  $('<div />').qtip({
    content: {
      text: content,
      title: {
        text: "<b>" + title + "</b>",
        button: true
      }
    },
    position: {
      my: 'center',
      at: 'center',
      target: $(window)
    },
    show: {
      ready: true,
      modal: {
        on: true,
        blur: false
      }
    },
    hide: false,
    style: 'qtip-light qtip-rounded qtip-bootstrap qtip-dialogue',
    events: {
      render: function(event, api) {
        $('button', api.elements.content).click(api.hide).css("width", "100%");
      },
      hide: function(event, api) { api.destroy(); }
    }
  });
}

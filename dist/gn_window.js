// gnWindow (v1.0.0) - Copyright 2019 Joseph Cabral - Licensed under MIT
// Docs: https://github.com/Joe1363/gn_window
var gnWindow = {
  open: function(options) {
    var defaultCloseImg = "/assets/close.png";
    var defaultLoadingImg = "/assets/loading.gif";
    var defaultLoadingText = "Loading...";
    var defaultErrorText = "Something unexpected happened. Please reload the page and try again.";
    var defaultOverlayClose = false;

    var op = (typeof options == 'object');
    var fadeIn = ((op && options.hasOwnProperty('fadeIn')) ? options.fadeIn : 'fast');

    appendWindow(op, options);
    $('#gnWindow').fadeIn(fadeIn);
    $('#gnWindowOverlay').show();

    if (op && (options.hasOwnProperty('fixedWidth'))  && options.fixedWidth){ $('#gnWindow').css("width", options.fixedWidth); }
    if (op && (options.hasOwnProperty('fixedHeight')) && options.fixedHeight){ $('#gnwContent').css("height", options.fixedHeight); }

    if (op && options.hasOwnProperty('contentTimeout')) {
      if (typeof options.contentTimeout == 'number') {
        setTimeout(function(){ showContent(op, options); }, options.contentTimeout);
      } else {
        showContent(op, options);
      }
    } else {
      setTimeout(function(){ showContent(op, options); }, 500);
    }
    $('body').addClass('gnwNoScroll');

    function appendWindow(op, options) {
      var closeImg =    ((op && options.hasOwnProperty('closeImg')) ? options.closeImg : defaultCloseImg);
      var loadingImg =  ((op && options.hasOwnProperty('loadingImg')) ? options.loadingImg : defaultLoadingImg);
      var loading_text = ((op && options.hasOwnProperty('loading_text')) ? options.loading_text : defaultLoadingText);
      var overlayCloseChk = (op && options.hasOwnProperty('overlayClose')) ? options.overlayClose : defaultOverlayClose;
      var overlayClose = "";
      if (overlayCloseChk == true) { overlayClose = ' onclick="gnWindow.close(event);"'; }

      if ($('#gnWindow').length > 0) { gnWindow.remove(); }
      $('body').append('<div id="gnWindowOverlay"' + overlayClose + '></div><div id="gnWindow"><div id="gnClose" onclick="gnWindow.close(event);"><img src="' + closeImg + '"></div><div id="gnwContent"><div id="gnwLoading"><p>' + loading_text + '</p><img src="' + loadingImg + '"></div></div></div>');
    }

    function showContent(op, options) {
      if (op && options.hasOwnProperty('content')) {
        if (typeof options.content == 'string') {
          $('#gnwContent').html(options.content).show();
        } else if ((typeof options.content == 'object') && options.content.hasOwnProperty('url')) {
          var data = (options.content.hasOwnProperty('data') ? options.content.data : {});
          var type = (options.content.hasOwnProperty('type') ? options.content.type : "GET");
          $.ajax({  type: type, dataType: 'json', data: data, url: options.content.url,
            success: function(data){
              if ((typeof data == "object") && data.hasOwnProperty('content')){
                $('#gnwContent').html(data.content).show();
              } else {
                showErrorMsg();
              }
            },
            error: function(){ showErrorMsg(); }
          });
        }
      } else {
        $('#gnwContent').show();
      }
    }

    function showErrorMsg() {
      $('#gnwContent').html('<p style="margin:20px 10px;">'+ defaultErrorText +'</p>');
    }
  },
  close: function() {
    var closeFade = true;
    if ((typeof closeFade == "boolean") && (closeFade == true)) {
      $('#gnWindowOverlay, #gnWindow').fadeOut(250);
      setTimeout(function() { gnWindow.remove(); }, 255);
    } else {
      gnWindow.remove();
    }
  },
  remove: function() {
    $('#gnWindowOverlay, #gnWindow').remove();
    $('body').removeClass('gnwNoScroll');
  }
}

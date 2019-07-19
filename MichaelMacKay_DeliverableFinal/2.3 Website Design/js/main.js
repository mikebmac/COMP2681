// =====================================
//  Main JS
// =====================================
var check = setInterval(function () {
  if (document.readyState === 'complete') {
    clearInterval(check);
    loadComplete();
  }
}, 100);

var loadComplete = function () {
  var loader = document.getElementById("loader");
  if (loader !== undefined) {
    loader.classList.add("close");
  }

  setTimeout(dialogLoaderClose, 350);
  init();
}

var dialogLoaderClose = function () {
  var loadingDialog = document.getElementById("loader");
  var body = document.getElementById("body");

  loadingDialog.close();
  body.classList.add("loaded");
}

function init() {
  stickHeader();
  dialogListeners();
  
  if (typeof(isIndex) != "undefined") {
    lastUpdate();
  }
  
  getURLParam();
}

function dialogOpen(buttonDom) {
  
  var dialog = document.getElementById("dialog");
  var body = document.getElementById("body");
  var placeholderTitle = buttonDom.getElementsByClassName("dialog-title_placeholder")[0];
  var placeholderText = buttonDom.getElementsByClassName("dialog-text_placeholder")[0];
  var domTitle = document.getElementById("dialog-body_title");
  var domText = document.getElementById("dialog-body_text");
  
  domTitle.innerHTML = placeholderTitle.innerHTML;
  domText.innerHTML = placeholderText.innerHTML;
  
  body.classList.add("dialog");
  dialog.show();
  
}

function dialogOpenDoc(title, text) {
  var dialog = document.getElementById("dialog");
  var body = document.getElementById("body");
  var domTitle = document.getElementById("dialog-body_title");
  var domText = document.getElementById("dialog-body_text");
  
  domTitle.innerHTML = title;
  domText.innerHTML = text;
  
  body.classList.add("dialog");
  dialog.show();
}

function dialogClose() {
  var dialog = document.getElementById("dialog");
  var body = document.getElementById("body");

  dialog.close();
  stopVideo();
  body.classList.remove("dialog");
}

function dialogListeners() {
  var b = document.getElementById("dialog-button_close");

  b.onclick = function () {
    dialogClose();
  }
}

function stopVideo() {
  var vids = document.getElementsByClassName("video-youtube");
  for (var i = 0; i < vids.length; i++) {
    vids[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  }
}

function stickHeader() {
  var h = document.getElementById("landing-nav");
  var stuck = false;
  var stickPoint = getDistance();

  function getDistance() {
    var topDist = h.offsetTop;
    return topDist;
  }

  window.onscroll = function () {
    var distance = getDistance() - window.pageYOffset;
    var offset = window.pageYOffset;

    if ((distance <= 0) && !stuck) {
      h.classList.add("sticky");
      stuck = true;
    } else if (stuck && (offset <= stickPoint)) {
      h.classList.remove("sticky");
      stuck = false;
    }
  }
}

function lastUpdate() {
  var date = new Date();
  var curDate = + date.getFullYear() + "&nbsp;/&nbsp;" + date.getMonth() + " / " + date.getDate();
  var dom = document.getElementById("footer_update");
  
  dom.innerHTML = 'Last Updated: 2019 / 6 / 20 <br/>Current Date: <span id="doc_2.3.6.2">' + curDate + '</span>';
}

function getURLParam() {
  var param = window.location.search.substring(1);
  
  if (param) {
    var dom = document.getElementById(param);
    var desc = dom.getAttribute("data-desc");
    var nonVisDoc = ["doc_2.3.2.2", "doc_2.3.2.3"];
    
    if (nonVisDoc.includes(param)) {
      dialogOpenDoc(param, desc + "<br/><br/><code>" + dom.innerHTML + "</code>");
    } else {
      dom.style.border = "thick solid red";
      dom.style.position= "relative";
      var ttDom = document.createElement("div");
      dom.appendChild(ttDom);
      ttDom.classList.add("tooltip");
      ttDom.innerHTML = desc;
      
      // Scroll to on all browsers
      try {
        window.scrollTo({
          top: dom.offsetTop,
          behavior: 'smooth'
        })
      } catch(error) {
        window.scrollTo(0, dom.offsetTop);
      }
    }
  }
}

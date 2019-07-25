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
  var param = window.location.search.substring(1);
  if (param != "doc_2.3.2.15") {
    var loader = document.getElementById("loader");
    if (loader !== undefined) {
      loader.classList.add("close");
    }
  
    setTimeout(dialogLoaderClose, 350);
  }
  init();
}

function init() {
  stickHeader();
  dialogListeners();
  
  if (typeof(isIndex) != "undefined") {
    lastUpdate();
  }
  
  getURLParam();
}
// =====================================
//  Dialog
// =====================================
var dialogLoaderClose = function () {
  var loadingDialog = document.getElementById("loader");
  var body = document.getElementById("body");

  loadingDialog.close();
  
  body.classList.add("loaded");
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
  
  try {
    // Most Browsers
    dialog.open();
  } catch (e) {
    // Edge/IE older Browsers
    dialog.showModal();
  }
  
}

function dialogOpenDoc(title, text) {
  var dialog = document.getElementById("dialog");
  var body = document.getElementById("body");
  var domTitle = document.getElementById("dialog-body_title");
  var domText = document.getElementById("dialog-body_text");
  
  domTitle.innerHTML = title;
  domText.innerHTML = text;
  
  body.classList.add("dialog");
  
  try {
    // Most Browsers
    dialog.open();
  } catch (e) {
    // Edge/IE older Browsers
    dialog.showModal();
  }
}

function dialogClose() {
  var dialog = document.getElementById("dialog");
  var body = document.getElementById("body");

  dialog.close();
  
  stopVideo();
  body.classList.remove("dialog");
}

function dialogListeners() {
  var loadingDialog = document.getElementById("loader");
  dialogPolyfill.registerDialog(loadingDialog);
  var dialog = document.getElementById("dialog");
  dialogPolyfill.registerDialog(dialog);
  
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
// =====================================
//  Navigation
// =====================================
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
    var curScroll = window.pageYOffset;

    if ((distance <= 0) && !stuck) {
      if (isBotter) {
        var topButton = document.getElementById("botter-top");
        topButton.style.display = "block";
      }
      
      h.classList.add("sticky");
      stuck = true;
    } else if (stuck && (curScroll <= stickPoint)) {
      if (isBotter) {
        var topButton = document.getElementById("botter-top");
        topButton.style.display = "none";
      }
      
      h.classList.remove("sticky");
      stuck = false;
    }
  }
}
// =====================================
//  Updates
// =====================================
function lastUpdate() {
  var date = new Date();
  var curDate = + date.getFullYear() + "&nbsp;/&nbsp;" + date.getMonth() + " / " + date.getDate();
  var dom = document.getElementById("footer_update");
  
  dom.innerHTML = 'Last Updated: 2019 / 6 / 21 <br/>Current Date: <span id="doc_2.3.6.2">' + curDate + '</span>';
}
// =====================================
//  Functions
// =====================================
function getURLParam() {
  var param = window.location.search.substring(1);
  if (param) {
    var dom = document.getElementById(param);
    var desc = dom.getAttribute("data-desc");
    var position = dom.getAttribute("data-position");
    var nonVisDoc = ["doc_2.3.1.9", "doc_2.3.2.2", "doc_2.3.2.3", "doc_2.3.2.4.e", "doc_2.3.2.13", "doc_2.3.4.1", "doc_2.3.5.1", "doc_2.3.6.1", "doc_2.3.6.3"];
    
    if (nonVisDoc.includes(param)) {
      dialogOpenDoc(param, desc + "<br/><br/><code>" + dom.innerHTML + "</code>");
    } else {
      
      var ttDom = document.createElement("div");
      
      if (dom.nodeName.toUpperCase() != "IMG") {
        dom.style.border = "5px solid red";
        dom.style.position = "relative";
        dom.appendChild(ttDom);
      } else {
        dom.style.border = "5px solid red";
        dom.parentNode.style.position = "relative";
        dom.insertAdjacentElement("beforebegin", ttDom);
      }
      
      ttDom.classList.add("tooltip");
      if (position) {
        ttDom.classList.add(position);
      } else {
        ttDom.classList.add("bottom");
      }
      ttDom.innerHTML = desc;
      
      if (param === "doc_2.3.1.8") {
        scrollTo(0, 1000);
        dom.parentNode.style.bottom = "300px";
        dom.parentNode.style.right = "300px";
      } else if (param == "doc_2.3.2.5") {
        scrollTo(0, 400);
      } else if(param === "doc_2.3.2.16") {
        dom.style.position = "absolute";  
      } else if(param === "doc_2.3.6.4") {
        document.getElementById("email").value = "example@domain.com";
        document.getElementById("name").value = "John Doe";
        document.getElementById("message").value = "Too short.";
        ScrollToElement(param);
      } else {
        ScrollToElement(param);
      }
      
    }
  }
}

function ScrollToElement(id) {
  var ele = document.getElementById(id);
  var distance = ele.offsetTop - 185;
  
  // Attempt a smooth scroll, if not supported just move
  try {
    window.scrollTo({
      top: distance,
      left: 0,
      behavior: 'smooth'
    })
  } catch(e) {
    window.scrollTo(0, distance);
  }
  
}

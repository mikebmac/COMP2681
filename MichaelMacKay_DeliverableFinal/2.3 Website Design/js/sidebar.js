var check = setInterval(function () {
  if (document.readyState === 'complete') {
    clearInterval(check);
    loadComplete();
  }
}, 100);

var loadComplete = function () {
  init();
}
function init() {
  getURLParam();
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
// =====================================
//  
// =====================================
var check = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(check);
        // 
        loadComplete();
    }
}, 100);

var loadComplete = function() {
    var loader = document.getElementById("loader");
    if (loader !== undefined) {
        loader.classList.add("close");
    }

    setTimeout(dialogClose, 350);
    init();
}

var dialogClose = function() {
    var loadingDialog = document.getElementById("loader");
    var body = document.getElementById("body");
    
    loadingDialog.close();
    body.classList.add("loaded");
}

function init() {
    stickHeader();
}

function stickHeader() {
    var h = document.getElementById("landing-nav");
    var stuck = false;
    var stickPoint = getDistance();

    function getDistance() {
        var topDist = h.offsetTop;
        return topDist;
    }

    window.onscroll = function(e) {
        var distance = getDistance() - window.pageYOffset;
        var offset = window.pageYOffset;
        
        if ( (distance <= 0) && !stuck) {
            h.classList.add("sticky");
            stuck = true;
        } else if (stuck && (offset <= stickPoint)){
            h.classList.remove("sticky");
            stuck = false;
        }
    }
}
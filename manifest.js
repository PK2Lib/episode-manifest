// Background
var pk2assetsroot = "https://pk2lib.github.io/game_assets/";
var pk2CustomLibraryRoot = "https://v6p9d9t4.ssl.hwcdn.net/html/420707/";
var backgroundMap = {path: "rooster island 2/level10.map", x: 78, y: 25};

var ready = (function() {
    var t = !1;
    return function(e) {
        var n = function() {
            if(!t) return t=!0, e()
        }, o = function() {
            if(!t) {
                try {
                    document.documentElement.doScroll("left");
                } catch(t) {
                    return void setTimeout(o,1);
                }
                return n();
            }
        };
        if ("complete" === document.readyState) return n();
        if (document.addEventListener) document.addEventListener("DOMContentLoaded",n,!1),
            window.addEventListener("load",n,!1);
        else if(document.attachEvent) {
            document.attachEvent("onreadystatechange",n), window.attachEvent("onload",n);
            var d = !1;
            try {
                d = null == window.frameElement
            } catch(t) {}
            if(document.documentElement.doScroll&&d) return o();
        }
    };
})();



/* DOM loaded */
ready(function(){

    /* Required */
    (function(){
        var inputs = document.querySelectorAll("input:not(#submit), textarea");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].hasAttribute("required")) {
                inputs[i].parentElement.firstElementChild.firstElementChild.classList.add("required");
                inputs[i].onblur = function() {
                    if (!this.value) this.classList.add("required");
                };
                inputs[i].onfocus = function() {
                    this.classList.remove("required");
                };
            }
        }
    })();


    /* Submit */
    document.getElementsByTagName("form")[0].onsubmit = function(event) {
        event.preventDefault();


        // Make object
        var date = (new Date()).toJSON().split(/[-:T]/, 5);
        var authorNames = document.getElementById("authorNames").value.split("\n");
        var authorLinks = document.getElementById("authorLinks").value.split("\n");

        var obj = {
            id: date[0]+date[1]+date[2]+date[3]+date[4] + "-" + Math.floor(1000000000000*Math.random()),
            date: date[0] + "-" + date[1] + "-" + date[2],
            episodeName: document.getElementById("episodeName").value,
            downloadLink: [],
            authors: [],
            numberOfMaps: document.getElementById("numberOfMaps").value,
            filesize: document.getElementById("filesize").value + " kB",
            description: document.getElementById("description").value,
            review: null,
            tested: false,
            screenshots: []
        };

        for (let i = 0; i < authorNames.length; i++) {
            if (authorNames[i] === "") continue;
            var url = null;
            if (authorLinks[i] !== "") url = authorLinks[i];
            obj.authors[obj.authors.length] = {name: authorNames[i], url: url};
        }


        // Save JSON file
        var filename = obj.episodeName + ".json";
        saveAs(new Blob([JSON.stringify(obj)], {type: "text/plain;charset=utf-8"}), filename);
    };
});
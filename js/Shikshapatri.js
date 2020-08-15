function showRecords() {
    $("#shlok").html('');
    var list = "";
    for (var i = 0; i < ShlokHeader.length; i++) {
        if ((i + 1) < Number(localStorage.getItem("StartShlok")) || (i + 1) > Number(localStorage.getItem("EndShlok"))) {
            list += "<li class='hiddenButAccessible'><a><b>" + ShlokHeader[i] + "</b></a></li>";
        }
        else {
            list += "<li ><a onclick='ShowShlok(\"" + i + "\")'><b>" + ShlokHeader[i] + "</b></a></li>";
        }
    }
    $("#shlok").html(list);
}

function SetGroup(start, end) {
    localStorage.setItem("StartShlok", start);
    localStorage.setItem("EndShlok", end);

//    for (var i = 0; i < ShlokHeader.length; i++) {
//        if ((i + 1) < start || (i + 1) > end) {
//            document.getElementById("shlok" + i).style.display = "none";
//            document.getElementById("shlok" + i).className = "hiddenButAccessible";
//        }
//        else {
//            document.getElementById("shlok" + i).style.display = "";
//            document.getElementById("shlok" + i).className = "";
//        }
//    }
    showRecords();
    closeNav();
}

function ShowShlok(ShlokNumber) {
    localStorage.setItem("ShlokNum", ShlokNumber);
    location.href = "Shlok.html";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("navHeader").style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("navHeader").style.display = "";
}

// Call function when page is ready for load..
$(document).ready(function () {
    $("body").fadeIn(2000); // Fede In Effect when Page Load..

    var offset = 10;
    var duration = 500;
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });

    jQuery('.back-to-top').click(function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })
    if (!localStorage.getItem("StartShlok")) {
        localStorage.setItem("StartShlok", 0);
    }

    if (!localStorage.getItem("EndShlok")) {
        localStorage.setItem("EndShlok", 212);
    }
    showRecords();
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('backbutton', this.exitAppFunction, false);
});

function onDeviceReady() {
}

function exitAppFunction() {
    window.location.href = "index.html";
}
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("navHeader").style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("navHeader").style.display = "";
}


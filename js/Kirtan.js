var SelectStatement = "SELECT ID,KIRTAN_TITLE,KIRTAN_HEADER,KIRTAN_DESC,KIRTAN_AUTHOR,KIRTAN_FAVOURITE FROM KIRTAN WHERE KIRTAN_ID=?";

var FavouriteSelect = "SELECT ID,KIRTAN_TITLE,KIRTAN_HEADER,KIRTAN_DESC,KIRTAN_AUTHOR,KIRTAN_FAVOURITE FROM KIRTAN WHERE ID=?"

var UpdateStatement = "UPDATE KIRTAN SET KIRTAN_FAVOURITE=? WHERE ID=?";

var db = openDatabase("KirtanList", "1.0", "Address Book", 200000);

var dataset;

var paramId;
if (!sessionStorage.getItem("favourite")) {
    sessionStorage.setItem("favourite", "0");
}

if (sessionStorage.getItem("favourite") == "0") {
    paramId = sessionStorage.getItem("kirtanid");
} else {
    paramId = sessionStorage.getItem("id");
}
var pad = sessionStorage.getItem("pad");
function initDatabase() {
    try {
        if (!window.openDatabase) {
            alert("Databases are not supported in this browser.");
        }
        else {
            ShowKirtans();   
        }
    }
    catch (e) {
        if (e == 2) {
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
    }
}

function ShowKirtans() {
    db.transaction(function (tx) {
        var tabs = "";
        var tabContents = "";
        var activePad = "";
        var active = "";
        var accordion = "";
        var panels = "";
        var activePanel = "";

        var strQuery = "";
        if (sessionStorage.getItem("favourite") == "0") {
            strQuery = SelectStatement;
        } else {
            strQuery = FavouriteSelect;
        }
        tx.executeSql(strQuery, [Number(paramId)], function (tx, result) {
            dataset = result.rows;
            //if (dataset.length > 1) {
            tabs += "<ul class='nav nav-pills'>";
            tabContents += "<div class='tab-content'>";
            accordion = "<div class='panel-group' id='accordion'>";
            $("#kirtan").html('');
            $("#header").html('');
            $("#footer").html('');
            for (var i = 0; i < dataset.length; i++) {
                if (sessionStorage.getItem("favourite") == "1") {
                    activePad = "class='active'";
                    active = " in active";
                    activePanel = "in";
                }
                else {
                    if ((i + 1) == pad) {
                        activePad = "class='active'";
                        active = " in active";
                        activePanel = "in";
                    }
                }
                item = dataset.item(i);

                //                tabs += "<li " + activePad + "><a data-toggle='pill' href='#Pad" + (i + 1) + "'>" + (item["KIRTAN_TITLE"]) + "</a></li>";
                //                tabContents += "<div id='Pad" + (i + 1) + "' class='tab-pane fade" + active + "' style='padding-top:10px;'>";
                //                tabContents += "<span class='glyphicon glyphicon-floppy-disk'></span>";
                //                tabContents += "<p>" + item["KIRTAN_DESC"] + "</p>";
                //                tabContents += "</div>";
                //                activePad = "";
                //                active = "";

                panels += "<div class='panel panel-info'>";
                panels += "<div class='panel-heading'>";
                panels += "<div class='row'>";
                panels += "<div class='col-sm-11'>";
                panels += "<h4 class='panel-title'>";
                panels += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse" + (i + 1) + "'>" + (item["KIRTAN_TITLE"]) + "</a>";


                panels += "</h4>";
                panels += "</div>";
                panels += "<div class='col-sm-1' style='text-align:right'>";
                if (item["KIRTAN_FAVOURITE"].toString() == "1") {
                    panels += "<span class='glyphicon glyphicon-star right' onclick='ChangeFavourite(\"" + item["KIRTAN_FAVOURITE"].toString() + "\",\"" + item["ID"] + "\")'></span>";
                } else {
                    panels += "<span class='glyphicon glyphicon-star-empty' onclick='ChangeFavourite(\"" + item["KIRTAN_FAVOURITE"].toString() + "\",\"" + item["ID"] + "\")'></span>";
                }
                panels += "</div></div>";
                panels += "</div>";
                panels += "<div id='collapse" + (i + 1) + "' class='panel-collapse collapse " + activePanel + "'>";
                panels += "<div class='panel-body' style='font-size:" + (Number(localStorage.getItem("fontsize"))) + "px;'>" + item["KIRTAN_DESC"] + "</div>";
                panels += "</div></div>";

                activePanel = "";
            }
            tabs + "</ul>";
            tabContents += "</div>";
            accordion += panels + "</div>";
            //                        $("#kirtan").append(tabs);
            //                        $("#kirtan").append(tabContents);
            $("#kirtan").append(accordion);
            $("#header").append("<b>" + dataset.item(0)["KIRTAN_HEADER"] + "</b>");
            $("#footer").append("<b>" + dataset.item(0)["KIRTAN_AUTHOR"] + "</b>");



            //     } 
            //                    else {
            //                        item = dataset.item(0);
            //                        $("#header").append("<b>" + item["KIRTAN_HEADER"] + "</b>");
            //                        $("#kirtan").append(item["KIRTAN_DESC"]);
            //                        $("#footer").append("<b>" + item["KIRTAN_AUTHOR"] + "</b>");
            //                    }


        });

    });
}
function ChangeFavourite(favourite,id) {
    if (favourite == "1") {
        favourite = "0";
    } else {
        favourite = "1";
    }
    db.transaction(function (tx) { tx.executeSql(UpdateStatement, [Number(favourite), Number(id)], null, onError); });
    ShowKirtans();
}

// Function for Hendeling Error...
function onError(tx, error) {
    alert(error.message);
}

$(document).ready(function () {
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
    if (!localStorage.getItem("fontsize")) {
        localStorage.setItem("fontsize", 12);
    }

    $("#txtFontSize").val(localStorage.getItem("fontsize"));
    $val = localStorage.getItem("fontsize");
    $("#btnMinus").click(function () {
        if ($val > 1) {
            $val--;
            $("#txtFontSize").val($val);
        }
        else {
            $val = 1;
            $("#txtFontSize").val($val);
        }
    });

    $("#btnPlus").click(function () {
        if ($val > 24) {
            $val = 24;
        }
        $val++;
        $("#txtFontSize").val($val);
    });
    initDatabase();
});

function SetFontSize() {
    localStorage.setItem("fontsize", $("#txtFontSize").val());
    ShowKirtans();
}
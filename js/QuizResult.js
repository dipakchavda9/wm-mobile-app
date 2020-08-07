var GetLevelResult = "SELECT COUNT(QUIZ_ANS) AS ANS_COUNT,QUIZ_ANS,QUIZ_LEVEL FROM CURRENT_QUIZ WHERE QUIZ_SESSION=? GROUP BY QUIZ_ANS,QUIZ_LEVEL ORDER BY QUIZ_ANS";
var queNumbers = ["૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯", "૧૦"];
var SaveResultQuery = "INSERT INTO RESULT_MASTER(RESULT_LEVEL,RESULT_PERCENTAGE) VALUES(?, ?)";
var UpdateResultQuery = "UPDATE RESULT_MASTER SET RESULT_PERCENTAGE=? WHERE RESULT_LEVEL=?";
var db = openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);
var SessionID = "";
var LastResult = -1;
$(document).ready(function () {
    SessionID = localStorage.getItem("SessionID");
    if (SessionID == "") {
        window.location.href = "../index.html";
    } else {
        $("body").fadeIn(2000);
        InitDatabase();
        localStorage.setItem("SessionID", "");
        var Level = localStorage.getItem("LevelNum");
        GetLastResult(Level);
        ShowResult();
    }
});

function GetLastResult(level) {
    db.transaction(function (tx) {
        tx.executeSql("SELECT RESULT_PERCENTAGE FROM RESULT_MASTER WHERE RESULT_LEVEL=?", [level], function (fx, result) {
            if (result.rows.length > 0) {
                LastResult = result.rows[0].RESULT_PERCENTAGE;
            }
        });
    });
}

function InitDatabase() {
    try {
        if (!window.openDatabase) {
            alert("Databases are not supported in this browser.");
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

function ShowResult() {
    db.transaction(function (tx) {
        tx.executeSql(GetLevelResult, [SessionID], function (tx, result) {
            var LevelResult = result.rows;
            var intWrong = 0;
            var intCorrect = 0;
            var strLevel = "";
            if (LevelResult.length > 1) {
                intCorrect = LevelResult[1].ANS_COUNT;
                intWrong = LevelResult[0].ANS_COUNT;

            } else {
                var IsCorrect = LevelResult[0].QUIZ_ANS;
                if (IsCorrect == 0) {
                    intWrong = LevelResult[0].ANS_COUNT;
                } else {
                    intCorrect = LevelResult[0].ANS_COUNT;
                }
            }

            if (intCorrect >= 7) {
                $("#levelResult").text("આપે લેવલ સફળતાપૂર્વક પૂર્ણ કર્યું");
            } else {
                $("#levelResult").text("આપનો પ્રયત્ન અસફળ રહ્યો. ફરીથી પ્રયાસ કરો.");
            }
            strLevel = LevelResult[0].QUIZ_LEVEL;
            $("#spanLevel").text("લેવલ " + queNumbers[strLevel - 1]);
            $("#correctAns").text("સાચા જવાબો : " + intCorrect);
            $("#wrongAns").text("ખોટાં જવાબો : " + intWrong);
            if (LastResult == -1) {
                SaveResult(intCorrect * 10,strLevel);
            } else if (LastResult < intCorrect * 10) {
                UpdateResult(intCorrect * 10,strLevel);
            }
        });
    });
}

function SaveResult(percentage,strLevel) {
    db.transaction(function (tx) {
        tx.executeSql(SaveResultQuery, [Number(strLevel), Number(percentage)], null, onError);
    });
}

function UpdateResult(percentage, strLevel) {
    db.transaction(function (tx) {
        tx.executeSql(UpdateResultQuery, [Number(percentage),Number(strLevel)], null, onError);
    });
}

function onError(ex) {
    alert(ex);
}
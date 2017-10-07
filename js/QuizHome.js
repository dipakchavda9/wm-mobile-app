var CreateResult = "CREATE TABLE IF NOT EXISTS RESULT_MASTER(RESULT_LEVEL INTEGER,RESULT_PERCENTAGE INTEGER)";
var LastLevel = "SELECT RESULT_LEVEL FROM RESULT_MASTER WHERE RESULT_PERCENTAGE>=70 ORDER BY RESULT_LEVEL DESC";
var DeleteResultQuery = "DELETE FROM QUESTION_MASTER";
var queNumbers = ["૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯", "૧૦", "૧૧", "૧૨", "૧૩", "૧૪", "૧૫", "૧૬", "૧૭", "૧૮", "૧૯", "૨૦", "૨૧", "૨૨", "૨૩", "૨૪", "૨૫", "૨૬", "૨૭", "૨૮", "૨૯", "૩૦", "૩૧", "૩૨", "૩૩", "૩૪", "૩૫", "૩૬", "૩૭", "૩૮", "૩૯", "૪૦", "૪૧", "૪૨", "૪૩", "૪૪", "૪૫", "૪૬", "૪૭", "૪૮", "૪૯", "૫૦"];

var db = window.openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);
var intLastLevel = 0;
    

function InitDatabase() {
    try{
        if (!window.openDatabase) {
            alert("Databases are not supported in this browser.");
        } else {
            CreateResultTable();
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

function CreateResultTable() {
    db.transaction(function (tx) {
        tx.executeSql(CreateResult, [], LoadLevels, onError);
    });
}

function CreateTable() {
    db.transaction(function (tx) {
        tx.executeSql(CreateTableStatement, [], null, onError);
    });
    CheckRecords();
}

function CheckRecords() {
    db.transaction(function (tx) {
        tx.executeSql("SELECT COUNT(*) as c FROM QUESTION_MASTER", [], function (tx, result) {
            dataset = result.rows.item(0);
            CountRecords(dataset["c"]);
        });
    });
}
function CountRecords(numRecords) {
    if (numRecords == 0) {
        InsertQuestions();
    }
    LoadLevels();
}

function InsertQuestions() {
    for (var i = 0; i < Questions.length; i++) {
        InsertQuestion(i);
    }
    
}

function InsertQuestion(i) {
    db.transaction(function (tx) {
        tx.executeSql(InsertQuestionStatement, [Questions[i][0], Questions[i][1], Questions[i][2], Questions[i][3], Questions[i][4], Questions[i][5], Questions[i][6]], LoadLevels, onError);
    });
}

function onError() {
	alert("There was some internal error in updating Question list, please report this problem by 'Contact Us'.");
}

function GetLastLevel() {
    db.transaction(function (tx) {
        tx.executeSql(LastLevel, [], function (fx, result) {
            if (result.rows.length > 0) {
                intLastLevel = Number(result.rows[0].RESULT_LEVEL);
            }
        });
    });
}


function LoadLevels() {
    GetLastLevel();
    db.transaction(function (tx) {
        tx.executeSql('SELECT DISTINCT que_level FROM quiz ORDER BY que_level', [], function (tx, result) {
            $("#Levels").html('');
            
            var Levels = result.rows;
            var list = "";
			
            for (var i = 0; i < Levels.length; i++) {
                if (i <= intLastLevel) {
                    list += "<li onclick='StartQuiz(\"" + Levels[i].que_level + "\")' ><label>લેવલ " + queNumbers[Number(Levels[i].que_level) - 1] + "</label></li>";
                } else {
                    list += "<li onclick='StartQuiz(\"" + Levels[i].que_level + "\")' class='disabledLi'><label>લેવલ " + queNumbers[Number(Levels[i].que_level) - 1] + "</label></li>";
                }

            }
            $("#Levels").html(list);
        });
    });
}

function StartQuiz(LevelNumber) {
    window.localStorage.setItem("LevelNum", LevelNumber);
    window.location.href = "Quiz.html";
}
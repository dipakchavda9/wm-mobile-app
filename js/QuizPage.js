var LevelNum;
var SelectQuestions = "SELECT que_id,que_desc,que_ans_a,que_ans_b,que_ans_c,que_ans_d,que_ans_correct FROM quiz WHERE que_level=?";
var CreateAnswerTable = "CREATE TABLE IF NOT EXISTS CURRENT_QUIZ(QUIZ_NUM INTEGER PRIMARY KEY AUTOINCREMENT,QUIZ_SESSION TEXT,QUIZ_LEVEL TEXT,QUIZ_QUE_ID INTEGER,QUIZ_ANS INTEGER)";
var InsertAnswer = "INSERT INTO CURRENT_QUIZ(QUIZ_SESSION,QUIZ_LEVEL,QUIZ_QUE_ID,QUIZ_ANS) VALUES (?, ?, ?, ?)";
var DeleteOldData = "DELETE FROM CURRENT_QUIZ";
var Questions = [];
var QueNums = [];
var strCurrentQuestion;
var strCorrectAns;
var db = openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);
var queNumbers = ["૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯", "૧૦"];
var QuestionNumber=0;
var SessionID="";
$(document).ready(function () {
    $("body").fadeIn(2000);
    InitDatabase();
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 10; i++) {
        SessionID += possible.charAt(Math.floor(Math.random() * possible.length));
    }
});

function InitDatabase() {
    try {
        if (!window.openDatabase) {
            alert("Databases are not supported in this browser.");
        }
        else {
            LevelNum = window.localStorage.getItem("LevelNum");
            $('#header').text("લેવલ " + queNumbers[LevelNum-1]);
            CreateAnsTable();
            DeleteOldAnswers();
            LoadQuestions();
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

function DeleteOldAnswers() {
    db.transaction(function (tx) {
        tx.executeSql(DeleteOldData, [], null, onError);
    });
}

function CreateAnsTable() {
    db.transaction(function (tx) {
        tx.executeSql(CreateAnswerTable, [], null, onError);
    });
}

function onError(ex) {
    
}
function LoadQuestions() {
    db.transaction(function (tx) {
        tx.executeSql(SelectQuestions, [LevelNum], function (tx, result) {
            var Question = result.rows;
            var list = "";
            for (var i = 0; i < Question.length; i++) {
                Questions.push(Question[i]);
                QueNums.push(Question[i].que_id);
            }
            DisplayQuestion();
        });
    });
}
function DisplayQuestion() {
    var randNum = QueNums[Math.floor(Math.random() * QueNums.length)];
    $("#Option1").css("background-color", "e4d5ce");
    $("#Option2").css("background-color", "e4d5ce");
    $("#Option3").css("background-color", "e4d5ce");
    $("#Option4").css("background-color", "e4d5ce");
    if (randNum != undefined) {
        var elementPos;
        for (var i = 0; i < Questions.length; i++) {
            if (Questions[i].que_id == randNum) {
                elementPos = i;
                break;
            }
        }
        QuestionNumber += 1;
        strCurrentQuestion = randNum;
        var curQue = Questions[elementPos];
        $("#divQuestion").html("પ્રશ્ન : " + queNumbers[QuestionNumber - 1] + " " + curQue.que_desc);
        $("#Option1").html(curQue.que_ans_a);
        $("#Option2").html(curQue.que_ans_b);
        $("#Option3").html(curQue.que_ans_c);
        $("#Option4").html(curQue.que_ans_d);
        strCorrectAns = curQue.que_ans_correct;
    } else {
    ShowResults();
    }
}

function ShowResults() {
    localStorage.setItem("SessionID", SessionID);
    window.location.href = "QuizResult.html";
}

function NextQuestion(strAns, objOption) {
    var isAns;
    if (strAns == strCorrectAns) {
        $(objOption).css("background-color", "lime");
        isAns = 1;
    } else {
        $(objOption).css("background-color", "red");
        isAns = 0;
    }
    SaveAnswer(isAns);
}

function SaveAnswer(isAns) {
    db.transaction(function (tx) {
        tx.executeSql(InsertAnswer, [SessionID, LevelNum, strCurrentQuestion, isAns], ShowNextQuestion, onError);
    });
}

function ShowNextQuestion() {
    var elementPos = QueNums.indexOf(strCurrentQuestion);
    QueNums.splice(elementPos, 1);
    setTimeout(function () {
        DisplayQuestion();
    }, 500);
}
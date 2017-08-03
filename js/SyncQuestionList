var baseURL = 'http://wadhwanmandir.org/api/public/';
var authorizationType = 'Basic';
var authorizationHash = 'd2FkaHdhbm1hbmRpcmFwaTI6VzRkaHckbiExMDA4';
var questionsFromRest = null;
var questionsFromDB = null;
var sqlite = null;
var processingDialogOpenStatus = 0;
var maxNoOfQuestionsInDB = 0;
var noOfQuestionsInDB = 0;
var quetionsToUpdate = 0;
var questionsUpdated = 0;
var db = window.openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);

function SyncQuizQuestions() {
    if(checkConnection()) {
        getQuestionsFromRest();
    }
};

function checkConnection() {
    var networkState = navigator.connection.type;
    if(networkState == Connection.ETHERNET || 
    	networkState == Connection.WIFI || 
    	networkState == Connection.CELL_2G || 
    	networkState == Connection.CELL_3G || 
    	networkState == Connection.CELL_4G || 
    	networkState == Connection.CELL) {
    	return true;
    }
    return false;
}

function getQuestionsFromRest() {
    $.ajax({
        url: baseURL + 'quiz',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
        },
    })
    .done((data) => {
        questionsFromRest = data._embedded.quiz;
        getQuestionCountFromDB();
    })
    .fail((error) => {
        
    });
}

function getQuestionCountFromDB() {
    var createQuestionTableSql = `
          CREATE TABLE IF NOT EXISTS quiz (
          que_id int(5) PRIMARY KEY NOT NULL,
          que_level int(5) NOT NULL,
          que_desc text NOT NULL,
          que_ans_a TEXT NOT NULL,
          que_ans_b TEXT NOT NULL,
          que_ans_c TEXT NOT NULL,
          que_ans_d TEXT NOT NULL,
          que_ans_correct TEXT NOT NULL
        )
    `;
    db.transaction((tx) => {
        tx.executeSql(createQuestionTableSql, [],
        (tx, result) => {
            tx.executeSql('SELECT MAX(que_id) FROM quiz', [], (tx, results) => {
                var len = results.rows.length;
                if(len>0) {
                    maxNoOfQuestionsInDB=results.rows[0].item[0];
                    noOfQuestionsInDB=maxNoOfQuestionsInDB - 2;
                }
                compareQuizQuestions();
            }, (tx, error) => {
                maxNoOfQuestionsInDB = 0;
            });
        },
        (tx, error) => {
            maxNoOfQuestionsInDB = 0;
        });
    });
}

function compareQuizQuestions() {
    var len = questionsFromRest.length;
    var lastQuestionID = questionsFromRest[len-1].que_id;
    if(maxNoOfQuestionsInDB<lastQuestionID) {
        quetionsToUpdate=len-noOfQuestionsInDB;
        if(confirmUpdateAction()) {
            openProcessingDialog();
            var remoteQue;
            for(var i=0; i < noOfRemoteQuestions; i++) {
                remoteQue = questionsFromRest[i];
                var remoteQueNum=remoteQue.que_id;
                if(maxNoOfQuestionsInDB<remoteQueNum) {
                    insertLocalQuestion(remoteQue);
                }
                updateProgressBar();
                if(questionsUpdated==quetionsToUpdate) {
                    closeProcessingDialog();
                }
            }
        }
    }
    
}

var updateDecisionTaken = false;
var allowUpdate = false;

function nullifyUpdateActionVars() {
    updateDecisionTaken = false;
    allowUpdate = false;
    processingDialogOpenStatus = 0;
}

function confirmUpdateAction() {
    if(updateDecisionTaken) {
        return allowUpdate;
    }
    if(confirm("New questions have been added in the list. Do you want to update question list? \n\n[Note: This action may take between 2 to 10 minutes depending on your internet connection speed!]")) {
        allowUpdate = true;
    } else {
        allowUpdate = false;
    }
    updateDecisionTaken = true;
    return allowUpdate;
}

function insertLocalQuestion(question) {
    var insertQuestionSql = `
        INSERT INTO quiz(
            que_id,
            que_level,
            que_desc,
            que_ans_a,
            que_ans_b,
            que_ans_c,
            que_ans_d,
            que_ans_correct
            ) 
        VALUES (?,?,?,?,?,?,?,?)
    `;
    
    var dataBinding = [
        question.que_id,
        question.que_level,
        question.que_desc,
        question.que_ans_a,
        question.que_ans_b,
        question.que_ans_c,
        question.que_ans_d,
        question.que_ans_correct
    ];
    
    questionsUpdated++;
    
    db.transaction((tx) => {
        tx.executeSql(insertQuestionSql, dataBinding);
    });
}

function openProcessingDialog() {
    if(processingDialogOpenStatus == 0) {
        processingDialogOpenStatus = 1;
        var pleaseWait = $('#pleaseWaitDialog');
        pleaseWait.modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
    }
}

function closeProcessingDialog() {
    if(processingDialogOpenStatus == 1) {
        processingDialogOpenStatus = 0;
        var pleaseWait = $('#pleaseWaitDialog');
        pleaseWait.modal('hide');
        window.location.reload(false);
    }
}

function updateProgressBar() {
    var percentage = 0;
    if(quetionsToUpdate) {
        percentage = (questionsUpdated/quetionsToUpdate) * 100;
    } else {
        percentage = 100;
    }
    $('.progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);
    $('#percentageText').html(percentage + "%");
}

function errorUpdatingAllBooks() {
    alert("There was some internal error in updating Question list, please report this problem by 'Contact Us'.");
    closeProcessingDialog();
}

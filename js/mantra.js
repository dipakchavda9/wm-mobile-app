$(window).load(function(){
    displayMantraJaapCount();
});

var storage = window.localStorage;

function incrementMantraJaapCount() {
    var currentMantraJaapCount = getCurrentMantraJaapCount();
    var newMantraJaapCount = currentMantraJaapCount + 1;
    storage.setItem('MantraJaapCount', newMantraJaapCount);
    updateMantraJaapLog();
    displayMantraJaapCount();
}

function displayMantraJaapCount() {
    var currentMantraJaapCount = getCurrentMantraJaapCount();
    $('#counterSpan').html(currentMantraJaapCount);

    var todaysMantraJaapCount = getTodaysMantraJaapCount();
    $('#mantraJaapCount').html(todaysMantraJaapCount);
}

function getCurrentMantraJaapCount() {
    var currentMantraJaapCount = storage.getItem('MantraJaapCount');
    if(!currentMantraJaapCount) {
        storage.setItem('MantraJaapCount', 0);
        currentMantraJaapCount = 0;
    } else {
        currentMantraJaapCount = parseInt(currentMantraJaapCount);
    }
    return currentMantraJaapCount;
}

function getTodaysMantraJaapCount() {

    var mantraJaapLogs = storage.getItem('MantraJaapLogs');
    if(!mantraJaapLogs) {
        return 0;
    } else {
        var mantraJaapLogsArray = JSON.parse(mantraJaapLogs);

        var dateObj = new Date();
        var dd = dateObj.getDate();
        var mm = dateObj.getMonth()+1;
        var yyyy = dateObj.getFullYear(); 
        var today = dd+'-'+mm+'-'+yyyy;

        if(mantraJaapLogsArray[today]) {
            return mantraJaapLogsArray[today];
        } else {
            return 0;
        }
    }
}

function updateMantraJaapLog() {
    var mantraJaapLogs = storage.getItem('MantraJaapLogs');

    var dateObj = new Date();
    var dd = dateObj.getDate();
    var mm = dateObj.getMonth()+1;
    var yyyy = dateObj.getFullYear(); 
    var today = dd+'-'+mm+'-'+yyyy;

    if(!mantraJaapLogs) {
        //Initiate Logs.
        var mantraJaapLogsArray = {};
        mantraJaapLogsArray[today] = 1;
        var mantraJaapLogsJson = JSON.stringify(mantraJaapLogsArray);
        storage.setItem('MantraJaapLogs', mantraJaapLogsJson);
    } else {
        var mantraJaapLogsArray = JSON.parse(mantraJaapLogs);
        if(mantraJaapLogsArray[today]) {
            mantraJaapLogsArray[today]++;
        } else {
            mantraJaapLogsArray[today] = 1;
        }

        var mantraJaapLogsJson = JSON.stringify(mantraJaapLogsArray);
        storage.setItem('MantraJaapLogs', mantraJaapLogsJson);
    }

    return;
}

function resetCounter() {
    storage.setItem('MantraJaapCount', 0);
    displayMantraJaapCount();
}


function populateHistoryTableBody() {
    var mantraJaapLogs = storage.getItem('MantraJaapLogs');
    if(!mantraJaapLogs) {
        $('#historyTableDiv').html('<h2>No History Found</h2>');
    } else {
        var tableHtml = "<table class='table table-hovered table-bordered'><thead><tr class='danger'><th>તારીખ</th><th>મંત્રજાપ</th></tr></thead><tbody>";
        var mantraJaapLogsArray = JSON.parse(mantraJaapLogs);
        for(var date in mantraJaapLogsArray) {
            tableHtml += '<tr class="warning"><th>' + date + '</th><th>' + mantraJaapLogsArray[date] + '</th></tr>';
        }
        tableHtml += '</tbody></table>';
        $('#historyTableDiv').html(tableHtml);
    }
}





function displayMantraLekhanCount() {
    var currentMantraLekhanCount = getCurrentMantraLekhanCount();
    $('#counterSpan').html(currentMantraLekhanCount);

    var todaysMantraLekhanCount = getTodaysMantraLekhanCount();
    $('#mantraLekhanCount').html(todaysMantraLekhanCount);
}

function getCurrentMantraLekhanCount() {
    var currentMantraLekhanCount = storage.getItem('MantraLekhanCount');
    if(!currentMantraLekhanCount) {
        storage.setItem('MantraLekhanCount', 0);
        currentMantraLekhanCount = 0;
    } else {
        currentMantraLekhanCount = parseInt(currentMantraLekhanCount);
    }
    return currentMantraLekhanCount;
}

function getTodaysMantraLekhanCount() {
    var mantraLekhanLogs = storage.getItem('MantraLekhanLogs');
    if(!mantraLekhanLogs) {
        return 0;
    } else {
        var mantraLekhanLogsArray = JSON.parse(mantraLekhanLogs);

        var dateObj = new Date();
        var dd = dateObj.getDate();
        var mm = dateObj.getMonth()+1;
        var yyyy = dateObj.getFullYear(); 
        var today = dd+'-'+mm+'-'+yyyy;

        if(mantraLekhanLogsArray[today]) {
            return mantraLekhanLogsArray[today];
        } else {
            return 0;
        }
    }
}

function resetMantraLekhanCounter() {
    storage.setItem('MantraLekhanCount', 0);
    displayMantraLekhanCount();
}

function incrementMantraLekhanCount() {
    var currentMantraLekhanCount = getCurrentMantraLekhanCount();
    var newMantraLekhanCount = currentMantraLekhanCount + 1;
    storage.setItem('MantraLekhanCount', newMantraLekhanCount);
    updateMantraLekhanLog();
    displayMantraLekhanCount();
    $("#mantraLekhanTextbox").val('');
}

function updateMantraLekhanLog() {
    var mantraLekhanLogs = storage.getItem('MantraLekhanLogs');

    var dateObj = new Date();
    var dd = dateObj.getDate();
    var mm = dateObj.getMonth()+1;
    var yyyy = dateObj.getFullYear(); 
    var today = dd+'-'+mm+'-'+yyyy;

    if(!mantraLekhanLogs) {
        //Initiate Logs.
        var mantraLekhanLogsArray = {};
        mantraLekhanLogsArray[today] = 1;
        var mantraLekhanLogsJson = JSON.stringify(mantraLekhanLogsArray);
        storage.setItem('MantraLekhanLogs', mantraLekhanLogsJson);
    } else {
        var mantraLekhanLogsArray = JSON.parse(mantraLekhanLogs);
        if(mantraLekhanLogsArray[today]) {
            mantraLekhanLogsArray[today]++;
        } else {
            mantraLekhanLogsArray[today] = 1;
        }

        var mantraLekhanLogsJson = JSON.stringify(mantraLekhanLogsArray);
        storage.setItem('MantraLekhanLogs', mantraLekhanLogsJson);
    }

    return;
}

function checkMantra(mantraLekhanTextbox) {

    var currentStr = mantraLekhanTextbox.value.toUpperCase();

    if(currentStr.length >= 12) {
        if(currentStr == 'SWAMINARAYAN') {
            incrementMantraLekhanCount();
        }
        mantraLekhanTextbox.value = '';
    }

    return;
}

function populateMantraLekhanHistoryTableDiv() {
    var mantraLekhanLogs = storage.getItem('MantraLekhanLogs');
    if(!mantraLekhanLogs) {
        $('#mantraLekhanHistoryTableDiv').html('<h2>No History Found</h2>');
    } else {
        var tableHtml = '<table class="table table-bordered"><thead><tr class="danger"><th>તારીખ</th><th>મંત્રલેખન</th></tr></thead><tbody>';
        var mantraLekhanLogsArray = JSON.parse(mantraLekhanLogs);
        for(var date in mantraLekhanLogsArray) {
            tableHtml += '<tr class="warning"><th>' + date + '</th><th>' + mantraLekhanLogsArray[date] + '</th></tr>';
        }
        tableHtml += '</tbody></table>';
        $('#mantraLekhanHistoryTableDiv').html(tableHtml);
    }
}

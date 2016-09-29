var errorCount = 0;
var imageCount = 25;

function displayTodaysDarshan() {

    var dateObj = new Date();
    var dd = dateObj.getDate();
    var mm = dateObj.getMonth()+1;
    var yyyy = dateObj.getFullYear(); 
    if(dd<10) {
        dd='0'+dd;
    } 
    if(mm<10) {
        mm='0'+mm;
    }
    date = dd+'-'+mm+'-'+yyyy;

    var screenHeight = $(window).height();
    var screenWidth = $(window).width();

    var darshanHtml = '';
    var i;
    for(i=1;i<=imageCount;i++) {
        darshanHtml += '<div id="dev' + i + '"><img src="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg" max-height="' + screenHeight/2 + 'px" max-width="' + screenWidth/2 + 'px" height="50%" width="50%" onerror="hideImage(' + i + ')""/></div>';
    }
    $("#darshan").html(darshanHtml);
}

function displayDarshan(dateStr) {

    if(!dateStr) {
        var dateObj = new Date();
    } else {
        var dateObj = new Date(dateStr);
    }
    var dd = dateObj.getDate();
    var mm = dateObj.getMonth()+1;
    var yyyy = dateObj.getFullYear(); 
    if(dd<10) {
        dd='0'+dd;
    } 
    if(mm<10) {
        mm='0'+mm;
    }
    date = dd+'-'+mm+'-'+yyyy;

    var screenHeight = $(window).height();
    var screenWidth = $(window).width();

    var darshanHtml = '';
    var i;
    for(i=1;i<=imageCount;i++) {
        darshanHtml += '<div id="dev' + i + '"><img src="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg" max-height="' + screenHeight/2 + 'px" max-width="' + screenWidth/2 + 'px" height="50%" width="50%" onerror="hideImage(' + i + ')""/></div>';
    }
    $("#darshan").html(darshanHtml);
}

function hideImage(index) {
    $('#dev' + index).hide();
    errorCount++;
    if(errorCount >= imageCount) {
        showMessageBlock();
    }
}

function showMessageBlock() {
    $('#message').show();
    $('#darshan').hide();
}

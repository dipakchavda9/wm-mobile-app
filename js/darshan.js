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

    var darshanHtml = '<div id="lightgallery">';
    var i;
    for(i=1;i<=imageCount;i++) {
        darshanHtml += '<a href="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg" data-download-url="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg"><img src="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg" max-height="' + screenHeight/2 + 'px" max-width="' + screenWidth/2 + 'px" height="50%" width="50%" onerror="removeImage(this)" onload="addStyletoImage(this)"/></a>';
    }
    darshanHtml += '</div>';
    $("#darshan").html(darshanHtml);

    lightGallery(document.getElementById('lightgallery'), {
        mode: 'lg-fade',
        download: false
    });

}

function removeImage(img) {
    $(img).parent().remove();
    errorCount++;
    if(errorCount >= imageCount) {
        showMessageBlock();
    }
}

function addStyletoImage(img) {
    $(img).css('border', '2px solid white');
}

function showMessageBlock() {
    $('#message').show();
    $('#darshan').hide();
}

/*
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
}
*/

var errorCount;
var imageCount;
var triedLoadingImageCount;

function displayDarshan(date = null) {

    errorCount = 0;
    imageCount = 25;
    triedLoadingImageCount = 0;

    $('#datepickerRow').hide();
    $('#message').hide();
    $('#darshan').show();

    if(!date) {
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

        $('#message').html(`<h2>Jay Swaminarayan!<br/><br/>Today's Darshan will be displayed soon!</h2>`);

    } else {

        $('#message').html(`<h2>Jay Swaminarayan!<br/><br/>Sorry...<br/>Darshan of date '` + date + `' is not available.</h2>`);

    }

    $('#titleDate').html(date);

    var screenHeight = $(window).height();
    var screenWidth = $(window).width();

    var darshanHtml = '';
    var i;
    for(i=1;i<=imageCount;i++) {
        darshanHtml += '<a href="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg" data-download-url="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg"><img src="http://wadhwanmandir.org/wp-content/uploads/dailydarshan/dev' + i + '_' + date + '.jpg" max-height="' + screenHeight/2 + 'px" max-width="' + screenWidth/2 + 'px" height="50%" width="50%" onerror="removeImage(this)" onload="addStyletoImage(this)"/></a>';
    }
    $("#lightgallery").html(darshanHtml);

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
    increamentTriedLoadingImageCount();
}

function addStyletoImage(img) {
    $(img).css('border', '2px solid white');
    increamentTriedLoadingImageCount();
}

function showMessageBlock() {
    $('#message').show();
    $('#darshan').hide();
}

function increamentTriedLoadingImageCount() {
    triedLoadingImageCount++;
    if(triedLoadingImageCount >= imageCount) {
        $('#datepickerRow').show();
    }
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

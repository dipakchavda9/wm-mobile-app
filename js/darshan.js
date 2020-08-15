var errorCount;
var imageCount;
var triedLoadingImageCount;
var numbers=["1","2","3","4","5","6","7","8","9","0"];
function changeDateFont(strDate) {
    return strDate.replace(/1/ig, '૧').replace(/2/ig, '૨').replace(/3/ig, '૩').replace(/4/ig, '૪').replace(/5/ig, '૫').replace(/6/ig, '૬').replace(/7/ig, '૭').replace(/8/ig, '૮').replace(/9/ig, '૯').replace(/0/ig, '૦');
}
function displayDarshan(date = null) {

    errorCount = 0;
    imageCount = 25;
    triedLoadingImageCount = 0;

    $('#datepickerRow').hide();
    $('#alert').hide();
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

        $('#message').html('<h2>જય સ્વામિનારાયણ!<br/><br/>આજના દર્શન ટૂંક સમયમાં પ્રદશિત થશે!</h2>');

    } else {

        $('#message').html('<h2>જય સ્વામિનારાયણ!<br/><br/>માફ કરશો...<br/>તારીખ ' + changeDateFont(date) + ' નાં દર્શન ઉપલબ્ધ નથી.</h2>');

    }

    $('#titleDate').html(changeDateFont(date));

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
    $('#alert').show();
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

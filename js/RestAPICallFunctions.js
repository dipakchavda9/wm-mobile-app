var baseURL = 'http://wadhwanmandir.org/api-beta/public/';
var authorizationType = 'Basic';
var authorizationHash = 'd2FkaHdhbm1hbmRpcmFwaTpXNGRodyRuYXBpITEwMDg=';

function getAllKirtans(successCallback, errorCallback) {
    $(document).ready(function() {
        $.ajax({
            url: baseURL + 'kirtans',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
            },
        })
        .done(successCallback)
        .fail(errorCallback);
    });
}

function getKirtan(kirtanId, successCallback, errorCallback) {
    $(document).ready(function() {
        $.ajax({
            url: baseURL + 'kirtans/' + parseInt(kirtanId),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
            },
        })
        .done(successCallback)
        .fail(errorCallback);
    });
}

function getAllBookInfo(successCallback, errorCallback) {
    $(document).ready(function() {
        $.ajax({
            url: baseURL + 'books',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
            },
        })
        .done(successCallback)
        .fail(errorCallback);
    });
}

function getBookInfo(bookId, successCallback, errorCallback) {
    $(document).ready(function() {
        $.ajax({
            url: baseURL + 'books/' + parseInt(bookId),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
            },
        })
        .done(successCallback)
        .fail(errorCallback);
    });
}

function getAllPhotosets(successCallback, errorCallback) {
    $(document).ready(function() {
        $.ajax({
            url: baseURL + 'photoset',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
            },
        })
        .done(successCallback)
        .fail(errorCallback);
    });
}

function getPhotoset(photosetId, successCallback, errorCallback) {
    $(document).ready(function() {
        $.ajax({
            url: baseURL + 'photoset/' + parseInt(photosetId),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
            },
        })
        .done(successCallback)
        .fail(errorCallback);
    });
}

var storage = window.localStorage;

function ListAlbums(albums) {
    
    var totalAlbums = albums._embedded.photoset.length;
    
    var i = totalAlbums - 1;
    var listHtml = '<ol class="rounded-list">';
    
    while(i >= 0) {
        listHtml += '<li onclick="RedirectToDisplayAlbum(' + albums._embedded.photoset[i].id + ');"><label>' + albums._embedded.photoset[i].name + '</label></li>';
        i--;
    }
    listHtml += '</ol>';
    
    $('#AlbumList').html(listHtml);

}

function ErrorListingAlbums(error) {
    alert('Error listing albums.');
    location.href='/index.html';
}

function RedirectToDisplayAlbum(albumId) {
    storage.setItem('AlbumIdToDisplay', albumId);
    location.href='DisplayAlbum.html';
}

var totalPhotos;
var errorCount = 0;

function DisplayPhotos(photoset) {
    var photoLinks = photoset.photo_links;
    totalPhotos = photoLinks.length;
    var i;
    var html = '';
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();

    for(i = 0; i < totalPhotos; i++) {
        photoLinks[i] = encodeURI(photoLinks[i]);
        html += '<a href="' + photoLinks[i] + '" data-download-url="' + photoLinks[i] + '"><img src="' + photoLinks[i] + '" max-height="' + screenHeight/2 + 'px" max-width="' + screenWidth/2 + 'px" height="50%" width="50%" onerror="removeImage(this)" onload="addStyletoImage(this)"/></a>';
    }
    
    $("#lightgallery").html(html);

    lightGallery(document.getElementById('lightgallery'), {
        mode: 'lg-fade',
        download: false
    });
}

function ErrorDisplayingAlbum(error) {
    alert('Error listing albums.');
    location.href='/html/AlbumList.html';
}

function removeImage(img) {
    $(img).parent().remove();
    errorCount++;
    if(errorCount >= totalPhotos) {
        showMessageBlock();
    }
}

function addStyletoImage(img) {
    $(img).css('border', '2px solid white');
}

function showMessageBlock() {
    $('#message').show();
    $('#lightgallery').hide();
}

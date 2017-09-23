var storage = window.localStorage;

function ListAudiosets(audiosets) {
    
    var totalAudiosets = audiosets.total_items;

    var i = totalAudiosets - 1;
    var listHtml = '<ol class="rounded-list"';
    
    while(i >= 0) {
        listHtml += '<li onclick="RedirectToPlayAudioSet(' + audiosets._embedded.audioset[i].id + ');"><label>' + audiosets._embedded.audioset[i].name + '</label></li>';
        i--;
    }
    listHtml += '</ol>';
    
    $('#AudiosetList').html(listHtml);

}

function ErrorListingAudiosets(error) {
//    alert('Error listing Audiosets.');
    location.href='../index.html';
}

function RedirectToPlayAudioSet(audiosetId) {
    storage.setItem('AudiosetIdToPlay', audiosetId);
    location.href='PlayAudioSet.html';
}

function PlayAudioset(audioset) {
    
    var audioLinks = audioset.audio_links;
    totalAudios = audioset.audio_links.length;
    var i;
    var html = '';

    for(i = 0; i < totalAudios; i++) {
        audioLinks[i] = encodeURI(audioLinks[i]);
        var parts = audioLinks[i].split('/');
        var AudioName = decodeURI(parts[parts.length - 1]);

        html += '<h3>' + AudioName + '</h3> <audio preload="metadata" controls> <source src="' + audioLinks[i] + '"> </audio> <span class="download-icon"><a href="' + audioLinks[i] + '"><i class="glyphicon glyphicon-download-alt"></i></a></span><br />';
    }

    $("#wrapper").html(html);

    $(function() {$('audio').audioPlayer();});
}

function ErrorPlayingAudioset(error) {
//    alert('Error playing Audioset.');
    location.href='ListAudioSets.html';
}

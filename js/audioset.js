var storage = window.localStorage;

function ListAudiosets(audiosets) {
    
    var totalAudiosets = audiosets.total_items;

    var i = 0;
    var listHtml = '<div class="list"><ul>';
    
    while(i < totalAudiosets) {
        listHtml += '<li onclick="RedirectToPlayAudioSet(' + audiosets._embedded.audioset[i].id + ');"><span>' + audiosets._embedded.audioset[i].name + '</span></li>';
        i++;
    }
    listHtml += '</ul></div>';
    
    $('#AudiosetList').html(listHtml);

}

function ErrorListingAudiosets(error) {
    alert('Error listing Audiosets.');
    location.href='/index.html';
}

function RedirectToPlayAudioSet(audiosetId) {
    storage.setItem('AudiosetIdToPlay', audiosetId);
    location.href='/html/PlayAudioSet.html';
}

function PlayAudioset(audioset) {
    
    var audioLinks = audioset.audio_links;
    totalAudios = audioset.audio_links.length;
    var i;
    var html = '';

    for(i = 0; i < totalAudios; i++) {
        audioLinks[i] = encodeURI(audioLinks[i]);
        var parts = audioLinks[i].split('/');
        var AudioName = parts[parts.length - 1];

        html += '<h3>' + AudioName + '</h3> <audio preload="auto" controls> <source src="' + audioLinks[i] + '"> </audio> <span class="download-icon"><a href="' + audioLinks[i] + '"><i class="ion-ios-cloud-download"></i></a></span> <div class="line-break"></div>';
    }
    
    $("#wrapper").html(html);

    $(function() {$('audio').audioPlayer();});
}

function ErrorPlayingAudioset(error) {
    alert('Error playing Audioset.');
    location.href='/html/ListAudioSets.html';
}

var db = window.openDatabase("appDatabase", "1.0", "Application Databse", 25 * 1024 * 1024);

function getShastraList() {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM books WHERE content_updated = 1 AND published = 1', [], (tx, results) => {
            var len = results.rows.length;
            if(!len || len < 1) {
                displayDownloadMessage();
            } else {
                var booksToDisplay = [];
                for (var i = 0; i < len; i++){
                    booksToDisplay[i] = results.rows.item(i);
                }
				$("divError").addClass("hidden");
                displayBooks(booksToDisplay);
            }
            return;
        }, (tx, error) => {
            displayDownloadMessage();
        });
    });
};

function displayDownloadMessage() {
    var htmlStr = `
    <h3>No Shatshastras are downloaded yet!</h3>
    `;
    $("divError").removeClass("hidden");
}

function displayBooks(books) {
    var i;
    var len = books.length;
    var htmlStr = '<ol class="rounded-list">';
    for( i = 0 ; i < len ; i++) {
        htmlStr += "<li><label onclick='RedirectToShastra(" + books[i].id + ", " + books[i].level_depth + ");'>" + books[i].book_name + "</label></li>";
    }
    htmlStr += '</ol>';
    $('#ShastraList').html(htmlStr);
}

function RedirectToShastra(id, level_depth) {
    var storage = window.localStorage;
    storage.setItem('book_id', id);

    if(level_depth == 2) {
        window.location.href = "depth-two-level-one.html";
    } else if (level_depth == 3) {
        window.location.href = "depth-three-level-one.html";
    }
    return;
}

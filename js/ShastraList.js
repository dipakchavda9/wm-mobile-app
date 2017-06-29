function getShastraList() {

	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

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

				displayBooks(booksToDisplay);
			}

			return;

		}, (tx, error) => {
			// alert('Selection error: ' + error.message);
			displayDownloadMessage();
		});
	}, (error) => {
		// alert('Transaction error: ' + error.message);
		displayDownloadMessage();
		// var booksToDisplay = [];
		// booksToDisplay[0] = {
		// 	"id" : 1,
		// 	"book_name" : "Vachanamrut",
		// 	"level_depth" : 3
		// };
		// booksToDisplay[1] = {
		// 	"id" : 2,
		// 	"book_name" : "Shikshapatri",
		// 	"level_depth" : 2
		// };
		// booksToDisplay[2] = {
		// 	"id" : 3,
		// 	"book_name" : "Satsangijivan",
		// 	"level_depth" : 2
		// };
		// displayBooks(booksToDisplay);
	}, () => {

	});

};

function displayDownloadMessage() {
	var htmlStr = `
        <h3>No Shatshastras are downloaded yet!</h3>
	`;
	$('#ShastraList').html(htmlStr);
}

function displayBooks(books) {

	var i;
	var len = books.length;

	var htmlStr = '<div class="list-big"><ul>';

	for( i = 0 ; i < len ; i++) {
		htmlStr += `
			<li onclick="RedirectToShastra(` + books[i].id + `, ` + books[i].level_depth + `);"><span>` + books[i].book_name + `</span></li>
		`;
	}

	htmlStr += '</ul></div>';

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

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
			alert('Selection error: ' + error.message);
			displayDownloadMessage();
		});
	}, (error) => {
		alert('Transaction error: ' + error.message);
		displayDownloadMessage();
		// var booksToDisplay = [];
		// booksToDisplay[0] = {
		// 	"id" : 1,
		// 	"book_name" : "Vachanamrut"
		// };
		// booksToDisplay[1] = {
		// 	"id" : 2,
		// 	"book_name" : "Shikshapatri"
		// };
		// displayBooks(booksToDisplay);
	}, () => {

	});

};

function displayDownloadMessage() {
	var htmlStr = `
        <h3>No Shatshastras are downloaded yet!</h3>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <button onclick="SyncSatshastraDetails();">Download Shatshastras</button>
        </div>
	`;
	$('#ShastraList').html(htmlStr);
}

function displayBooks(books) {

	var i;
	var len = books.length;

	var htmlStr = '<div class="list-big"><ul>';

	for( i = 0 ; i < len ; i++) {
		htmlStr += `
			<li onclick="RedirectToShastra(` + books[i].id + `);"><span>` + books[i].book_name + `</span></li>
		`;
	}

	htmlStr += '</ul></div>';

	$('#ShastraList').html(htmlStr);

}

function RedirectToShastra(id) {
	alert("Redirecting to Shastra with id: " + id);
}

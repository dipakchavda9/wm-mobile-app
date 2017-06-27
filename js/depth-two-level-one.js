var book_id = null;
var storage = window.localStorage;
var local_table_name = null;

function loadChapterList() {
	book_id = storage.getItem("book_id");
	getLocalTableNameOfBook(book_id);
}

function getLocalTableNameOfBook(id) {
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
	db.transaction((tx) => {
		tx.executeSql('SELECT local_table_name FROM books WHERE id = ?', [id], (tx, results) => {
			var row = results.rows.item(0);
			local_table_name = row.local_table_name;

			displayChapterList();

		}, (tx, error) => {
			alert('Selection error: ' + error.message);
		});
	}, (error) => {
		alert('Transaction error: ' + error.message);
	}, () => {

	});

}

function displayChapterList() {
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
	db.transaction((tx) => {
		tx.executeSql('SELECT * FROM ' + local_table_name + ' ORDER BY chapter_id ASC', [], (tx, results) => {
			var len = results.rows.length;
			var chapterRow = null;
			var htmlStr = '<div class="list"><ul>';

			storage.setItem('last_chapter_id', len);

			for(var i=0; i<len; i++) {
				chapterRow = results.rows.item(i);
				htmlStr += `
					<li onclick="RedirectToChapter(` + chapterRow.chapter_id + `);"><span>` + chapterRow.chapter_title + `</span></li>
				`;
			}

			htmlStr += '</ul></div>';

			$('#ChaptersList').html(htmlStr);

		}, (tx, error) => {
			alert('Selection error: ' + error.message);
		});
	}, (error) => {
		alert('Transaction error: ' + error.message);
	}, () => {

	});

}

function RedirectToChapter(chapter_id) {

	storage.setItem('book_id', book_id);
	storage.setItem('chapter_id', chapter_id);

	window.location.href = "depth-two-level-two.html";
}
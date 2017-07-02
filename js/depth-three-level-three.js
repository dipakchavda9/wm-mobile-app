var book_id = null;
var section_id = null;
var chapter_id = null;
var local_table_name = null;
var chapterTitle = null;
var chapterContent = null;
var chapterEnding = null;
var storage = window.localStorage;

function loadChapter() {
	book_id = parseInt(storage.getItem('book_id'));
	section_id = parseInt(storage.getItem('section_id'));
	chapter_id = parseInt(storage.getItem('chapter_id'));
	$('div.ui-loader').hide();
	if(book_id && chapter_id) {
		getLocalTableNameOfBook();
	} else {
		alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
	}
}

function getLocalTableNameOfBook() {
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
	db.transaction((tx) => {
		tx.executeSql('SELECT local_table_name FROM books WHERE id = ?', [book_id], (tx, results) => {
			var row = results.rows.item(0);
			local_table_name = row.local_table_name;

			displayChapter();

		}, (tx, error) => {
			alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
			// alert('Selection error: ' + error.message);
		});
	}, (error) => {
		alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
		// alert('Transaction error: ' + error.message);
	}, () => {

	});

}

function displayChapter() {

	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

	db.transaction((tx) => {
		tx.executeSql('SELECT * FROM ' + local_table_name + ' WHERE chapter_id = ?', [chapter_id], (tx, results) => {
			var chapterRow = results.rows.item(0);
			chapterTitle = chapterRow.chapter_title;
			if(chapterTitle.length > 25) {
				chapterTitle = chapterTitle.substring(0, 25) + '...';
			}
			chapterContent = chapterRow.chapter_content;
			chapterEnding = chapterRow.chapter_ending;
			chapterContent = processChapterContent(chapterContent);
			var htmlStr = `
				<div><span>
					` + chapterContent + `
				</span></div>
			`;

			$('#ChapterTitle').html(chapterTitle);
			$('#Chapter').html(htmlStr);
			$('#ChapterEnding').html(chapterEnding);

			bindSwipeEvents();

			var fontSize = storage.getItem('font-size');

			if(fontSize) {
				resizeFonts(fontSize);
			} else {
				storage.setItem('font-size', 14);
				resizeFonts(14);
			}

		}, (tx, error) => {
			alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
			// alert('Selection error: ' + error.message);
		});
	}, (error) => {
		alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
		// alert('Transaction error: ' + error.message);
	}, () => {

	});

}

function processChapterContent(content) {
	content = content.replace(/\n/ig, '<br/>');
	content = content.replace(/(સામેરી)/ig, "<hr class='top'/><b>$1</b><hr class='bottom'/>");
	content = content.replace(/(પૂર્વછાયો)/ig, "<hr class='top'/><b>$1</b><hr class='bottom'/>");
	content = content.replace(/(ચોપાઇ)/ig, "<hr class='top'/><b>$1</b><hr class='bottom'/>");
	return content;
}

function bindSwipeEvents() {

	$('#chapterDiv').on("swipeleft", () => {
		var lastChapterId = parseInt(storage.getItem('last_chapter_id'));

		if(chapter_id < lastChapterId) {
			storage.setItem('book_id', book_id);
			storage.setItem('section_id', section_id);
			storage.setItem('chapter_id', chapter_id + 1);
			window.location.reload(false);
		}

	});

	$('#chapterDiv').on("swiperight", () => {

		if(chapter_id > 1) {
			storage.setItem('book_id', book_id);
			storage.setItem('section_id', section_id);
			storage.setItem('chapter_id', chapter_id-1);
			window.location.reload(false);
		}

	});

}

function resizeFonts(size) {
	$(".resizableFonts").css('font-size', size + 'px');
}

$( function() {
	var fontSize = storage.getItem('font-size');
	if(!fontSize) {
		fontSize = 14;
		storage.setItem('font-size', fontSize);
	}
	$( "#slider-range-max" ).slider({
		range: "max",
		min: 12,
		max: 34,
		value: fontSize,
		step: 2,
		slide: function( event, ui ) {
			resizeFonts(ui.value);
			storage.setItem('font-size', ui.value);
		}
	});
} );
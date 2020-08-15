var book_id = null;
var section_id = null;
var storage = window.localStorage;
var local_table_name = null;
var book_name = null;
var db = window.openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);

function loadChapterList() {
    book_id = storage.getItem("book_id");
    section_id = storage.getItem("section_id");
    if(book_id && section_id) {
        getLocalTableNameOfBook();
    } else {
        alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
    }
}

function getLocalTableNameOfBook() {
    db.transaction((tx) => {
        tx.executeSql('SELECT local_table_name, book_name FROM books WHERE id = ?', [book_id], (tx, results) => {
            var row = results.rows.item(0);
            local_table_name = row.local_table_name;
            book_name = row.book_name;
            displayChapterList();
        }, (tx, error) => {
            alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
        });
    });
}

function displayChapterList() {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM ' + local_table_name + ' WHERE section_id = ? ORDER BY chapter_id ASC', [section_id], (tx, results) => {
            var len = results.rows.length;
            var chapterRow = null;
            var htmlStr = '<ol class="rounded-list">';
            for(var i=0; i<len; i++) {
                chapterRow = results.rows.item(i);
                htmlStr += `
                    <li onclick="RedirectToChapter(` + chapterRow.chapter_id + `);"><label>` + chapterRow.chapter_title + `</label></li>
                `;
            }
            htmlStr += '</ol>';
            $('#ChaptersList').html(htmlStr);
            $('#BookName').html(book_name);
        }, (tx, error) => {
            alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
        });
    });
}

function RedirectToChapter(chapter_id) {
    storage.setItem('book_id', book_id);
    storage.setItem('section_id', section_id);
    storage.setItem('chapter_id', chapter_id);
    window.location.href = "depth-three-level-three.html";
}
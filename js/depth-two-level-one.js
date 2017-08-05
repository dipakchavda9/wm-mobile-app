var book_id = null;
var storage = window.localStorage;
var local_table_name = null;
var book_name = null;
var db = window.openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);

function loadChapterList() {
    book_id = storage.getItem("book_id");
    if(book_id) {
        getLocalTableNameOfBook(book_id);
    } else {
        alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
    }
}

function getLocalTableNameOfBook(id) {
    db.transaction((tx) => {
        tx.executeSql('SELECT local_table_name, book_name FROM books WHERE id = ?', [id], (tx, results) => {
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
        tx.executeSql('SELECT * FROM ' + local_table_name + ' ORDER BY chapter_id ASC', [], (tx, results) => {
            var len = results.rows.length;
            var chapterRow = null;
            var htmlStr = '<ol class="rounded-list">';
            storage.setItem('last_chapter_id', len);
            for(var i=0; i<len; i++) {
                chapterRow = results.rows.item(i);
                htmlStr += `
                    <li onclick="RedirectToChapter(` + chapterRow.chapter_id + `);"><span>` + chapterRow.chapter_title + `</span></li>
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
    storage.setItem('chapter_id', chapter_id);
    window.location.href = "depth-two-level-two.html";
}
var book_id = null;
var storage = window.localStorage;
var local_table_name = null;
var book_name = null;
var db = window.openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);

function loadSectionList() {
    book_id = storage.getItem("book_id");
    if(book_id) {
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
            displaySectionList();
        }, (tx, error) => {
            alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
        });
    });
}

function displaySectionList() {
    db.transaction((tx) => {
        tx.executeSql('SELECT DISTINCT section_id, section_title FROM ' + local_table_name + ' ORDER BY section_id ASC', [], (tx, results) => {
            var len = results.rows.length;
            var sectionRow = null;
            var htmlStr = '<ol class="rounded-list">';
            for(var i=0; i<len; i++) {
                sectionRow = results.rows.item(i);
                htmlStr += "<li onclick='RedirectToSection(" + sectionRow.section_id + ");'><label>" + sectionRow.section_title + "</label></li>";
            }
            htmlStr += '</ol>';
            $('#SectionList').html(htmlStr);
            $('#BookName').html(book_name);
        }, (tx, error) => {
            alert("There was some internal error in displaying this Shatshastra, please report this problem by 'Contact Us'.");
        });
    });
}

function RedirectToSection(section_id) {
    storage.setItem('book_id', book_id);
    storage.setItem('section_id', section_id);
    getLastChapterId();
}

function getLastChapterId() {
    db.transaction((tx) => {
        tx.executeSql('SELECT MAX(chapter_id) AS last_chapter_id FROM ' + local_table_name , [], (tx, results) => {
            var row = results.rows.item(0);
            storage.setItem('last_chapter_id', row.last_chapter_id);
            window.location.href = "depth-three-level-two.html";
        }, (tx, error) => {
            window.location.href = "depth-three-level-two.html";
        });
    });
}

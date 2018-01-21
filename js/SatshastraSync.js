var baseURL = 'http://wadhwanmandir.org/api/public/';
var authorizationType = 'Basic';
var authorizationHash = 'd2FkaHdhbm1hbmRpcmFwaTI6VzRkaHckbiExMDA4';
var bookDetailsFromRest = null;
var bookDetailsFromDB = null;
var sqlite = null;
var noOfBooksToUpdate = 0;
var noOfBooksUpdated = 0;
var processingDialogOpenStatus = 0;
var db = window.openDatabase("appDatabase", "1.0", "Application Databse", 50 * 1024 * 1024);

function SyncSatshastraDetails() {
    if(checkConnection()) {
        getBookDetailsFromRest();
    }
};

function checkConnection() {
    var networkState = navigator.connection.type;
    if(networkState == Connection.ETHERNET || 
    	networkState == Connection.WIFI || 
    	networkState == Connection.CELL_2G || 
    	networkState == Connection.CELL_3G || 
    	networkState == Connection.CELL_4G || 
    	networkState == Connection.CELL) {
    	return true;
    }
    return false;
}

function getBookDetailsFromRest() {
    $.ajax({
        url: baseURL + 'books',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
        },
    })
    .done((data) => {
        bookDetailsFromRest = data._embedded.books;
        getBookDetailsFromDB();
    })
    .fail((error) => {
        
    });
}

function getBookDetailsFromDB() {
    var createBookTableSql = `
        CREATE TABLE IF NOT EXISTS books (
          id int(5) PRIMARY KEY NOT NULL,
          book_name varchar(250) NOT NULL,
          description varchar(1000),
          icon_link varchar(1000),
          author varchar(250),
          date_uploaded TEXT NOT NULL,
          date_modified TEXT,
          version varchar(10) NOT NULL,
          api_link varchar(1000) NOT NULL,
          published int(1) NOT NULL,
          level_depth int(1) NOT NULL,
          local_table_name varchar(100) NOT NULL,
          content_updated int(1) NOT NULL
        )
    `;
    db.transaction((tx) => {
        tx.executeSql(createBookTableSql, [],
        (tx, result) => {
            tx.executeSql('SELECT * FROM books', [], (tx, results) => {
                bookDetailsFromDB = [];
                var len = results.rows.length;
                for (i = 0; i < len; i++){
                    bookDetailsFromDB[i] = results.rows.item(i);
                }
                compareBookDetails();
            }, (tx, error) => {
                bookDetailsFromDB = null;
                tx.executeSql('DROP TABLE IF EXISTS books', [], (tx, results) => {}, (tx, error) => {});
            });
        },
        (tx, error) => {
            tx.executeSql('DROP TABLE IF EXISTS books', [], (tx, results) => {}, (tx, error) => {});
        });
    });
}

function compareBookDetails() {
    var len = bookDetailsFromRest.length;
    for(var i=0; i < len; i++) {
        remoteBook = bookDetailsFromRest[i];
        if(remoteBook.published == 1) {
            localBook = getLocalBookByID(remoteBook.id);
            if(!localBook) {
                if(confirmUpdateAction()) {
                    noOfBooksToUpdate++;
                    openProcessingDialog();
                    insertLocalBook(remoteBook);
                }
            } else if(localBook.version != remoteBook.version) {
                if(confirmUpdateAction()) {
                    noOfBooksToUpdate++;
                    openProcessingDialog();
                    updateLocalBookByID(localBook.id, remoteBook);
                }
            }
        }
    }
    var len = bookDetailsFromDB.length;
    for(var i=0; i < len; i++) {
        localBook = bookDetailsFromDB[i];
        remoteBook = getRemoteBookByID(localBook.id);
        if(!remoteBook || remoteBook.published != 1) {
            if(confirmUpdateAction()) {
                removeLocalBookByID(localBook.id);
            }
        }
    }
    setTimeout(function(){ 
        syncSatshastraContent(); 
    }, 10000);
}

var updateDecisionTaken = false;
var allowUpdate = false;

function nullifyUpdateActionVars() {
    updateDecisionTaken = false;
    allowUpdate = false;
    processingDialogOpenStatus = 0;
}

function confirmUpdateAction() {
    if(updateDecisionTaken) {
        return allowUpdate;
    }
    if(confirm("Update of Shatshastras are available, do you want to download the same? \n\n[Note: This action may take between 2 to 10 minutes depending on your internet connection speed!]")) {
        allowUpdate = true;
    } else {
        allowUpdate = false;
    }
    updateDecisionTaken = true;
    return allowUpdate;
}

function getLocalBookByID(id) {
    var len = bookDetailsFromDB.length;
    if(!len || len <= 0) {
        return null;
    }
    for(var i=0; i < len; i++) {
        if(id == bookDetailsFromDB[i].id) {
            return bookDetailsFromDB[i];
        }
    }
    return null;
}

function getRemoteBookByID(id) {
    var len = bookDetailsFromRest.length;
    if(!len || len <= 0) {
        return null;
    }
    for(var i=0; i < len; i++) {
        if(id == bookDetailsFromRest[i].id) {
            return bookDetailsFromRest[i];
        }
    }
    return null;
}

function insertLocalBook(book) {
    var insertBookSql = `
        INSERT INTO books(
            id,
            book_name,
            description,
            icon_link,
            author,
            date_uploaded,
            date_modified,
            version,
            api_link,
            published,
            level_depth,
            local_table_name,
            content_updated
            ) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    var dataBinding = [
        book.id,
        book.book_name,
        book.description,
        book.icon_link,
        book.author,
        book.date_uploaded,
        book.date_modified,
        book.version,
        book.api_link,
        book.published,
        book.level_depth,
        book.local_table_name,
        0
    ];
    db.transaction((tx) => {
        tx.executeSql(insertBookSql, dataBinding);
    });
}

function updateLocalBookByID(id, book) {
    var updateBookSql = `
        UDATE books SET
            book_name = ?,
            description = ?,
            icon_link = ?,
            author = ?,
            date_uploaded = ?,
            date_modified = ?,
            version = ?,
            api_link = ?,
            published = ?,
            level_depth = ?,
            local_table_name = ?,
            content_updated = ?
        WHERE 
            id = ?
    `;
    var dataBinding = [
        book.book_name,
        book.description,
        book.icon_link,
        book.author,
        book.date_uploaded,
        book.date_modified,
        book.version,
        book.api_link,
        book.published,
        book.level_depth,
        book.local_table_name,
        0,
        book.id
    ];
    db.transaction((tx) => {
        tx.executeSql(updateBookSql, dataBinding);
    });
}

function removeLocalBookByID(id) {
    var deleteBookSql = `
        DELETE FROM books WHERE id = ?
    `;
    var dataBinding = [
        id
    ];
    db.transaction((tx) => {
        tx.executeSql(deleteBookSql, dataBinding);
    });
}

function syncSatshastraContent() {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM books WHERE content_updated = 0 AND published = 1 LIMIT 1', [], (tx, results) => {
            var book = null;
            if (results.rows.length === 1){
                book = results.rows.item(0);
                fetchBookContentFromRest(book);
            }
        }, (tx, error) => {
            tx.executeSql('DROP TABLE IF EXISTS books', [], (tx, results) => {}, (tx, error) => {});
            errorUpdatingAllBooks();
        });
    });
}

function fetchBookContentFromRest(book) {
    $.ajax({
        url: baseURL + book.api_link,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
        },
    })
    .done((data) => {
        bookData = data._embedded;
        bookData = bookData[book.api_link];
        createLocalTableForBook(book, bookData);
    })
    .fail((error) => {
    	errorUpdatingPerticularBook(book, true);
    });
}

function createLocalTableForBook(book, bookData) {
    if(book.level_depth == 2) {
        createLocalTableSql = `
            CREATE TABLE ` + book.local_table_name + ` (
              id int(6) PRIMARY KEY NOT NULL,
              chapter_id int(6) NOT NULL,
              chapter_title varchar(250),
              chapter_content TEXT,
              chapter_ending varchar(250)
            )
        `;
    } else if (book.level_depth == 3) {
        createLocalTableSql = `
            CREATE TABLE ` + book.local_table_name + ` (
              id int(6) PRIMARY KEY NOT NULL,
              section_id int(6) NOT NULL,
              section_title varchar(250),
              chapter_id int(6) NOT NULL,
              chapter_title varchar(250),
              chapter_content TEXT,
              chapter_ending varchar(250)
            )
        `;
    } else {
        return;
    }

    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS " + book.local_table_name, 
            [],
            (tx, result) => {
                tx.executeSql(
                    createLocalTableSql, 
                    [],
                    (tx, result) => {
                        insertBookContentIntoLocalTable(book, bookData);
                    },
                    (tx, error) => {
                        errorUpdatingPerticularBook(book, true);
                    });
            },
            (tx, error) => {
                errorUpdatingPerticularBook(book, true);
            });
    });
}

function insertBookContentIntoLocalTable(book, bookData) {
    var insertIntoLocalTableSql = "";
    if(book.level_depth == 2) {
        insertIntoLocalTableSql = `
            INSERT INTO ` + book.local_table_name + ` 
                    (id, chapter_id, chapter_title, chapter_content, chapter_ending)
            VALUES
                    (?, ?, ?, ?, ?)
        `;
    } else if (book.level_depth == 3) {
        insertIntoLocalTableSql = `
            INSERT INTO ` + book.local_table_name + ` 
                    (id, section_id, section_title, chapter_id, chapter_title, chapter_content, chapter_ending)
            VALUES
                    (?, ?, ?, ?, ?, ?, ?)
        `;
    }
    len = bookData.length;
    var i;
    for(i = 0; i < len; i++) {
        //Insert content into local table.
        dataBinding = null;
        if(book.level_depth == 2) {
            dataBinding = [
                bookData[i].id,
                bookData[i].chapter_id, 
                bookData[i].chapter_title, 
                bookData[i].chapter_content, 
                bookData[i].chapter_ending
            ];
        } else if (book.level_depth == 3) {
            dataBinding = [
                bookData[i].id,
                bookData[i].section_id,
                bookData[i].section_title,
                bookData[i].chapter_id, 
                bookData[i].chapter_title, 
                bookData[i].chapter_content, 
                bookData[i].chapter_ending
            ];
        }
        if(i == (len-1)) {
            executeInsert(insertIntoLocalTableSql, dataBinding, book);
        } else {
            executeInsert(insertIntoLocalTableSql, dataBinding);
        }
    }
}

function executeInsert(sql, binding, book = null) {
    db.transaction((tx) => {
        tx.executeSql(sql, binding, (tx, results) => {
            if(book) {
                markBookAsContentUpdated(book);
            }
        }, (tx, error) => {

        });
    });
}

function markBookAsContentUpdated(book) {
    var sql = "UPDATE books SET content_updated = ? WHERE id = ?";
    var binding = [
        1,
        book.id
    ];
    db.transaction((tx) => {
        tx.executeSql(sql, binding, (tx, results) => {
            noOfBooksUpdated++;
            updateProgressBar();
            if(noOfBooksUpdated == noOfBooksToUpdate) {
                closeProcessingDialog();
            }
            syncSatshastraContent();
        }, (tx, error) => {
            errorUpdatingPerticularBook(book, true);
            removeLocalTable(book.local_table_name);
        });
    });
}

function removeLocalTable(localTableName) {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS " + localTableName, 
            [],
            (tx, result) => {
                
            },
            (error) => {
                
            });
    });
}

function openProcessingDialog() {
    if(processingDialogOpenStatus == 0) {
        processingDialogOpenStatus = 1;
        var pleaseWait = $('#pleaseWaitDialog');
        pleaseWait.modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
    }
}

function closeProcessingDialog() {
    if(processingDialogOpenStatus == 1) {
        processingDialogOpenStatus = 0;
        var pleaseWait = $('#pleaseWaitDialog');
        pleaseWait.modal('hide');
        window.location.reload(false);
    }
}

function updateProgressBar() {
    var percentage = 0;
    if(noOfBooksToUpdate) {
        percentage = (noOfBooksUpdated/noOfBooksToUpdate) * 100;
    } else {
        percentage = 100;
    }
    $('.progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);
    $('#percentageText').html(percentage + "%");
}

function errorUpdatingAllBooks() {
    alert("There was some internal error in updating Shatshastras, please report this problem by 'Contact Us'.");
    closeProcessingDialog();
}

function errorUpdatingPerticularBook(bookWithError, removeExistingBook = false) {
    alert("There was some internal error in updating Shatshastra: " + bookWithError.book_name + ", hence skipping it. Please report this problem by 'Contact US'.");
    if(removeExistingBook) {
        removeLocalBookByID(bookWithError.id);
    }
    noOfBooksUpdated++;
    updateProgressBar();
    if(noOfBooksUpdated == noOfBooksToUpdate) {
        closeProcessingDialog();
    }
}
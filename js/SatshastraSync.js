var baseURL = 'http://wadhwanmandir.org/api/public/';
var authorizationType = 'Basic';
var authorizationHash = 'd2FkaHdhbm1hbmRpcmFwaTpXNGRodyRuYXBpITEwMDg=';
var bookDetailsFromRest = null;
var bookDetailsFromDB = null;
var sqlite = null;
var db = null;

function SyncSatshastraDetails() {
	getBookDetailsFromRest();
};

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
		//alert("Book Details from Rest" + bookDetailsFromRest);
		getBookDetailsFromDB();
		// updateBookDetails(bookDetails);
	})
    .fail(() => alert("Failed getting book data from Rest, Error: " + error));
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

	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

	db.transaction(function(tx) {
		tx.executeSql(createBookTableSql, [],
		function(tx, result) {
			//alert("Table created successfully. Result: " + result);
		},
		function(error) {
			alert("Error occurred while creating the table. " + error);
		});
		tx.executeSql('SELECT * FROM books', [], (tx, results) => {
			bookDetailsFromDB = [];
			var len = results.rows.length;
			//alert("Length:: " + len);
			for (i = 0; i < len; i++){
				bookDetailsFromDB[i] = results.rows.item(i);
			}
			//alert("Within getBookDetailsFromDB function, books length: ", bookDetailsFromDB.length);
			compareBookDetails();
		}, (tx, error) => {
			alert('Selection error: ' + error.message);
			bookDetailsFromDB = null;
		});
	}, (error) => {
		alert('ERROR: ' + error.message);
		bookDetailsFromDB = null;
	}, () => {

	});

}

function compareBookDetails() {
	//alert("Within compareBookDetails function.");
	var len = bookDetailsFromRest.length;
	//alert("Remote Book Length: " + len);
	for(var i=0; i < len; i++) {
		//alert("i= " + i);
		remoteBook = bookDetailsFromRest[i];
		//alert("remoteBook= " + remoteBook);
		localBook = getLocalBookByID(remoteBook.id);
		if(!localBook) {
			insertLocalBook(remoteBook);
		} else if(localBook.version != remoteBook.version) {
			updateLocalBookByID(localBook.id, remoteBook);
		}
	}

	var len = bookDetailsFromDB.length;
	//alert("Local Book length: " + len);
	for(var i=0; i < len; i++) {
		//alert("i= " + i);
		localBook = bookDetailsFromDB[i];
		//alert("Local Book: " + localBook);
		remoteBook = getRemoteBookByID(localBook.id);
		if(!remoteBook) {
			removeLocalBookByID(localBook.id);
		}
	}

//	showFinalBookDetails();
	syncSatshastraContent();
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
	// console.log("Books to insert");
	// console.log(book);
	//alert("Book to insert: " + book.id);
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
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

	db.transaction(function(tx) {
		tx.executeSql(insertBookSql, dataBinding);
	}, function(error) {
		// console.log('ERROR: ' + error.message);
		alert("Error inserting book: " + book.id + ". Error: " + error);
	}, function() {
		// console.log('Populated database OK');
		//alert("Book inserted: " + book.id);
	});
}

function updateLocalBookByID(id, remoteBook) {
	// console.log("Books to update");
	// console.log(id, remoteBook);
	//alert("Book to update: " + id);
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
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

	db.transaction(function(tx) {
		tx.executeSql(updateBookSql, dataBinding);
	}, function(error) {
		// console.log('ERROR: ' + error.message);
		alert("Error updating Book: " + id + ". Error: " + error);
	}, function() {
		// console.log('Populated database OK');
		//alert("Book updated: " + id);
	});
}

function removeLocalBookByID(id) {
	// console.log("Books to remove");
	// console.log(id);
	//alert("Book to remove: " + id);
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
	var deleteBookSql = `
		DELETE FROM books WHERE id = ?
	`;
	var dataBinding = [
		book.id
	];

	db.transaction(function(tx) {
		tx.executeSql(deleteBookSql, dataBinding);
	}, function(error) {
		// console.log('ERROR: ' + error.message);
		alert("Error removing Book: " + id + ". Error: " + error);
	}, function() {
		// console.log('Populated database OK');
		//alert("Book removed: " + id);
	});
}

function showFinalBookDetails() {
	//alert("Within showFinalBookDetails function.");
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
	var booksToDisplay = [];

	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM books', [], (tx, results) => {
			var len = results.rows.length;
			//alert("Local books length: " + len);
			for (var i = 0; i < len; i++){
				booksToDisplay[i] = results.rows.item(i);
			}
			//alert("Within showFinalBookDetails function, books length: ", booksToDisplay.length);
			var len = booksToDisplay.length;
			$('#rowCount').append(len);
			for (var i = 0; i < len; i++){
				$("#TableData").append(	"<tr><td>"
										+ booksToDisplay[i].id
										+ "</td><td>" 
										+ booksToDisplay[i].book_name
										+ "</td><td>"
										+ booksToDisplay[i].description
										+ "</td><td>"
										+ booksToDisplay[i].icon_link
										+ "</td><td>"
										+ booksToDisplay[i].author
										+ "</td><td>"
										+ booksToDisplay[i].date_uploaded
										+ "</td><td>"
										+ booksToDisplay[i].date_modified
										+ "</td><td>"
										+ booksToDisplay[i].version
										+ "</td><td>"
										+ booksToDisplay[i].api_link
										+ "</td><td>"
										+ booksToDisplay[i].published
										+ "</td><td>"
										+ booksToDisplay[i].level_depth
										+ "</td><td>"
										+ booksToDisplay[i].local_table_name
										+ "</td></tr>");
			}
			//alert("Data displayed.");
		}, (tx, error) => {
			alert('Selection error: ' + error.message);
			booksToDisplay = null;
		});
	}, (error) => {
		alert('ERROR: ' + error.message);
		booksToDisplay = null;
	}, () => {

	});

}

function syncSatshastraContent() {
	//alert("Within syncSatshastraContent function.");
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

	db.transaction((tx) => {
		tx.executeSql('SELECT * FROM books WHERE content_updated = 0', [], (tx, results) => {
			var len = results.rows.length;
			//alert("Total number of books which need content update: " + len);
			book = null;
			for (var i = 0; i < len; i++){
				book = results.rows.item(i);
				alert("Updating content of book " + book.book_name);
				fetchBookContentFromRest(book);
			}
		}, (tx, error) => {
			alert('Error: ' + error.message);
		});
	}, (error) => {
		alert('ERROR: ' + error.message);
	}, () => {

	});

}

function fetchBookContentFromRest(book) {
	//Fetch content from REST
    $.ajax({
        url: baseURL + book.api_link,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
        },
    })
    .done((data) => {
    	//alert("Data for " + book.book_name + " fetched successfully.");
		bookData = data._embedded;
		bookData = bookData[book.api_link];
		createLocalTableForBook(book, bookData);
	})
    .fail(() => alert("Failed getting book data from Rest, Error: " + error));
}

function createLocalTableForBook(book, bookData) {
	//alert("Creating local table for book: " + book.book_name);

	//Create local table if does not exist.

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
		alert("Invalid level depth of book: " + book.book_name);
		return;
	}

	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

	db.transaction((tx) => {
		tx.executeSql(
			"DROP TABLE IF EXISTS " + book.local_table_name, 
			[],
			(tx, result) => {
				//alert("Table " + book.local_table_name + " deleted successfully.");
			},
			(error) => {
				alert("Error occurred while removing the local table: " + book.local_table_name + " Error: " + error);
			});
	}, (error) => {
		alert('ERROR: ' + error.message);
	}, () => {

	});

	db.transaction((tx) => {
		tx.executeSql(
			createLocalTableSql, 
			[],
			(tx, result) => {
				//alert("Table " + book.local_table_name + " created successfully.");
				insertBookContentIntoLocalTable(book, bookData);
			},
			(error) => {
				alert("Error occurred while creating the local table: " + book.local_table_name + " Error: " + error);
			});
	}, (error) => {
		alert('ERROR: ' + error.message);
	}, () => {

	});

}

// function debugData() {
// 	alert('Debug data called.');
// 	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

// 	db.transaction((tx) => {
// 		tx.executeSql('select * from bhakta_chintamani', [], (tx, results) => {
// 			//alert('Data inserted successfully for, id: ' + dataBinding[0] + '; chapter_title: ' + dataBinding[2]);
// 			var len = results.rows.length;
// 			alert("Bhakta Chintamani Length: " + len);
// 			//alert("Total number of books which need content update: " + len);
// 			// row = null;
// 			// for (var i = 0; i < len; i++){
// 			// 	row = results.rows.item(i);
// 			// 	alert(row.chapter_title);
// 			// }
// 		}, (tx, error) => {
// 			alert('Error: ' + error.message);
// 		});
// 	}, (error) => {
// 		alert('ERROR: ' + error.message);
// 	}, () => {

// 	});

// 	db.transaction((tx) => {
// 		tx.executeSql('select * from shikshapatri', [], (tx, results) => {
// 			var len = results.rows.length;
// 			alert("Shikshapatri length: " + len);
// 			// row = null;
// 			// for (var i = 0; i < len; i++){
// 			// 	row = results.rows.item(i);
// 				// alert(row.chapter_title);
// 			// }
// 		}, (tx, error) => {
// 			alert('Error: ' + error.message);
// 		});
// 	}, (error) => {
// 		alert('ERROR: ' + error.message);
// 	}, () => {

// 	});

// }

function insertBookContentIntoLocalTable(book, bookData) {

	insertIntoLocalTableSql = "";

	len = bookData.length;
	var i;
	for(i = 0; i < len; i++) {
		//Insert content into local table.
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
		executeInsert(insertIntoLocalTableSql, dataBinding);

	}

	markBookAsContentUpdated(book);

	// setTimeout(debugData, 10000);

}

function executeInsert(sql, binding) {

	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

	db.transaction((tx) => {
		tx.executeSql(sql, binding, (tx, results) => {
			//alert('Data inserted successfully for, id: ' + dataBinding[0] + '; chapter_title: ' + dataBinding[2]);
		}, (tx, error) => {
			alert('Error: ' + error.message);
		});
	}, (error) => {
		alert('ERROR: ' + error.message);
	}, () => {

	});

}

function markBookAsContentUpdated(book) {

	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

	var sql = "UPDATE books SET content_updated = ? WHERE id = ?";
	var binding = [
		1,
		book.id
	];

	db.transaction((tx) => {
		tx.executeSql(sql, binding, (tx, results) => {
			alert("Book " + book.book_name + " marked as updated.");
		}, (tx, error) => {
			alert('Error: ' + error.message);
		});
	}, (error) => {
		alert('ERROR: ' + error.message);
	}, () => {

	});

}
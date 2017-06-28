var book_id = null;
var chapter_id = null;
var local_table_name = null;
var chapterTitle = null;
var chapterContent = null;
var chapterEnding = null;
var storage = window.localStorage;

function loadChapter() {
	book_id = parseInt(storage.getItem('book_id'));
	chapter_id = parseInt(storage.getItem('chapter_id'));
	$('div.ui-loader').hide();
	getLocalTableNameOfBook(book_id);
}

function getLocalTableNameOfBook(id) {
	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});
	db.transaction((tx) => {
		tx.executeSql('SELECT local_table_name FROM books WHERE id = ?', [id], (tx, results) => {
			var row = results.rows.item(0);
			local_table_name = row.local_table_name;

			displayChapter();

		}, (tx, error) => {
			alert('Selection error: ' + error.message);
		});
	}, (error) => {
		alert('Transaction error: ' + error.message);
	}, () => {

	});

}

function displayChapter() {

	var db = window.sqlitePlugin.openDatabase({name: 'appDatabase.db', location: 'default'});

	db.transaction((tx) => {
		tx.executeSql('SELECT * FROM ' + local_table_name + ' WHERE chapter_id = ?', [chapter_id], (tx, results) => {
			var chapterRow = results.rows.item(0);
			chapterTitle = chapterRow.chapter_title;
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
			alert('Selection error: ' + error.message);
		});
	}, (error) => {
		alert('Transaction error: ' + error.message);
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

// function loadChapter() {
// 	var str = `
// 		પૂર્વછાયો\nસર્વે સંત સુજાણને, હું પ્રથમ લાગી પાય;\nઆદરું આ ગ્રંથને, જેમાં વિઘન કોઈ ન થાય. ૧\nસંત કૃપાએ સુખ ઊપજે, સંત કૃપાથી સરે કામ;\nસંત કૃપાથી પામીએ, પૂરણ પુરુષોત્તમ ધામ. ૨\nસંત કૃપાએ સદ્મતિ જાગે, સંત કૃપાથી સદ્ગુણ;\nસંત કૃપા વિના સાધુતા, કહોને પામ્યા કુણ. ૩\nસંત સેવ્યા તેણે સર્વ સેવ્યા, સેવ્યા શ્રીહરિ ભગવાન;\nઋષિ મુનિ સેવ્યા દેવતા, જેણે સંત કર્યા રાજી મન. ૪\nજપ તપ તીર્થ વ્રત વળી, તેણે કર્યા યોગ યગન;\nસર્વે કારજ સારિયું, જેણે સંત કર્યા પ્રસન્ન. ૫\nએવા સંત શિરોમણિ, ઘણી ઘણી શું કહું વાત;\nતેવું નથી ત્રિલોકમાં, સંત સમ તુલ્ય સાક્ષાત્. ૬\nકામદુઘા કલ્પતરુ, પારસ ચિંતામણિ ચાર;\nસંત સમાન એ એકે નહિ, મેં મનમાં કર્યો વિચાર. ૭\nઅલ્પ સુખ એમાં રહ્યું, મળી ટળી જાય છે એહ;\nસંત સેવ્યે સુખ ઊપજે, રહે અખંડ અટળ એહ. ૮\nચોપાઇ\nએવા સંત સદા શુભમતિ, જક્ત દોષ નહિ જેમાં રતિ;\nસૌને આપે હિત ઉપદેશ, એવા સંતને નામું હું શીષ. ૯\nસદ્ગુણના સિંધુ ગંભીર, સ્થિરમતિ અતિશય ધીર;\nમાન અભિમાન નહિ લેશ, એવા સંતને નામું હું શીષ. ૧૦\nઅહંકાર નહિ અભેદ ચિત્ત, કામ ક્રોધ લોભ મોહ જિત;\nઇન્દ્રિય જીતી ભજે જગદીશ, એવા સંતને નામું હું શીષ. ૧૧\nનિર્ભય બ્રહ્મવિત પુનિત, ક્ષમાવાન ને સરલ ચિત્ત;\nસમર્થ સત્યવાદી સરેશ, એવા સંતને નામું હું શીષ. ૧૨\nતેજે તપે યશે સંત પૂરા, જ્ઞાનવાન શુદ્ધબોધે શૂરા;\nશુભ શીલ સુખના દાનેશ, એવા સંતને નામું હું શીષ. ૧૩\nકરે પવિત્ર અન્ન જોઈ આહાર, સારી ગિરા સમભાવ અપાર;\nનહિ અનર્થ ઈર્ષ્યા કલેશ, એવા સંતને નામું હું શીષ. ૧૪\nભક્તિ વિનય દ્રઢ વિચાર, આપે બીજાને માન અપાર;\nઅતિ પવિત્ર રહે અહોનિશ, એવા સંતને નામું હું શીષ. ૧૫\nશમ દમાદિ સાધને સંપન, બોલે મળીને મન રંજન;\nશ્રુતવાનમાં સૌથી સરેશ, એવા સંતને નામું હું શીષ. ૧૬\nઆનંદિત આત્મા છે આપ, નિર્લેપ નિર્દોષ નિષ્પાપ;\nઅશઠ અસંગી ક્ષમાધીશ, એવા સંતને નામું હું શીષ. ૧૭\nસંશયહર્તા ને કલ્યાણકર્તા, વળી વેદ પુરાણના વેત્તા;\nકોમળ વાણી વાચાળ વિશેષ, એવા સંતને નામું હું શીષ. ૧૮\nસારી સુંદર કથા કહે છે, અલુબ્ધાદિ આત્મા રહે છે;\nવળી પરદુઃખ હરે હંમેશ, એવા સંતને નામું હું શીષ. ૧૯\nકામ દ્રવ્ય ને માન છે જેહ, તેહ સારુ નથી ધાર્યો દેહ;\nજ્ઞાન વૈરાગ્ય ઉરે અશેષ, એવા સંતને નામું હું શીષ. ૨૦\nસદા સ્મરણ ભજન કરે, વળી ધ્યાન મહારાજનું ધરે;\nએવે ગુણે મોટા જે મુનીશ, એવા સંતને નામું હું શીષ. ૨૧\nસાવધાન લજ્જાવાન ખરા, લોક આચરણ ન જુવે જરા;\nમોટી બુદ્ધિ શુદ્ધિ છે વિશેષ, એવા સંતને નામું હું શીષ. ૨૨\nકરે કારજ કળીમળ ધોય, લાભ અલાભે સ્થિરમતિ હોય;\nડાયા જાણે કાળ વળી દેશ, એવા સંતને નામું હું શીષ. ૨૩\nસુણી પારકા દોષને દાટે, તે જીવના રૂડા થવા માટે;\nઉરે અધર્મનો નહિ પ્રવેશ, એવા સંતને નામું હું શીષ. ૨૪\nઅચપળતા અચિરકાલી, ધ્રાય નૈ ધ્યાને મૂરતિ ભાળી;\nસદાગ્રહમાં રહે અહોનિશ, એવા સંતને નામું હું શીષ. ૨૫\nકૃપાળુ ને પરઉપકારી, જ્ઞાન દાનથી ન જાય હારી;\nકેની નિંદા દ્રોહ નહિ લેશ, એવા સંતને નામું હું શીષ. ૨૬\nસગા સૌના શીતળતા અપાર, નિર્વિકારી ને લઘુ આહાર;\nશરણાગતના દાતા હંમેશ, એવા સંતને નામું હું શીષ. ૨૭\nદગો નહિ સંગ્રહરહિતા, વિવેકી વિચાર ધર્મવંતા;\nસદા પવિત્ર ને શુભવેષ, એવા સંતને નામું હું શીષ. ૨૮\nરાખ્યું બ્રહ્મચર્ય અષ્ટ અંગ, અતિ તજ્યો ત્રિયાનો પ્રસંગ;\nપંચ વિષય શું રાખ્યો છે દ્વેષ, એવા સંતને નામું હું શીષ. ૨૯\nએવા સદ્ગુણના છે ભંડાર, સર્વે જનના સુખદાતાર;\nઅજ્ઞાન તમના છે દિનેશ, એવા સંતને નામું હું શીષ. ૩૦\nએવા સદ્ગુણે સંપન્ન સંત, કરો કૃપા મું પર્ય અત્યંત;\nગાઉં મહારાજના ગુણ વળી, કરજ્યો સહાય તમે સહુ મળી. ૩૧\nવળી વંદુ હરિજન સહુને, આપજ્યો એવી આશિષ મુને;\nહેત વાધે હરિ યશ કહેતાં, એવી સૌ રહેજ્યો આશિષ દેતાં. ૩૨\nઅલ્પ બુદ્ધિએ આદર્યો ગ્રંથ, નથી પૂરો કરવા સમર્થ;\nમાટે સ્તુતિ કરું છું તમારી, કરજ્યો સહુ મળી સહાય મારી. ૩૩\nકરી વિનંતિ વારમવાર, હવે કરું કથાનો ઉચ્ચાર;\nહરિયશ કહેવા હરખ્યું છે હૈયું, કહ્યા વિના જાતું નથી રૈયું. ૩૪",	
// 	`;
// 	str = processChapterContent(str);
// 	$('#Chapter').html(str);
// 	$('#ChapterTitle').html('પ્રકરણ ૨: કવિએ સ્તુતિ ');
// 	$('#ChapterEnding').html('ઇતિ શ્રીમદેકાંતિક ધર્મપ્રવર્તક શ્રીસહજાનંદ સ્વામી શિષ્ય નિષ્કુળાનંદમુનિ વિરચિતે ભક્તચિંતામણિ મધ્યે કવિએ સ્તુતિ કરી એ નામે બીજું પ્રકરણ');
// 	bindSwipeEvents();
// }

function bindSwipeEvents() {

	$('#chapterDiv').on("swipeleft",function(){
		var lastChapterId = parseInt(storage.getItem('last_chapter_id'));

		if(chapter_id < lastChapterId) {
			storage.setItem('book_id', book_id);
			storage.setItem('chapter_id', chapter_id + 1);
			window.location.reload(false);
		}

	});

	$('#chapterDiv').on("swiperight",function(){

		if(chapter_id > 1) {
			storage.setItem('book_id', book_id);
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
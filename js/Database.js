var CreateStatement = "CREATE TABLE IF NOT EXISTS KIRTAN(ID INTEGER PRIMARY KEY AUTOINCREMENT,KIRTAN_ID INTEGER,KIRTAN_PAD INTEGER,KIRTAN_TYPE TEXT,KIRTAN_TITLE TEXT,KIRTAN_HEADER_ENG TEXT,KIRTAN_HEADER TEXT,KIRTAN_DESC TEXT,KIRTAN_AUTHOR TEXT,KIRTAN_FAVOURITE INTEGER)";

var SelectStatement = "SELECT ID,KIRTAN_ID,KIRTAN_PAD,KIRTAN_HEADER FROM KIRTAN WHERE KIRTAN_HEADER_ENG LIKE ? AND KIRTAN_TYPE LIKE ? AND KIRTAN_AUTHOR LIKE ?";

var FavouriteStatement = "SELECT ID,KIRTAN_ID,KIRTAN_PAD,KIRTAN_HEADER FROM KIRTAN WHERE KIRTAN_HEADER_ENG LIKE ? AND KIRTAN_FAVOURITE LIKE ?";

var AllKirtan = "SELECT ID,KIRTAN_ID,KIRTAN_PAD,KIRTAN_HEADER FROM KIRTAN WHERE KIRTAN_HEADER_ENG LIKE ?";

var InsertStatement = "INSERT INTO KIRTAN(KIRTAN_ID,KIRTAN_PAD,KIRTAN_TYPE,KIRTAN_TITLE,KIRTAN_HEADER_ENG,KIRTAN_HEADER,KIRTAN_DESC,KIRTAN_AUTHOR,KIRTAN_FAVOURITE) VALUES(?,?,?,?,?,?,?,?,?)";

var dropStatement = "DROP TABLE KIRTAN";

var CheckCount = "SELECT COUNT(ID) AS ROWS FROM KIRTAN";

var AuthorFilter = "SELECT DISTINCT KIRTAN_AUTHOR FROM KIRTAN";

var KirtanTypeFilter = "SELECT DISTINCT KIRTAN_TYPE FROM KIRTAN";

var KirtanIds = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];

var KirtanType = ["ફૂલડોલ ના પદ", "ફૂલડોલ ના પદ", "ફૂલડોલ ના પદ", "ફૂલડોલ ના પદ", "ફૂલડોલ ના પદ", "ફૂલડોલ ના પદ", "ફૂલડોલ ના પદ", "ફૂલડોલ ના પદ", "દિવાળી ના પદ", "દિવાળી ના પદ", "દિવાળી ના પદ", "દિવાળી ના પદ", "દિવાળી ના પદ", "દિવાળી ના પદ", "દિવાળી ના પદ", "દિવાળી ના પદ"];

var KirtanPads = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];

var KirtanTitle = ["પદ ૧", "પદ ર", "પદ ૩", "પદ ૪", "પદ ૧", "પદ ર", "પદ ૩", "પદ ૪", "પદ ૧", "પદ ર", "પદ ૩", "પદ ૪", "પદ ૧", "પદ ર", "પદ ૩", "પદ ૪"];

var KirtanHeaderEng = ["santanko mahima ati","moye mile hai krupa","sabse ati durlabh","matavale munivar hari","chaly chaly sakhi","aa raty rudi rang","vari vari jau vasant","chaly chaly sakhi shri","nirakhat aaj diwari","vrajvasinku diwari","dip utsav aai","dip utsav jani manohar","dipmal sukhakari","dipmal atiraje","dipmal madhy kamn","dipmal madhy shyam"];

var KirtanHeader = ["સંતનકો મહિમા અતિ અપાર","મોય મીલે હૈ કૃપા કરી સુમતિ સંત","સબસે અતિ દુર્લભ સંતસંગ","મતવાલે મુનિવર હરિકે સંગ","ચાલ્ય ચાલ્ય સખિ સુંદર વર","આ રત્ય રૂડિ રંગ રમ્યાનિ","વારિવારિ જાઉ વસંત રત્ય ઉપરય","ચાલ્ય ચાલ્ય સખી શ્રીવૃંદાવનમાં","નિરખત આજ દિવારી","વ્રજવાસિનકું દિવારી અનુપમ","દીપ ઉત્સવી આઈ","દીપ ઉત્સવી જાની મનોહર","દીપમાળ સુખકારી, કનૈયા","દીપમાળ અતિરાજે, રસિલાજુાકી","દિપમાળ મધ્ય કાન, બિરાજત","દીપમાળ મધ્ય શ્યામ, બિરાજત"];

var Kirtan = ["સંતનકો મહિમા અતિ અપાર,જીન પિયા હે પ્રેમરસ સબ સંસાર... ટેક...૦<br />ઓ અષ્ટ પહરમેં એક શ્વાસ, નહિ ભરે ભજન બિન પ્રેમીદાસ ... સંતન...૧<br />રહે રસબસ હરિમેં લયસે લીન, તન મન ધન અર્પણ હરિકુ કીન ...સંતન...ર<br />ગદ ગદ સ્વર ગાવત હરિવિહાર, રહે પ્રેમ મગન નહિ તન સંભાર;<br />ચાતક જયું રટના શામ સંગ...નહીં કામ, લોભ, અહંકાર અંગ...સંતન...૩<br />એસે સંતનકી યેહિ રીત વ્યવહારિક, કબઉ ન કરત પ્રિત ...</br >મુકતનંદ તીન સંગ માગે વાસ, જિહા પ્રગટ રહત હરિ સ્વપ્રકાશ ...સંતન...૪", "મોય મીલે હૈ કૃપા કરી સુમતિ સંત, તીન સંગ સદા ખેલુ વસંત ...ટેક...૦<br />જીનકો હરિજન સો અધિક હેત, તન મન ધન પ્રાનલુ પ્રભુકુ દેત;<br />દ્રઢ નેમ કરત ઉર હરીકો જાપ ...મોય...૧<br />નહિ વ્યાપત ઉરમે ત્રિવિધ તાપ, જાકી અચલ બુદ્ઘિ પર્વત સમાન;<br />હરિગુણ ગદ ગદ સ્વર કરત ગાન, નિર્માંની નિંદા સ્તવન એક;<br />તજે પ્રાન ન ત્યાગે હરિકી ટેક ...મોય...ર<br />હરિ ચરિત્ર કહે કરે શ્રવન પાન, પલ એક ન પ્રભુકો તજત ધ્યાન;<br />ત્રિભુવન પુનિત કરે એ સદા, મુકતાનંદ તીન સંગ માગે વાસ ...મોય...૩", "સબસે અતિ દુર્લભ સંતસંગ, જીનકે સંગ પ્રભુકો ચઢત રંગ;<br />ધનદોલત જુવતી રાજબાજ મનવાંછીત ભોજન સુખકે સાજ ... ટેક...૦<br />યહ સબસુખ મિલ્યો હે અનંતવાર,<br />ઈનસે નહીં આવત ભવકો પાર ... સબસે...૧<br />સુર લોકકે ભોગ રૂ સુધાપાન,<br />સબ વૈભવસે સુરપતિ સમાન,<br />તદપી નહી મીટત હૈ કાલ ત્રાસ,<br />જો તું નહીં હોવત હરિકો દાસ ... સબસે...ર<br />બ્રહ્મલોક તુ જહાં જહાં પ્રાણી જાત,<br />તહાં તહાં અતિ જોરસે કાલ ખાત,<br />મુકતાનંદ જબ તેહી મિલત સંત,<br />તબહી ભવ દુ:ખકો આવે અંત ...સબસે...૩", "મતવાલે મુનિવર હરિકે સંગ નિત ખેલત ફાગ ઉડાવે રંગ ... ટેક...૦<br />જુનકું નહિં પ્રભુ બીન ઓર આસ,<br />કીયો કૃષ્ણકે પદ પંકજ નિવાસ;<br />જીન કામાદિકકો કીયો હૈ અંત,<br />એસે મહામુનિકો નિત બસંત ... નિત ...૧<br />અણીમાદિક સિદ્ઘિ ન ચાહે દાસ,<br />પ્રભુ બીન અન્ય સુખકી તજત આશ;<br />પ્રભુકે સંગ રસબસ રહે સુજાન;<br />વાકૂ કનક કીચ ભાષત સમાન ...નિત...ર<br />મનમોહન પ્રભુ સંગ અચળ પ્રિત;<br />સોઈ સંતકી સબ વિધિ ભઈ હૈ જીત;<br />મુકતાનંદ સો મુનિ અતિ સ્વછંદ,<br />જિન હરી ઉર ધરી સબ કાટે ફંદ ...નિત...૩", "ચાલ્ય ચાલ્ય સખિ સુંદર વર સાથે રંગભર રમિયે;<br />ચુવાચંદન અબિલ અરગજા કેશર ગાગર ઘોલિ ... ટેક...૦<br />પુરણ પુરૂષોત્તમ પ્રગટ થૈ. નંદ તણે ઘર આવ્યા,<br />કરૂણારસ પરગટ હરિકેશવ, ભકતતણે મન ભાવ્યા ...ચાલ્ય...૧<br />સજી શણગાર સલુણિ શ્યામા, પ્રભુ સાથે કરય પ્રેમ ઘણો;<br />નંદનંદસુ, ફાગરમિને, જગમાતે ડંકો જીત તણો ... ચાલ્ય...ર<br />પ્રેમિજનને વશ્ય પાતળિયો જાણે રસની રિતિ;<br />મુકતાનંદનો નાથ રસિલો, કોટિ ગણી કરે પ્રિત ...ચાલ્ય...૩", "આ રત્ય રૂડિ રંગ રમ્યાનિ, લાજભર્યા કેમ રૈયે;<br />લાજતજિ લખમિવર ભજીએ, તો મહાસુખિયા થૈયે ...ટેક...૦<br />વસંતરત્યે વનવેલિ ફુલિ, મોરયો અંબ મોરારિ;<br />રસિયા સંગ રમવા તતપર થા, શ્યું બેઠિ છો હરિ...આ...૧<br />અબિર ગુલાલ અરગજા કુંમકુંમ, સંચ્ય લિયો અલબેલિ ;<br />નંદનંદશું ખેલ કરિશું ; કુંલમરજાદા મેલિ ... આ ર<br />રસિકરાય સગ્ય જે કોઈ રમસે, તેહનાતે ભવદુ:ખવામે;<br />મુકતાનંદના નાથને મળતાં અખંડ એવાતન પામે ... આ...૩", "વારિવારિ જાઉ વસંત રત્ય ઉપરય, લોકલાજ મરજાદ ટળિ<br />આજરમિશું ફાગ આનંદે શામલિયા સંગ્ય હળિરે મલિ...ટેક...૦<br />લટકાળો નંદજીનો લાલો મધુરિસિ વેણ્ણ બજાવે,<br />વાંસલડિમાં વસંત આલાપે, રાગરાગિણિ ગાવે ...વારિ...૧<br />સ્થાવર જાત્ય ઉમગિ છે આણિ, રત્ય જંગમ કેમ થિર રૈયે;<br />ચાલ્ય સખિ સુંદરવર સાથે, ફાગ રમિ સુખ લૈયે ...વારિ...ર<br />હેતે હરિવર ઉર ધરીએ, સજની આ અવસર નહિ આવે;<br />મુકતાનંદનો નાથ રસિલો, લટકે લાડ લડાવે ... વારિ...૩", "ચાલ્ય ચાલ્ય સખી શ્રીવૃંદાવનમાં વાટ જુાવે છે વનમાળિ,<br />રસિયોવર રમવા ત્યાર થયા છે, પ્રેમસુ પલવટ વાળિ ...ટેક...૦<br />રંગમા રોળિ આલિંગન કરશે રસિયો રાસવિહારિ,<br />હેત કરિ હસિ સામું જોશે, થૈ રેસ્યું જગથી ન્યારી ...ચાલ્ય...૧<br />જેનો કર ઝાલે શામલિયો, તેને તે ન રહે ખામિ, અખંડ સુહાગણ્ય થાશું સજનિ પુરૂષોત્તમ વર પામિ...ચાલ્ય...ર<br />આ અવસર છે અલૌકિક સર્જન વારમવાર ન આવે,<br />મુકતાનંદનો નાથ રસિલો હરિ, હસિ સહુને બોલાવે ..ચાલ્ય...૩", "નિરખત આજ દિવારી, નવલ પિયા નિરખત આજ દિવારી ...ટેક...૦<br />રસિકરાય વ્રજરાજ લાડિલો, ગુણસાગર ગિરિધારી ... નવલ...૧<br />ગોપીજન ચિત્તચોર શ્યામરો, નટવર કુંજવિહારી ... નવલ ર<br />સબ સુખધામ કામ મદગંજન, અકળરૂપ અવતારી ... નવલ ૩<br />મુકતાનંદકે નાથ હર્યો મન, મેંતો જગસેં ન્યારી ... નવલ ૪", "વ્રજવાસિનકું દિવારી અનુપમ, વ્રજવાસિનકું દિવારી ... ટેક ૦<br />સુંદર શ્યામ કાનસંગ રસબસ, લોકલાજ સબ ટારી ... અનુપમ...૧<br />પ્રગટ પ્રમાન શ્રીકૃષ્ણકી મૂર્તિ, લીનીહેં ઉર બિચ ધારી... અનુપમ...ર<br />વ્રજમેં વાસ કરન નિત્ય ચાહત, સુરપતિ અજ ત્રિપુરારી...અનુપમ...૩<br />મુકતાનંદકો શ્યામ રહત સંગ, વ્રજવતિ નવલ વિહારી...અનુપમ...૪", "દીપ ઉત્સવી આઈ, અનુપમ દિપ ઉત્સવી આઈ ... ટેક ૦<br />ચઉ દિપમાળ અતિ સોહત, શોભા બરની ન જાઈ ... અનુપમ...૧<br />દીપમાળ મધ્ય સિંહાસન પર, રાજત કુંવર કનાઈ ... અનુપમ...ર<br />વ્રજવાસી અતિ પ્રેમમગ્ન હોય, ગાવત ગુન પ્રભુતાઈ ... અનુપમ...૩<br />મુકતાનંદકે નાથકું નિરખત, દિનોહે જગ વિસરાઈ ... અનુપમ...૪", "દીપ ઉત્સવી જાની મનોહર દીપ ઉત્સવી જાની ... ટેક ૦<br />નંદનંદન નિજજન મનરંજન, બનિ ઠનિ આયે ગુમાની ... મનોહર...૧<br />આતસબાજી ઉડાવત બહુવિધ, ખલત જનસુખદાની ... મનોહર...ર<br />સુર નર મુનિ સબ આયે દરશહિત, બોલત જયજય બાની...મનોહર...૩<br />મુકતાનંદ મદન મોહન પર, કિનોહે તન કુરબાની ... મનોહર...૪", "દીપમાળ સુખકારી, કનૈયા જુકી દીપમાળ સુખકારી ... ટેક ૦<br />દીપમાળ જુત હરિમુખ નિરખત, સો ન રહત સંસારી ...કનૈયા...૧<br />ભાવસહિત ભરે દીપમાળ જો, સો ધન્ય ધન્ય નરનારી ...કનૈયા...ર<br />દીપમાળ મધ્ય ચતુર શ્યામરો; રાજત અચળ વિહારી ...કનૈયા...૩<br />મુકતાનંદ કહે રસિક પ્રીતમકી છબી ત્રિભુવનસેં ન્યારી ... કનૈયા...૪", "દીપમાળ અતિરાજે, રસિલાજુાકી દીપમાળ અતિરાજે ... ટેક...૦<br />ચહું દિશ દિપમાળ મધ્ય મોહન, શ્યામ અધિક છબી છાજે...રસિલા...૧<br />શુક શારદ નારદ ગુન ગાવત રસિક બજાવત બાજે ... રસિલા...ર<br />જય જયકાર કરત સુર નર મુનિ, ધુની સુની ત્રિભુવન ગાજે..રસિલા...૩<br />મુકતાનંદ શ્યામ છબી નિરખત, કોટિ કામ છબી છાજે ... રસિલા...૪", "દિપમાળ મધ્ય કાન, બિરાજત દિપમાળ મધ્યકાન ... ટેક ૦<br />ઉડુગન મધ્ય તડિત ઘન શશિસમ, સોહત શ્રી ભગવાન ...બિરાજત...૧<br />રંગરંગ કિયે દિપકકે તરૂ, નિરખત શ્યામ સુજાન ...બિરાજત...ર<br />બેન બજાયકે નારદ નાચત, તોરત તાન ... બિરાજત ૩<br />મુકતાનંદકો શ્યામ ચતુરવર ગોવિંદ ગુણનિધાન ... બિરાજત...૪", "દીપમાળ મધ્ય શ્યામ, બિરાજત દીપમાળ મધ્ય શ્યામ... ટેક...૦<br />કોટિ મદન મદહરન મનોહર, મોહન મનઅભિરામ ...દીપમાળ...૧<br />શ્રી નંદલાલ માધુરી મૂરત, સબવિધ શોભાધામ ... દીપમાળ...ર<br />મોર મુગટ મુકરાકૃત કુંડળ, ઉર વૈજયંતી દામ ... દીપમાળ ૩<br />મુકતાનંદ કહે રહોરિ દગન બિચ, એહિ છબી આઠું જામ... દીપમાળ...૪"];

var KirtanAuthor = ["મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી", "મુક્તાનંદ સ્વામી"];

var db = openDatabase("KirtanList", "1.0", "Address Book", 200000);

var dataset;

var DataType;

function dropTable() {
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], null, onError); });
}

function initDatabase()
{
    try {
        if (!window.openDatabase) {
            alert('Databases are not supported in this browser.');
        }
        else {
            //dropTable();
            createTable();
        }
    }
    catch (e) {
        if (e == 2) {
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
        return;
    }
}

function createTable() {

    db.transaction(function (tx) { tx.executeSql(CreateStatement, [], null, onError); });
    CheckRecords();
}

function CheckRecords() {
    db.transaction(function (tx) {
        tx.executeSql("SELECT COUNT(*) as c FROM KIRTAN", [], function (tx, result) {
            dataset = result.rows.item(0);
            CountRecords(dataset["c"]);
        });
    });
}
function CountRecords(numRecords) {
    if (numRecords == 0) {
        for (var i = 0; i < KirtanIds.length; i++) {
            var id = KirtanIds[i];
            var eng = KirtanHeaderEng[i];
            var header = KirtanHeader[i];
            var detail = Kirtan[i];
            var author = KirtanAuthor[i];
            var type = KirtanType[i];
            var pad = KirtanPads[i];
            var title = KirtanTitle[i];
            insertRecord(id, pad, eng, header, detail, author, type, title);
        }
    }
    showRecords();
}

function insertRecord(id, pad, eng, header, detail, author, type,title) {
    db.transaction(function (tx) { tx.executeSql(InsertStatement, [id, pad, type,title, eng, header, detail, author,0], null, onError); });
}

function showRecords() {
    $("#results").html('')
    var searchText = $("#txtSearch").val();
    var strFavourites = sessionStorage.getItem("favourite");
    var strCategoryType = localStorage.getItem("categoryType");
    var strCategoryValue = localStorage.getItem("categoryValue");
    var author="";
    var category="";
    if (strCategoryType == "Author") {
        author = strCategoryValue;
    } else if (strCategoryType == "Type") {
        category = strCategoryValue;
    }
    if (strFavourites == "0" && strCategoryType != "") {
        db.transaction(function (tx) {
            if (strCategoryType == "all") {
                author = "";
                category = "";
            }
            tx.executeSql(SelectStatement, [searchText + "%", "%" + category + "%", "%" + author + "%"], function (tx, result) {
                dataset = result.rows;
                var item = null;
                var list = "<ul class='list-group'>";
                for (var i = 0; i < dataset.length; i++) {
                    item = dataset.item(i);
                    list += "<b><a style='font-size:" + (Number(localStorage.getItem("fontsize"))) + "px;cursor:pointer;' class='list-group-item list-group-item-danger' style='cursor:pointer' onclick='change(\"" + item["ID"] + "\",\"" + item["KIRTAN_ID"] + "\",\"" + item["KIRTAN_PAD"] + "\")'>" + item["KIRTAN_HEADER"] + "</a></b>";
                }
                list += "</ul>";
                $("#results").append(list);
            });
        });
    }
    else if(strFavourites=="")
    {
    db.transaction(function (tx) {
            tx.executeSql(AllKirtan, ["%" + searchText + "%"], function (tx, result) {
                dataset = result.rows;
                var item = null;
                var list = "<ul class='list-group'>";
                for (var i = 0; i < dataset.length; i++) {
                    item = dataset.item(i);
                    list += "<b><a style='font-size:" + (Number(localStorage.getItem("fontsize"))) + "px;cursor:pointer;' class='list-group-item list-group-item-danger' style='cursor:pointer' onclick='change(\"" + item["ID"] + "\",\"" + item["KIRTAN_ID"] + "\",\"" + item["KIRTAN_PAD"] + "\")'>" + item["KIRTAN_HEADER"] + "</a></b>";
                }
                list += "</ul>";
                $("#results").append(list);
            });
        });
    }else {
        db.transaction(function (tx) {
            tx.executeSql(FavouriteStatement, ["%" + searchText + "%","%" + Number(strFavourites) + "%"], function (tx, result) {
                dataset = result.rows;
                var item = null;
                var list = "<ul class='list-group'>";
                for (var i = 0; i < dataset.length; i++) {
                    item = dataset.item(i);
                    list += "<b><a style='font-size:" + (Number(localStorage.getItem("fontsize"))) + "px;cursor:pointer;' class='list-group-item list-group-item-danger' style='cursor:pointer' onclick='change(\"" + item["ID"] + "\",\"" + item["KIRTAN_ID"] + "\",\"" + item["KIRTAN_PAD"] + "\")'>" + item["KIRTAN_HEADER"] + "</a></b>";
                }
                list += "</ul>";
                $("#results").append(list);
            });
        });
    }
}

function change(id,kirtanid,pad) {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("kirtanid", kirtanid);
    sessionStorage.setItem("pad", pad);
    $("#txtSearch").val("");
    location.href = "kirtan.html";
}

// Function for Hendeling Error...
function onError(tx, error) {
    alert(error.message);
}

// Call function when page is ready for load..
$(document).ready(function () {
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
    $("body").width = window.width;
    if (!localStorage.getItem("fontsize")) {
        localStorage.setItem("fontsize", 12);
    }

    $("#txtFontSize").val(localStorage.getItem("fontsize"));
    $val = localStorage.getItem("fontsize");
    $("#btnMinus").click(function () {
        if ($val > 1) {
            $val--;
            $("#txtFontSize").val($val);
        }
        else {
            $val = 1;
            $("#txtFontSize").val($val);
        }
    });

    $("#btnPlus").click(function () {
        if ($val > 24) {
            $val = 24;
        }
        $val++;
        $("#txtFontSize").val($val);
    });

    $("#mySidenav").html("<nav class='navbar navbar-inverse navbar-fixed-top' ><div class='container' ><ul class='nav navbar-nav navbar-right' style='vertical-align:middle'><li class='active' style='text-align:center;padding-top:0px;padding-bottom:0px;'><a style='background-color:#b63a3a' href='javascript:void(0)' class='glyphicon glyphicon-remove' onclick='closeNav()'></a></li></ul></div></nav>");
    $("#mySidenav").append("<ul class='list-group'><b><a class='list-group-item list-group-item-warning' onclick='changeCategory(\"all\",\"all\")'>બધા કિર્તન</a></b>");
    db.transaction(function (tx) {
        tx.executeSql(KirtanTypeFilter, [], function (tx, result) {
            dataset = result.rows;
            var item = null;
            var list = "";
            for (var i = 0; i < dataset.length; i++) {
                item = dataset.item(i);
                list += "<b><a style='cursor:pointer;' class='list-group-item list-group-item-warning' style='cursor:pointer' onclick='changeCategory(\"Type\",\"" + item["KIRTAN_TYPE"] + "\")'>" + item["KIRTAN_TYPE"] + "</a></b>";
            }

            $("#mySidenav").append(list);
        });
    });

    db.transaction(function (tx) {
        tx.executeSql(AuthorFilter, [], function (tx, result) {
            dataset = result.rows;
            var item = null;
            var list = "";
            for (var i = 0; i < dataset.length; i++) {
                item = dataset.item(i);
                list += "<b><a style='font-size:cursor:pointer;' class='list-group-item list-group-item-danger' style='cursor:pointer' onclick='changeCategory(\"Author\",\"" + item["KIRTAN_AUTHOR"] + "\")'>" + item["KIRTAN_AUTHOR"] + "</a></b>";
            }

            $("#mySidenav").append(list);
        });
    });
    $("#mySidenav").append("</ul>");
    if (!localStorage.getItem("categoryType")) {
        localStorage.setItem("categoryType", "");
    }

    if (!localStorage.getItem("categoryValue")) {
        localStorage.setItem("categoryValue", "");
    }

    if (localStorage.getItem("language") == "Gujarati") {
        $("#txtSearch").attr("placeholder", "કિર્તન શોધો...");
        $("#header").html("<b>કિર્તનાવલી</b>");
    } else {
        $("#txtSearch").attr("placeholder", "Search Kirtan...");
        $("#header").html("<b>Kirtanavali</b>");
    }

    var offset = 10;
    var duration = 500;
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });

    jQuery('.back-to-top').click(function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })

    initDatabase();
});

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("navHeader").style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("navHeader").style.display = "";
}

function SetFontSize() {
    localStorage.setItem("fontsize", $("#txtFontSize").val());
    showRecords();
}

function ShowFavourites() {
    if(!sessionStorage.getItem("favourite")){
        sessionStorage.setItem("favourite", "");
    }
    if(sessionStorage.getItem("favourite")=="1"){
        sessionStorage.setItem("favourite","");
    } else {
        sessionStorage.setItem("favourite","1");
    }
    localStorage.setItem("categoryType", "");
    localStorage.setItem("categoryValue", "");
    showRecords();
}

function changeCategory(categoryType,categoryValue) {
    localStorage.setItem("categoryType", categoryType);
    localStorage.setItem("categoryValue", categoryValue);
    sessionStorage.setItem("favourite", "0");
    closeNav();
    showRecords();
}
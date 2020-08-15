

function ristrictcondition(obj) {

    var MyWord = "SWAMINARAYAN";
    var KeyID;
    KeyID = event.keyCode;
    var swami = obj.value;
    if (KeyID < 65) {
        return false;
    }
    else if (KeyID >= 65 && KeyID <= 90) {
        var CharPosition = obj.value.length;
        var CmpCharCode = MyWord.charCodeAt(CharPosition);
        var CmpChar = MyWord.charAt(CharPosition);

        if (KeyID == CmpCharCode) {
            if (CharPosition == 11 && KeyID == 78) {
                incrementMantraLekhanCount();
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

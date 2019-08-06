/*function _lang( key ){
	return key;
}*/
function onAdminLogOut(){
	$.ajax({
        url: "/admin/async-logOut.php",
        dataType : "json",
        type : "POST",
        success : function(data){
            if(data.result == "success"){
                window.location.href = "/admin";
                return;
            }else{
                alert( _lang("Log Out Failed") );
                return;
            }
        }
    });	
}

function base64_decode(data) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Tyler Akins (http://rumkin.com)
	  // +   improved by: Thunder.m
	  // +      input by: Aman Gupta
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   bugfixed by: Onno Marsman
	  // +   bugfixed by: Pellentesque Malesuada
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +      input by: Brett Zamir (http://brett-zamir.me)
	  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
	  // *     returns 1: 'Kevin van Zonneveld'
	  // mozilla has this native
	  // - but breaks in 2.0.0.12!
	  //if (typeof this.window['atob'] === 'function') {
	  //    return atob(data);
	  //}
	  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	    ac = 0,
	    dec = "",
	    tmp_arr = [];

	  if (!data) {
	    return data;
	  }

	  data += '';

	  do { // unpack four hexets into three octets using index points in b64
	    h1 = b64.indexOf(data.charAt(i++));
	    h2 = b64.indexOf(data.charAt(i++));
	    h3 = b64.indexOf(data.charAt(i++));
	    h4 = b64.indexOf(data.charAt(i++));

	    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

	    o1 = bits >> 16 & 0xff;
	    o2 = bits >> 8 & 0xff;
	    o3 = bits & 0xff;

	    if (h3 == 64) {
	      tmp_arr[ac++] = String.fromCharCode(o1);
	    } else if (h4 == 64) {
	      tmp_arr[ac++] = String.fromCharCode(o1, o2);
	    } else {
	      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
	    }
	  } while (i < data.length);

	  dec = tmp_arr.join('');

	  return dec;
}
function base64_encode(data) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Tyler Akins (http://rumkin.com)
	  // +   improved by: Bayron Guevara
	  // +   improved by: Thunder.m
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   bugfixed by: Pellentesque Malesuada
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Rafał Kukawski (http://kukawski.pl)
	  // *     example 1: base64_encode('Kevin van Zonneveld');
	  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	  // mozilla has this native
	  // - but breaks in 2.0.0.12!
	  //if (typeof this.window['btoa'] === 'function') {
	  //    return btoa(data);
	  //}
	  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	    ac = 0,
	    enc = "",
	    tmp_arr = [];

	  if (!data) {
	    return data;
	  }

	  do { // pack three octets into four hexets
	    o1 = data.charCodeAt(i++);
	    o2 = data.charCodeAt(i++);
	    o3 = data.charCodeAt(i++);

	    bits = o1 << 16 | o2 << 8 | o3;

	    h1 = bits >> 18 & 0x3f;
	    h2 = bits >> 12 & 0x3f;
	    h3 = bits >> 6 & 0x3f;
	    h4 = bits & 0x3f;

	    // use hexets to index into b64, and append result to encoded string
	    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	  } while (i < data.length);

	  enc = tmp_arr.join('');

	  var r = data.length % 3;

	  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

	}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function sleep(ms) {
	  var start = new Date().getTime(), expire = start + ms;
	  while (new Date().getTime() < expire) { }
	  return;
}
function getTime(){
	var date = new Date();
	var milliseconds = date.getTime();
	var seconds = milliseconds / 1000;
	return seconds;
}
function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomString( length ){
	var strPattern = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	var strResult = "";
	for( var i = 0; i < length; i ++ ){
		var randPos = getRandomInt( 0, strPattern.length - 1 );
		strResult = strResult + strPattern.substr( randPos, 1 );
	}
	return strResult;
}
function IsNumeric(num) {
    return (num >=0 || num < 0);
}
function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}
function translateEn(word) {
    var A = {};
    var result = '';	
    /*
	A["Ё"]="YO";A["Й"]="I";A["Ц"]="TS";A["У"]="U";A["К"]="K";A["Е"]="E";A["Н"]="N";A["Г"]="G";A["Ш"]="SH";A["Щ"]="SCH";A["З"]="Z";A["Х"]="H";A["Ъ"]="'";
    A["ё"]="yo";A["й"]="i";A["ц"]="ts";A["у"]="u";A["к"]="k";A["е"]="e";A["н"]="n";A["г"]="g";A["ш"]="sh";A["щ"]="sch";A["з"]="z";A["х"]="h";A["ъ"]="'";
    A["Ф"]="F";A["Ы"]="I";A["В"]="V";A["А"]="A";A["П"]="P";A["Р"]="R";A["О"]="O";A["Л"]="L";A["Д"]="D";A["Ж"]="ZH";A["Э"]="E";
    A["ф"]="f";A["ы"]="i";A["в"]="v";A["а"]="a";A["п"]="p";A["р"]="r";A["о"]="o";A["л"]="l";A["д"]="d";A["ж"]="zh";A["э"]="e";
    A["Я"]="YA";A["Ч"]="CH";A["С"]="S";A["М"]="M";A["И"]="I";A["Т"]="T";A["Ь"]="'";A["Б"]="B";A["Ю"]="YU";
    A["я"]="ya";A["ч"]="ch";A["с"]="s";A["м"]="m";A["и"]="i";A["т"]="t";A["ь"]="'";A["б"]="b";A["ю"]="yu";
    */
	A["А"]="A";	A["Б"]="B";	A["В"]="V";	A["Г"]="G";	A["Д"]="D";	
	A["Е"]="E"; A["Ё"]="Yo"; A["Ж"]="Zh"; A["З"]="Z"; A["И"]="I";
	A["Й"]="J"; A["К"]="K"; A["Л"]="L"; A["М"]="M"; A["Н"]="N";
	A["О"]="O"; A["П"]="P"; A["Р"]="R"; A["С"]="S"; A["Т"]="T";
	A["У"]="U"; A["Ф"]="F"; A["Х"]="Kh"; A["Ч"]="Ch";
	A["Ш"]="Sh"; A["Щ"]="Sch"; A["Ъ"]="Ie"; A["Ы"]="Y"; A["Ь"]="ZZAAQQ";
	A["Э"]="E"; A["Ю"]="Yu"; A["Я"]="Ya"; A["а"]="a"; A["б"]="b";
	A["в"]="v"; A["г"]="g"; A["д"]="d"; A["е"]="e"; A["ё"]="yo";
	A["ж"]="zh"; A["з"]="z"; A["и"]="i"; A["й"]="j"; A["к"]="k";
	A["л"]="l"; A["м"]="m"; A["н"]="n"; A["о"]="o"; A["п"]="p";
	A["р"]="r"; A["с"]="s"; A["т"]="t"; A["у"]="u"; A["ф"]="f";
	A["х"]="kh"; A["Ц"]="Ts"; A["ц"]="ts"; A["ч"]="ch"; A["ш"]="sh"; A["щ"]="sch";
	A["ъ"]="ie"; A["ы"]="y"; A["ь"]="ZZAAQQ"; A["э"]="e"; A["ю"]="yu"; A['"']="yu"; 
	A["я"]="ya"; A[" "]="-"; A["."]="-"; A[","]="-"; A["/"]="-"; A["?"]="-"; A["№"]="-";
	A[":"]="-"; A[";"]="-";A["—"]="-"; A["–"]="-"; A['"']='-'; A["("]="-"; A[")"]="-"; A["«"]="-"; A["»"]="-"; A["'"]="-"; A["`"]="-"; A["’"]="-"; A["+"]="-"; A["!"]="-"; A["%"]="-";
	A["ї"]="ji"; A["є"]="e";A["і"]="i"; 
	A["Ї"]="Ji"; A["Є"]="E";A["І"]="I";

    for(var i = 0; i < word.length; i++) {
        var c = word.charAt(i);
        result += A[c] || c;
    }
    result = result.split("ZZAAQQ").join("");
    result = result.split("---").join("-");
    result = result.split("--").join("-");
    
    return result;
}
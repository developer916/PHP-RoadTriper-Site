<?php
	session_start();
	require_once dirname(__FILE__) . '/config.php';
	global  $languageList;
	global  $codeList;
	function UA_loadLanguage( ){
		global  $languageList;
		$url=$_SERVER["DOCUMENT_ROOT"].'/language/language_'.SITE_LANGUAGE.'.xml';
		$myLanguageContent = simplexml_load_file($url);
		foreach ($myLanguageContent->item as $success) {
			$property=$success['property'];
			$languageList["$property"]=$success->__toString();
		}
	}
	function UA_loadCode( ){
		global $codeList;
		global $db;
		$sql = "select * from ua_setting";
		$settingList = $db->queryArray( $sql );
		for( $i = 0 ; $i < count( $settingList ); $i ++ ){
			$key = $settingList[$i]['ua_code'];
			$value = $settingList[$i]['ua_code_value'];
			$codeList[$key] = $value;
		}
	}
	function _lang( $key ){
		// logToFile("data.log", "KEY : $key");
		global  $languageList;
		if(isset($languageList["$key"])){
			return $languageList["$key"];
		}else{
			return $key;
		}
	}
	function UA_generateRandom( $len ){
		$strpattern = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
		$result = "";
		for( $i = 0 ; $i < $len; $i ++ ){
			$rand = rand( 0, strlen($strpattern) - 1 );
			$result = $result.$strpattern[$rand];
		}
		return $result;
	}
	function UA_isLogin(){
		if( isset($_COOKIE['UA_USER'])){
			return true;
		}else{
			return false;
		}
	}		
	function UA_isAdmin( ){
		if( !isset($_SESSION['UA_ADMIN_ADMIN']) )
			echo "<script>window.location.href='/'</script>";
		return true;
	}
	function UA_isPermission( $no ){
		global $db;
		$adminId = $_SESSION['UA_ADMIN_USER'];
		$sql = "select ua_menu from ua_user_menu where ua_user = $adminId";
		$menuList = $db->queryArray( $sql );
		$menuIds = array();
		for( $i = 0; $i < count($menuList); $i ++ ){
			$menuIds[$i] = $menuList[$i]['ua_menu'];
		}
		
		if( !in_array( $no, $menuIds ) )
			echo "<script>window.location.href='/'</script>";
		return true;
	}	
	function UA_setCookie( $name, $value){
		setcookie($name, $value, time() + ( 2 * 7 * 24 * 60 * 60));
	}
	function UA_getCookie( $name ){
		return $_COOKIE[$name];
	}
	function UA_deleteCookie( $name ){
		setcookie($name, "", time() - 36000);
	}
	function UA_isCookie( $name ){
		return isset($_COOKIE[$name]);
	}
	function UA_getCode( $code ){
		global $codeList;
		if( isset( $codeList[$code] ) )
			return $codeList[$code];
		else
			return "undefined";
	}
	function UA_MkDir($path, $mode = 0777) {
		$dirs = explode(DIRECTORY_SEPARATOR , $path);
		$count = count($dirs);
		$path = '.';
		for ($i = 0; $i < $count; ++$i) {
			$path .= DIRECTORY_SEPARATOR . $dirs[$i];
			if (!is_dir($path) && !mkdir($path, $mode)) {
				return false;
			}
		}
		return true;
	}
	function UA_html2text( $html ){
		$txt = strip_tags( $html );
		$txt = str_replace("&nbsp;", " ", $txt);
		return $txt;
	}
	function UA_createImageDirectory( $userId ){
		UA_MkDir( BLOG_UPLOAD_PATH."/".$userId );
		UA_MkDir( PAGE_UPLOAD_PATH."/".$userId );
		UA_MkDir( LOCATION_UPLOAD_PATH."/".$userId );
		UA_MkDir( LOCATION_UPLOAD_PATH."/small/".$userId );
		UA_MkDir( NEWS_UPLOAD_PATH."/".$userId );
		UA_MkDir( NEWS_UPLOAD_PATH."/small/".$userId );
		UA_MkDir( EYE_UPLOAD_PATH."/".$userId );
		UA_MkDir( EYE_UPLOAD_PATH."/small/".$userId );
		
		UA_MkDir( "/admin".BLOG_UPLOAD_PATH."/".$userId );
		UA_MkDir( "/admin".PAGE_UPLOAD_PATH."/".$userId );
		UA_MkDir( "/admin".LOCATION_UPLOAD_PATH."/".$userId );
		UA_MkDir( "/admin".LOCATION_UPLOAD_PATH."/small/".$userId );
		UA_MkDir( "/admin".NEWS_UPLOAD_PATH."/".$userId );
		UA_MkDir( "/admin".NEWS_UPLOAD_PATH."/small/".$userId );
		UA_MkDir( "/admin".EYE_UPLOAD_PATH."/".$userId );
		UA_MkDir( "/admin".EYE_UPLOAD_PATH."/small/".$userId );		
	}
	
	function UA_translateEn( $str ){
		$tr = array(
				"А"=>"A", "Б"=>"B", "В"=>"V", "Г"=>"G", "Д"=>"D",
				"Е"=>"E", "Ё"=>"Yo", "Ж"=>"Zh", "З"=>"Z", "И"=>"I",
				"Й"=>"J", "К"=>"K", "Л"=>"L", "М"=>"M", "Н"=>"N",
				"О"=>"O", "П"=>"P", "Р"=>"R", "С"=>"S", "Т"=>"T",
				"У"=>"U", "Ф"=>"F", "Х"=>"Kh", "Ч"=>"Ch",
				"Ш"=>"Sh", "Щ"=>"Sch", "Ъ"=>"Ie", "Ы"=>"Y", "Ь"=>"ZZAAQQ",
				"Э"=>"E", "Ю"=>"Yu", "Я"=>"Ya", "а"=>"a", "б"=>"b",
				"в"=>"v", "г"=>"g", "д"=>"d", "е"=>"e", "ё"=>"yo",
				"ж"=>"zh", "з"=>"z", "и"=>"i", "й"=>"j", "к"=>"k",
				"л"=>"l", "м"=>"m", "н"=>"n", "о"=>"o", "п"=>"p",
				"р"=>"r", "с"=>"s", "т"=>"t", "у"=>"u", "ф"=>"f",
				"х"=>"kh", "Ц"=>"Ts", "ц"=>"ts", "ч"=>"ch", "ш"=>"sh", "щ"=>"sch",
				"ъ"=>"ie", "ы"=>"y", "ь"=>"ZZAAQQ", "э"=>"e", "ю"=>"yu",
				"я"=>"ya", " "=>"-", "."=>"-", ","=>"-", "/"=>"-", '"'=>"-", "№"=>"-",
				":"=>"-", ";"=>"-","—"=>"-", "–"=>"-", "«"=>"-", ")"=>"-", "»"=>"-", "'"=>"-", "("=>"-", "`"=>"-", "’"=>"-", '"'=>"-", "+"=>"-", "!"=>"-", "%"=>"-", "?"=>"-",
				"ї"=>"ji", "є"=>"e", "і"=>"i",
				"Ї"=>"Ji", "Є"=>"E", "І"=>"I"
		);
		$result = strtr( $str,$tr );
		$result = str_replace("ZZAAQQ", "", $result);
		$result = str_replace("---", "-", $result);
		$result = str_replace("--", "-", $result);
		return $result;
	}
	
	UA_loadCode();
	
	define("SITE_NAME", UA_getCode("CD001") );
	define("SITE_KEYWORD", UA_getCode("CD006") );
	
	define("PAYPAL_BUSINESS", UA_getCode("CD007") );
	define("PAYPAL_SERVER", UA_getCode("CD008"));
	if( UA_isCookie("UA_LANGUAGE") ){
		$lang = UA_getCookie("UA_LANGUAGE");
	}else{
		$lang = UA_getCode("CD009");
		UA_setCookie( "UA_LANGUAGE", $lang );
	}
	define( "SITE_LANGUAGE", $lang );
	
	define("FACEBOOK_APP_ID", UA_getCode("CD010"));
	define("FACEBOOK_APP_SECRET", UA_getCode("CD011"));
	define("GOOGLE_CLIENT_ID", UA_getCode("CD012"));
	define("VK_API_ID", UA_getCode("CD013"));
	define("VK_API_SECRET", UA_getCode("CD014"));
	
	define("GOOGLE_API_KEY", UA_getCode("CD018"));	
	
	define("CNT_LAZY_RIGHTBAR", UA_getCode("CD020"));
	define("CNT_LAZY_PIN", UA_getCode("CD021"));
	
	define("PRICE_FUEL", UA_getCode("CD022"));
	define("PRICE_ADD_LOCATION", UA_getCode("CD023"));
	define("PRICE_LOCATION_SCORE_UP", UA_getCode("CD024"));
	define("PRICE_LOCATION_UP_TO_TOP", UA_getCode("CD025"));
	
	define("DURATION_LOCATION_UP_TO_TOP", UA_getCode("CD030"));

	UA_loadLanguage();	
?>
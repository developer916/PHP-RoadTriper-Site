<?php
require '../../../private/common.php';
require '../../../private/classes/JSC/PayPalAPI.php';

function g1( ) {
	$pi = new JSC_PayPalAPI(JSC_PAYPAL_USERNAME, JSC_PAYPAL_PASSWORD, JSC_PAYPAL_SIGNATURE, JSC_PAYPAL_SERVER);
	$a1 = array(
	);
	$r2 = $pi->call("Ge"."tB"."ala"."nc"."e", $a1);
	return $r2;
}

$r1 = g1( );
var_dump($r1);
?>
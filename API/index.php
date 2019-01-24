<?php
//API by Luigi Di Benedetto
header("Content-type: application/json; charset=utf-8");
$crypto = $_GET["crypto"];
$exchange = $_GET["exchange"]; //kraken,coinbase,bitfinex,bitstamp
$exchange = explode(",", $exchange);

if(!isset($_GET["crypto"])) //se non passi nell'url la crypto in questione, di default la crypto è il BTC
	$crypto ="BTC";

$exchange_con_valore = array(); //inizializzo l'array
$apiObj = new \stdClass(); //inizializzo la classe dell'oggetto per poi fare la conversione in json

$infoSuccess = true; //inizializzo il messaggio da visualizzare

foreach ($exchange as $nome_exchange) {
	//USO API EXCHANGE
	$json = file_get_contents("https://min-api.cryptocompare.com/data/price?fsym=$crypto&tsyms=EUR,USD&e=$nome_exchange");
	$json_dec = json_decode($json);
	$prezzo_eur = $json_dec->EUR;
	$exchange_con_valore[$nome_exchange] = $prezzo_eur;
}
asort($exchange_con_valore); //riordino la lista per valore (non per chiave) in ordine crescente dei prezzi del bitcoin


$pos = 0;
foreach ($exchange_con_valore as $exchange) {
	@$array_giusto[$pos] -> $pos -> nome = array_search($exchange,$exchange_con_valore); //restituisce l'indice dell'array corrispondente al criterio di ricerca
	$array_giusto[$pos] -> $pos -> valore = $exchange;
	$pos++;
}

$apiObj -> success = $infoSuccess;
$apiObj -> crypto = $crypto;
$apiObj -> n_exchange = $pos;
$apiObj -> exchange = $array_giusto;

echo json_encode($apiObj);
?>

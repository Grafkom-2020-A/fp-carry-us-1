<?php
	function invalid($errcode = -1){
		switch ($errcode) {
			case 403:
				http_response_code(403);
				die(json_encode(['error' => 'Anda tidak bisa mengakses konten ini.']));
				break;
			
			case 404:
				http_response_code(404);
				die(json_encode(['error' => 'Konten tidak ditemukan.']));
				break;

			case 405:
				http_response_code(405);
				die(json_encode(['error' => 'Metode tidak valid.']));
				break;

			default:
				die();
				break;
		}
	}

	$method = $_SERVER['REQUEST_METHOD'];
 	if($method != 'GET'){
 		invalid(405);
 	}

 	$api = file_get_contents("https://api.le-systeme-solaire.net/rest/bodies/");
 	$api = json_decode($api, TRUE)['bodies'];
	$id_planet = [
		'merkurius' => 240,
		'venus' => 244,
		'bumi' => 243,
		'bulan' => 0,
		'mars' => 239,
		'jupiter' => 238,
		'saturnus' => 241,
		'uranus' => 199,
		'neptunus' => 219,
		'pluto' => 208
	];

 	header('Content-Type: application/json');

 	if(!$_GET['object']){

 		$res = [];
 		foreach ($id_planet as $key => $value) $res[$key] = $api[$value];
 	}else{
 		$id = $_GET['object'];
 		if(!in_array($id, array_keys($id_planet))){
 			invalid(404);
 		}else{
 			$res = $api[$id_planet[$id]];
 		}
 	}

	$res = json_encode($res);	
	echo($res);
?>
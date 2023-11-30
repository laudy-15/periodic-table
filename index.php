<?php
error_reporting(E_ALL);

function error400($msg) {
    http_response_code(400);
    print("Error: " . $msg);
    die();
}

if ($_GET["mode"] == "get") {
    $files = glob("notes/*");
    $elementFile = "notes/" . $_GET["element"] . ".txt";

    if (!isset($_GET["element"]) || !file_exists($elementFile)) {
        error400("Must provide a valid element symbol");
    }
    
    header("Content-Type: application/json");

    
    $str = file_get_contents($elementFile);
    $pcs = preg_split("/\n/", trim($str));
    $map = array("Notes" => $pcs);
    print( json_encode($map) );
}

if ($_REQUEST["mode"] == "set") {

    if (!isset($_REQUEST["element"])) {
        error400("Must provide a valid element symbol: " . $_REQUEST["element"]);
    }

    //if (!isset($_GET["note"])) {
    //    error400("Must provide a note");
    //}
    $data = file_get_contents('php://input');

    $files = glob("notes/*");
    $elementFile = "notes/" . $_REQUEST["element"] . ".txt";

    
    header("Content-Type: application/json");

    
    $str = file_put_contents($elementFile, $data );
    print( json_encode("ok") );
}


/*
GET
http://10.16.14.104/~savannah/cp4/notes.php?mode=get&element=K


POST
http://10.16.14.104/~savannah/cp4/notes.php?mode=set&element=&note= ..........

*/


?>
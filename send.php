<?php
$nls = $_POST['nls'];
$file = fopen("database.txt","at");
fwrite($file,"$nls \n");
fclose($file);
include('game.html'); 
?>
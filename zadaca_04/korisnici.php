<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once './baza.class.php';
$baza = new Baza();
$upit = "select *from korisnici where KorisniciStatus = '0'";
$rezultat = $baza->selectDB($upit);
$ispis = "<table><tr><th>Ime</th><th>Prezime</th><th>Email</th><tr><tbody>";
while ($red = $rezultat->fetch_array()){
    print_r($red);
    echo "<br />";
    $ispis .="<tr>";
    $ispis .="<td>".$red[1]."</td>";
    $ispis .="<td>".$red['korisniciPrezime']."</td>";
    $ispis .="<td>".$red['korisniciEmail']."</td>";    
    $ispis .="<td><a href='detalji.php?idKorisnika='".$red['korisniciEmail']."</td>";
    $ispis .="</tr>";
}
?>
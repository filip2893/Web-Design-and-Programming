<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Baza{

    const server = "localhost";
    const baza = "WebDiP2014x060";
    const korisnik = "WebDiP2014x060";
    const lozinka = "admin_uLrN";
    
    private function spojiDB(){
        $mysqli = new mysqli(self::server, self::korisnik, self::lozinka, self::baza);
        
        if ($mysqli->connect_errno) {
            echo "Neuspješno spajanje na bazu: ". $mysqli->connect_errno. ", ". $mysqli->connect_errno;
        }
        return $mysqli;
    }    
    function selectDB($upit){
        $veza = self::spojiDB();
    
        $rezultat = $veza->query($upit) or trigger_error("Greška kod upita: {$upit} - "."Greška:".$veza->errno." ".E_USER_ERROR);
        
        if (!$rezultat) {
            $rezultat = null;
        }
        $veza->close();
        return $rezultat;
        
    }
    
    function updateDB($upit, $skripta=""){        
        $veza = self::spojiDB();
        $rezultat = null;
        if ($rezultat = $veza->query($upit)) {
            $veza->close();
            if ($skripta!="") {
                header("Location: $skripta");
            }
            return $rezultat;
            
        }  else {
            echo "Pogreška: ". $veza->errno;
            $veza.close();
        }
    }
}

?>

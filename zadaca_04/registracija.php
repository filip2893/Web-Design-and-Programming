<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php
include_once './baza.class.php';
$baza = new Baza();
$greske = "";
if (isset($_POST['registracija'])) {
    
    $korisnici_email = $_POST['korisnici_email'];
    $korisnici_grad = $_POST['korisnici_grad'];
    $korisnici_ime = $_POST['korisnici_ime'];
    $korisnici_prezime = $_POST['korisnici_prezime'];
    $korisnici_adresa = $_POST['korisnici_adresa'];
    $korisnici_lozinka = $_POST['korisnici_lozinka'];
    $korisnici_spol = $_POST['korisnici_spol'];
    $korisnici_zupanija = $_POST['korisnici_zupanija'];
    
    if (!filter_var($korisnici_email, FILTER_VALIDATE_EMAIL)) {
        $greske .= "Netočno strukturina email adresa";
    }
    if (preg_match($greske, $korisnici_lozinka)) {
        $greske .= "Netočno strukturina lozinka";
    }
    if (empty($greske)) {
        $upit = "select *from korisnici where korisniciEmail = '$korisnici_email'";
        $rezultat = $baza->selectDB($upit);
        
        if ($rezultat->num_rows!=0) {
            $greske .="korisničko ime je već zauzeto";
        }else{
            $upit = "insert into (korisniciIme, korisniciPrezime, korisniciEmail"." "
                    . "values('$korisnici_ime','$korisnici_prezime', '$korisnici_email', '1')";
          if ($baza->updateDB($upit)) {
              $primatelj = $korisnici_email;
              $naslov = "Aktivacija korisničkog računa";
              $poruka = "Poštovani, <br /><br /> Molimo vas da aktivirate vaš korisnički račun"
                      ."<a href='http'";
}               mail($primatelj, $naslov, $poruka);  
        }
    }
}
?>
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="fstrahij.css"/>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="JS/jqZauzetost.js"></script>
        <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script src="JS/jqAutocomplete.js"></script>
    </head>
    <body>
        <header id="zaglavlje">
            Filip Strahija
            <img src="logo.png" alt="Logo FOI"/>            
        </header>
        <nav id="navigacija">
            <ul>
                <li><a href="index.html" target="_blank">Početna stranica</a></li>
                <li><a href="registracija.html" target="_blank">Registracija</a></li>
                <li><a href="prijava.html" target="_blank">Prijava</a></li>
                <li><a href="korisnici.html" target="_blank">Tablični ispis</a></li>
                <li><a href="http://www.foi.unizg.hr" target="_blank">Foi</a></li>
            </ul>            
        </nav>
        <section id="sadrzaj">
            <article id="greske">
                <?php
                echo $greske;
                ?>
            <form id="registracija" method="GET" action="<?php echo $_SERVER['PHP_SELF']; ?>">            
                <label for="ime"> Unesite svoje ime </label>
                    <input type="text" id="ime" name="ime" placeholder="Unesite svoje ime" size="20"
                       maxlength="30" />
                    <br>
                 <label for="prezime"> Unesite svoje prezime </label>
                    <input type="text" id="prezime" name="prezime" placeholder="Unesite svoje prezime" size="20"
                           onblur="provjeritiPrvoSlovo(this)" maxlength="50" />
                    <br>
                <label for="datoteka"> Odaberite datoteku </label>
                <input type="file" id="datoteka" name="datoteka"/>
                
                <label for="adresa"> Unesite vašu adresu </label>
                <textarea cols="25" rows="10">Unesite</textarea>
                <br>
                <label for="zupanija">Odaberite županiju</label>
                <select name="zupanija">
                    <option value="0">--Odaberite županiju--</option>
                    <option value="1">Međimurska</option>
                    <option value="2">Varaždinska</option>
                    <option value="3">Krapinsko-zagorska</option>
                </select>
                <br>
                <label for="grad">Unesite grad</label>
                    <input type="text" id="grad" name="grad"> 
                    <br>
                <label for="mail">Unesite email</label>
                    <input type="email" id="mail" name="mail"> <br>
                                
                <label for="uname">Unesite korisničko ime</label>
                    <input type="text" id="uname" name="uname"> 
                    <br>
                <label for="lozinka">Unesite lozinku</label>
                    <input type="password" id="lozinka" name="lozinka">
                    <br>
                <label for="tel">Unesite broj telefona</label>
                    <input type="tel" id="tel" name="tel">
                    <br>
                <label for="spol">Odaberite spol</label>  
                    <input type="radio" id="spol" name="spol" value="0">M
                    <input type="radio" id="spol" name="spol" value="1">Ž
                    <input type="radio" id="spol" name="spol" value="2">?
                    <input type="submit" value="Registracija" class="gumb" />
                    <input type="reset" value="Reset" class="gumb" />
            </form>
            </article>
        </section>
        <footer>
            <address>
                Filip Strahija<br />
                <a href="mailto:fstrahij@foi.hr">Pošaljite mi na mail</a>
            </address>  
        
        </footer>       
    </body>
</html>

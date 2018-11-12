/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('#korisnici').dataTable(
            {
             "aaSorting": [[0, "asc"],[1,"asc"]],
             "bPaginate": true,
             "bLengthChange": true,
             "bFilter":true,
             "bSort":true,
             "bInfo":true,
             "bAutoWidth":true
            });
});

$('#korime').focusout(function (event) {
    var korIme =$('#korime').val();
    console.log("Vrijednost korisničkog unosa:" + korIme);        
    $.ajax(
            {
                type: "GET",
                url: "http://arka.foi.hr/WebDiP/2014/materijali/zadace/dz3_dio2/korisnik.php",
                dataType: 'xml',
                data: {
                    'korisnik': korIme
                },
                success: function (data) {
                    var zauzetost = "";
                    $(data).find('korisnici').each(
                            function () {
                                zauzetost = $(this).find('korisnik').text();
                            }
                    );

                    if(zauzetost == 1){
                        var pogresniUnos = "Korisničko ime je zauzeto";
                        $("#korime").effect("highlight",1000);                            
                        $("#greske").html(pogresniUnos);
                        $("#greske").toggle("highlight",1000);
                        $('#korime').focus();
                        console.log("Korisničko ime  je zauzeto!");
                    }
                    else {
                        $("#greske").html("");
                        console.log("Korisničko ime je slobodno!");
                    }
                },
                error: function (data) {
                    console.log("Greška u prijenosu");
                }
            }
     );
});

$('#ime, #prezime').focusout(function (event) {
    var ime =$('#ime').val();
    var prezime =$('#prezime').val();
    if (ime==="" || prezime==="") {
        return false;
    }
    console.log("Vrijednost korisničkog unosa:" + ime+" "+  prezime);        
    $.ajax(
            {
                type: "GET",
                url: "http://arka.foi.hr/WebDiP/2014/materijali/zadace/dz3_dio2/korisnikImePrezime.php",
                dataType: 'xml',
                data: {
                    'ime': ime, 'prezime': prezime
                },
                success: function (data) {
                    var zauzetost = "";
                    $(data).find('korisnici').each(
                            function () {
                                zauzetost = $(this).find('korisnik').text();
                            }
                    );

                    if(zauzetost !== ""){
                        var pogresniUnos = "ime je zauzeto";
                        $("#ime").effect("highlight",1000);   
                        $("#prezime").effect("highlight",1000);
                        $("#greske").html(pogresniUnos);
                        $("#greske").toggle("highlight",1000);
                        console.log("ime  je zauzeto!");
                    }
                    else {
                        $("#greske").html("");
                        console.log("ime je slobodno!");
                    }
                },
                error: function (data) {
                    console.log("Greška u prijenosu");
                }
            }
     );
});
 /*   var gradovi = new Array();

    $.getJSON("http://arka.foi.hr/WebDiP/2014/materijali/zadace/dz3_dio2/gradovi.json",
            function (data) {
                $.each(data, function (key, val) {
                    console.log(val);
                    gradovi.push(val);
                });
            });
            
    $('#grad').autocomplete({
        source: gradovi
    });*/







          
        
        


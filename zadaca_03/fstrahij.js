/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    /*deklaracija i inicijalizacija varijabli*/
    var grad = document.getElementById("grad");
    var ime = document.getElementById("ime");
    var prezime = document.getElementById("prezime");
    var adresa = document.getElementById("adresa");
    var lozinka = document.getElementById("lozinka");    
    var formular = document.getElementById("formaRegistracija");    
    var javitiGresku = "";
    var pocetnoStanje = document.getElementById("greske").innerHTML;    
    var br=[7];
        br[6]=0;
    
    /*funkcije*/    
    function provjeriPrvoSlovo(element, broj){
      if (element.value[0]!==element.value[0].toUpperCase()) {
            javitiGresku = "<br/>Krivi unos u polje "+element.name+"!" + document.getElementById("greske").innerHTML;                        
            document.getElementById("greske").innerHTML = javitiGresku;    
            kriviUnos(element.id);
            br[broj]=1;
            return false;
        }             
       else {br[broj]=0;
           ispravanUnos(element.id);
       }       
    }; 
    
    function kriviUnos(element){
        document.getElementById(element).style.backgroundColor = "#FFF0F5";          
        document.getElementById(element).style.borderColor = "red";
        document.getElementById(element).style.borderStyle = "double";
    }
    
    function ispravanUnos(element){
        document.getElementById(element).style.backgroundColor = "#E0FFFF";
        document.getElementById(element).style.borderColor = "green";
        document.getElementById(element).style.borderStyle = "double";
    }
    
    function provjeriElemente(polje){
        var vrijednost = polje.value;
        if ((polje.id==="ime" && br[2]===1) ||(polje.id==="prezime" && br[3]===1) 
                ||(polje.id==="grad" && br[0]===1)||(polje.id==="adresa" && br[1]===1)) { 
            kriviUnos(polje.id);
            return false;
        }
        else if(polje.type === "radio"){
                var spolm = document.getElementById("spolm");
                var spolz = document.getElementById("spolz");
                if (spolm.checked===false && spolz.checked===false) {
                return false; 
            }
        }
        else if(vrijednost.length < 4 && polje.id !=="zupanija"){
            kriviUnos(polje.id);
            return false;
        }
        else{ispravanUnos(polje.id);}
        return true;
    }
    /*eventListeneri za provjeru ispravnosti unosa*/ 
    grad.addEventListener("blur", function(){        
        provjeriPrvoSlovo(grad,0);
    }); 
    
    adresa.addEventListener("blur", function(){                    
        if(adresa.value.length>100){          
            br[1]=1;
           javitiGresku = "<br/>Ne možete unijeti više od 100 znakova u polje adresa!" + document.getElementById("greske").innerHTML;                        
           document.getElementById("greske").innerHTML = javitiGresku;      
           kriviUnos(adresa.id); 
           return false;
        }
        else{br[1]=0;
           ispravanUnos(adresa.id);
        }
    });
    
    ime.addEventListener("keypress", function(){        
        provjeriPrvoSlovo(ime,2);
    });             
    
    prezime.addEventListener("keypress", function(){
        provjeriPrvoSlovo(prezime,3);
    });
    
    lozinka.addEventListener("blur", function(){
        var lozinkaDuljina = lozinka.value.length;
        var element =  lozinka.value;
       
        for (var i = 0; i < lozinkaDuljina; i++) {
                if(element[i]===element[i].toUpperCase() && isNaN(element[i])){  
                    br[4]=1;
                }
                else if(element[i]===element[i].toLowerCase() && isNaN(element[i])){  
                    br[5]=1;
                }
                else if(isFinite(element[i])){
                    br[6]+=1;
                }
        }
        javitiGresku="";
        if(br[4]!==1){ javitiGresku+="U polju lozinka nema velikog slova!<br/>";}
        if(br[5]!==1){javitiGresku+="U polju lozinka nema malog slova!<br/>";}
        if(br[6]<2){javitiGresku+="U polju lozinka nema minimalno 2 broja!<br/>";}
        if(lozinkaDuljina<10){javitiGresku+="U polju lozinka nema minimalno 10 znakova!<br/>";}        
        if(javitiGresku===""){ispravanUnos(lozinka.id);}
        else{kriviUnos(lozinka.id);}
        
        javitiGresku+=document.getElementById("greske").innerHTML;
        document.getElementById("greske").innerHTML = javitiGresku;
    });
        
    formular.addEventListener("submit", function (e){
        var brojElemenata = formular.length;
        var elementiFrome = formular.elements;
        var porukaGreske = "";

        for(var i=0; i<brojElemenata;i++){
            if(elementiFrome[i].type !== "submit" && elementiFrome[i].type !== "reset" 
                    && elementiFrome[i].type !== "checkbox"){
                var rezultat = provjeriElemente(elementiFrome[i]);
                if(!rezultat){
                    porukaGreske += "Greška kod unosa u polje "+elementiFrome[i].name + "<br>";                            
                }
            }
        }

        if(porukaGreske !== ""){
            document.getElementById("greske").innerHTML = porukaGreske;
            e.preventDefault();
        }
    } , false); 
    
    /*eventListeneri za vraćanje u početno stanje*/
      grad.addEventListener("focus", function(){                
            document.getElementById("greske").innerHTML = pocetnoStanje;
      });
      adresa.addEventListener("focus", function(){
            document.getElementById("greske").innerHTML = pocetnoStanje;
      });
      ime.addEventListener("keydown", function(){
            document.getElementById("greske").innerHTML = pocetnoStanje;
      });
      prezime.addEventListener("keydown", function(){
            document.getElementById("greske").innerHTML = pocetnoStanje;
      });
      lozinka.addEventListener("keydown", function(){  
            for(var i=4;i<7;i++){
                br[i]=0;
            }          
            document.getElementById("greske").innerHTML = pocetnoStanje;
      });

          
        
        


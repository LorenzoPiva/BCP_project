
//=======IMPOSTAZIONI============
    let crypto="BTC";               //crypto scelta
    let sec=2;                      //secondi di aggiornamento per i valori
    let animazioneBox="flip slow";  //animazione box al cambio di posizione
    let animazioneValore="tada";    //animazione valore al cambio di prezzo
    
    //colori cambio valori box
    let positiveColor="#00ff00";
    let negativeColor="#ff0000";
    let standardColor="#ffffff";
    
    //colori cambio valori ombra;
    
//================================

    $.fn.extend({
      animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
          var animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
          };
    
          for (var t in animations) {
            if (el.style[t] !== undefined) {
              return animations[t];
            }
          }
        })(document.createElement('div'));
    
        this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);
    
          if (typeof callback === 'function') callback();
        });
    
        return this;
      },
    });

    function getLogo(_nome){
        let loghi= new Array();
        loghi["kraken"] = "IMG/kraken.png";
        loghi["bitstamp"] = "IMG/bitstamp.png";
        loghi["coinbase"] = "IMG/coinbase.png";
        loghi["bitfinex"] = "IMG/bitfinex.png";
        loghi["poloniex"] = "IMG/poloniex.png";
        
        return loghi[_nome];
    }
        
        
        //le api proprietarie che ho costruito apposta
        let URI_API="API/?exchange=kraken,bitstamp,coinbase,bitfinex&crypto="+crypto;
        //completo le info con i valori di impostazione settati
        animazioneValore = "animated "+animazioneValore;
        sec*=1000;
        
        
        let E1,E2,E3,E4;
        let V1,V2,V3,V4;
        
        fetch(URI_API)
    			.then(response => response.json())
    			.then(data => {
    			  E1=data.exchange[0][0].nome;
    			  V1=data.exchange[0][0].valore;
    			  
    			  E2=data.exchange[1][1].nome;
    			  V2=data.exchange[1][1].valore;
    			  
    			  E3=data.exchange[2][2].nome;
    			  V3=data.exchange[2][2].valore;
    			  
    			  E4=data.exchange[3][3].nome;
    			  V4=data.exchange[3][3].valore;
    			  
    			  document.getElementById("nome1").innerHTML="<img class='logo' src="+getLogo(E1)+">";
                  document.getElementById("valore1").innerHTML="<h2>"+V1+"</h2>";
                  
                  document.getElementById("nome2").innerHTML="<img class='logo' src="+getLogo(E2)+">";
                  document.getElementById("valore2").innerHTML="<h2>"+V2+"</h2>";
                  
                  document.getElementById("nome3").innerHTML="<img class='logo' src="+getLogo(E3)+">";
                  document.getElementById("valore3").innerHTML="<h2>"+V3+"</h2>";
                  
                  document.getElementById("nome4").innerHTML="<img class='logo' src="+getLogo(E4)+">";
                  document.getElementById("valore4").innerHTML="<h2>"+V4+"</h2>";
                  
    			})
    			.catch(error => console.error(error))
    			
    			
            setInterval(function(){
    			fetch(URI_API)
    			.then(response => response.json())
    			.then(data => {
    			  
    			  if(data.exchange[0][0].nome!=E1){
    			      E1=data.exchange[0][0].nome;
    			      document.getElementById("nome1").innerHTML="<img class='logo' src="+getLogo(E1)+">";
    			      $('#box1').animateCss(animazioneBox, function() {
                           //animazione dopo
                        });
    			  }
    			  
    			  if(data.exchange[1][1].nome!=E2){
    			      E2=data.exchange[1][1].nome;
    			      document.getElementById("nome2").innerHTML="<img class='logo' src="+getLogo(E2)+">";
    			      $('#box2').animateCss(animazioneBox, function() {
                           //animazione dopo
                        });
    			  }
    			  
    			  if(data.exchange[2][2].nome!=E3){
    			      E3=data.exchange[2][2].nome;
    			      document.getElementById("nome3").innerHTML="<img class='logo' src="+getLogo(E3)+">";
    			      $('#box3').animateCss(animazioneBox, function() {
                           //animazione dopo
                        });
    			  }
    			  
    			  if(data.exchange[3][3].nome!=E4){
    			      E4=data.exchange[3][3].nome;
    			      document.getElementById("nome4").innerHTML="<img class='logo' src="+getLogo(E4)+">";
    			      $('#box4').animateCss(animazioneBox, function() {
                           //animazione dopo
                        });
    			  }
    			  
    			})
    			.catch(error => console.error(error))
    		},sec);
    		
    		
    		setInterval(function(){
    			fetch(URI_API)
    			.then(response => response.json())
    			.then(data => {
    			  document.getElementById("valore1").innerHTML="<h2>"+data.exchange[0][0].valore+"</h2>";
    			  document.getElementById("valore2").innerHTML="<h2>"+data.exchange[1][1].valore+"</h2>";
    			  document.getElementById("valore3").innerHTML="<h2>"+data.exchange[2][2].valore+"</h2>";
    			  document.getElementById("valore4").innerHTML="<h2>"+data.exchange[3][3].valore+"</h2>";
    			  
    			  if(data.exchange[0][0].valore!=V1){
    			      if(data.exchange[0][0].valore>V1)
    			        $('#box1').css('background-color', positiveColor);
    			      else
    			        $('#box1').css('background-color', negativeColor);
    			        
    			      V1=data.exchange[0][0].valore;
    			      $('#box1').animateCss(animazioneValore, function() {
    			          document.getElementById("valore1").innerHTML="<h1 class='"+animazioneValore+"'>"+V1+"</h1>";
    			          $('#box1').css('background-color', standardColor); //colore di default
    			      });
    			  }
    			  
    			  if(data.exchange[1][1].valore!=V2){
    			      if(data.exchange[1][1].valore>V2)
    			        $('#box2').css('background-color', positiveColor);
    			      else
    			        $('#box2').css('background-color', negativeColor);
    			        
    			      V2=data.exchange[1][1].valore;
    			      $('#box2').animateCss(animazioneValore, function() {
    			          document.getElementById("valore2").innerHTML="<h1 class='"+animazioneValore+"'>"+V2+"</h1>";
    			          $('#box2').css('background-color', standardColor); //colore di default
    			      });
    			  }
    			  
    			  if(data.exchange[2][2].valore!=V3){
    			      if(data.exchange[2][2].valore>V3)
    			        $('#box3').css('background-color', positiveColor);
    			      else
    			        $('#box3').css('background-color', negativeColor);
    			        
    			      V3=data.exchange[2][2].valore;
    			      $('#box3').animateCss(animazioneValore, function() {
    			          document.getElementById("valore3").innerHTML="<h1 class='"+animazioneValore+"'>"+V3+"</h1>";
    			          $('#box3').css('background-color', standardColor); //colore di default
    			      });
    			  }
    			  
    			  if(data.exchange[3][3].valore!=V4){
    			      if(data.exchange[3][3].valore>V4)
    			        $('#box4').css('background-color', positiveColor);
    			      else
    			        $('#box4').css('background-color', negativeColor);
    			        
    			      V4=data.exchange[3][3].valore;
    			      $('#box4').animateCss(animazioneValore, function() {
    			          document.getElementById("valore4").innerHTML="<h1 class='"+animazioneValore+"'>"+V4+"</h1>";
    			          $('#box4').css('background-color', standardColor); //colore di default
    			      });
    			  }
    			})
    			.catch(error => console.error(error))
    		},sec);
    		
$( document ).ready(function() {
     $('.leftmenutrigger').on('click', function(e) {
     $('.side-nav').toggleClass("open");
     e.preventDefault();
    });
});


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
    loghi["kraken"] = "https://totalcrypto.io/wp-content/uploads/2018/07/C0SfWUUaTHq9r31YHQq3.png?x15823";
    loghi["bitstamp"] = "https://itsdcdn.com/resources/services/logowide/340/bitstamp.png";
    loghi["coinbase"] = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Coinbase.svg/2000px-Coinbase.svg.png";
    loghi["bitfinex"] = "https://s29020.pcdn.co/wp-content/uploads/2017/07/RTcxNyyTQuOWBcPKXn17.png";
    loghi["poloniex"] = "https://poloniex.com/images/media_kit/Poloniex-logo-800px.png";
    
    return loghi[_nome];
}
        //=======IMPOSTAZIONI============
        let crypto="ETH";               //crypto scelta
        let sec=2;                      //secondi di aggiornamento per i valori
        let animazioneBox="flip slow";  //animazione box al cambio di posizione
        let animazioneValore="tada";  //animazione valore al cambio di prezzo
        //================================
        
        
        //le api proprietarie che ho costruito apposta
        let URI_API="API.php?exchange=kraken,bitstamp,coinbase,bitfinex&crypto="+crypto;
        //completo le info con i valori di impostazione settati
        animazioneValore = "animated "+animazioneValore;
        sec*=1000;
        
        
        let E1,E2,E3,E4;
        let V1,V2,V3,V4;

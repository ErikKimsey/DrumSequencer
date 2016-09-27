'use strict';

/*
** TODO: Create router & template engine(?) to toggle views and drumtype sequence updateSequence().
** TODO: ?? Why is the template engine necessary ??
*/

var Machine = function (){

  var btn = document.getElementsByClassName('btn'),
      view = document.getElementById('view'),
      drumtype = document.getElementsByClassName('drumtype'),
      stepContainer = document.getElementById('stepContainer'),
      typeContainer = document.getElementById('typeContainer'),
      play = document.getElementById('play'),
      stop = document.getElementById('stop'),
      snare = document.getElementById('snare'),
      kick = document.getElementById('kick'),
      hihat = document.getElementById('hihat'),
      crash = document.getElementById('crash'),
      tempDisp = document.getElementById('tempoDisp'),
      snareLoop, kickLoop, hHLoop, crashLoop,
      snView, kiView, hhatView, crView;
      var loops = [];

      /*
      // ** Web Audio Context & Graph **
      */
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      gain = audioCtx.createGain(),
      volume = gain.gain.value,
      volume = 0.6,
      intervalID, i = 0, playing = false,
      decr = document.getElementById('decr'),
      incr = document.getElementById('incr');
      gain.connect(audioCtx.destination);
      /*
      //
      */


      /*
      // ** InitLoops() **
      */
      function initLoops(){
        snareLoop = new Drum('snare', '/assets/snare.wav');
        kickLoop = new Drum('kick', '/assets/boom.wav');
        hHLoop = new Drum('hihat', '/assets/hihat.wav');
        crashLoop = new Drum('crash', '/assets/crash.wav');
        snareLoop.createSeq();
        kickLoop.createSeq();
        hHLoop.createSeq();
        crashLoop.createSeq();
        loops = [snareLoop,kickLoop,hHLoop,crashLoop];
        view.innerHTML = kickView;
        console.log("inside init");
      }
        initLoops();
      /*
      //
      */


      /*
      // ** BEGIN  : getData() **
      */
      function getData(lp, file) {
        var lp = lp,
            file = file;
            lp.source = audioCtx.createBufferSource();

        var request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
          var audioData = request.response;
          audioCtx.decodeAudioData(audioData, function(buffer) {
              lp.source.buffer = buffer;
              lp.source.loop = false;
            },
            function(e){"Error with decoding audio data" + e.err});
        };

        request.send();
        // lp.source.playbackRate.value = playbackControl.value;
        lp.source.connect(gain);
        lp.source.start();
          // console.log(lp.source);

      }

      /*
      // ** END  : getData() **
      */


      /*
      // ** BEGIN : Playloop() & intrvl() **
      */

      function Playloop(){
        playing = true;
        (function(){
          if(i < 16){
            snareLoop.playIf(i);
            kickLoop.playIf(i);
            hHLoop.playIf(i);
            crashLoop.playIf(i);
            i++;
          }
          if(i >= 16) {
            i = 0;
            snareLoop.playIf(i);
            kickLoop.playIf(i);
            hHLoop.playIf(i);
            crashLoop.playIf(i);
          }
        })();
      }

      function intrvl(){
        if(playing === false){
            intervalID = window.setInterval(Playloop, Tempo.getTempo());
          }
        else {
          return;
        }
      }

      /*
      // ** END  : Playloop() & intrvl() **
      */

      /*

var i = 0, playing = false;

function Playloop(){

  playing = true;
        (function(){
          if(i < 16){
            // snareLoop.playIf(i);
            // kickLoop.playIf(i);
            // hHLoop.playIf(i);
            // crashLoop.playIf(i);
            console.log(i);
            i++;
          }
          if (i >= 16){
            i = 0;
          }
        })();
      }

  function intrvl(){
    if(playing === false){
        intervalID = window.setInterval(Playloop, 200);
      }
    else {
      return;
    }
  }

function stop(){
  clearInterval(intervalID);
  playing = false;
  i = 0;
}



      */





      /*
      // ** BEGIN : CONTROLS **
      */

        /*
        // ****** VIEWS ******
        */

        snare.onclick = function(){
          console.log("snare");
          view.innerHTML = snareView;
          snView = document.getElementById('snareContainer');
          snareLoop.makeSequence(snView);
        };

        kick.onclick = function(){
          console.log("kick");
          view.innerHTML = kickView;
          // kiView = document.getElementById('kickContainer');
          // kickLoop.makeSequence(kiView);
        };

        hihat.onclick = function(){
          console.log("hh");
          view.innerHTML = hhView;
          // hhatView = document.getElementById('hhContainer');
          // snareLoop.makeSequence(hhatView);
        };

        crash.onclick = function(){
          console.log("crsh");
          view.innerHTML = crashView;
          // crView = document.getElementById('crashContainer');
          // crashLoop.makeSequence(crView);
        };


        /*
        // ****** VIEWS ******
        */


  // Play()
  play.onclick = function(){
    console.log(Tempo.getTempo());
    // intrvl();
  }

  //  Stop()
  stop.onclick = function(){
    console.log("stop");
    clearInterval(intervalID);
    playing = false;
    i = 0;
  }

  // Incr Tempo
  incr.onclick = function(){
    console.log('incr tempo');
    // Tempo.incrBPM();
    // tempoDisplay();
  };

  // Decr Tempo
  decr.onclick = function(){
    console.log('decr tempo');
    // Tempo.decrBPM();
    // tempoDisplay();
  };

  // Display tempo
  function tempoDisplay(){
    tempDisp.innerHTML = 120;
    // tempDisp.innerHTML = Tempo.getBPM();
  }

  /*
  // ** END  : CONTROLS **
  */



  return {
    btn : btn,
    snareLoop : snareLoop,
    kickLoop : kickLoop,
    hHLoop : hHLoop,
    crashLoop : crashLoop,
    audioCtx : audioCtx,
    gain : gain,
    tempDisp : tempDisp,
    getData : getData
  }
}
Machine();

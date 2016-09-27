'use strict';

var Tempo = (function(){

  var bpm = 80;
  var tempo;

  function incrBPM(){
    bpm = bpm + 1;
    tempo = 60000/bpm;
  }

  function decrBPM(){
    bpm = bpm - 1;
    tempo = 60000/bpm;
  }

  function getBPM(){
    return bpm;
  }

  function getTempo(){
    tempo = (60000/getBPM());
    return tempo;
  }

  return {
    incrBPM : incrBPM,
    decrBPM : decrBPM,
    getBPM : getBPM,
    getTempo : getTempo
  }
})();

'use strict';

/*

*/
var Drum = function(name, file){

  var name = name;
  var file = file;
  var seq = [];
  seq.length = 16;
  var source;
  var kidNodes, ev, node, nodeID;


  function createSeq(){
    for(var i = 0; i < seq.length; i++){
      seq[i] = new Hit(i);
      console.log("hit made");
    }
  }

  function findNode(ev){
    ev = ev;
    node = ev.target;
    nodeID = ev.target.id;
    seq[nodeID].togHit();
    console.log(seq[nodeID].isActive());
    node.setAttribute('class', 'black');
  }

  function makeSequence(drView){
    console.log(this.file);
    //  kidNodes = drView.childNodes;
     drView.addEventListener('click', findNode, false);
  }

  function playIf(index){
      if(seq[index].isActive() == true){
        console.log('inside playif');
        Machine.getData(name, file);
      }
      if(seq[index].isActive() == false){
        return;
      }
  }

  return {
      makeSequence : makeSequence,
      seq : seq,
      createSeq : createSeq,
      name : name,
      file : file,
      seq : seq,
      source : source,
      playIf : playIf
    }
};

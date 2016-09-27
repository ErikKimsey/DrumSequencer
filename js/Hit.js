'use strict';


    function Hit(name){

      var active,
      active = false;
      name = name;

      function makeActive(){
        active = true;
      }

      function makeInactive(){
        active = false;
      }

      function isActive(){
        console.log(active);
        return active;
      }

      function sayName(){
        console.log(name);
      }

      function togHit(){
        console.log('togged');
        return active =  (active ? false : true);
      }

      return {
        active : active,
        name : name,
        makeActive : makeActive,
        makeInactive : makeInactive,
        isActive : isActive,
        sayName : sayName,
        togHit : togHit
      }
    }

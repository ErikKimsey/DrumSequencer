var loop1 = [1,2,3,4],
    loop2 = [1,2,3,4],
    loop3 = [1,2,3,4],
    loop4 = [1,2,3,4],
    loopLoop = [loop1, loop2, loop3, loop4];


function init(){
    for(var i = 0; i < loopLoop.length; i++){
        play(i);
    }
}
init();


function play(index){
    console.log(loop1[index]);
    console.log(loop2[index]);
    console.log(loop3[index]);
    console.log(loop4[index]);
}

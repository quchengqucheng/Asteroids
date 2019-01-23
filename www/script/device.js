var usersocket = io ()
usersocket.emit('type', 'device')
var lastTime = 0;

var degtorad = Math.PI / 180;
// function getQuaternion( alpha, beta, gamma ) {

//   var _x = beta  ? beta  * degtorad : 0; // beta value
//   var _y = gamma ? gamma * degtorad : 0; // gamma value
//   var _z = alpha ? alpha * degtorad : 0; // alpha value

//   var cX = Math.cos( _x/2 );
//   var cY = Math.cos( _y/2 );
//   var cZ = Math.cos( _z/2 );
//   var sX = Math.sin( _x/2 );
//   var sY = Math.sin( _y/2 );
//   var sZ = Math.sin( _z/2 );

//   //
//   // ZXY quaternion construction.
//   //

//   var w = cX * cY * cZ - sX * sY * sZ;
//   var x = sX * cY * cZ - cX * sY * sZ;
//   var y = cX * sY * cZ + sX * cY * sZ;
//   var z = cX * cY * sZ + sX * sY * cZ;

//   return [ w, x, y, z ];

// }

// function getAcQuaternion( _w, _x, _y, _z ) {  //我的四元数转旋转轴和旋转角度方法

//   var rotate = 2 * Math.acos(_w)/degtorad ;

//   var x = _x / Math.sin(degtorad * rotate/2) || 0;
//   var y = _y / Math.sin(degtorad * rotate/2) || 0;
//   var z = _z / Math.sin(degtorad * rotate/2) || 0;

//   return {x:x,y:y,z:z,rotate:rotate};

// }


// window.addEventListener('deviceorientation', function(evt){
//   var qu = getQuaternion(evt.alpha,evt.beta,evt.gamma);
//   var rotate3d = getAcQuaternion(qu[0],qu[1],qu[2],qu[3]);
//   // document.getElementById("info").innerHTML = "z轴旋转 alpha: 　" + evt.alpha + "<br>"
//   //       + "y轴旋转 gamma: 　" + evt.gamma + "<br>"
//   //       + "x轴旋转 beta: 　" + evt.beta
//   var car = {x:evt.alpha, y:evt.beta, z:evt.gamma, rotate:rotate3d.rotate};
//   usersocket.emit('rotate3d', rotate3d)
//   usersocket.emit('car', car)
// })




var buttonLeft  = document.getElementById("left"),
    buttonRight  = document.getElementById("right"),
    buttonTop  = document.getElementById("top"),
    buttonBottom  = document.getElementById("bottom"),
    buttonStart  = document.getElementById("start");
var timerLeft = null,
    timerRight  = null,
    timerTop  = null,
    timerBottom  = null;
    //timerstart  = document.getElementById("start");


//left
buttonLeft.ontouchstart = function(e) {
    console.log("click start",e);
    timerLeft = setInterval(function () {
        usersocket.emit('turnLeft', e);
    }, 50);
    // e.preventDefault();
  
}
buttonLeft.ontouchend = function(e){
        clearInterval(timerLeft);
        e.preventDefault();
}


//right
buttonRight.ontouchstart = function() {
    console.log("click start");
    timerRight = setInterval(function () {
        usersocket.emit('turnRight', "haha");
    }, 50);
    // e.preventDefault();
  
}
buttonRight.ontouchend = function(e){
        clearInterval(timerRight);
        // e.preventDefault();
}

//top
buttonTop.ontouchstart = function() {
    console.log("click start");
    timerTop = setInterval(function () {
        usersocket.emit('goAhead', "haha");
    }, 50);
    // e.preventDefault();
}
buttonTop.ontouchend = function(e){
    clearInterval(timerTop);
    e.preventDefault();
}


//Bottom
buttonBottom.ontouchstart = function(e) {
  console.log("click start");
  timerBottom = setInterval(function () {
        usersocket.emit('goBack', "haha");
    }, 50);
  // e.preventDefault();
  
}
buttonBottom.ontouchend = function(e){
        clearInterval(timerBottom);
        e.preventDefault();
}


buttonStart.addEventListener('click', function(e) {
    usersocket.emit('attack', "haha");
    // e.preventDefault();
})


usersocket.on('disconnect', function(){
  document.getElementById("info").innerHTML = "房间已关闭，请重新扫码"
})


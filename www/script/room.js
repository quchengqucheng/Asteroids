var roomsocket = io()
roomsocket.emit('type', 'room')
console.log('room')

var isFirst = []

/**
 * [description]
 * @param  {[type]} ) {               var qrcode [description]
 * @return {[type]}   [description]
 */
roomsocket.on('device', function() {
    var loginbox = document.getElementById('loginbox');
    console.log(loginbox);
    loginbox.style.display = "none";
})

roomsocket.on('qrcode', function(ip){
  var href = location.href
  if (location.hostname === 'localhost') {
    href = href.replace('localhost', ip[ip.length - 1])
  }
  new QRCode(document.getElementById('qrcode'), href + "device?roomid=" + roomsocket.id)
})
roomsocket.on('remove', function(id){
  var section = document.getElementsByTagName('section')[0]
  var box = document.getElementById('adj-'+id)
  if(box){
    section.removeChild(box)
  }
})

roomsocket.on('connect', function (){
  console.log('已连接')
})


var singlePlayer  = document.getElementById("single"),
    twoPlayer  = document.getElementById("double"),
    selectMode = document.getElementById('selectMode');

singlePlayer.addEventListener('click', function(e) {
    console.log('singlePlayer');
    selectMode.style.display = "none";
    var qrcodebox = document.getElementById('qrcodebox');
    qrcodebox.style.display = "block";
    // playerNum = 1;
    roomsocket.emit('singlePlayer');

    
})
twoPlayer.addEventListener('click', function(e) {
    console.log('twoPlayer');
    selectMode.style.display = "none";
    var qrcodebox = document.getElementById('qrcodebox');
    qrcodebox.style.display = "block";
    // playerNum = 2;
    roomsocket.emit('twoPlayer');
    
})
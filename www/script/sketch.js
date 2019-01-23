//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot
var gamesocket = io ()
// usersocket.emit('type', 'sketch')
console.log('sketch');
var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage, pointsImage;
var MARGIN = 40;
var shipAT = 0; //ship animation type


var ship2 = null;
// ship2.id = null;
var stars = [];
var speedstar;
var speedstar2;


function setup() {
  // createCanvas(800, 600);
  // var canvas = document.getElementById('canvas的id');
	var cwidth = window.innerWidth + "px";
  	var cheight = window.innerHeight + "px";
  	createCanvas(window.innerWidth, window.innerHeight);
  	// console.log('sketch setup');

	bulletImage = loadImage('assets/asteroids_bullet.png');
	shipImage = loadImage('assets/asteroids_ship0001.png');
	particleImage = loadImage('assets/asteroids_particle.png');
	pointsImage  = loadImage('assets/points.png');

	ship = createSprite(width/2, height/3*2);
	ship.maxSpeed = 6;
	ship.friction = 0.98;
	// ship.rotation = 90;
	ship.setCollider('circle', 0, 0, 20);

	ship.addImage('normal', shipImage);
	ship.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');

	asteroids = new Group();
	bullets = new Group();

	for(var i = 0; i<8; i++) {
		var ang = random(360);
		var px = width/2 + 1000 * cos(radians(ang));
		var py = height/2+ 1000 * sin(radians(ang));
		createAsteroid(3, px, py);
		createAsteroid(random([1,2,3,4]), px, py);
	}

	//stars
	for (var i = 0; i < 300; i++) {
	    stars[i] = new Star();
	  }
}

function draw() {
	// console.log('sketch draw');
	// background(17,23,53);
	background(30,35,50);
	// background(35,40,50);

	fill(255);
	// textAlign(CENTER);
	// text('Controls: Arrow Keys + X', width/2, 20);

	//背景小星星
	speedstar = map(10, 0, width, 0, 50);
	speedstar2 = map(10, 0, -width, 0, 50);
	// background(0);
	// translate(width / 2, 0);
	// var myDegrees = map(0.25, 0, 1);
	// translate(p5.Vector.fromAngle(0, -width));
	// translate(p5.Vector.fromAngle(-radians(myDegrees), -2*height));
	// translate(p5.Vector.fromAngle(0.52, -dist(0,width,0,height)));
	for (var i = 0; i < stars.length; i++) {
		stars[i].update();
		stars[i].show();
	}


	for(var i=0; i<allSprites.length; i++) {
	var s = allSprites[i];
		if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
		if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
		if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
		if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
	}

	asteroids.overlap(bullets, asteroidHit);

	ship.bounce(asteroids);
	// ship.overlap(asteroids, shipHit);

	if(shipAT == 1) {
		ship.changeAnimation('thrust');
	} else {
		ship.changeAnimation('normal');
	}
	drawSprites();

}

function shipHit(ship, asteroid) {
	//
	var boom = createSprite(ship.position.x, ship.position.y);
	boom.addImage(boomImage);
	boom.left = 20;
	//score to 0
	var scoreBoard = document.getElementById('scoreBoard');
	scoreBoard.innerHTML = '0';

	ship.remove();

	var startAgain = document.getElementById("startagain");


}

function Star() {
  	this.x = random(-width, width);
  	this.y = random(-height, height);
  	this.z = random(width);
 	this.pz = this.z;

  	this.update = function() {
	  	// console.log(this.z , speedstar)
	    this.z = this.z - speedstar;

	    // this.z = this.z - random(-speedstar, speedstar);
	    if (this.z < 1) {
			this.z = width;
			this.x = random(-width, width);
			this.y = random(-height, height);
			this.pz = this.z;
		}
	}

  	this.show = function() {
    	// fill(255);
		fill(random(20,255),random(10,255),255);
		noStroke();

		var sx = map(this.x / this.z, 0, 1, width/2, width);
		var sy = map(this.y / this.z, 0, 1, height/2, height);

		var r = map(this.z, 0, width, 10, 0);
		ellipse(sx, sy, r, r);

		// var px = map(this.x / this.pz, 0, 1, 0, width);
		// var py = map(this.y / this.pz, 0, 1, 0, height);

		// this.pz = this.z;

		stroke(255);
		// line(px, py, sx, sy);

	}
}

function createAsteroid(type, x, y) {
	var a = createSprite(x, y);
	var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
	a.addImage(img);
	a.setSpeed(2.5-(type/2), random(360));
	a.rotationSpeed = 0.5;
	//a.debug = true;
	a.type = type;

	if(type == 4)
		a.scale = 1.5;
	if(type == 2)
		a.scale = 0.6;
	if(type == 1)
		a.scale = 0.3;

	a.mass = 2+a.scale;
	a.setCollider('circle', 0, 0, 50);
	asteroids.add(a);
	return a;
}

function asteroidHit(asteroid, bullet) {
	var newType = asteroid.type - 1;

	if(newType>0) {
		createAsteroid(newType, asteroid.position.x, asteroid.position.y);
		createAsteroid(newType, asteroid.position.x, asteroid.position.y);
	}

	//????
	for(var i=0; i<10; i++) {
		var p = createSprite(bullet.position.x, bullet.position.y);
		p.addImage(particleImage);
		p.setSpeed(random(3, 5), random(360));
		p.friction = 0.95;
		p.life = 15;
	}

	points(asteroid,asteroid.position.x, asteroid.position.y);

	bullet.remove();
	asteroid.remove();
	

}
var pointBoard=0;
function points(a,x,y) {

	var points = createSprite(x,y);
	points.addImage(pointsImage);
	// points.rotation = 90;
	// points.setSpeed(10+a.getSpeed(), a.rotation-90);
	points.life = 10;
	// pointss.add(bullet);
	var scoreBoard = document.getElementById('scoreBoard');
	scoreBoard.innerHTML = parseInt(scoreBoard.innerHTML)+10+'';
}
roomsocket.on('turnLeft', function (msg) {
	if (ship2 && this.id == ship2.id) {
		ship2.rotation -= 12; 
	} else {
		// console.log("click Left",this.id);
		ship.rotation -= 12; 
		shipAT = 0;
	}
	
})

roomsocket.on('turnRight', function () {
	if (ship2 && this.id == ship2.id) {
		ship2.rotation += 12; 
	} else {
		// console.log("click Right");
		ship.rotation += 12;
		shipAT = 0;
	}
})
roomsocket.on('goAhead', function () {
	if (ship2 && this.id == ship2.id) {
		ship2.addSpeed(1000, ship2.rotation-90);
	} else {
		// console.log("goAhead");
		ship.addSpeed(1000, ship.rotation-90);
		ship.changeAnimation('thrust');
		shipAT = 1;
	}
})
roomsocket.on('goBack', function () {
	if (ship2 && this.id == ship2.id) {
		ship2.addSpeed(-1000, ship2.rotation-90);
	} else {
		// console.log("goBack");
		ship.addSpeed(-1000, ship.rotation-90);
		ship.changeAnimation('thrust');
	}
	// ship = 1;
	// drawSprites();
})
roomsocket.on('attack', function () {
	// console.log("attack");
	if (ship2 && this.id == ship2.id) {
		bullet.addImage(bulletImage);
		bullet.setSpeed(10+ship2.getSpeed(), ship2.rotation-90);
		bullet.life = 50;
		bullets.add(bullet);
		shipAT = 0;
	} else {
		var bullet = createSprite(ship.position.x, ship.position.y);
		bullet.addImage(bulletImage);
		bullet.setSpeed(10+ship.getSpeed(), ship.rotation-90);
		bullet.life = 50;
		bullets.add(bullet);
		shipAT = 0;
	}
})

roomsocket.on('newShip', function (mas) {
	console.log("newShip");
	ship2 = createSprite(width/3, height/2);
	ship2.id = this.id;
	console.log("ship2.id = ", this.id);
	ship2.maxSpeed = 6;
	ship2.friction = 0.98;
	ship2.setSpeed(0, ship2.rotation-55);
	ship2.setCollider('circle', 0, 0, 20);
	ship2.addImage('normal', shipImage);
	ship2.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');
})
// roomsocket.on('turnLeft', function () {
// 	console.log("click Left");
// 	var ball = document.getElementById("ball");
// 	//球的起始位置
// 	var ballX = ball.offsetLeft;
// 	var ballY = ball.offsetTop;
// 	//设置球的位置
// 	ball.style.left = ballX - 10 +"px";
// 	ball.style.top = ballY+"px";  
// })

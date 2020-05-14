var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');

//Rita cirkel
var x = Math.round(Math.random()*600+10);
var y = Math.round(Math.random()*400+10);
//var x = 100;
//var y = 300;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//Racket
var paddleHeight = 75;
var paddleWidth = 10;
var paddleX = (canvas.width-paddleWidth);
var paddleY = (canvas.height-paddleHeight) / 2;
var upPressed = false;
var downPressed = false;
//Points
var points = 0;
var counter = document.getElementById("counter");

function drawBall() {
    c.beginPath();
    c.arc(x, y, ballRadius, 0, Math.PI*2);
    c.fillStyle = "#81667A";
    c.fill();
    c.closePath();
}

function drawPaddle(){
  c.beginPath();
  c.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  c.fillStyle = "#81667A";
  c.fill();
  c.closePath();

}

//Keyboard events
document.addEventListener('keydown', function(event) {
  if(event.keyCode == 38) {
		upPressed = true;
	}
	if(event.keyCode == 40) {
		downPressed = true;
	}
});
document.addEventListener('keyup', function(event) {
	if(event.keyCode === 38) {
		upPressed = false;
	}
	if(event.keyCode === 40) {
		downPressed = false;
	}
});




//Button events
function up(){
  paddleY-= 20;
}

function down(){
  paddleY+=20;
}




function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx < ballRadius){
      dx = -dx;
    } else if (x + dx > canvas.width-ballRadius){
      if (y > paddleY && y < paddleY + paddleHeight){
        dx = -dx;
      }else {
        var lost = confirm("Game over! Du fick "+ points + " poäng.");
        if (lost == true || lost == false){
          x = Math.round(Math.random()*600+10);
          y = Math.round(Math.random()*400+10);
        }
        location.reload();
      }
    }

    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    x += dx;
    y += dy;

    if(upPressed && paddleY > 0){
      paddleY -= 5;
    } else if(downPressed && paddleY < canvas.height-paddleHeight){
      paddleY += 5;
    }

    //points
    if (x <= 11){
      points = points + 1;
      counter.innerHTML = points;
    }

}

  function start(){
    setInterval(draw, 10);
  }

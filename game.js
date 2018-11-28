//THIS PROGRAM WILL PRODUCE THE ANIMATION OF DIFFERENT SHAPES IN ORDER TO TOUCH FOR A GAME!


var canvas = document.querySelector('canvas');
canvas.width = screen.width;
canvas.height = screen.height;

var c = canvas.getContext('2d');

var mouseClick = {
  x: undefined,
  y: undefined,
  click: undefined
}

window.addEventListener('click', function(event){
  mouseClick.x = event.x;
  mouseClick.y = event.y;
  mouseClick.click = 'true';
  console.log(mouseClick);
})



var rectColors = ['darkred', 'darkblue', 'darkgreen'];
var cirColors = ['DarkSlateGray'];
//BUILDS THE RECTANGLES OBJECT
function Rectangle(x, y, dy, dx, rectSize) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rectSize = rectSize;
  this.color = rectColors[Math.floor(Math.random() * rectColors.length)];

  this.draw = function() {
      c.beginPath();
      c.rect(this.x, this.y, this.rectSize, this.rectSize);
      c.fillStyle = this.color;
      c.fill();
  }

  this.update = function() {
    //bounce
    if( (this.x + this.rectSize) > canvas.width || (this.x - this.rectSize)  < 0){
      this.dx = -this.dx;
    }

    if( (this.y + this.rectSize) > canvas.height || (this.y - this.rectSize)  < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function Circles(x, y, cirRadius, dy, dx) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.cirRadius = cirRadius;
  this.color = cirColors[Math.floor(Math.random() * cirColors.length)];

  this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.cirRadius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
  }

  this.update = function() {
    //bounce
    if( (this.x + this.cirRadius) > canvas.width || (this.x - this.cirRadius)  < 0){
      this.dx = -this.dx;
    }

    if( (this.y + this.cirRadius) > canvas.height || (this.y - this.cirRadius)  < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

var rectArray = [];
var cirArray = [];
function init()
{
    rectArray = [];
    for(let i = 0; i < 200; i++){
      let rectSize = Math.floor(Math.random() * 100) + 1;
      let x = Math.random() * (canvas.width - rectSize *2) + rectSize;
      let y = Math.random() * (canvas.height - rectSize *2) + rectSize;
      let dx = (Math.random() - 0.5) * 15;
      let dy = (Math.random() - 0.5) * 15;
      rectArray.push(new Rectangle(x, y, dy, dx, rectSize));
    }

    cirArray = [];
    for(let i = 0; i < 5; i++)
    {
      let cirRadius = Math.floor(Math.random() * 100) + 50;
      let x = Math.random() * (canvas.width - cirRadius *2) + cirRadius;
      let y = Math.random() * (canvas.height - cirRadius *2) + cirRadius;
      let dx = (Math.random() - 0.5) * 10;
      let dy = (Math.random() - 0.5) * 10;
      cirArray.push(new Circles(x, y, cirRadius, dy, dx));
    }
}

//animate
function animate () {
  if(cirArray.length > 0)
  {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < rectArray.length; i++){
      rectArray[i].update();
    }
    for(let i = 0; i < cirArray.length; i++)
    {
        var dist = distance(mouseClick.x, mouseClick.y, cirArray[i].x, cirArray[i].y);
        if(dist < (cirArray[i].cirRadius * 2) && mouseClick.click === 'true')
        {
            cirArray.splice(i, 1);
            i = 0;
            console.log('CIRCLE ARRAY SIZE = ' + cirArray.length);
            mouseClick.click = 'false';
        }
        else
          cirArray[i].update();
    }
  }
  else
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function distance(x2, y2, x, y)
{
  var xd = x2 - x;
  xd *= xd;

  var yd = y2 - y;
  yd *= yd;

   return Math.sqrt(xd + yd);
}


init();
animate();

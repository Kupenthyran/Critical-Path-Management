var x;
var y;
var acts = [];
var clicked = [];

function setup() {
  createCanvas(700, 600);

  for (var i = 0; i < 4; i++) {
    x = random(0, width - 100);
    y = random(0, height - 100);
    acts.push(new Activity(i + 1, x, y));
  }
}

function draw() {
  background(51);

  checkConnection();
  for (var i = 0; i < acts.length; i++) {
    acts[i].showEdges();
  }

  for (var i = 0; i < acts.length; i++) {
    acts[i].showActivity();
  }
}

function checkConnection() {
  if (clicked.length == 2) {
    if (clicked[0] != clicked[1]) {
      if (!clicked[1].predecessors.includes(clicked[0])) {
        clicked[1].predecessors.push(clicked[0]);
      }
    }
    clicked = [];
  }
}

function mousePressed() {
  for (var i = acts.length - 1; i >= 0; i--) {
    if (
      mouseX > acts[i].x &&
      mouseX < acts[i].x + acts[i].width &&
      mouseY > acts[i].y &&
      mouseY < acts[i].y + acts[i].height
    ) {
      acts[i].selected = true;
      acts.push(acts[i]);
      var index = acts.indexOf(acts[i]);
      acts.splice(index, 1);
      break;
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < acts.length; i++) {
    acts[i].selected = false;
  }
}

function doubleClicked() {
  for (var i = 0; i < acts.length; i++) {
    if (
      mouseX > acts[i].x &&
      mouseX < acts[i].x + acts[i].width &&
      mouseY > acts[i].y &&
      mouseY < acts[i].y + acts[i].height
    ) {
      clicked.push(acts[i]);
    }
  }
}

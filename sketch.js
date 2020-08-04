//Next TODO: Add 'add more activity' feature

var acts = [];
var clickedActs = {};
var mouseDown = false;

function setup() {
  createCanvas(700, 500);

  let x;
  let y;
  for (var i = 0; i < 4; i++) {
    x = random(0, width - 100);
    y = random(0, height - 100);
    acts.push(new Activity(i + 1, x, y));
  }
}

function draw() {
  background(51);

  if (mouseDown) {
    stroke(255);
    strokeWeight(5);
    if (clickedActs.left) {
      line(
        clickedActs.left.x,
        clickedActs.left.y + clickedActs.left.height / 2,
        mouseX,
        mouseY
      );
    } else if (clickedActs.right) {
      line(
        clickedActs.right.x + clickedActs.right.width,
        clickedActs.right.y + clickedActs.right.height / 2,
        mouseX,
        mouseY
      );
    }
  }

  for (var i = 0; i < acts.length; i++) {
    acts[i].showEdges();
  }

  for (var i = 0; i < acts.length; i++) {
    acts[i].showActivity();
  }
}

function checkConnection() {
  if (
    Object.keys(clickedActs).length == 2 &&
    clickedActs.left != clickedActs.right &&
    !clickedActs.left.predecessors.includes(clickedActs.right)
  ) {
    clickedActs.left.predecessors.push(clickedActs.right);
  }

  clickedActs = {};
}

function mousePressed() {
  mouseDown = true;
  for (var i = acts.length - 1; i >= 0; i--) {
    if (clickedMainBox(acts[i])) {
      acts[i].selected = true;
      acts.push(acts[i]);
      var index = acts.indexOf(acts[i]);
      acts.splice(index, 1);
      break;
    } else if (clickedRightBox(acts[i])) {
      clickedActs.right = acts[i];
    } else if (clickedLeftBox(acts[i])) {
      clickedActs.left = acts[i];
    }
  }
}

function mouseReleased() {
  mouseDown = false;
  for (var i = acts.length - 1; i >= 0; i--) {
    acts[i].selected = false;

    if (clickedRightBox(acts[i])) {
      clickedActs.right = acts[i];
    } else if (clickedLeftBox(acts[i])) {
      clickedActs.left = acts[i];
    }
  }
  checkConnection();
}

function doubleClicked() {
  for (var i = acts.length - 1; i >= 0; i--) {
    if (clickedRightBox(acts[i])) {
      let activity = acts[i];
      for (var i = acts.length - 1; i >= 0; i--) {
        if (acts[i].predecessors.includes(activity)) {
          acts[i].predecessors = acts[i].predecessors.filter(
            (item) => item !== activity
          );
        }
      }
    } else if (clickedLeftBox(acts[i])) {
      acts[i].predecessors = [];
    }
  }
}

function clickedMainBox(activity) {
  if (
    mouseX > activity.x &&
    mouseX < activity.x + activity.width &&
    mouseY > activity.y &&
    mouseY < activity.y + activity.height
  ) {
    return true;
  }
}

function clickedRightBox(activity) {
  if (
    mouseX > activity.x + activity.width &&
    mouseX < activity.x + activity.width + activity.side_width &&
    mouseY > activity.y &&
    mouseY < activity.y + activity.height
  ) {
    return true;
  }
}

function clickedLeftBox(activity) {
  if (
    mouseX > activity.x - activity.side_width &&
    mouseX < activity.x &&
    mouseY > activity.y &&
    mouseY < activity.y + activity.height
  ) {
    return true;
  }
}

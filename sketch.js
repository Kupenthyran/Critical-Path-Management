var acts = [];
var clickedActs = {};
var mouseDown = false;

let activityHTML = `
      <div class="row">
        <div class="ES">ES</div>
        <div>
          <input id="duration" autocomplete="off" type="text" placeholder="D">
        </div>
        <div class="EF">EF</div>
      </div>

      <div class="row">
      <button id="left-btn"></button>
        <div>
          <input class="activity-name" type="text" autocomplete="off" placeholder="activity name">
        </div>
        <button id="right-btn"></button>
      </div>

      <div class="row">
        <div class="LS">LS</div>
        <div class="slack">Slack</div>
        <div class="LF">LF</div>
      </div>
`;

function setup() {
  var canvas = createCanvas(1300, 600);
  canvas.parent("canvas-container");
}

function draw() {
  background(51);

  noStroke();
  fill(255, 100, 100);
  rect(0, 0, 200, height);
  fill(255, 100, 0);
  rect(0 + 20, 0 + 20, 200 - 40, 100);

  for (var i = 0; i < acts.length; i++) {
    acts[i].show();
  }

  if (mouseDown && Object.keys(clickedActs).length == 1) {
    stroke(255);
    strokeWeight(5);

    if (clickedActs.left) {
      var elemHeight = clickedActs.left.element.elt.getBoundingClientRect()
        .height;
      line(
        clickedActs.left.x,
        clickedActs.left.y + elemHeight / 2,
        mouseX,
        mouseY
      );
    }

    if (clickedActs.right) {
      var elemHeight = clickedActs.right.element.elt.getBoundingClientRect()
        .height;
      var elemWidth = clickedActs.right.element.elt.getBoundingClientRect()
        .width;
      line(
        clickedActs.right.x + elemWidth,
        clickedActs.right.y + elemHeight / 2,
        mouseX,
        mouseY
      );
    }
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
  if (mouseX > 20 && mouseX < 180 && mouseY > 20 && mouseY < 120) {
    let actDiv = createDiv(activityHTML)
      .addClass("activity-box")
      .parent("canvas-container");

    acts.push(new Activity(actDiv));
    // print(divTest.elt.querySelector("#ES"));
  }

  mouseDown = true;
}

function mouseReleased() {
  mouseDown = false;

  checkConnection();
  for (var i = acts.length - 1; i >= 0; i--) {
    acts[i].selected = false;
  }
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

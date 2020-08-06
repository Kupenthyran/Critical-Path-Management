var acts = [];
var clickedActs = {};
var mouseDown = false;

let activityHTML = `
      <div class="row">
        <div class="ES">ES</div>
        <div>
          <input class="duration" autocomplete="off" type="text" placeholder="D">
        </div>
        <div class="EF">EF</div>
      </div>

      <div class="row">
      <button class="left-btn"></button>
        <div>
          <input class="activity-name" type="text" autocomplete="off" placeholder="activity name">
        </div>
        <button class="right-btn"></button>
      </div>

      <div class="row">
        <div class="LS">LS</div>
        <div class="slack">Slack</div>
        <div class="LF">LF</div>
      </div>
`;

let activityHTMLsample = `
      <div class="row">
        <div class="ES">ES</div>
        <div>
        Duration
        </div>
        <div class="EF">EF</div>
      </div>

      <div class="row">
        <div>
        Activity Name
        </div>
      </div>

      <div class="row">
        <div class="LS">LS</div>
        <div class="slack">Slack</div>
        <div class="LF">LF</div>
      </div>
`;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");

  var btn = createButton("Calculate");
  btn.parent("canvas-container");
  btn.mousePressed(calculate);
  btn.position(10, 110);
  btn.id("calculate");

  createDiv(activityHTMLsample)
    .addClass("activity-box")
    .parent("canvas-container")
    .position(10, 10)
    .elt.addEventListener("mousedown", (e) => {
      let actDiv = createDiv(activityHTML)
        .addClass("activity-box")
        .parent("canvas-container");
      acts.push(new Activity(actDiv));
    });
}

function calculate() {
  let finalAct = [];
  for (var i = 0; i < acts.length; i++) {
    acts[i].duration = 0;
    acts[i].ES = 0;
    acts[i].EF = 0;
    acts[i].LS = null;
    acts[i].LF = null;
    acts[i].slack = 0;
  }

  for (var i = 0; i < acts.length; i++) {
    if (acts[i].predecessors.length == 0) {
      updateEarlyParams(acts[i]);
    }
  }

  for (var i = 0; i < acts.length; i++) {
    if (acts[i].children.length == 0) {
      finalAct.push(acts[i]);
    }
  }

  if (finalAct.length == 1) {
    updateLateParams(finalAct[0]);
  } else {
    console.log("Error: 2 endpoints detected");
  }
}

function updateEarlyParams(act) {
  act.duration = parseInt(act.element.elt.querySelector(".duration").value);

  if (act.predecessors.length == 0) {
    act.ES = 0;
  } else {
    act.predecessors.forEach((predecessor) => {
      if (predecessor.EF > act.ES) {
        act.ES = predecessor.EF;
      }
    });
  }

  act.EF = act.duration + act.ES;
  act.element.elt.querySelector(".ES").innerHTML = "";
  act.element.elt.querySelector(".ES").innerHTML = act.ES;

  act.element.elt.querySelector(".EF").innerHTML = "";
  act.element.elt.querySelector(".EF").innerHTML = act.EF;

  act.children.forEach((child) => {
    updateEarlyParams(child);
  });
}

function updateLateParams(act) {
  if (act.children.length == 0) {
    act.LF = act.EF;
  } else {
    act.children.forEach((child) => {
      if ((child.LS < act.LF || act.LF == null) && child.LS != null) {
        act.LF = child.LS;
      }
    });
  }

  act.LS = act.LF - act.duration;
  act.element.elt.querySelector(".LS").innerHTML = "";
  act.element.elt.querySelector(".LS").innerHTML = act.LS;

  act.element.elt.querySelector(".LF").innerHTML = "";
  act.element.elt.querySelector(".LF").innerHTML = act.LF;

  act.slack = act.LS - act.ES;
  act.element.elt.querySelector(".slack").innerHTML = "";
  act.element.elt.querySelector(".slack").innerHTML = act.slack;

  act.predecessors.forEach((predecessor) => {
    updateLateParams(predecessor);
  });
}

function draw() {

  for (var i = 0; i < acts.length; i++) {
    acts[i].show();
  }

  drawDragLine();
}

function drawDragLine() {
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
    !clickedActs.left.predecessors.includes(clickedActs.right) &&
    !clickedActs.left.children.includes(clickedActs.right)
  ) {
    clickedActs.left.predecessors.push(clickedActs.right);
    clickedActs.right.children.push(clickedActs.left);
  }
  clickedActs = {};
}

function mousePressed() {
  mouseDown = true;
}

function mouseReleased() {
  mouseDown = false;

  checkConnection();
  for (var i = acts.length - 1; i >= 0; i--) {
    acts[i].selected = false;
  }
}

class Activity {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.selected = false;
    this.clicked = false;
    this.predecessors = [];
    this.duration = 0;
    this.ES = 0;
    this.EF = 0;
    this.LS = 0;
    this.LF = 0;
    this.slack = 0;
  }

  showActivity() {
    fill(200, 0, 200);
    noStroke();
    if (this.selected) {
      this.x -= pmouseX - mouseX;
      this.y -= pmouseY - mouseY;
      rect(this.x, this.y, this.width, this.height);
    } else {
      rect(this.x, this.y, this.width, this.height);
    }
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("Act:" + this.name, this.x + this.width / 2, this.y + this.height / 2);
  }

  showEdges() {
    for (var i = 0; i < this.predecessors.length; i++) {
      stroke(255);
      strokeWeight(5);
      line(
        this.x,
        this.y + this.height / 2,
        this.predecessors[i].x + this.predecessors[i].width,
        this.predecessors[i].y + this.predecessors[i].height / 2
      );
    }
  }
}

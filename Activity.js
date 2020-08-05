class Activity {
  constructor(element) {
    this.element = element;
    this.selected = true;
    this.clicked = false;
    this.predecessors = [];
    this.x = 0;
    this.y = 0;

    this.element.elt.addEventListener("mousedown", (e) => {
      if (e.target.id == "left-btn") {
        clickedActs.left = this;
      } else if (e.target.id == "right-btn") {
        clickedActs.right = this;
      } else {
        this.selected = true;
      }
    });

    this.element.elt.addEventListener("mouseup", (e) => {
      if (e.target.id == "left-btn") {
        clickedActs.left = this;
      } else if (e.target.id == "right-btn") {
        clickedActs.right = this;
      }
    });
  }

  show() {
    this.showEdges();

    if (this.selected) {
      this.x -= pmouseX - mouseX;
      this.y -= pmouseY - mouseY;
    }

    this.element.position(this.x, this.y);
  }

  showEdges() {
    let thisWidth = this.element.elt.getBoundingClientRect().width;
    let thisHeight = this.element.elt.getBoundingClientRect().height;
    let predecessorWidth;
    let predecessorHeight;

    for (var i = 0; i < this.predecessors.length; i++) {
      predecessorWidth = this.predecessors[
        i
      ].element.elt.getBoundingClientRect().width;
      predecessorHeight = this.predecessors[
        i
      ].element.elt.getBoundingClientRect().height;

      stroke(255);
      strokeWeight(5);
      line(
        this.x,
        this.y + thisHeight / 2,
        this.predecessors[i].x + predecessorWidth,
        this.predecessors[i].y + predecessorHeight / 2
      );
    }
  }
}

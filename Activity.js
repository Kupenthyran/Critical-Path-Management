class Activity {
  constructor(element) {
    this.element = element;
    this.selected = true;
    this.clicked = false;
    this.predecessors = [];
    this.children = [];
    this.x = 0;
    this.y = 0;

    this.duration = 0;
    this.ES = 0;
    this.EF = 0;
    this.LS = 0;
    this.LF = 0;
    this.slack = 0;

    this.addEvents();
  }

  addEvents() {
    this.element.elt.addEventListener("mousedown", (e) => {
      if (e.target.classList[0] == "left-btn") {
        clickedActs.left = this;
      } else if (e.target.classList[0] == "right-btn") {
        clickedActs.right = this;
      } else {
        this.selected = true;
      }
    });

    this.element.elt.addEventListener("mouseup", (e) => {
      if (e.target.classList[0] == "left-btn") {
        clickedActs.left = this;
      } else if (e.target.classList[0] == "right-btn") {
        clickedActs.right = this;
      }
    });

    this.element.elt.addEventListener("dblclick", (e) => {
      if (e.target.classList[0] == "left-btn") {
        this.predecessors = [];
      } else if (e.target.classList[0] == "right-btn") {
        this.children = [];
        for (var i = 0; i < acts.length; i++) {
          if (acts[i].predecessors.includes(this)) {
            acts[i].predecessors = acts[i].predecessors.filter(
              (item) => item !== this
            );
          }
        }
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

      stroke("rgba(183, 213, 221, 1)");
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

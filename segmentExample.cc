class Segment {

  float sw;
  PVector a;
  float len;
  float angle;
  float selfAngle;
  PVector pos;
  PVector vel;
  PVector acc;
  PVector b;
  Segment(float x, float y, float len_, float sw_) {//constructor for parent
    sw = sw_;
    a = new PVector(x, y);
    len = len_;
    calculateB();
    // sw = map(i, 0, 5, 10, rand);
    calculateB();
  }

  Segment(Segment parent, float len_,  float sw_) {//constructor for child

    sw = sw_;
    a = parent.b.copy();
    len = len_;
    calculateB();
  }
  void follow(Segment child) {
    float targetX = child.a.x;
    float targetY = child.a.y;
    follow(targetX, targetY);
  }
  void follow(float x, float y) {
    PVector target = new PVector(x, y);
    PVector dir = PVector.sub(target, a);
    angle = dir.heading();

    dir.setMag(len);
    dir.mult(-1);
    a = PVector.add(target, dir);
  }
  void calculateB() {
    float dx = len*cos(angle);
    float dy = len*sin(angle);
    b = new PVector(a.x+dx, a.y+dy);
  }
  void show(color c) {

    stroke(c);
    strokeWeight(sw);
//strokeCap(ROUND);
    if ((dist(a.x, a.y, b.x, b.y)<20)&&((b.x>=50)&&(b.y>=50)&&(b.x<=width-50)&&(b.y<=height-50))) {//if ((pos.x>=0)&&(pos.y>=0)&&(pos.x<=width)&&(pos.y<=height))
     line(a.x, a.y,b.x, b.y);
      fill(c);
      noStroke();
      //  ellipse(b.x, b.y, 200, 200);
    }
  }


  void update() {
    calculateB() ;
  }
}

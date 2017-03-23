/* OpenProcessing Tweak of *@*http://www.openprocessing.org/sketch/17163*@* */
/* !do not delete the line above, required for linking your tweak if you upload again */
FlowField field;
int maxMount;
float  mouseSpeed;
ArrayList particles;

void setup() {
  maxMount=5000;
  //blendMode(ADD);
  frameRate(60);
  size(1200, 400, P2D);
  field = new FlowField(20);

  //strokeWeight(2);
  //rokeWeight(20);
  background(0);
  particles = new ArrayList();
  for (int i=0; i<0; i++) {
    particles.add(new particle());
  }
}
void draw() {
 // blendMode(BLEND);
   fill(0, 4);
 // background(0);
  rect(0, 0, 1200, 400);
  //field.display();

// blendMode(ADD );
  // blendMode(ADD     );
  field.init();
  for (int i=0; i<particles.size(); i++) {
    particle A = (particle) particles.get(i);
    PVector mouseV = new PVector(mouseX, mouseY);
    PVector pmouseV = new PVector(pmouseX, pmouseY);

    PVector dx = PVector.sub(A.x, mouseV);
    float pushrad = 50;
    if (abs(dx.x)<pushrad) {
      if (abs(dx.y)<pushrad) {
        if (dx.mag()<pushrad) {
          //dx.normalize();
          // A.f.add(PVector.mult(dx, 0.8));
          mouseV.sub(pmouseV);
          mouseV.sub(A.v);
          mouseV.mult(1.5);
          A.v.add(mouseV);
        }
      }
    }
    A.follow(field);
    //  println(A.v.x);


    if (A.isDead()) {
      particles.remove(i);
    }
    if (particles.size()>maxMount*1.5) {
      particles.remove(0);
    }

    A.update();
  }
  mouseSpeed = sqrt((pmouseX-mouseX)*(pmouseX-mouseX)-(pmouseY-mouseY)*(pmouseY-mouseY));

  print(" ");
  print(int(frameRate));
  print(" ");
  println(particles.size());
  if (particles.size()<maxMount) {
    for (int j=0; j<50; j++) {
      particles.add(new particle());
    }
  }

  if (mouseSpeed>20) {
    for (int j=0; j<20; j++)
      particles.add(new particle());
  }
}




void mousePressed() {
}

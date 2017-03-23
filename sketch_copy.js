var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10000) ////1
camera.position.set(0, 0, 100);
var scene = new THREE.Scene(); //2
var renderer = new THREE.WebGLRenderer();
scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const RADIUS = 50;
const SEGMENTS = 10;
const RINGS = 10;
var particles = [];
for (var i = 0; i < 10; i++) {
    particles.push(new Particle());
}
var pMouseV = new THREE.Vector3(0.0, 0.0, 0.0);
var mouse = new THREE.Vector3(0.0, 0.0, 0.0);
var mouseV = new THREE.Vector3(0.0, 0.0, 0.0);
var dx = new THREE.Vector3(0.0, 0.0, 0.0);

function show_coords(event) {
    //<body onmousemove ="show_coords(event)">
    x = event.clientX;
    y = event.clientY;
    mouse.x = x;
    mouse.y = y;
    mouse.z = 0;
    //  console.log(mouse);
}
//console.log(clientX);
var material = new THREE.PointsMaterial({
    color: 0x0000ff
});
var frame = 0;
var seed = 588.0; //
var pushRad = 50;
var vShader = $('#vertexshader');
var fShader = $('#fragmentshader');
var geometry = new THREE.Geometry();

for (var i = 0; i < particles.length; i++) {
    geometry.vertices.push({
        x: particles[i].x,
        y: particles[i].y,
        z: 0
    });
}


//--------------------------renderer-----------------------
function update() { ///////why vector can't use=?
    mouseV.x = mouse.x;
    mouseV.y = mouse.y;
    mouseV.z = mouse.z;
    dx = new THREE.Vector3().subVectors(mouseV, pMouseV);
    //  console.log(particles.length);

    /*    for (var i = 0; i < particles.length; i++) {

            var A = particles[i];
            if (Math.abs(dx.x) < pushRad) {
                if (Math.abs(dx.y) < pushRad) {
                    if (dx.length() < pushRad) {
                        //        console.log(particles.length);
                        //dx.normalize();
                        // A.f.add(PVector.mult(dx, 0.8));
                        mouseV.sub(pMouseV);

                        //    mouseV.sub(A.vel);
                        mouseV.x -= A.velx;
                        mouseV.x -= A.vely;
                        mouseV.multiply(1);
                        A.velx += mouseV.x;
                        A.vely += mouseV.y;
                    }
                }
            }
          //  A.update();
        }*/

    //    if (dx.length() > 20) {

    //  particles.push(new Particle());

    //geometry.vertices.push({
    //  x: particles[particles.length - 1].x,
    //y: particles[particles.length - 1].y,
    //z: 0
    //});
    //geometry.verticesNeedUpdate = true;
    //console.log(geometry.verticesNeedUpdate);
    //  }
    //var line = new THREE.Points(geometry, material);
    //scene.add(line);
    //  for (var i = 0; i < particles.length; i++) {

    //}
    //  var line = new THREE.Points(geometry, material);
    //scene.add(line);
    //    console.log(geometry.vertices.length);
    //  console.log(A.velx);
    pMouseV.x = mouseV.x;
    pMouseV.y = mouseV.y;
    pMouseV.z = mouseV.z;
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    frame += 0.1;
    //i = 0;

}

requestAnimationFrame(update);

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
var MAX_POINTS = 2;
for (var i = 0; i < MAX_POINTS; i++) {
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
//var material = new THREE.PointsMaterial({
//  color: 0x0000ff
//});

var frame = 0;
var seed = 588.0; //
var pushRad = 50;
var vShader = $('#vertexshader');
var fShader = $('#fragmentshader');
var geometry = new THREE.BufferGeometry();
//var opacity = new Float32Array(MAX_POINTS);
var positions = new Float32Array(MAX_POINTS * 3);
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
//geometry.addAttribute('opacity', new THREE.BufferAttribute(opacity, 1));

var material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    opacity: 1,
    linewidth: 3,
    //vertexColors: THREE.VertexColors
});

// line
line = new THREE.Line(geometry, material);
scene.add(line);


//opacity = line.geometry.attributes.opacity.array;
positions = line.geometry.attributes.position.array;
var x = y = z = index = 0;
for (var i = 0, l = MAX_POINTS; i < l; i++) {
    //    opacity[i] = 0.5;
    positions[index++] = particles[i].x;
    positions[index++] = particles[i].y;
    positions[index++] = particles[i].z;
}
// draw range
drawCount = 10; // draw the first 2 points, only
geometry.setDrawRange(0, drawCount);


//for (var i = 0; i < particles.length; i++) {
//    geometry.vertices.push({
//        x: particles[i].x,
//        y: particles[i].y,
//        z: 0
//    });
//}
//console.log(line.geometry);
//--------------------------renderer-----------------------
function update() { ///////why vector can't use=?
    mouseV.x = mouse.x;
    mouseV.y = mouse.y;
    mouseV.z = mouse.z;
    dx = new THREE.Vector3().subVectors(mouseV, pMouseV);
    console.log(dx.length());
    for (var i = 0; i < particles.length; i++) {
        var mouseTemp = mouseV;
        var A = particles[i];
        if (Math.abs(dx.x) < pushRad) {
            if (Math.abs(dx.y) < pushRad) {
                if (dx.length() < pushRad) {
                    //        console.log(particles.length);
                    //dx.normalize();
                    // A.f.add(PVector.mult(dx, 0.8));
                    var temp = new THREE.Vector3().subVectors(mouseV, pMouseV);
                    temp.subVectors(temp, A.vel);
                    temp.multiplyScalar(1.5);
                    A.vel.addVectors(A.vel, temp);

                }
            }
        }
        // console.log(particles.length);

        A.update();
    }

    //  console.log(mouseV);
    for (var i = 0, l = MAX_POINTS; i < l; i++) {
        positions[index++] = particles[i].x;
        positions[index++] = particles[i].y;
        positions[index++] = particles[i].z;
    }
    line.geometry.attributes.position.needsUpdate = true;

    geometry.setDrawRange(0, 10);

    pMouseV.x = mouseV.x;
    pMouseV.y = mouseV.y;
    pMouseV.z = mouseV.z;
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    frame += 0.1;
    //i = 0;

}

requestAnimationFrame(update);

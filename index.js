//var camera = new THREE.OrthographicCamera(innerWidth / -2, innerWidth, innerHeight / 2, innerHeight / -2,1,1000) ////1
//var Noise = require('noisejs');
//var vShader = $('#vertexshader');
//var fShader = $('#fragmentshader');
var glslify = require('glslify')
var vShader = glslify('./shaders/line.vert')
var fShader = glslify('./shaders/line.frag')
document.body.addEventListener('onmousemove',show_coords,false)
console.log(vShader);

var uniforms = {
    amplitude: {
        type: 'float',
        value: 0
    },
    mouse: {
        type: 'vec2',
        value: new THREE.Vector2(0, 0)
    },
    seed: {
        type: 'float',
        value: 0.001
    },
    thickness: {
        type: 'float',
        value: 100.0
    },
    opacity: {
      type:'f',
      value: 1.0
    },
    diffuse: {
      type:'c', value: new THREE.Color(20,100,100)
    }
}
var shaderMaterial = new THREE.ShaderMaterial({ //6
    uniforms: uniforms,
    vertexShader: vShader,
    fragmentShader: fShader
});
var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10000) ////1
camera.position.set(0, 0, 600);
var scene = new THREE.Scene(); //2
var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(0, 0, 0);
scene.add(light);
var renderer = new THREE.WebGLRenderer();
scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const RADIUS = 50;
const SEGMENTS = 10;
const RINGS = 10;
var particles = [];
var MAX_POINTS = 5;
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
    mouse.x = x - innerWidth / 2;
    mouse.y = -y + innerHeight / 2;
    mouse.z = 200 * Math.random() - 100;
}
var frame = 0;
var seed = 588.0; //
var pushRad = 20;
var vShader = $('#vertexshader');
var fShader = $('#fragmentshader');
var geometry = new THREE.BufferGeometry();
var positions = new Float32Array(MAX_POINTS * 3);
var attrib = new THREE.BufferAttribute(positions, 3);
geometry.addAttribute('position', attrib);


var material = new THREE.LineBasicMaterial({
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    transparent: true,
    opacity: 0.5,
    linewidth: 3,
});
shaderMaterial.transparent = true;
material.blendEquation = THREE.AddEquation; //default
line = new THREE.Line(geometry, shaderMaterial);
scene.add(line);
//console.log(line.geometry.attributes.position.needsUpdate);
//console.log(line.material);
positions = line.geometry.attributes.position.array;
var x = y = z = index = 0;
for (var i = 0, l = MAX_POINTS; i < l; i++) {
    //    opacity[i] = 0.5;
    positions[index++] = particles[i].pos.x;
    positions[index++] = particles[i].pos.y;
    positions[index++] = particles[i].pos.z;
}
var n = 0;
// draw range
drawCount = 1000; // draw the first 2 points, only
geometry.setDrawRange(0, drawCount);
var cameraZ = 0;
//-------------------------------------------Segment




//--------------------------renderer-----------------------
function update() { ///////why vector can't use=?
    mouseV.x = mouse.x;
    mouseV.y = mouse.y;
    mouseV.z = mouse.z;

    for (var i = 0; i < particles.length; i++) {

        var A = particles[i];
        dx = new THREE.Vector3().subVectors(A.pos, pMouseV);
        if (Math.abs(dx.x) < pushRad) {
            if (Math.abs(dx.y) < pushRad) {
                if (dx.length() < pushRad) {
                    mouseV.sub(pMouseV);
                    mouseV.sub(A.vel);
                    mouseV.multiplyScalar(0.3);
                    A.vel.add(mouseV);
                }
            }
        }
        A.update();
    }
    index = 0;
    camera.position.set(600 * Math.cos(frame), 0, 600 * Math.sin(frame));
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraZ += 1;
    for (var i = 0, l = MAX_POINTS; i < l; i++) {
        positions[index++] = particles[i].pos.x;
        positions[index++] = particles[i].pos.y;
        positions[index++] = particles[i].pos.z;
    }
    material.opacity = 0.1;
    line.material.needsUpdate = true;
    geometry.attributes.position.needsUpdate = true;
    geometry.setDrawRange(0, MAX_POINTS);
    pMouseV.x = mouseV.x;
    pMouseV.y = mouseV.y;
    pMouseV.z = mouseV.z;
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    frame += 0.001;
}

requestAnimationFrame(update);

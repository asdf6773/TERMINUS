global.THREE = require('three');
const mouse = require('touch-position')();
const createLoop = require('raf-loop');
const createApp = require('./app');
const Particle = require('./particle')
var Line = require('../')(THREE);
var BasicShader = require('../shaders/basic')(THREE);
var GradientShader = require('./shader-gradient')(THREE);
var normalize = require('normalize-path-scale');
//--------------------particle
var MAX_PARTICLES = 20;


var particle = [];
var MAX_POINTS = 20
for (var i = 0; i < MAX_POINTS; i++) {
    particle.push(new Particle());
}
//-------------------------------------
var linePath = [];
for (var i = 0; i < particle.length; i++) {
    linePath.push([particle[i].x, particle[i].y]);
}
var app = createApp({
    antialias: true
});
app.renderer.setClearColor('#2e1111', 1);
var time = 0;
setup();




var lastPos = [];
for (var i = 0; i < MAX_POINTS; i++) {
    lastPos.push([0, 0]);
}
console.log(lastPos);

function setup() {
    var boxGeometry = Line(linePath, {
        distances: true,
    });
    var boxMat = new THREE.ShaderMaterial(GradientShader({
        thickness: 20,
        side: THREE.DoubleSide
    }));
    var boxMesh = new THREE.Mesh(boxGeometry, boxMat);
    app.scene.add(boxMesh);
    //  console.log(THREE.Projector);
    var position = boxGeometry.attributes.position.array;
    var ratio = (innerHeight / 2) / (1000 / Math.tan(Math.PI / 6) + innerHeight / 2);
    createLoop(function(dt) {
        linePath[particle.length - 1][0] = (-mouse[0] + innerWidth / 2)
        linePath[particle.length - 1][1] = (-mouse[1] + innerHeight / 2);
        for (var i = 1; i < MAX_POINTS; i++) {
          linePath[particle.length - (i+1)][0] = lastPos[i-1][0]
          linePath[particle.length - (i+1)][1] = lastPos[i-1][1]
        }
        for (var i = 1; i < MAX_POINTS; i++) {
          lastPos[i-1][0] = linePath[particle.length - i][0];
          lastPos[i-1][1] = linePath[particle.length - i][1];

        }
        boxMesh.geometry = Line(linePath, {
            distances: true,
        });
        boxMesh.material.needsUpdate = true;
        boxGeometry.attributes.position.needsUpdate = true;
        boxMat.uniforms.time.value = time;
        app.updateProjectionMatrix();
        app.renderer.render(app.scene, app.camera);
    }).start();
}

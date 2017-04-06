global.THREE = require('three');
const mouse = require('touch-position')();
const createLoop = require('raf-loop');
const createApp = require('./app');
const Particle = require('./particle')
var Line = require('../')(THREE);
var BasicShader = require('../shaders/basic')(THREE);
var GradientShader = require('./shader-gradient')(THREE);
var normalize = require('normalize-path-scale');
//--------------------createApp
var app = createApp({
    antialias: true
});
app.renderer.setClearColor('#2e1111', 1);
//--------------------single particle
var particle = [];
var MAX_POINTS = 10
for (var i = 0; i < MAX_POINTS; i++) {
    particle.push(new Particle());
}
//--------------------add particles to trail
var trail = [];

for (var i = 0; i < particle.length; i++) {
    trail.push([particle[i].x, particle[i].y]);
}

//-------------------- particlesystem
var particles = [];
particles.push(trail);

console.log(particles)
//--------------------form a geometry
var boxGeometry = Line(trail, {
    distances: true,
})


var boxMat = new THREE.ShaderMaterial(GradientShader({
    thickness: 20,
    side: THREE.DoubleSide
}));
var boxMesh = new THREE.Mesh(boxGeometry, boxMat);
app.scene.add(boxMesh);
//-------------------------------------------
var lastPos = [];
for (var i = 0; i < MAX_POINTS; i++) {
    lastPos.push([0, 0]);
}
requestAnimationFrame(update)

function update() {
    // trail[particle.length - 1][0] = (-mouse[0] + innerWidth / 2);
    // trail[particle.length - 1][1] = (-mouse[1] + innerHeight / 2)
    trail[particle.length - 1][0] += 50 * Math.random() - 25;
    trail[particle.length - 1][1] += 50 * Math.random() - 25;
    for (var i = 1; i < MAX_POINTS; i++) {
        trail[particle.length - (i + 1)][0] = lastPos[i - 1][0]
        trail[particle.length - (i + 1)][1] = lastPos[i - 1][1]
    }
    for (var i = 1; i < MAX_POINTS; i++) {
        lastPos[i - 1][0] = trail[particle.length - i][0];
        lastPos[i - 1][1] = trail[particle.length - i][1];
    }

    boxMesh.geometry = Line(trail, {
        distances: true,
    });
    boxMesh.material.needsUpdate = true;
    boxGeometry.attributes.position.needsUpdate = true;
    app.updateProjectionMatrix();
    app.renderer.render(app.scene, app.camera);
    requestAnimationFrame(update)
}



// var update = createLoop(function(dt) {
//     trail[particle.length - 1][0] = (-mouse[0] + innerWidth / 2)
//     trail[particle.length - 1][1] = (-mouse[1] + innerHeight / 2);
//     for (var i = 1; i < MAX_POINTS; i++) {
//         trail[particle.length - (i + 1)][0] = lastPos[i - 1][0]
//         trail[particle.length - (i + 1)][1] = lastPos[i - 1][1]
//     }
//     for (var i = 1; i < MAX_POINTS; i++) {
//         lastPos[i - 1][0] = trail[particle.length - i][0];
//         lastPos[i - 1][1] = trail[particle.length - i][1];
//     }
//     boxMesh.geometry = Line(trail, {
//         distances: true,
//     });
//     boxMesh.material.needsUpdate = true;
//     boxGeometry.attributes.position.needsUpdate = true;
//     app.updateProjectionMatrix();
//     app.renderer.render(app.scene, app.camera);
// })
// console.log(update)

global.THREE = require('three');
const createLoop = require('raf-loop');
const createApp = require('./app');

var Line = require('../')(THREE);
var BasicShader = require('../shaders/basic')(THREE);
var GradientShader = require('./shader-gradient')(THREE);
var normalize = require('normalize-path-scale');
var boxPath = [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100]
];
var app = createApp({
    antialias: true
});
app.renderer.setClearColor('#1d1d1d', 1);
var time = 0;
setup();

function setup() {
    var boxGeometry = Line(boxPath, {
        distances: true,
        //  closed: false
    });
    var boxMat = new THREE.ShaderMaterial(GradientShader({
        thickness: 5,
        //    side: THREE.DoubleSide
    }));
    var boxMesh = new THREE.Mesh(boxGeometry, boxMat);
    app.scene.add(boxMesh);


    createLoop(function(dt) {
        time += dt / 1000;
        //boxMat.uniforms.time.value = 1;
        app.updateProjectionMatrix();
        app.renderer.render(app.scene, app.camera);
    }).start();
}

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
function ParticleSystem(num, mat) {
    this.particles = [];
    for (var i = 0; i < num; i++) {
        this.particle.push(new Particle());
    }
    this.trail = []
    for (var i = 0; i < this.particle.length; i++) {
        this.trail.push([this.particle[i].x, this.particle[i].y]);
    }
    this.LineGeometry = Line(this.trail, {
        distances: true,
    })
    this.LineMesh = new THREE.Mesh(this.LineGeometry, mat);
    this.lastPos = [];
    for (var i = 0; i < num; i++) {
        this.lastPos.push([0, 0]);
    }
    this.update = function() {
        this.trail[particle.length - 1][0] += 50 * Math.random() - 25;
        this.trail[particle.length - 1][1] += 50 * Math.random() - 25;
        for (var i = 1; i < num; i++) {
            this.trail[particle.length - (i + 1)][0] = this.lastPos[i - 1][0]
            this.trail[particle.length - (i + 1)][1] = this.lastPos[i - 1][1]
        }
        for (var i = 1; i < num; i++) {
            this.lastPos[i - 1][0] = this.trail[particle.length - i][0];
            this.lastPos[i - 1][1] = this.trail[particle.length - i][1];
        }
        this.LineMesh.geometry = Line(this.trail, {
            distances: true,
        });
        this.LineMesh.material.needsUpdate = true;
        this.LineGeometry.attributes.position.needsUpdate = true;
    }
}

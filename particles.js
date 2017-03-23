function Particle() {
    //   var acc, pos, frc;
    this.x = 100 * Math.random() - 50;
    this.y = 100 * Math.random() - 50;
    this.z = 0;
    this.pos = new THREE.Vector3(this.x, this.y, this.z);
    this.vel = new THREE.Vector3(0, 0, 0);
    this.acc = new THREE.Vector3(0, 0, 0);

    this.update = function() {



        this.vel.addVectors(this.vel, this.acc);
        this.pos.addVectors(this.pos, this.vel);
        this.acc.multiplyScalar(0);


    }
}

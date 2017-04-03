function endSegment(x_, y_, len_) {
    this.x = x_;
    this.y = y_;
    this.len = len_;
    this.angle = 0;
    this.a = new THREE.Vector2(this.x, this.y);
    this.b = new THREE.Vector2(0, 0);
    calculateB();
    this.calculateB = function() {
        var dx = Math.cos(angle) * len;
        var dy = Math.sin(angle) * len;
        b = new THREE.Vector2(dx, dy);
    }
    this.show = function() {
      
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(a.x, a.y),
            new THREE.Vector3(b.x, b.y),
        );
        var line = new THREE.Line(geometry, material);
        scene.add(line);
    }
}

function ChildSemgment(parent) {
    this.a = THREE.Vector2().copy(parent.b);
    len = parent.len;
    this.calculateB = parent.calculateB;




}

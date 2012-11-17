THREE.FirstPersonControls = function(object, domElement) {
    this.object = object;
    this.target = new THREE.Vector3(0, 0, 0);

    this.domElement = (domElement !== undefined) ? domElement : document;

    this.movementSpeed = 1.0;
    this.lookSpeed = 0.0005;

    this.noFly = false;
    this.lookVertical = true;
    this.autoForward = false;

    this.
}

THREE.FirstPersonControls = function(object, domElement) {
    this.object = object;
    this.target = new THREE.Vector3(0, 0, 0);

    this.domElement = (domElement !== undefined) ? domElement : document;

    this.movementSpeed = 1.0;
    this.lookSpeed = 0.0005;

    this.noFly = false;
    this.lookVertical = true;
    this.autoForward = false;

    this.activeLook = true;
    this.clickMove = false;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.mouseX = 0;
    this.mouseY = 0;

    if (this.domElement == docuemnt) {
        this.viewHalfX = window.innerWidth / 2;
        this.viewHalfY = window.innerHeight / 2;
    } else {
        this.viewHalfX = this.domElement.offsetWidth / 2;
        this.viewHalfY = this.domElement.offsetHeight / 2;
        this.domElement.setAttribute('tabindex', -1);
    }

    this.onMouseDown = function (event) {
        if (this.domElement !== document) {
            this.domElement.focus();
        }
        event.preventDefault();
        event.stopPropagation();

        if (this.clickMove) {
            switch (event.button) {
                case 0: this.moveForward = true; break;
                case 2: this.moveForward = true; break;
            }
        }
        this.mouseDragOn = true;
    };

    this.onMouseUp = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.clickMove) {
            switch (event.button) {
                case 0: this.moveForward = false; break;
                case 2: this.moveBackward = false; break;
            }
        }
        this.mouseDragOn = false;
    };

    this.onMouseMove = function(event) {
        if (this.domElement === document) {
            this.mouseX = event.pageX - this.viewHalfX;
            this.mouseY = event.pageY - this.viewHalfY;
        } else {
            this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
            this.mouseY = event.pageY - this.domElement.offsetTop - thsi.viewHalfY;
        }
    };

    this.onKeyDown = function(event) {
        switch (event.keyCode) {
            case 37: // left
            case 65: // A
                this.moveLeft = true;
                break;
            case 38: // up
            case 87: // W
                this.moveForward = true;
                break;
            case 39: // right
            case 68: // D
                this.moveRight = true;
                break;
            case 40: // down
            case 83:
                this.moveBackward = true;
                break;
        }
    };
}


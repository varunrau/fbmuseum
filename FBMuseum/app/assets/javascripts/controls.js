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

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

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

     this.onKeyUp = function(event) {
        switch (event.keyCode) {
            case 37: // left
            case 65: // A
                this.moveLeft = false;
                break;
            case 38: // up
            case 87: // W
                this.moveForward = false;
                break;
            case 39: // right
            case 68: // D
                this.moveRight = false;
                break;
            case 40: // down
            case 83:
                this.moveBackward = false;
                break;
        }
    };

    this.update = function(del) {

        // This part of the code is pretty self explanatory.
        var moveSpeed = 0;

        moveSpeed = delta * this.movementSpeed;
        
        if (this.moveForward) {
            this.object.translateZ(-(moveSpeed));
            if (collision(this.object.position)) {
                this.object.translateZ(moveSpeed);
            }
        }

        if (this.moveBackward) {
            this.object.translateZ(moveSpeed);
            if (collistion(this.object.position)) {
                this.object.translateZ(- moveSpeed);
            }
        }

        if (this.moveLeft) {
            this.object.translateX(- moveSpeed);
            if (collision(this.object.position)) {
                this.object.translate(moveSpeed);
            }
        }

        if (this.moveRight) {
            this.object.translateX(moveSpeed);
            if (collision(this.object.position)) {
                this.object.translate(- moveSpeed);
            }
        }

        var lookS = delta * this.lookSpeed;
        this.lon += this.mouseX * lookS;
        if (this.lookVertical) {
            this.lat -= this.mouseY * lookS;
        }
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * Math.PI / 180;
        this.theta = this.lon * Math.PI / 180;

        var targetPos = this.target;
        var pos = this.object.position;

        targetPos.x = pos.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        targetPos.y = pos.y + 100 * Math.cos(this.phi);
        targetPos.z = pos.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);


        this.lon += this.mouseX * lookS;

        this.object.lookAt(targetPos);
    };

    this.domElement.addEventListener('mousemove', bind(this, this.onMouseMove), false);
    this.domElement.addEventListener('mousedown', bind(this, this.onMouseDown), false);
    this.domElement.addEventListener('mouseup', bind(this, this.onMouseUp), false);
    this.domElement.addEventListner('keydown', bind(this, this.onKeyDown), false);
    this.domElement.addEventListener('keyup', bind(this, this.onKeyUp), false);

    function bind(obj, func) {
        return function() {
            fn.apply(obj, arguments);
        }
    }
}


// Some convenience variables
var aspectRatio = window.innerWidth / window.innerHeight;
var unitsize = 250;
var wallheight = unitsize / 3;
var walkspeed = 100;
var lookspeed = .075;
var maplength = 10;
var mapLength = mapLength;

// A basic map. I'll write a script to generate this later.
var map = [
            [1, 0, 2],
            [3, 0, 4],
            [5, 0, 6],
            [7, 0, 8],
            [9, 0, 10]
            ];
var mapWidth = map.length;
var mapHeight = map[0].length;

// Some more convenience methods
var t = THREE;
var scene, cam, renderer, controls, clock, projector, model, skin;
var mouse = { x: 0, y: 0};

/*
var photos = [
                new t.MeshBasicMaterial({color: #FF0000})
                ];
*/

// This is called when the document is ready. We'll show a simple start
// screen then when the user is ready we'll start the main animation loop.
$(document).ready(function() {
    //$('body').append('<div id="start-page">Are you Ready?</div>');
    //$('start-page').css({width: window.innerWidth, height: window.innerHeight}).one('click', function(e) {
        //e.preventDefault();
        //$(this).fadeOut();
        start();
        animate();
    //});
});

var start = function() {
  clock = new t.Clock();
  projector = new t.Projector();
  scene = new t.Scene();
  scene.fog = new t.FogExp2(0xD6F1FF, 0.0005); // We'll add fog, so we can see depth in this world

  cam = new t.PerspectiveCamera(60, aspectRatio, 1, 10000);
  cam.position.y = unitsize * .2; // Raise the camera off the ground
  scene.add(cam);

  // Insert code to control the camera
  controls = new t.FirstPersonControls(cam);
  console.log(controls);
  controls.movementSpeed = walkspeed;
  controls.lookSpeed = lookspeed;

  setup(); // This will set up the scene including rendering the map

  renderer = new t.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.backgroundColor = '#ADEAEA';
  document.body.appendChild(renderer.domElement); // Add our HTML canvas to the DOM

  document.addEventListener('mousemove', onMouseMove, false);
};

var onMouseMove = function(e) {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
}

var animate = function() {
    
    requestAnimationFrame(animate);
    render();
};

var render = function() {
    var del = clock.getDelta();
    controls.update(del);
    console.log(cam.position);
    renderer.render(scene, cam); // Repaint the scene
}

var setup = function() {
    // Let's create the floor!
    var floor = new t.Mesh(
			new t.CubeGeometry(mapWidth * unitsize, 10, mapWidth * unitsize),
			new t.MeshLambertMaterial({color: 0xEDCBA0,/*map: t.ImageUtils.loadTexture('images/floor-1.jpg')*/})
	);
	scene.add(floor);
    //var floor = new t.Mesh(
                    //new t.CubeGeometry(mapWidth * unitsize, 10, mapLength * unitsize),
                    //new t.MeshBasicMaterial({color: 0xF4A460}));
    //console.log(floor);
    //scene.add(floor);
    /*
    var cube = new t.CubeGeometry(unitsize, wallheight, unitsize);
    // Let's create the walls
    for (var i = 0; i < mapWidth; i++) {
        for (var j = 0, m = map[i].length; j < m; j++) {
            if (map[i][j]) {
                // We want to use a different image for each of the walls.
                // So we give the image a different texture
                var wall = new t.Mesh(cube, photos[map[i][j]]);
                wall.position.x = (i - mapWidth/2) * unitsize;
                wall.position.y = wallheight/2;
                wall.position.z = (j - mapWidth/2) * unitsize;
                // Add the wall to the scene
                scene.add(wall);
            }
        }
    }
    */
    var directionalLight1 = new t.DirectionalLight(0xF7EFBE, 0.7);
    directionalLight1.position.set(0.5, 1, 0.5);
    scene.add(directionalLight1);

    var directionalLight2 = new t.DirectionalLight(0xF7EFBE, 0.5);
    directionalLight2.position.set(-0.5, -1, -0.5);
    scene.add(directionalLight2);
}

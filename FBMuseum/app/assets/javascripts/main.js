var aspectRatio = window.innerWidth / window.innerHeight;
var unitsize = 250;
var wallheight = unitsize / 3;
var walkspeed = 100;
var lookspeed = .075;

var t = THREE;
var scene, cam, renderer, controls, clock, projector, model, skin;
var mouse = { x: 0, y: 0};

$(document).ready(function() {
    $('body').append('<div id="start-page">Are you Ready</div>');
    $('start-page').css({width: window.innerWidth, height: window.innerHeight}).one('click', function(e) {
        e.preventDefault();
        $(this).fadeOut();
        start();
        animate();
    })
})

var start = function() {

}

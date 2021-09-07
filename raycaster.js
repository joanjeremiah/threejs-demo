import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 50 );
camera.position.z = 30;

const cameraPole = new THREE.Object3D();
cameraPole.add(camera);
scene.add(cameraPole);

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
document.body.appendChild( renderer.domElement );

function randomCol(){
    const colors = ['green','blue','yellow','orange','grey'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function makeBox(){
    const size = ((Math.random() * 2) - 1) * 3;
    const geometry = new THREE.BoxGeometry(size,size,size);
    const material = new THREE.MeshStandardMaterial( {color: 'red'} );
    const box = new THREE.Mesh( geometry, material );
    box.position.set(((Math.random() * 2) - 1) * 50 ,((Math.random() * 2) - 1) * 50,((Math.random() * 2) - 1) * 50)
    scene.add( box );
}

const boxCount = 500;
for(let i = 0;i <= boxCount;i++){
    makeBox();
}

const pointLight = new THREE.PointLight(0xffffff,1);
pointLight.position.set(5,10,5);
const pointLight2 = new THREE.PointLight(0xffffff,1);
pointLight2.position.set(-5,10,5);
scene.add(pointLight,pointLight2);

let objs = [];
scene.traverse(obj => {
    if(obj.isMesh){
        objs.push(obj);
    }
})

const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
}

function onTouchMove( event ) {
	mouse.x = ( event.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;	
}

function onWindowResize(){
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

}

const clock = new THREE.Clock();

const render = function () {
    let t = clock.getElapsedTime();
    requestAnimationFrame( render );
  
    raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( objs );

    for(let i = 0;i < objs.length;i++){
        if(!intersects.find(intersect => intersect.object === objs[i])){
        }
    }
	for ( let i = 0; i < intersects.length; i++ ) {
        intersects[i].object.material.color.set(randomCol())
	}

    cameraPole.rotation.y = t * 0.1;

    renderer.render( scene, camera );
}

window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'touchmove', onTouchMove, false );
window.addEventListener( 'resize', onWindowResize);
render();
// Debug
// const gui = new dat.GUI()

// Dom elements
const canvas = document.querySelector('canvas.webgl');
const loadingDiv = document.querySelector('div.loading');
const main = document.querySelector('main');

// Scene
const scene = new THREE.Scene();

//textures
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('height2.jpg');
const normal = textureLoader.load('NormalMap (1).png');


// Objects
const geometry = new THREE.SphereGeometry(15,32,16);
const material = new THREE.MeshStandardMaterial({
    color: 'black',
    normalMap: normal,
    metalness: 0.5,
    roughness: 0.7
});
const sphere = new THREE.Mesh(geometry,material);
sphere.position.set(0,0,0);
scene.add(sphere);

// Lights
const pointLight1 = new THREE.PointLight(0x6b0d0d,5);
pointLight1.position.set(-65,40,-50);
scene.add(pointLight1);

//gui adjusting light colours
// const col = {
//     colour: 0xffffff,
// }
// const col2 = {
//     colour: 0xffffff,
// }
// gui.addColor(col,'colour').onChange(colour => {
//     pointLight1.color.set(colour);
// })
// gui.add(pointLight1.position,'x');
// gui.add(pointLight1.position,'y');
// gui.add(pointLight1.position,'z');

const pointLight2 = new THREE.PointLight(0x4feded,3);
pointLight2.position.set(20,-30,-10);
scene.add(pointLight2);

// gui.addColor(col2,'colour').onChange(colour => {
//     pointLight2.color.set(colour);
// })
// gui.add(pointLight2.position,'x');
// gui.add(pointLight2.position,'y');
// gui.add(pointLight2.position,'z');

const light = new THREE.PointLight(0xffffff,3)
light.position.set(5,15,5);
scene.add(light);
// gui.add(light.position,'x');
// gui.add(light.position,'y');
// gui.add(light.position,'z');


// Light Helper

// const sphereSize = 5;
// const pointLightHelper1 = new THREE.PointLightHelper( pointLight1, sphereSize );
// scene.add( pointLightHelper1);
// const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
// scene.add( pointLightHelper2);
// const lightHelper = new THREE.PointLightHelper(light, sphereSize );
// scene.add( lightHelper);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 60
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

const sphereAnimateMobile = (e) => {
    mouseX = e.changedTouches[0].clientX * 0.005;
    mouseY = e.changedTouches[0].clientY * 0.001;
}
const sphereAnimate = (e) => {
    mouseX = e.clientX * 0.005;
    mouseY = e.clientY * -0.04;
}

canvas.addEventListener('mousemove',sphereAnimate);
canvas.addEventListener('touchmove',sphereAnimateMobile);

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.x = mouseX;
    sphere.position.z = mouseY;

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
const gui = new dat.GUI()

// Dom elements
const canvas = document.querySelector('canvas.webgl');
const loadingDiv = document.querySelector('div.loading');
const main = document.querySelector('main');

// Scene
const scene = new THREE.Scene();
let tl = gsap.timeline();

//textures
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('photo-1603077747884-b458237de736.jpg');
const alpha = textureLoader.load('download.jpg');
const height = textureLoader.load('heightmap.png');

// Objects
const geometry = new THREE.PlaneBufferGeometry(3,3,64,64);

const material = new THREE.MeshStandardMaterial({
    color: 'grey',
    map : texture,
    displacementMap: height,
    displacementScale: 0.6,
    alphaMap: alpha,
    transparent: true,
    depthTest: false
})

const terrain = new THREE.Mesh(geometry,material);
scene.add(terrain);
terrain.rotation.x = 11.2;
terrain.rotation.y = 6.2;
// terrain.position.x = 3;
// terrain.scale.x = 0.7;
terrain.scale.x = 2.7;
terrain.scale.y = 2.7;

const terrainPosition = gui.addFolder('position');
terrainPosition.add(terrain.position,'x').min(0).max(20);
terrainPosition.add(terrain.position,'y').min(-20).max(20);
terrainPosition.add(terrain.position,'z').min(0).max(20);;
const terrainRotation = gui.addFolder('rotation');
terrainRotation.add(terrain.rotation,'x').min(0).max(20);
terrainRotation.add(terrain.rotation,'y').min(0).max(20);
const terrainScale = gui.addFolder('scale');
terrainScale.add(terrain.scale,'x').min(0).max(20);
terrainScale.add(terrain.scale,'y').min(0).max(20);
terrainScale.add(terrain.scale,'z').min(0).max(20);
// Lights
// 0x5abb76,0xffffff
const pointLight = new THREE.PointLight(0x5abb76,3)
pointLight.position.set(20,20,0);

scene.add(pointLight)  
const col = {
    colour: 0xffffff,

}
gui.addColor(col,'colour').onChange(colour => {
    pointLight.color.set(colour);
})


//Light Helper
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
// scene.add( pointLightHelper);

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
camera.position.z = 4
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

let mouseY = 0;

const animateTerrain = (e) => {
    // console.log(e.clientY);
    mouseY = e.clientY;
}

document.addEventListener('mousemove',animateTerrain);

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    terrain.rotation.z = .05 * elapsedTime;
    terrain.material.displacementScale = 0.6 +  mouseY * 0.0006;
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
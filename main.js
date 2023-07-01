import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

console.log("working");

const scene = new THREE.Scene();

//Sizes
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

//Geometry
const geometry = new THREE.SphereGeometry(3, 64, 64);

//Material
const material = new THREE.MeshStandardMaterial({
    color : '#08ff73',
    roughness: 0.5
});

//Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Light
const light = new THREE.PointLight('#ffffff', 1, 100);
light.position.set(0, 10, 10)
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 0, 20)
scene.add(camera);

//Renderer
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5;

window.addEventListener("resize", () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.updateProjectionMatrix()
        camera.aspect = sizes.width/sizes.height
        renderer.setSize(sizes.width, sizes.height);
})

function draw(){
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}

draw();

const tl = gsap.timeline({defaults: {duration : 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y: '-100%'}, {y: '0%'})
tl.fromTo('h1', {opacity: 0}, {opacity: 1})
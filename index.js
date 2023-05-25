import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.152.2/three.module.js";
import { OrbitControls } from "./src/third-party/OrbitControls.module.js";

let camera, scene, renderer;
let geometry, material, mesh;
let controls;

function setupEventListeners() {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    })
}

function init() {
    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // let canvas_parent_div = document.querySelector('#canvas-container');
    // canvas_parent_div.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // lighting
    const light = new THREE.AmbientLight(0x404040, 10);
    scene.add(light);
    const light2 = new THREE.PointLight(0x404040, 100, 100);
    light2.position.set(1, 2.5, 5);
    scene.add(light2);

    // mesh
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // orbit control
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    setupEventListeners();
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

init();
animate();
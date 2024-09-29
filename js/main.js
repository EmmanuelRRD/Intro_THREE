import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js'

const stats = Stats();
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);

//========================================
const light = new THREE.AmbientLight( 0x24d0d8 ,100); // soft white light
light.position.set(1,3,4);
scene.add( light );

//========================================
const geometryCap = new THREE.CapsuleGeometry( 1, 1, 4, 7 ); 
const materialCap = new THREE.MeshBasicMaterial( {
    color: 0xfe1212,
    side: THREE.DoubleSide
    }
); 
const capsule = new THREE.Mesh( geometryCap, materialCap );
scene.add( capsule );
//====================================================
const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const geometrylat = new THREE.LatheGeometry( points );
const materiallat = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide,color: 0xa3991e } );
const lathe = new THREE.Mesh( geometrylat, materiallat );
lathe.position.set(1,-8,1);
scene.add( lathe );
//==========================================
const geometrymesh = new THREE.RingGeometry( 15, 5, 32 ); 
const materialmesh = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometrymesh, materialmesh ); 
mesh.rotateX(Math.PI/2);
mesh.position.set(1,-1,1);
scene.add( mesh );
//=========================================================


const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const OrbitControl = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(8,0,8);
const material = new THREE.MeshBasicMaterial({
    color: 0x6bcb10,
    side: THREE.DoubleSide
});
const cube = new THREE.Mesh(geometry, material);

cube.position.set(1,0,1);
scene.add(cube);
//===========Camara==============
camera.position.set(7,5,7);
camera.lookAt(scene.position);

let x = 0;
function movimiento(){
    x += 0.3;
    let x2 = Math.sin(x);
    return x2;
}
animate();

function animate(){
    
    requestAnimationFrame(animate);
    stats.update();
    OrbitControl.update();

    let y= movimiento();
    capsule.position.set(1,3,1+y);
    let x =+ 1;
    capsule.rotateX(x);

    renderer.render(scene,camera);
}
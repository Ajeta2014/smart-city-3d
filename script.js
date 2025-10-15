let container = document.getElementById("canvas-container");

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8d9ff);

let camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 2000);
camera.position.set(0, -180, 120);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

let hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.9);
hemi.position.set(0,200,0);
scene.add(hemi);

let sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(-100,-100,200);
scene.add(sun);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,20);
controls.update();

let cityGroup = new THREE.Group();
scene.add(cityGroup);

function addTower(x,y,w,d,h){
    let geom = new THREE.BoxGeometry(w,d,h);
    let mat = new THREE.MeshStandardMaterial({color:0x808080});
    let mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x,y,h/2);
    cityGroup.add(mesh);
}

function addHouse(x,y,w,d,h){
    let geom = new THREE.BoxGeometry(w,d,h);
    let mat = new THREE.MeshStandardMaterial({color:0xf2e6d6});
    let mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x,y,h/2);
    cityGroup.add(mesh);
    let roof = new THREE.ConeGeometry(Math.max(w,d)/1.2, h*0.5, 4);
    let rmesh = new THREE.Mesh(roof, new THREE.MeshStandardMaterial({color:0x6b3b2b}));
    rmesh.rotation.z = Math.PI/4;
    rmesh.position.set(x,y,h + h*0.25);
    cityGroup.add(rmesh);
}

// Gerar cidade simples
for(let i=0;i<10;i++){
    for(let j=0;j<8;j++){
        let x = i*30 - 150;
        let y = j*25 - 100;
        if(Math.random()<0.3){
            addHouse(x,y,12,12,10 + Math.random()*10);
        } else {
            addTower(x,y,15,15,20 + Math.random()*40);
        }
    }
}

// Praia
let seaGeo = new THREE.PlaneGeometry(300, 50);
let seaMat = new THREE.MeshStandardMaterial({color:0x2f70d6});
let sea = new THREE.Mesh(seaGeo, seaMat);
sea.rotation.x = -Math.PI/2;
sea.position.set(0, 125, 0);
scene.add(sea);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

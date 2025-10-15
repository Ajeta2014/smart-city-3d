
let container = document.getElementById("canvas-container");

// Cena e câmara
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8d9ff);

let camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 3000);
camera.position.set(0, -300, 200);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Luz
let hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.9);
hemi.position.set(0,200,0);
scene.add(hemi);

let sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(-300,-300,400);
sun.castShadow = true;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
scene.add(sun);

// Controles
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,50);
controls.update();

// Grupo da cidade
let cityGroup = new THREE.Group();
scene.add(cityGroup);

// ===== Funções para prédios e casas =====
function addTower(x,y,w,d,h){
    let geom = new THREE.BoxGeometry(w,d,h);
    let mat = new THREE.MeshStandardMaterial({color:0x808080});
    let mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x,y,h/2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    cityGroup.add(mesh);
    // Janelas iluminadas
    let windowMat = new THREE.MeshStandardMaterial({color:0xffffaa, emissive:0xffffaa, emissiveIntensity:0.5});
    for(let i=0;i<Math.floor(h/5);i++){
        let win = new THREE.BoxGeometry(w-2,d-2,1);
        let winMesh = new THREE.Mesh(win, windowMat);
        winMesh.position.set(x,y, 2.5 + i*5);
        cityGroup.add(winMesh);
    }
}

function addHouse(x,y,w,d,h){
    let geom = new THREE.BoxGeometry(w,d,h);
    let mat = new THREE.MeshStandardMaterial({color:0xf2e6d6});
    let mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x,y,h/2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    cityGroup.add(mesh);
    // Telhado
    let roof = new THREE.ConeGeometry(Math.max(w,d)/1.2, h*0.6, 4);
    let rmesh = new THREE.Mesh(roof, new THREE.MeshStandardMaterial({color:0x6b3b2b}));
    rmesh.rotation.z = Math.PI/4;
    rmesh.position.set(x,y,h + 0.3*h);
    rmesh.castShadow = true;
    cityGroup.add(rmesh);
}

// ===== Cidade urbana + turística =====
let cols = 12, rows = 10;
let cityW = 350, cityH = 250;
for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
        let x = i*30 - cityW/2;
        let y = j*25 - cityH/2;
        if(Math.random()<0.3){
            addHouse(x,y,12,12,10 + Math.random()*10);
        } else {
            addTower(x,y,15,15,20 + Math.random()*40);
        }
    }
}

// Praia costeira + promenade
let seaGeo = new THREE.PlaneGeometry(cityW+50, 80);
let seaMat = new THREE.MeshStandardMaterial({color:0x2f70d6});
let sea = new THREE.Mesh(seaGeo, seaMat);
sea.rotation.x = -Math.PI/2;
sea.position.set(0, cityH/2 + 40, 0);
sea.receiveShadow = true;
scene.add(sea);

// Árvores simples
function addTree(x,y){
    let trunk = new THREE.CylinderGeometry(0.5,0.5,5);
    let trunkMesh = new THREE.Mesh(trunk, new THREE.MeshStandardMaterial({color:0x8B4513}));
    trunkMesh.position.set(x,y,2.5);
    trunkMesh.castShadow = true;
    cityGroup.add(trunkMesh);

    let leaves = new THREE.ConeGeometry(2,6,8);
    let leavesMesh = new THREE.Mesh(leaves, new THREE.MeshStandardMaterial({color:0x0A7E07}));
    leavesMesh.position.set(x,y,7);
    leavesMesh.castShadow = true;
    cityGroup.add(leavesMesh);
}

for(let i=-150;i<150;i+=20){
    addTree(i, cityH/2 + 20);
}

// Animar cena
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

import streamlit as st

st.set_page_config(page_title="Smart City 3D", layout="wide")

st.title("🏙️ Smart City Turística Inteligente (3D)")
st.markdown("""
Explore a maquete digital de uma cidade urbana + turística inteligente.
Use o rato para girar e scroll para aproximar. Desenvolvido por **Batolomeu 👷‍♂️**.
""")

# Código HTML + Three.js para gerar a cidade
html_code = """
<!DOCTYPE html>
<html lang="pt-PT">
<head>
<meta charset="UTF-8">
<title>Smart City 3D</title>
<style>
html, body { margin:0; height:100%; overflow:hidden; }
#canvas-container { width:100%; height:800px; display:block; }
</style>
</head>
<body>
<div id="canvas-container"></div>
<script src="https://unpkg.com/three@0.156.0/build/three.min.js"></script>
<script src="https://unpkg.com/three@0.156.0/examples/js/controls/OrbitControls.js"></script>

<script>
// ===== Setup básico =====
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8d9ff);

let camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.set(0, -180, 120);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, 800);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Luz
let hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.9);
hemi.position.set(0,200,0);
scene.add(hemi);

let sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(-100,-100,200);
sun.castShadow = true;
scene.add(sun);

// Controles
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,20);
controls.update();

// Grupo da cidade
let cityGroup = new THREE.Group();
scene.add(cityGroup);

// ===== Funções =====
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
    // Telhado
    let roof = new THREE.ConeGeometry(Math.max(w,d)/1.2, h*0.5, 4);
    let rmesh = new THREE.Mesh(roof, new THREE.MeshStandardMaterial({color:0x6b3b2b}));
    rmesh.rotation.z = Math.PI/4;
    rmesh.position.set(x,y,h + h*0.25);
    cityGroup.add(rmesh);
}

// ===== Gerar cidade =====
let cols = 10, rows = 8;
let cityW = 300, cityH = 200;
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

// ===== Praia + promenade =====
let seaGeo = new THREE.PlaneGeometry(cityW, 50);
let seaMat = new THREE.MeshStandardMaterial({color:0x2f70d6});
let sea = new THREE.Mesh(seaGeo, seaMat);
sea.rotation.x = -Math.PI/2;
sea.position.set(0, cityH/2 + 25, 0);
scene.add(sea);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();
</script>
</body>
</html>
"""

st.components.v1.html(html_code, height=800, scrolling=False)

var camera, scene, renderer, material;
var meshes = [];
const base = new THREE.MeshBasicMaterial({color: 0x454B1B, side: THREE.DoubleSide});
init();

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer();
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Add renderer to page
    document.body.appendChild(renderer.domElement);

    // Create camera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(400,0,600);

    // Create scene.
    scene = new THREE.Scene();

    // Create material
    material = new THREE.MeshPhongMaterial();

    // Create cube and add to scene.
    var geometry = new THREE.BoxGeometry(200, 200, 200);

    for(var i = 0; i<5; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(250*i,0,0);
        scene.add(mesh);
        meshes.push(mesh);
    }

    //Becker
    const plane = new THREE.Mesh(geometry0, base);
    plane.position.set(0,-200,0);
    plane.rotateX(1.5708);
    scene.add(plane);

    // Create ambient light and add to scene.
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    // Create directional light and add to scene.
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(2, 1, 1).normalize();
    scene.add(directionalLight);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);

    // Add listener for keyboard
    document.body.addEventListener('keydown', keyPressed, false);

    render();

}

function keyPressed(e){
    switch(e.key) {
        case 'ArrowUp':
            meshes[0].position.y += 10;
            break;
        case 'ArrowDown':
            meshes[0].position.y -= 10;
            break;
        case 'ArrowLeft':
            meshes[0].position.x -= 10;
            break;
        case 'ArrowRight':
            meshes[0].position.x += 10;
            break;
    }
    e.preventDefault();
    render();
}

function render(){
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}
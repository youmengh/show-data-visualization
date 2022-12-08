let camera, scene, renderer;

init();

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer();
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
    // Add renderer to page
    document.body.appendChild(renderer.domElement);

    // Create scene.
    scene = new THREE.Scene();

    // Create camera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    // link data_TV.csv with D3
    d3.csv("data_TV.csv").then(function (data) {
        // Add objects to scene
        for (var i = 0; i < data.length; i++) {
            let pop = data[i].popularity;
            mesh = new THREE.Mesh(new THREE.BoxGeometry(100, pop, 100), new THREE.MeshPhongMaterial({ color: 0xff0000 }));
            mesh.position.set((200 * i) - 300, -450, 0);
            scene.add(mesh);
        }
    });

    // Create lights and add to scene
    var ambientLight = new THREE.AmbientLight(0x404040);                        // ambient light
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);          // directional light 1
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    directionalLight = new THREE.DirectionalLight(0xf7bd52, 0.75);              // directional light 2
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    var hemisphereLight = new THREE.HemisphereLight(0x95ebf0, 0xed9118, 0.5);   // hemisphere light
    scene.add(hemisphereLight);

    // Add base (plane geometry object)
    var geometry = new THREE.PlaneGeometry(5000, 1000, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x808080 });
    var ground = new THREE.Mesh(geometry, material);
    ground.material.side = THREE.DoubleSide;
    ground.rotation.x = 1.5708;
    ground.position.set(2000, -500, 0)
    scene.add(ground);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);

    // Add listener for keyboard
    document.body.addEventListener('keydown', onkeyPressed, false);

    //document.addEventListener for mouse zoom;
    document.addEventListener('wheel', onMouseWheel, false);

    render();
}

function onMouseWheel(e) {
    camera.position.z += e.deltaY * 0.2;
}

function onkeyPressed(e) {
    switch (e.key) {
        case 'ArrowUp':
            camera.rotateX(0.1);
            break;
        case 'ArrowDown':
            camera.rotateX(-0.1);
            break;
        case 'ArrowLeft':
            camera.rotateY(0.1);
            break;
        case 'ArrowRight':
            camera.rotateY(-0.1);
            break;
        case 'w':
            camera.position.z -= 10;
            break;
        case 's':
            camera.position.z += 10;
            break;
        case 'a':
            camera.position.x -= 10;
            break;
        case 'd':
            camera.position.x += 10;
            break;
    }
    e.preventDefault();
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

function render() {
    renderer.render(scene, camera);
}

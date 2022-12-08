let camera, scene, renderer;

init();

function init() {
    alert(`3D Bar Graph of the Top 50 Most Popular Shows in the World. Press Space to Begin`);
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
    camera.position.set(0, 500, 1000);
    scene.add(camera);

    // link data_TV.csv with D3
    d3.csv("data_TV.csv").then(function (data) {
        // Add objects to scene
        for (var i = 0; i < data.length; i++) {
            let pop = data[i].popularity;   // storing popularity value
            mesh = new THREE.Mesh(new THREE.BoxGeometry(100, pop, 100), new THREE.MeshPhongMaterial({ color: 0xff0000 }));
            mesh.position.set((200 * i), pop/2, 0);
            scene.add(mesh);
        }
        // Add base (plane geometry object)
        let baseLength = (data.length * 200);
        var geometry = new THREE.PlaneGeometry((baseLength+200), 1000, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x808080 });
        var ground = new THREE.Mesh(geometry, material);
        ground.material.side = THREE.DoubleSide;
        ground.rotation.x = 1.5708;
        ground.position.set((baseLength/2)-100, 0, 0)
        scene.add(ground);
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

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);

    // Add listener for keyboard
    document.body.addEventListener('keydown', onkeyPressed, false);

    //document.addEventListener for mouse zoom;
    document.addEventListener('wheel', onMouseWheel, false);

    render();
}

function onkeyPressed(e) {
    switch (e.key) {
        case 'ArrowUp':
            camera.position.z -= 100;
            break;
        case 'ArrowDown':
            camera.position.z += 100;
            break;
        case 'ArrowLeft':
            camera.position.x -= 200;
            break;
        case 'ArrowRight':
            camera.position.x += 200;
            break;
        case 'w':
            camera.position.z -= 100;
            break;
        case 's':
            camera.position.z += 100;
            break;
        case 'a':
            camera.position.x -= 100;
            break;
        case 'd':
            camera.position.x += 100;
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

const canvas = document.getElementById("bg-canvas");

if (canvas && window.THREE) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0d1a, 6, 22);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    50
  );
  camera.position.set(0, 0, 10);

  const MOBILE_MAX_PIXEL_RATIO = 1.2;
  const DESKTOP_MAX_PIXEL_RATIO = 1.8;
  const isMobile = () => window.innerWidth < 720;
  const getPixelRatio = () =>
    Math.min(
      window.devicePixelRatio,
      isMobile() ? MOBILE_MAX_PIXEL_RATIO : DESKTOP_MAX_PIXEL_RATIO
    );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(getPixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0a0d1a, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const hemiLight = new THREE.HemisphereLight(0x8fb9ff, 0x0a0d1a, 0.8);
  const keyLight = new THREE.PointLight(0x8dbbff, 1.1, 30);
  keyLight.position.set(6, 6, 8);
  const fillLight = new THREE.PointLight(0x7dd5c6, 0.6, 26);
  fillLight.position.set(-6, -4, 6);
  scene.add(ambientLight, hemiLight, keyLight, fillLight);

  const group = new THREE.Group();
  scene.add(group);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const bubbles = [];
  const bubbleCount = isMobile() ? 8 : 16;
  const palette = [0x8fb9ff, 0x7fd5c6, 0x9b9dff, 0x87b1ff];

  for (let i = 0; i < bubbleCount; i += 1) {
    const radius = 0.4 + Math.random() * 0.9;
    const geometry = new THREE.SphereGeometry(
      radius,
      isMobile() ? 16 : 24,
      isMobile() ? 16 : 24
    );
    const material = new THREE.MeshPhysicalMaterial({
      color: palette[i % palette.length],
      roughness: 0.2,
      metalness: 0.15,
      transmission: 0.9,
      thickness: 1.2,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.75,
      emissive: new THREE.Color(palette[(i + 1) % palette.length]),
      emissiveIntensity: 0.08,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6
    );
    mesh.userData = {
      baseX: mesh.position.x,
      baseY: mesh.position.y,
      floatAmp: 0.4 + Math.random() * 0.5,
      drift: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.4,
      rotX: reduceMotion ? 0 : (Math.random() - 0.5) * 0.004,
      rotY: reduceMotion ? 0 : (Math.random() - 0.5) * 0.004,
    };
    group.add(mesh);
    bubbles.push(mesh);
  }

  const pointer = { x: 0, y: 0 };
  const parallaxCards = document.querySelectorAll(".parallax-card");

  const updatePointer = (x, y) => {
    pointer.x = (x / window.innerWidth - 0.5) * 2;
    pointer.y = (y / window.innerHeight - 0.5) * 2;
  };

  window.addEventListener("mousemove", (event) => {
    updatePointer(event.clientX, event.clientY);
  });

  window.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length > 0) {
        updatePointer(event.touches[0].clientX, event.touches[0].clientY);
      }
    },
    { passive: true }
  );

  window.addEventListener("touchend", () => {
    pointer.x = 0;
    pointer.y = 0;
  });

  const animate = (time) => {
    const t = time * 0.001;

    bubbles.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotX;
      mesh.rotation.y += mesh.userData.rotY;
      mesh.position.y =
        mesh.userData.baseY +
        Math.sin(t * mesh.userData.speed + mesh.userData.offset) *
          mesh.userData.floatAmp;
      mesh.position.x =
        mesh.userData.baseX +
        Math.cos(t * mesh.userData.speed + mesh.userData.offset) *
          mesh.userData.drift;
    });

    if (!reduceMotion) {
      camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.7 - camera.position.y) * 0.04;
    }
    camera.lookAt(0, 0, 0);

    group.rotation.z = Math.sin(t * 0.2) * 0.06;

    parallaxCards.forEach((card) => {
      const depth = Number(card.dataset.parallax || 12);
      card.style.setProperty("--parallax-x", `${pointer.x * depth}px`);
      card.style.setProperty("--parallax-y", `${pointer.y * depth}px`);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", handleResize);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (!header) {
    return;
  }
  header.classList.toggle("scrolled", window.scrollY > 12);
});

const canvas = document.getElementById("bg-canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, window.innerWidth < 720 ? 1.2 : 1.8)
);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0a0f1f, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
keyLight.position.set(5, 8, 6);
scene.add(ambientLight, keyLight);

const group = new THREE.Group();
scene.add(group);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const shapes = [];
const shapeCount = window.innerWidth < 720 ? 10 : 18;
const geometries = [
  new THREE.IcosahedronGeometry(0.6, 0),
  new THREE.SphereGeometry(0.5, 24, 24),
  new THREE.OctahedronGeometry(0.55, 0),
];
const palette = [0x6fa0ff, 0x8ac3ff, 0x7dd5c6, 0x8296ff];

for (let i = 0; i < shapeCount; i += 1) {
  const geometry = geometries[i % geometries.length];
  const material = new THREE.MeshStandardMaterial({
    color: palette[i % palette.length],
    roughness: 0.35,
    metalness: 0.6,
    transparent: true,
    opacity: 0.75,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 4
  );
  const scale = 0.6 + Math.random() * 0.9;
  mesh.scale.set(scale, scale, scale);
  mesh.userData = {
    baseY: mesh.position.y,
    floatAmp: 0.4 + Math.random() * 0.5,
    offset: Math.random() * Math.PI * 2,
    rotX: reduceMotion ? 0 : (Math.random() - 0.5) * 0.004,
    rotY: reduceMotion ? 0 : (Math.random() - 0.5) * 0.004,
  };
  group.add(mesh);
  shapes.push(mesh);
}

const pointer = { x: 0, y: 0 };

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

const heroCard = document.querySelector(".hero-card");

const animate = (time) => {
  const t = time * 0.001;

  shapes.forEach((mesh) => {
    mesh.rotation.x += mesh.userData.rotX;
    mesh.rotation.y += mesh.userData.rotY;
    mesh.position.y =
      mesh.userData.baseY + Math.sin(t + mesh.userData.offset) * mesh.userData.floatAmp;
  });

  if (!reduceMotion) {
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.8 - camera.position.y) * 0.04;
  }
  camera.lookAt(0, 0, 0);

  group.rotation.z = Math.sin(t * 0.2) * 0.08;

  if (heroCard) {
    heroCard.style.setProperty("--parallax-x", `${pointer.x * 10}px`);
    heroCard.style.setProperty("--parallax-y", `${pointer.y * 10}px`);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, window.innerWidth < 720 ? 1.1 : 1.6)
  );
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", handleResize);

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

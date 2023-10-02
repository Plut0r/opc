import * as THREE from "three";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

const buttons = [
  {
    id: 1,
    text: "Like",
    explanation:
      "Allows users to express their appreciation for a post or content",
  },
  {
    id: 2,
    text: "Share",
    explanation:
      "Enables users to share the content with others through various platforms or social media",
  },
  {
    id: 3,
    text: "Comment",
    explanation:
      "Allows users to leave comments or feedback on a post or content",
  },
  {
    id: 4,
    text: "Subscribe",
    explanation:
      "Enables users to subscribe to receive updates or notifications from a particular channel or content creator",
  },
  {
    id: 5,
    text: "Buy Now",
    explanation:
      " Directs users to a purchase page where they can buy a product or service",
  },
  {
    id: 6,
    text: "Settings",
    explanation:
      " Provides access to customize and adjust various options and preferences within the app or website.",
  },
];

function Avatar({ target }: { target: any }) {
  const [walkDirection, setWalkDirection] = useState(new THREE.Vector3());
  const gltf = useLoader(GLTFLoader, "/scene.gltf");

  useFrame(() => {
    gltf.scene.rotation.y += 0.01;
  });

  useFrame((state, delta) => {
    const camera = state.camera;

    if (target) {
      // Convert target to world coordinates
      const targetWorld = new THREE.Vector3();
      targetWorld.set(
        (target.x / window.innerWidth) * 2 - 1,
        -(target.y / window.innerHeight) * 2 + 1,
        0
      );
      targetWorld.unproject(camera);

      // On new target, reset direction
      setWalkDirection(targetWorld.clone().normalize());
      const walkSpeed = 0.5;

      const avatarPos = gltf.scene.position.clone();

      const moveDistance = walkDirection
        .clone()
        .multiplyScalar(walkSpeed * delta);

      // Apply movement
      gltf.scene.position.add(moveDistance);

      // Now update walkDirection
      walkDirection.subVectors(targetWorld, avatarPos).normalize();
    }
  });

  return <primitive object={gltf.scene} scale={1.5} position={[0, -3, 0]} />;
}

function App() {
  const [target, setTarget] = useState<any>(null);
  console.log(target);

  const handleClick = (event: any) => {
    console.log("clicked");

    const pos = {
      x: event.clientX,
      y: event.clientY,
    };

    setTarget(pos);
  };

  return (
    <div className="mt-5 ml-8">
      <div className="flex items-center gap-8 z-50 relative">
        {buttons.map((button) => (
          <button
            key={button.id}
            id={`${button.id}`}
            className="bg-purple-500 text-white rounded-lg px-2 py-1"
            onClick={(e) => handleClick(e)}
          >
            {button.text}
          </button>
        ))}
      </div>
      <Canvas
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
      >
        <Suspense fallback={null}>
          <pointLight position={[0, 0, 0]} intensity={2} />
          <Avatar target={target} />
          <OrbitControls />
        </Suspense>
        {/* <Avatar /> */}
      </Canvas>
    </div>
  );
}

export default App;

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

function Avatar() {
  const gltf = useLoader(GLTFLoader, "/scene.gltf");

  useFrame(() => {
    gltf.scene.rotation.y += 0.01;
  });

  return <primitive object={gltf.scene} scale={1.5} position={[0, -3, 0]} />;
}

function App() {
  return (
    <div className="mt-5 ml-8">
      <div className="flex items-center gap-8">
        {buttons.map((button) => (
          <button
            key={button.id}
            id={`${button.id}`}
            className="bg-purple-500 text-white rounded-lg px-2 py-1"
          >
            {button.text}
          </button>
        ))}
      </div>

      <Canvas
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
        }}
      >
        <Suspense fallback={null}>
          <pointLight position={[0, 0, 0]} intensity={2} />
          <Avatar />
          <OrbitControls />
        </Suspense>
        <Avatar />
      </Canvas>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Avatar() {
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/plut0r.glb", (gltf) => {
      setAvatar(gltf.scene.children[0]);
    });
  }, []);

  useFrame(() => {
    if (avatarRef.current) {
      avatarRef.current.position.x += 0.01;  
    }
  });

  if (!avatar) {
    return null;  
  }

  return (
    <mesh ref={avatarRef} {...avatar.matrixAutoUpdate} >
      <primitive object={avatar} />  
    </mesh>
  );
}

export default Avatar;
import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Avatar from "./Avatar";

interface AssistantProps {
  buttons: { id: number; text: string; explanation: string }[];
}

const Assistant: React.FC<AssistantProps> = ({ buttons }) => {
  const [position, setPosition] = useState([0, 0]);
  const [explanation, setExplanation] = useState<string | null>("");

  useEffect(() => {
    function updatePosition(event: Event) {
      setPosition([event.clientX, event.clientY]);
    }

    buttons.forEach((button) => {
      const element = document.getElementById(`${button.id}`);
      if (element) {
        element.addEventListener("pointerenter", updatePosition);
        // setExplanation(button.getAttribute("explanation"));
      }
    });

    return () => {
      buttons.forEach((button) => {
        const element = document.querySelector(`#${button.id}`);
        if (element) {
          element.removeEventListener("pointerenter", updatePosition);
          setExplanation("");
        }
      });
    };
  }, [buttons]);

  useEffect(() => {
    function updatePosition() {
      setPosition([
        position[0] + 0.1 * (position[0] - position[1]),
        position[1],
      ]);
    }

    // Update the position of the assistant every 10 milliseconds
    const interval = setInterval(updatePosition, 10);

    return () => {
      clearInterval(interval);
    };
  }, [position]);

  return (
    <Canvas>
      {/* Render the assistant video */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar />
      </div>

      {/* Render the explanation of the button */}
      <div
        style={{
          position: "absolute",
          left: position[0],
          top: position[1],
          color: "white",
          fontSize: "12px",
        }}
      >
        {explanation}
      </div>
    </Canvas>
  );
};

export default Assistant;

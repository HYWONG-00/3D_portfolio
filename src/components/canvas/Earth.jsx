import { Suspense, useEffect, useState } from "react";
//just empty canvas for us to draw
import {Canvas} from "@react-three/fiber";
//tool to draw on canvas
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  )
}


const EarthCanvas = () => {
  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* canvas loader when loading the canvas */}
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
        autoRotate
        enableZoom={false} 
        // To avoid rotate all the way around up and down
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        />
        {/* render the computers components here */}
        <Earth/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}


export default EarthCanvas;
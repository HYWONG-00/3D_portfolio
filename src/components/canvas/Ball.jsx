import React, {Suspense} from 'react'
import { Canvas } from '@react-three/fiber';
import {Decal, Float, OrbitControls, Preload, useTexture} from "@react-three/drei";

import CanvasLoader from '../Loader';

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25}/>
      <directionalLight position={[0, 0, 0.05]}/>
      <mesh
        castShadow
        receiveShadow
        scale={2.75}
      >
        {/* The white ball */}
        <icosahedronGeometry args={[1,1]}></icosahedronGeometry>
        {/* Grey shadow on ball */}
        <meshStandardMaterial 
        color="#fff8eb"
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading/>
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
}

const BallCanvas = ({icon}) => {
  return (
    <Canvas
    frameloop='demand'
    dpr={[1, 2]} //let the ball move by itself
    gl={{ preserveDrawingBuffer: true }}
    >
      {/* canvas loader when loading the canvas */}
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
        enableZoom={false}
        />
        {/* render the computers components here */}
        <Ball imgUrl={icon}/>
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
export default BallCanvas;
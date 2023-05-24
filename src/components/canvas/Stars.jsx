import { Suspense, useRef, useState } from "react";
//just empty canvas for us to draw
import {Canvas, useFrame} from "@react-three/fiber";
//tool to draw on canvas
import { Points, PointMaterial, Preload, Point } from "@react-three/drei";

import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  
  //rotate the background stars
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const StarsCanvas = () => {
  return (
    // z-[-1] to appear behinds all the element
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
      camera={{ position: [0, 0, 1]}}
    >
      {/* canvas loader when loading the canvas */}
      <Suspense fallback={null}>
        {/* render the stars components here */}
        <Stars/>
      </Suspense>
      <Preload all />
    </Canvas>
    </div>
  )
}

export default StarsCanvas;
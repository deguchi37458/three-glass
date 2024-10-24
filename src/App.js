import { useRef, useEffect } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import montsettat from "./assets/fonts/montserrat_bold.json"

import { GUI } from 'dat.gui';

extend({TextGeometry})

const Torus = () => {
  const torusRef = useRef(null);

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01; // x軸回転
      torusRef.current.rotation.y += 0.01; // y軸回転
    }
  });

  const params = {
    color: 0xffffff,
    transmission: 1.5,
    opacity: 1,
    metalness: 0,
    roughness: 0,
    ior: 1.4,
    thickness: 0.7,
    specularIntensity: 1,
    specularColor: 0xffffff,
    envMapIntensity: 1,
    lightIntensity: 1,
    exposure: 1,
  };

  // GUI の設定
  useEffect(() => {
    const gui = new GUI();

    // 各パラメータのコントロールを追加
    gui.addColor(params, 'color').onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.color.set(params.color);
      }
    });

    gui.add(params, 'transmission', 0, 2).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.transmission = params.transmission;
      }
    });

    gui.add(params, 'opacity', 0, 1).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.opacity = params.opacity;
      }
    });

    gui.add(params, 'metalness', 0, 1).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.metalness = params.metalness;
      }
    });

    gui.add(params, 'roughness', 0, 1).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.roughness = params.roughness;
      }
    });

    gui.add(params, 'ior', 1, 2).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.ior = params.ior;
      }
    });

    gui.add(params, 'thickness', 0, 10).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.thickness = params.thickness;
      }
    });

    gui.add(params, 'specularIntensity', 0, 1).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.specularIntensity = params.specularIntensity;
      }
    });

    gui.addColor(params, 'specularColor').onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.specularColor.set(params.specularColor);
      }
    });

    gui.add(params, 'envMapIntensity', 0, 1).onChange(() => {
      if (torusRef.current) {
        torusRef.current.material.envMapIntensity = params.envMapIntensity;
      }
    });

    return () => {
      gui.destroy(); // クリーンアップ
    };
  });

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <directionalLight color={0xffffff} intensity={4} position={[0, 2, 3]} />
      <mesh ref={torusRef} position={[0, 0, 1]}>
        <torusGeometry />
        <meshPhysicalMaterial
          color={params.color}
          transmission={params.transmission}
          opacity={params.opacity}
          metalness={params.metalness}
          roughness={params.roughness}
          ior={params.ior}
          thickness={params.thickness}
          specularIntensity={params.specularIntensity}
          specularColor={params.specularColor}
          envMapIntensity={params.envMapIntensity}
          des={params.envMapIntensity}
          transparent={true}
        />
      </mesh>
    </>
  );
};

const TextMesh = () => {
  const font = new FontLoader().parse(montsettat);

  const textOptions = {
    font,
    size: 1,
    depth: 0,
  };


  return (
    <mesh>
      <textGeometry
        args={['THREE.JS', textOptions]}
        attach="geometry"
        onUpdate={(self) => self.center()}
      />
      <meshBasicMaterial color={"white"}/>
    </mesh>
  )
};

function ThreeScene() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas
      style={{ background: 'black' }}
    >
      <TextMesh /> 
      <Torus /> 
    </Canvas>
    </div>
  );
}

export default ThreeScene;

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, MeshDistortMaterial, Text } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { motion } from 'framer-motion';

// Basic sphere model with motion
const FootballModel = ({ position, color, playerName, scale = 1 }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.3} 
          radius={1} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {playerName}
      </Text>
    </group>
  );
};

// Cricket ball model with motion
const CricketModel = ({ position, color, playerName, scale = 1 }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() + position[0]) * 0.1 + position[1];
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh scale={[scale, scale, scale]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color={color} 
          speed={3} 
          distort={0.2} 
          radius={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 1.03]} scale={[0.3, 0.3, 0.01]}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {playerName}
      </Text>
    </group>
  );
};

type PlayerType = {
  id: number;
  name: string;
  position: string;
  team: string;
  sport: 'football' | 'cricket';
  // other properties...
};

interface PlayerComparison3DProps {
  players: PlayerType[];
  sport: 'football' | 'cricket';
  visible: boolean;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

const PlayerComparison3D: React.FC<PlayerComparison3DProps> = ({ players, sport, visible }) => {
  if (!visible) return null;

  const getPositions = (count: number) => {
    switch (count) {
      case 1: return [[-0, 0, 0]];
      case 2: return [[-2, 0, 0], [2, 0, 0]];
      case 3: return [[-4, 0, 0], [0, 0, 0], [4, 0, 0]];
      default: return [[-0, 0, 0]];
    }
  };

  const positions = getPositions(players.length);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="w-full h-64"
    >
      <Canvas camera={{ position: [0, 1, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        
        {players.map((player, index) => {
          if (sport === 'football') {
            return (
              <FootballModel 
                key={player.id}
                playerName={player.name}
                position={positions[index]} 
                color={COLORS[index % COLORS.length]} 
                scale={1.5}
              />
            );
          } else {
            return (
              <CricketModel 
                key={player.id}
                playerName={player.name}
                position={positions[index]} 
                color={COLORS[index % COLORS.length]} 
                scale={1.2}
              />
            );
          }
        })}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </motion.div>
  );
};

export default PlayerComparison3D;

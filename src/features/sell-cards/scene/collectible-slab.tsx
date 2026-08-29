import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  DoubleSide,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  type Object3D,
  SRGBColorSpace,
  type Texture,
} from "three";
import type { ChapterTextures } from "../sell-cards-data";

interface CollectibleSlabProps {
  /** Disable continuous idle oscillation (e.g. reduced motion) */
  disableFloat?: boolean;
  /** Opacity for cross-transition */
  opacity?: number;
  /** Additional position offset */
  position?: [number, number, number];
  rotationX?: number;
  /** Normalized rotation progress [0..1] — 0 = front, 0.5 = edge, 1 = full 360 */
  rotationY?: number;
  rotationZ?: number;
  /** Scale multiplier */
  scale?: number;
  textures: ChapterTextures;
  url: string;
  visible?: boolean;
}

function isMesh(obj: Object3D): obj is Mesh {
  return (obj as Mesh).isMesh === true;
}

interface TunedMaterial {
  baseOpacity: number;
  material: MeshStandardMaterial;
}

function tuneMeshMaterial(
  name: string,
  baseMat: MeshStandardMaterial,
  texMap: Record<string, Texture>
): TunedMaterial {
  const mat = baseMat.clone();

  if (name === "Slab_Front_Shell" || name === "Slab_Back_Shell") {
    mat.transparent = true;
    mat.opacity = 0.08;
    mat.roughness = 0.05;
    mat.metalness = 0.1;
    mat.depthWrite = false;
    return { baseOpacity: 0.08, material: mat };
  }

  if (
    name.includes("Rim") ||
    name.includes("Lip") ||
    name.includes("Divider") ||
    name.includes("Weld") ||
    name.includes("Retention") ||
    name.includes("Seam")
  ) {
    mat.transparent = true;
    mat.opacity = 0.35;
    mat.roughness = 0.2;
    mat.metalness = 0.05;
    mat.depthWrite = false;
    return { baseOpacity: 0.35, material: mat };
  }

  if (name === "Card_Insert" || name === "Label_Insert") {
    mat.transparent = true;
    mat.opacity = 0.0;
    return { baseOpacity: 0.0, material: mat };
  }

  const texture = texMap[name];
  if (texture) {
    mat.map = texture;
    mat.transparent = true;
    mat.opacity = 1.0;
    mat.roughness = 0.3;
    mat.metalness = 0.0;
    mat.side = DoubleSide;
    mat.depthWrite = true;
    mat.needsUpdate = true;
    return { baseOpacity: 1.0, material: mat };
  }

  mat.transparent = true;
  mat.opacity = 0.5;
  return { baseOpacity: 0.5, material: mat };
}

export function CollectibleSlab({
  url,
  textures,
  rotationY = 0,
  rotationX = 0,
  rotationZ = 0,
  position = [0, 0, 0],
  scale = 0.015,
  opacity = 1,
  visible = true,
  disableFloat = false,
}: CollectibleSlabProps) {
  const { scene: originalScene } = useGLTF(url);
  const groupRef = useRef<Group>(null);

  const [frontCardTex, backCardTex, frontLabelTex, backLabelTex] = useTexture([
    textures.frontCard,
    textures.backCard,
    textures.frontLabel,
    textures.backLabel,
  ]);

  useMemo(() => {
    for (const tex of [
      frontCardTex,
      backCardTex,
      frontLabelTex,
      backLabelTex,
    ]) {
      tex.colorSpace = SRGBColorSpace;
      tex.flipY = false;
      tex.needsUpdate = true;
    }
  }, [frontCardTex, backCardTex, frontLabelTex, backLabelTex]);

  const texMap: Record<string, Texture> = useMemo(
    () => ({
      Card_Texture_Back: backCardTex,
      Card_Texture_Front: frontCardTex,
      PSA_Label_Texture_Back: backLabelTex,
      PSA_Label_Texture_Front: frontLabelTex,
    }),
    [frontCardTex, backCardTex, frontLabelTex, backLabelTex]
  );

  const { scene, materialMap } = useMemo(() => {
    const cloned = originalScene.clone(true);
    const matMap = new Map<string, TunedMaterial>();

    cloned.traverse((child) => {
      if (isMesh(child) && child.material) {
        const { name, uuid } = child;
        const tuned = tuneMeshMaterial(
          name,
          child.material as MeshStandardMaterial,
          texMap
        );
        child.material = tuned.material;
        child.castShadow = true;
        child.receiveShadow = true;
        matMap.set(uuid, tuned);
      }
    });

    return { materialMap: matMap, scene: cloned };
  }, [originalScene, texMap]);

  useEffect(() => {
    for (const { material, baseOpacity } of materialMap.values()) {
      material.opacity = baseOpacity * opacity;
    }
  }, [materialMap, opacity]);

  // Continuous organic hovering & breathing physics
  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.scale.set(scale, scale, scale);

    if (disableFloat) {
      groupRef.current.position.set(position[0], position[1], position[2]);
      groupRef.current.rotation.set(
        rotationX,
        rotationY * Math.PI * 2,
        rotationZ
      );
      return;
    }

    const t = state.clock.getElapsedTime();
    // Multi-frequency smooth organic motion (floating in air)
    const floatY = Math.sin(t * 1.5) * 0.022 + Math.cos(t * 0.7) * 0.008;
    const floatX = Math.cos(t * 1.1) * 0.012;
    const pitch = Math.sin(t * 1.3) * 0.024;
    const roll = Math.cos(t * 1.5) * 0.02;
    const yaw = Math.sin(t * 0.85) * 0.035;

    groupRef.current.position.set(
      position[0] + floatX,
      position[1] + floatY,
      position[2]
    );
    groupRef.current.rotation.set(
      rotationX + pitch,
      rotationY * Math.PI * 2 + yaw,
      rotationZ + roll
    );
  });

  if (!visible) {
    return null;
  }

  return (
    <group position={position} ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

// "Reconciliation lines" — the Why-now WebGL scene.
//
// A quiet column of record-lines, like an instrument readout. Each line is one
// record shared by two systems: level = they agree. A verification light sweeps
// down the column (Darpan checking). Periodically one line tilts and its node
// lifts — silent drift, glowing amber — holds a beat, then snaps back level with
// a green pulse: caught and reconciled. No labels in 3D; the meaning is the
// motion (flat = agree, tilt = drift, snap = caught).
//
// Heavy three/drei imports live ONLY here. Dynamically imported client-side
// (see StackScene.tsx), so SSR never loads WebGL.
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { PresentationControls } from '@react-three/drei'
import * as THREE from 'three'

const PAPER = '#f4f2ec'
const AGREE = '#2f6b4f'
const DRIFT = '#b0571b'
const INK = '#1c1b18'

const C_CALM = new THREE.Color('#9a968a') // checked, fine — quiet neutral
const C_DRIFT = new THREE.Color(DRIFT)
const C_AGREE = new THREE.Color(AGREE)

const ROWS = 6
const HALF_W = 2.3 // line runs from -HALF_W to +HALF_W
const TOP = 1.9
const GAP = (TOP * 2) / (ROWS - 1)
const DRIFT_RISE = 0.42
const CYCLE = 4.6 // one drift→catch→reconcile beat; the active row rotates
const SCAN_DUR = 3.9

const rowY = (i: number) => TOP - i * GAP

function Scene() {
  const group = useRef<THREE.Group>(null)
  const conn = useRef<Array<THREE.Mesh | null>>([])
  const node = useRef<Array<THREE.Mesh | null>>([])
  const connMat = useRef<Array<THREE.MeshStandardMaterial | null>>([])
  const nodeMat = useRef<Array<THREE.MeshStandardMaterial | null>>([])
  const offset = useRef<number[]>(Array.from({ length: ROWS }, () => 0))
  const scan = useRef<THREE.Mesh>(null)
  const scanMat = useRef<THREE.MeshBasicMaterial>(null)
  const layerMat = useRef<THREE.MeshStandardMaterial>(null)

  const rows = useMemo(() => Array.from({ length: ROWS }, (_, i) => rowY(i)), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.12) * 0.06
      group.current.rotation.x = Math.sin(t * 0.09) * 0.02
    }

    // which record is drifting this beat, and where we are within the beat
    const driftRow = Math.floor(t / CYCLE) % ROWS
    const cyc = t % CYCLE
    const drifting = cyc > 1.4 && cyc < 2.9
    const resolving = cyc >= 2.9 && cyc < 3.5

    // verification light sweeps top→bottom = the continuous check
    const sp = (t % SCAN_DUR) / SCAN_DUR
    const scanY = THREE.MathUtils.lerp(TOP + 0.7, -TOP - 0.7, sp)
    if (scan.current && scanMat.current) {
      scan.current.position.y = scanY
      scanMat.current.opacity = 0.34 * Math.sin(sp * Math.PI)
    }
    if (layerMat.current) {
      layerMat.current.emissiveIntensity = 0.3 + Math.sin(t * 0.8) * 0.05
    }

    rows.forEach((baseY, i) => {
      const active = i === driftRow
      const want = active && drifting ? DRIFT_RISE : 0
      const off = THREE.MathUtils.lerp(offset.current[i], want, 0.12)
      offset.current[i] = off

      const c = conn.current[i]
      if (c) {
        c.position.y = baseY + off / 2
        c.rotation.z = Math.atan2(off, HALF_W * 2)
      }
      const n = node.current[i]
      if (n) {
        n.position.y = baseY + off
        const s = 1 + (active && drifting ? 0.6 : 0) * (off / DRIFT_RISE)
        n.scale.setScalar(THREE.MathUtils.lerp(n.scale.x, s, 0.15))
      }

      // the light passing this row gives it a faint live brighten
      const lit = 1 - Math.min(1, Math.abs(scanY - baseY) / 0.5)
      const target =
        active && drifting ? C_DRIFT : active && resolving ? C_AGREE : C_CALM
      const emi =
        (active && drifting ? 0.6 : active && resolving ? 0.7 : 0.06) + lit * 0.25

      const cm = connMat.current[i]
      if (cm) {
        cm.color.lerp(target, 0.14)
        cm.emissive.lerp(target, 0.14)
        cm.emissiveIntensity = THREE.MathUtils.lerp(cm.emissiveIntensity, emi, 0.14)
      }
      const nm = nodeMat.current[i]
      if (nm) {
        nm.color.lerp(target, 0.14)
        nm.emissive.lerp(target, 0.14)
        nm.emissiveIntensity = THREE.MathUtils.lerp(
          nm.emissiveIntensity,
          emi + 0.3,
          0.14,
        )
      }
    })
  })

  return (
    <group ref={group}>
      {/* the verification layer: a faint bar the scan descends from */}
      <mesh position={[0, TOP + 0.95, -0.15]}>
        <boxGeometry args={[HALF_W * 2 + 0.6, 0.08, 0.2]} />
        <meshStandardMaterial
          ref={layerMat}
          color={AGREE}
          emissive={AGREE}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* the sweeping check light */}
      <mesh ref={scan} position={[0, 0, 0.1]}>
        <boxGeometry args={[HALF_W * 2 + 0.8, 0.05, 0.05]} />
        <meshBasicMaterial
          ref={scanMat}
          color={AGREE}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* the record lines */}
      {rows.map((baseY, i) => (
        <group key={i}>
          {/* fixed left anchor (system A) */}
          <mesh position={[-HALF_W, baseY, 0]}>
            <sphereGeometry args={[0.05, 14, 14]} />
            <meshStandardMaterial color="#9a968a" roughness={0.7} />
          </mesh>
          {/* the line (level = agree, tilt = drift) */}
          <mesh
            ref={(m) => {
              conn.current[i] = m
            }}
            position={[0, baseY, 0]}
          >
            <boxGeometry args={[HALF_W * 2, 0.03, 0.03]} />
            <meshStandardMaterial
              ref={(m) => {
                connMat.current[i] = m
              }}
              color={C_CALM}
              emissive={INK}
              emissiveIntensity={0.06}
              toneMapped={false}
            />
          </mesh>
          {/* moving right node (system B's reading) */}
          <mesh
            ref={(m) => {
              node.current[i] = m
            }}
            position={[HALF_W, baseY, 0]}
          >
            <sphereGeometry args={[0.075, 18, 18]} />
            <meshStandardMaterial
              ref={(m) => {
                nodeMat.current[i] = m
              }}
              color={C_CALM}
              emissive={C_CALM}
              emissiveIntensity={0.35}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function StackCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 9.6], fov: 30 }}
    >
      <fog attach="fog" args={[PAPER, 10, 22]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 6]} intensity={0.9} />
      <PresentationControls global polar={[-0.18, 0.18]} azimuth={[-0.4, 0.4]} snap>
        <Scene />
      </PresentationControls>
    </Canvas>
  )
}

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stage, Center } from "@react-three/drei"
import HostelModel from "./HostelModel"

export default function HostelScene() {
    return (
        <Canvas camera={{ position: [0, 0, 150], fov: 40 }}>
            <Suspense fallback={null}>
                <Stage intensity={0.5} environment="city" adjustCamera={1.5}>
                    <Center>
                        <HostelModel />
                    </Center>
                </Stage>
            </Suspense>
            <OrbitControls makeDefault />
        </Canvas>
    )
}

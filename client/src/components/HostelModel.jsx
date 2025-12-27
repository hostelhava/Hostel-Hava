import { useGLTF } from "@react-three/drei"

export default function HostelModel(props) {
    const { scene } = useGLTF("/models/hostel.glb")
    return <primitive object={scene} {...props} />
}

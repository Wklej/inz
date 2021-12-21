import { Modal } from "react-bootstrap";
import Karuzela from "./Karuzela";

const Explaination = ({layerType}) => {

    // Function to map whole dir content to @images object
    const getImages = (dirVariable) => {
        const cache = {};

        const r = dirVariable
        r.keys().forEach((key) => (cache[key] = r(key)))
    
        const images = Object.entries(cache).map(module => module[1].default);
        
        return images
    }

    // Function to choose path based on @layerType
    const getDir = () => {
        switch (layerType) {
            case "conv":
                return require.context("../../Images/conv", false, /\.(png|gif)$/)
            case "pool":
                return require.context("../../Images/pool", false, /\.(png|gif)$/)
            case "flat":
                return require.context("../../Images/flat", false, /\.(png|gif|jpg)$/)
            case "filters":
                return require.context("../../Images/filters", false, /\.(png|gif|jpg)$/)
            case "kernel":
                return require.context("../../Images/kernel", false, /\.(png|gif|jpg)$/)
            case "stride":
                return require.context("../../Images/stride", false, /\.(png|gif|jpg)$/)
            case "flat":
                return require.context("../../Images/flat", false, /\.(png|gif|jpg)$/)
            default:
                break;
        }
    }

    //TODO: Delete those if's and put this in switch above
    if (layerType === "fully") {
        return (
            <Modal.Body>Fully explaination body content</Modal.Body>
        );
    }
    else if (layerType === "loss") {
        return (
            <Modal.Body>Loss param explaination body content</Modal.Body>
        );
    }
    else if (layerType === "activation") {
        return (
            <Modal.Body>Activation param explaination body content</Modal.Body>
        );
    }
    else if (layerType === "size") {
        return (
            <Modal.Body>Pool size param explaination body content</Modal.Body>
        );
    }
    else if (layerType === "dropout") {
        return (
            <Modal.Body>Dropout explaination body content</Modal.Body>
        );
    }

    //Valid way of this component return
    else {
        return (
            <Modal.Body>
                <Karuzela content={getImages(getDir())} />
            </Modal.Body>
        );
    }
}

export default Explaination;
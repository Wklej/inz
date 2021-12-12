import Tabs from 'react-bootstrap/Tabs'
import { Modal, Tab } from "react-bootstrap";
import Explaination from './Components/Explaination'

const ExplainModal = ({show, handleClose, type}) => {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Tabs>
                    <Tab eventKey="explaination" title="Explaination">
                        <Explaination layerType={type} />
                    </Tab>
                </Tabs>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ExplainModal;
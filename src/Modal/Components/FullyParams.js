import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { layersContext } from "../../layersContext";
import { paramContext } from "../../paramContext";
import SelectBundle from "./SelectBundle";

const FullyParams = ({id, layerType}) => {

    const getValues = useContext(paramContext)
    const layerNum = useContext(layersContext)

    const [values, setValues] = useState(getValues(id, layerType))

    const optionValuesFilters = () => {
        const inputValue = getValues(null, 'input').model

        return inputValue === '1' ? ['2'] : ['25']
    }
    
    const optionValuesActiv = () => {
        const inputValue = getValues(null, 'input').model

        return inputValue === '1' ? ['sigmoid'] : ['softmax']
    }
    
    const getBody = () => {
        if (layerNum === (id + 1)) {
            return(
                <div>
                    <SelectBundle label='filters' id={id} optionValues={optionValuesFilters()} />
                    <SelectBundle label='activation' id={id} optionValues={optionValuesActiv()} />
                </div>
            )
        }
        else {
            return(
                <div>
                    {console.log(values)}
                    <SelectBundle label='filters' id={id} optionValues={[values.filters]} />
                    <SelectBundle label='activation' id={id} optionValues={[values.activation]} />
                </div>
            )
        }   
    }

    return ( 
        <Modal.Body>
            {getBody()}
        </Modal.Body>
     );
}
 
export default FullyParams;
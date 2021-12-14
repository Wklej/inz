import 'bootstrap/dist/css/bootstrap.css'
import { useState } from "react";

import TopBar from './TopBar';
import Workflow from './Workflow';

import { testContext } from './testContext';
import { paramContext } from './paramContext'; 
import Dropout from './Modal/Components/Dropout';

function App() {

    // Utils for tracking slider value
    const [numLayers, setNumLayers] = useState(2)
    const handleSliderChange = (e) => {        
        setNumLayers(e.valueOf())
    }

    //global values to pass to context and use in grandchild components
    const [allVals, setAllVals] = useState({
        layers: [
            {   conv: {filters: '1', kernel: '1', activation: '1', stride: '1'},
                pool: {size: '1', stride: '1'},
                fully: {filters: '1', activation: '1'},
                drop: 3
            },
            {   conv: {filters: '1', kernel: '1', activation: '1', stride: '1'},
                pool: {size: '1', stride: '1'},
                fully: {filters: '1', activation: '1'},
                drop: 3
            },
            {   conv: {filters: '1', kernel: '1', activation: '1', stride: '1'},
                pool: {size: '1', stride: '1'},
                fully: {filters: '1', activation: '1'},
                drop: 3
            },
            {   conv: {filters: '1', kernel: '1', activation: '1', stride: '1'},
                pool: {size: '1', stride: '1'},
                fully: {filters: '1', activation: '1'},
                drop: 3
            },
            {   conv: {filters: '1', kernel: '1', activation: '1', stride: '1'},
                pool: {size: '1', stride: '1'},
                fully: {filters: '1', activation: '1'},
                drop: 3
            },
            {   conv: {filters: '1', kernel: '1', activation: '1', stride: '1'},
                pool: {size: '1', stride: '1'},
                fully: {filters: '1', activation: '1'},
                drop: 3
            },
        ],
        output: {loss: '1', optimizer: '1'}
    })

    const handleLayerChange = (e, id, layerName) => {
        const temp = allVals
        
        if (layerName !== 'output')
            temp.layers[id][layerName] = {...temp.layers[id][layerName], [e.target.name]: e.target.value}
        else
            temp.output = {...temp.output, [e.target.name]: e.target.value}
        
        setAllVals(temp)
    }

    const getValues = (id, layerName) => {
        if (layerName !== 'output') 
            return allVals.layers[id][layerName]

        else return allVals.output
    }

    return (
        <div>
            <testContext.Provider value={handleLayerChange}>
                <paramContext.Provider value={getValues}>
                    <TopBar numLayers={numLayers} handleSliderChange={handleSliderChange} />      
                    <Workflow numLayers={numLayers} />
                </paramContext.Provider>
            </testContext.Provider>
        </div>

    );
}

export default App;

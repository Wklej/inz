import 'bootstrap/dist/css/bootstrap.css'
import { useState } from "react";

import TopBar from './TopBar';
import Workflow from './Workflow';

import { testContext } from './testContext';
import { paramContext } from './paramContext'; 
import { epochsContext } from './epochsContext';

function App() {

    //Epochs status & handlers
    const epochs = [1, 5, 15, 20, 30]
    const [epoch, setEpoch] = useState(0)

    const handlePlus = () => {
        const x = epoch + 1
        if (x < epochs.length) {
            setEpoch(x)
        }
    }

    const handleMinus = () => {
        const x = epoch - 1
        if (x >= 0) {
            setEpoch(x)
        }
    }

    
    const handleModelChange = (e) => {
        const temp = allVals
        
        temp.input.model = document.getElementById(e.target.id).id
        
        setAllVals(temp)
    }
    
    const handleImageChange = (e) => {
        const temp = allVals
        
        temp.input.image = document.getElementById(e.target.id).id
        
        setAllVals(temp)
    }

    const [lossFunc, setLossFunc] = useState('binary_crossentropy')

    //global values to pass to context and use in grandchild components
    const [allVals, setAllVals] = useState({
        layers: [
            {   conv: {filters: '16', kernel_size: '(2, 2)', activation: 'relu'},
                pool: {pool_size: '(2, 2)', stride: '2'},
                drop: 10
            },
            {   conv: {filters: '32', kernel_size: '(2, 2)', activation: 'relu'},
                pool: {pool_size: '(2, 2)', stride: '2'},
                drop: 10
            },
            {   conv: {filters: null, kernel_size: null, activation: null},
                pool: {pool_size: null, stride: null},
                drop: null
            },
            {   conv: {filters: null, kernel_size: null, activation: null},
                pool: {pool_size: null, stride: null},
                drop: null
            },
        ],
        output: {loss: lossFunc, optimizer: 'Adam'},
        input: {model: '1', image: '4'},
        fully: [
            {filters: '128', activation: 'relu'},
            {filters: null, activation: null},
            {filters: '2', activation: 'sigmoid'}
        ]
    })

    // Utils for tracking slider value
    const [numLayers, setNumLayers] = useState(2)
    const handleSliderChange = (e) => {        
        const temp = allVals
        const next_numLayers = e.valueOf()
        
        // < delete, > default
        if (next_numLayers < numLayers) {
            for (let i = 0; i < numLayers - next_numLayers; i++) {
                temp.layers[next_numLayers + i] = {
                    conv: {filters: null, kernel_size: null, activation: null},
                    pool: {pool_size: null, stride: null},
                    drop: null
                }
            }
        } else if (next_numLayers > numLayers) {
            for (let i = 0; i < next_numLayers - numLayers; i++) {
                temp.layers[numLayers + i] = {
                    conv: {filters: '16', kernel_size: '(2, 2)', activation: 'relu'},
                    pool: {pool_size: '(2, 2)', stride: '2'},
                    drop: 10
                }
            }
        }
        
        setAllVals(temp)
        setNumLayers(e.valueOf())
    }

    const handleLayerChange = (e, id, layerName) => {
        const temp = allVals
        
        if (layerName !== 'output' && layerName !== 'drop' && layerName !== 'fully')
            temp.layers[id][layerName] = {...temp.layers[id][layerName], [e.target.name]: e.target.value}
        else if (layerName === 'output')
            temp.output = {...temp.output, [e.target.name]: e.target.value}
        else if (layerName === 'drop')
            temp.layers[id].drop = e.valueOf() * 10
        else if (layerName === 'fully')
            temp.fully[id] = {...temp.fully[id], [e.target.name]: e.target.value}
        
        setAllVals(temp)
    }

    const getValues = (id, layerName) => {
        if (layerName === 'output') 
            return allVals.output
        else if (layerName === 'input')
            return allVals.input
        else if(layerName === 'fully')
            return allVals.fully[id]
        else if(layerName === 'Default')
            return allVals.layers[id]
        
        else return allVals.layers[id][layerName]
    }

    const setDefautFully = (nodesCount) => {
        if (nodesCount === 2) {
            const temp = allVals
            temp.fully[1] = {filters: null, activation: null}
            setAllVals(temp)
        } else {
            const temp = allVals
            temp.fully[1] = {filters: 64, activation: 'relu'}
            setAllVals(temp)
        }
    }

    const [convValues, setConvValues] = useState(getValues(0, 'convDefault'))
    const x = {filters: null, kernel_size: null, activation: null}

    return (
        <div>
            <testContext.Provider value={handleLayerChange}>
                <paramContext.Provider value={getValues}>
                    <TopBar numLayers={numLayers} handleSliderChange={handleSliderChange}
                            handlePlus={handlePlus} handleMinus={handleMinus} status={epochs[epoch]} />
                    
                    <epochsContext.Provider value={epochs[epoch]}>
                        <Workflow numLayers={numLayers} handleImageChange={handleImageChange}
                                  handleModelChange={handleModelChange} lossFunc={lossFunc} setLossFunc={setLossFunc}
                                  setDefautFully={setDefautFully}
                                  />
                    </epochsContext.Provider>

                </paramContext.Provider>
            </testContext.Provider>
            <button onClick={() => console.log(allVals.layers)}>vals</button>
        </div>
    );
}

export default App;

'use client'

import { generateOptions } from './generate-options';   
import ReactMultiSelect from './react-multiselect';


const attributeNames = [
    ["Flower Color", "flowerColor"],
    ["Dormancy", "dormancy"],
    ["Life Cycle", "lifeCycle"],
    ["Plant Type", "plantType"],
    ["Soil Moisture", "soilMoisture"],
    ["Difficulty", "difficulty"],
    ["Sun", "sun"],
    ["Ecosystems", "ecosystems"],
    ["Growth Form", "growthForm"]
]
  


const AttributeSearchPanel: React.FC = () => {

    const options = generateOptions()
    
    return (
        <div className="h-[calc(100vh-300px)] p-5 overflow-auto space-y-3">
            {attributeNames.map(([name, keyName]) => (
                <div key={keyName}>
                    <p className="font-semibold text-cream">
                        {name}
                    </p>
                   <ReactMultiSelect options={options[name]} keyName={keyName} label={name}/>
                </div>
            ))}
        </div>
    )

}


/**
 *  <MultiSelect
                        label={name}
                        value={'Some options'}
                        options={options[name]}
                    />
 */

/**
 *function contextAttributes(){
        if(type === 'merch'){
            return merchCustomAttributeValues
    
        } else {
            return plantCustomAttributeValues
        }
    }
 */

export default AttributeSearchPanel
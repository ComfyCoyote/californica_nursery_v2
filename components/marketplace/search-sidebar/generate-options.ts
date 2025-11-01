import { plantCustomAttributMapping } from "@/utils/mappings/plantCustomAttributeMapping";

export interface CustomOption {
    value: string;
    label: string;
}


export interface OptionMap {
    [key: string]: CustomOption[]
}


const plantAttributeKeys = [
    ["Square:49a0d982-b34b-4a7a-8acb-6bf6630d0537", "Flower Color", "flowerColor"],
    ["Square:0e4417c9-cb0a-46e2-93ca-813fcc5f105a", "Dormancy", "dormancy"],
    ["Square:f17c0b0f-6c4b-45e2-9dbc-40e6f092df05", "Life Cycle", "lifeCycle"],
    ["Square:8bd38961-b53d-4f1a-8c45-d7e4d02b801a", "Plant Type", "plantType"],
    ["Square:67ef524a-68ae-49eb-8fa9-27de90660c6a", "Difficulty", "difficulty"],
    ["Square:a11811ec-64b6-4aaa-bf02-a1a84ce9e867", "Soil Moisture", "soilMoisture"],
    ["Square:3f1890c9-6d18-4949-89db-3e4c007b91fe", "Sun", "sun"],
    ["Square:4ae7315c-2948-4e44-9310-4f178273bd2a", "Ecosystems", "ecosystems"],
    ["Square:06563530-5d71-4036-99a9-f4eeb9d13794", "Growth Form", "growthForm"]
];

export function generateOptions(){
    let optionMap: OptionMap = {}
    plantAttributeKeys.map(([key, label, keyName]) => {
        const options = plantCustomAttributMapping[key]
        const optionsArray: CustomOption[] = Object.entries(options).map((entry) => {
            const option: CustomOption = {
                value: entry[0] as string,
                label: entry[1] as string,
            }  
            return option
        })

        optionMap[label] = optionsArray

    })    

    return optionMap
}
    



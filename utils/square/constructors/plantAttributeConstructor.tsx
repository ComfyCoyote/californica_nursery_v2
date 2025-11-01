import { Square } from "square"
import type { PlantAttributes } from "@/utils/interfaces/product/plantAttributes"
import { plantCustomAttributMapping } from "@/utils/mappings/plantCustomAttributeMapping"

export function plantAttributeConstructor(c: Square.CatalogObjectItem): PlantAttributes {
    const ca = c.customAttributeValues

    let soilMoisture = ['']
    let plantType = ['']
    let difficulty = ['']
    let dormancy = ['']
    let flowerColor = ['']
    let ecosystems = ['']
    let lifeCycle = ['']
    let sun = ['']
    let growthRate = ['']
    let growthForm = ['']

    if(ca){
        soilMoisture = ca["Square:a11811ec-64b6-4aaa-bf02-a1a84ce9e867"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:a11811ec-64b6-4aaa-bf02-a1a84ce9e867"][uid]) ?? ['']
        plantType =  ca["Square:8bd38961-b53d-4f1a-8c45-d7e4d02b801a"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:8bd38961-b53d-4f1a-8c45-d7e4d02b801a"][uid]) ?? ['']
        difficulty =  ca["Square:67ef524a-68ae-49eb-8fa9-27de90660c6a"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:67ef524a-68ae-49eb-8fa9-27de90660c6a"][uid]) ?? ['']
        dormancy = ca["Square:a11811ec-64b6-4aaa-bf02-a1a84ce9e867"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:a11811ec-64b6-4aaa-bf02-a1a84ce9e867"][uid]) ?? ['']
        //need to find custom attribute value for this const growthRate = ca["Square:a11811ec-64b6-4aaa-bf02-a1a84ce9e867"]["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:a11811ec-64b6-4aaa-bf02-a1a84ce9e867"][uid])
        flowerColor = ca["Square:49a0d982-b34b-4a7a-8acb-6bf6630d0537"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:49a0d982-b34b-4a7a-8acb-6bf6630d0537"][uid]) ?? ['']
        ecosystems = ca["Square:4ae7315c-2948-4e44-9310-4f178273bd2a"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:4ae7315c-2948-4e44-9310-4f178273bd2a"][uid]) ?? ['']
        lifeCycle = ca["Square:f17c0b0f-6c4b-45e2-9dbc-40e6f092df05"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:f17c0b0f-6c4b-45e2-9dbc-40e6f092df05"][uid]) ?? ['']
        sun =  ca["Square:3f1890c9-6d18-4949-89db-3e4c007b91fe"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:3f1890c9-6d18-4949-89db-3e4c007b91fe"][uid]) ?? ['']
        growthForm = ca["Square:06563530-5d71-4036-99a9-f4eeb9d13794"]?.["selectionUidValues"]?.map((uid) => plantCustomAttributMapping["Square:06563530-5d71-4036-99a9-f4eeb9d13794"][uid]) ?? ['']

    }

    return {
        soilMoisture,
        plantType,
        difficulty,
        dormancy,
        flowerColor,
        ecosystems,
        lifeCycle,
        sun,
        growthForm,
        growthRate
    } as PlantAttributes
   
}
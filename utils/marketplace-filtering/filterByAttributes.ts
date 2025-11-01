

export function filterByAttributes(item: any, attributes: [string, any][]){
    const itemAttributes = item?.plantAttributes || item?.merchAttributes

    let itemHasAllAttributes = false

    attributes.forEach(([key, value]: any) => {
        const valMap = value.map((el: any) => el['label'])
        if(itemAttributes[key]?.some((el: string) => valMap.includes(el))){
            itemHasAllAttributes = true
        }
    })
    
    return itemHasAllAttributes
}
    

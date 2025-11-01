

export function parseScientificName(name: string): string {
    const start = name.indexOf('(')
    const end = name.indexOf(')') 
    let sciName: string = '';

    if(start !== -1 && end !== -1){
        sciName = name.slice(start + 1, end)
    }

    return sciName

}
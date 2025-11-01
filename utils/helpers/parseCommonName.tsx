

export function parseCommonName(name: string): string {
    let commonName: string = ''
    const start = name.indexOf('(')

    if(start){
        commonName =  name.slice(0, start - 1).toUpperCase()
    } 

    return commonName
    
}
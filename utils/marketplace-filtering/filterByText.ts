

export function filterByText(item: any, searchText: string){
    
    const itemText = item.name.toLowerCase() .replace(/\s+/g, '-')
    const searchQuery = searchText.toLowerCase().replace(/\s+/g, '-')

    const stat = itemText.includes(searchQuery)
    console.log('stat', stat)
    return stat
}

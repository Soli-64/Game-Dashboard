
export function setInStorage(itemName: string, data: object) {
    localStorage.setItem(
        itemName, JSON.stringify(data)
    )
}

export function getInStorage(itemName: string) {
    return JSON.parse( localStorage.getItem(itemName) as string )
}

export function delStorageItem(itemName: string) {

    localStorage.removeItem(itemName)

}


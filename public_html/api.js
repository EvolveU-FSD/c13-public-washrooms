async function getOrDie(url) {
    const response = await fetch(url)
    if (response.status !== 200) {
        throw new Error('')
    }
    return response.json()
}

export async function getWashrooms() {
    return getOrDie('/api/washrooms')
}

export async function getWashroom(id) {
    return getOrDie('/api/washrooms/'+id)
}
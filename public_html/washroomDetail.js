import { getWashroom } from "./api.js"

export async function generateWashroomDetail(element, washroomId, setSelectedWashroomId) {
    element.replaceChildren('Loading...')

    const washroom = await getWashroom(washroomId)
 
    const nameHeader = document.createElement('h2')
    nameHeader.append(washroom.name)

    const locationText = document.createElement('p')
    locationText.append('Location: ',washroom.location.coordinates.join(','))

    const backButton = document.createElement('button')
    backButton.append('Dismiss')
    backButton.onclick = () => setSelectedWashroomId(null)

    element.replaceChildren(nameHeader, locationText, backButton)
}
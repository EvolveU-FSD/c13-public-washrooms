import { getWashrooms } from "./api.js"

export async function generateWashroomList(element, setSelectedWashroomId) {
    element.replaceChildren('Loading...')

    const superwashrooms = await getWashrooms()

    const table = document.createElement('table')
    const tbody = document.createElement('tbody')
    table.append(tbody)
    tbody.insertAdjacentHTML("beforeend", 
        '<tr><th>Name</th><th>Location</th></tr>'
    )
    superwashrooms.forEach((washroom) => {
        const row = document.createElement('tr')
        row.insertAdjacentHTML("beforeend", 
            `<td>${ washroom.name }</td><td>${ washroom.location.coordinates }</td>`
        )    
        row.onclick = () => setSelectedWashroomId(washroom._id)
        tbody.append(row)
    })
    
    const refreshButton = document.createElement('button')
    refreshButton.append('Refresh')
    refreshButton.onclick = () => generateWashroomList(element, setSelectedWashroomId)

    element.replaceChildren(table, refreshButton)
}

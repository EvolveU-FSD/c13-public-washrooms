import { generateWashroomDetail } from "./washroomDetail.js"
import { generateWashroomList } from "./wasroomList.js"

const appElement = document.getElementById('app')

let selectedWashroomId = null

function setSelectedWashroomId(id) {
    console.log('selecting washroom ', id)
    selectedWashroomId = id
    renderApp()
}

function renderApp() {
    if (selectedWashroomId === null) {
        generateWashroomList(appElement, setSelectedWashroomId)
    }
    else {
        generateWashroomDetail(appElement, selectedWashroomId, setSelectedWashroomId)
    }
}

renderApp()
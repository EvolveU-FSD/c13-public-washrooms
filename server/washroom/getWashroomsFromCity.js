import { collection, disconnectDb } from '../db.js'

// split a line of text on commas, taking into account double quotes protect
// text fields that may contain commas
function splitCsvLine(line) {
    const cells = []
    let cellValue = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
        const char = line.charAt(i)
        if (char === '"') {
            inQuotes = !inQuotes
        }
        else if ((char === ',') && !inQuotes){
            cells.push(cellValue)
            cellValue = ''
        }
        else {
            cellValue += char
        }
    }
    cells.push(cellValue)
    return cells
}

// fetch the csv
const response = await fetch('https://data.calgary.ca/api/views/7pez-dhxh/rows.csv?query=select%20*%20where%20(upper(%60structure_type%60)%20LIKE%20%27%25WASHROOM%25%27)&read_from_nbe=true&version=2.1&date=20241028&accessType=DOWNLOAD')
if (response.status!==200) {
    throw new Error('Request to data.calgary.ca failed')
}

// split into lines on carriage return
const text = await response.text()
const lines = text.split('\n')

// figure out the headers
const headerLine = lines.shift()
const headers = splitCsvLine(headerLine)

// create data objects using the row values and the headers 
// as the names of the object fields
let cityData = lines.map((line) => {
    const cells = splitCsvLine(line)
    const rowData = {}
    headers.forEach((header, i) =>{
        rowData[header] = cells[i]
    })
    return rowData
})

// filter out empty rows 
cityData = cityData.filter((rowData) => rowData.GLOBALID)

// convert into our washroom schema
const washrooms = cityData.map((rowData) => {
    const coordinatesText = rowData.MULTIPOLYGON.substring(
        'MULTIPOLYGON ((('.length,
        rowData.MULTIPOLYGON.length - 3 // ')))'
    )
    const allCoordinates = coordinatesText.split(', ')
    const [lonText, latText] = allCoordinates[0].split(' ')
    const lon = Number.parseFloat(lonText)
    const lat = Number.parseFloat(latText)

    const washroom = {}
    washroom.name = rowData.COMMON_NAME
    washroom.address = rowData.BLD_ADDRESS
    washroom.city_globalid = rowData.GLOBALID
    washroom.location = {
        type: "Point",
        coordinates: [ lon, lat ]
    }
    return washroom
})

// write to mongo
const washroomsCollection = await collection('washrooms')
for (let i=0; i < washrooms.length; i++) {
    let cityWashroom = washrooms[i]
    const existingWashroom = await washroomsCollection.findOne({ 
        city_globalid: cityWashroom.city_globalid
    })
    if (!existingWashroom) {
        console.log('Creating washroom', cityWashroom)
        await washroomsCollection.insertOne(cityWashroom)
    }
    else {
        console.log('City washroom', cityWashroom.city_globalid, 'already exists')
    }
}
await disconnectDb()
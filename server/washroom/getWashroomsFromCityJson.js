import { collection, disconnectDb } from '../db.js'

// fetch the csv
const response = await fetch('https://data.calgary.ca/resource/7pez-dhxh.json?structure_type=WASHROOM')
if (response.status!==200) {
    throw new Error('Request to data.calgary.ca failed')
}
const cityWashrooms = await response.json()

const washrooms = cityWashrooms.map((cityWashroom) => {
    return {
        name: cityWashroom.common_name,
        address: cityWashroom.bld_address,
        city_globalid: cityWashroom.globalid,
        location: {
            type: "Point",
            coordinates: cityWashroom.multipolygon.coordinates[0][0][0]
        }
    }
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
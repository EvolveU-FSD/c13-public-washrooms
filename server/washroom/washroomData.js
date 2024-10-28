import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllWashrooms(nameFragment) {
    const mongoQuery = {}
    if (nameFragment !== undefined) {
        mongoQuery.name = nameFragment
    }
    const washroomCollection = await collection('washrooms')
    const cursor = await washroomCollection.find(mongoQuery) // no query finds everything!
    const washrooms = await cursor.toArray()
    return washrooms
}

export async function findWashroomById(id) {
    const washroomCollection  = await collection('washrooms')
    const singleWashroom =  await washroomCollection.findOne({_id: new ObjectId(id)})
    return singleWashroom
}

export async function createWashroom(data) {
    const washroomCollection  = await collection('washrooms')
    const insertResult = await washroomCollection.insertOne(data)
    console.log('Inserted washroom ', insertResult.insertedId)
    return await washroomCollection.findOne({ _id: insertResult.insertedId })
}
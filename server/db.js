import { MongoClient } from "mongodb";

const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/c13-public-washrooms'

let client = null  // start disconnected

export async function db() {
    if (client === null) {
        client = new MongoClient(mongo_uri)
        await client.connect()
    }
    return client.db()
}

export async function collection(name) {
    const database = await db()
    return database.collection(name)
}

export async function disconnectDb() {
    if (client) {
        await client.close()
        client = null
    }
}
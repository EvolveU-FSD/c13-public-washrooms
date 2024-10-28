import { findAllWashrooms } from "./washroomData.js";
import { disconnectDb } from "../db.js";

let washrooms = await findAllWashrooms()
console.log(washrooms)
await disconnectDb()

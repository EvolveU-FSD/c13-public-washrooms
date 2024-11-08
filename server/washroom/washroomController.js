import { Router } from "express";
import { createWashroom, findAllWashrooms, findWashroomById } from "./washroomData.js";

const router = Router()

// get a particular washroom
router.get('/:washroomId', async function (req, res) {
    const id = req.params.washroomId
    console.log(req.params)
    try {
        const washroom = await findWashroomById(id)
        if (washroom === null) {
            res.sendStatus(404)
        }
        else {
            res.send(washroom)
        }
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// list all washrooms
router.get('/', async function (req, res) {
    try {
        let userLocation
        if (req.query.lat && req.query.lng) {
            userLocation = {
                lat: Number.parseFloat(req.query.lat),
                lng: Number.parseFloat(req.query.lng),
            }
        }
        const washrooms = await findAllWashrooms(userLocation)
        res.send(washrooms)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {
    console.log('Incoming POST on /api/washrooms with data')
    console.log(req.body)

    if (req.body.name && req.body.location) {       
        const newWashroom = await createWashroom(req.body)
        return res.send(newWashroom)
    }
    else {
        return res.sendStatus(400)
    }
})

export default router
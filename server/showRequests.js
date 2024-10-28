let requestNumber = 1

export default function showRequests(req, res, next) {
    console.log('#' + requestNumber + " - " + req.method +" " + req.path)
    requestNumber++
    next()
}


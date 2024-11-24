const EARTH_RADIUS_M = 6378137;
const M_PER_DEGREE = EARTH_RADIUS_M*Math.PI / 180

function toRadians(degrees) {
    return degrees*Math.PI/180
}

function toDegrees(radians) {
    return radians*180/Math.PI
}

function nameDirection(degrees, min, max, name) {
    return ((degrees >= min) && (degrees <= max)) ? name : ''
}

function calculateDirection(y, x) {
    const bearing = toDegrees(Math.atan2(y, x))
    let dir = ''
    dir = dir || nameDirection(bearing, -180, -157.5, "West" )
    dir = dir || nameDirection(bearing, -157.5, -112.5, "South West" )
    dir = dir || nameDirection(bearing, -112.5, -67.5, "South" )
    dir = dir || nameDirection(bearing, -67.5, -22.5, "South East" )
    dir = dir || nameDirection(bearing, -22.5, 22.5, "East" )
    dir = dir || nameDirection(bearing, 22.5, 67.5, "North East" )
    dir = dir || nameDirection(bearing, 67.5, 112.5, "North" )
    dir = dir || nameDirection(bearing, 112.5, 157.5, "North West" )
    dir = dir || nameDirection(bearing, 157.5, 180, "West" )
    return dir
}


export default function distanceBetween(fromLat, fromLon, toLat, toLon) {
    const northM = (toLat-fromLat)*M_PER_DEGREE
    const eastM = (toLon-fromLon)*M_PER_DEGREE*Math.cos(toRadians(fromLat))
    const distance = Math.sqrt(northM*northM + eastM*eastM)
    const direction = calculateDirection(northM, eastM)
    return { distance, direction }
}
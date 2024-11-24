import { useEffect, useState } from 'react'

import './WashroomList.css'
import distanceBetween from './distanceBetween'

function roundDistance(m) {
  return Math.round(m/5)*5
}

async function getWashroomDetail(id) {
  const response = await fetch('/api/washrooms/'+id)
  if (response.status !== 200) {
    throw new Error('Fetch for washroom detail failed')
  }   
  return await response.json()
}

function Washroom({id, name, distanceText}) {
  const [showDetail, setShowDetail] = useState(false)
  const [washroomDetail, setWashroomDetail] = useState({})

  useEffect(()=>{
    if (!showDetail) return
    getWashroomDetail(id).then(setWashroomDetail)
  }, [showDetail, id])

  function toggleDetail() {
    setShowDetail( !showDetail )
  }

  return (
    <div className={showDetail ? "washroom-selected" : ""}>
      <div className="washroom-header" onClick={toggleDetail}>
        <h4>{name}</h4>
        <div>{distanceText}</div>
      </div>
      { showDetail && (
        <div className="washroom-detail">
          <div>Toilet Paper: {''+washroomDetail.toiletPaper}</div>
        </div> 
      )}
    </div>
  )
}

function WashroomList() {
  const [washrooms, setWashrooms] = useState([])
  const [userLocation, setUserLocation] = useState({ lat: 51.045017677337256, lng: -114.0548711371947 })

  useEffect(() => {
    async function fetchAllWashrooms() {
        const response = await fetch(`/api/washrooms?lat=${userLocation.lat}&lng=${userLocation.lng}`)
        if (response.status === 200) {
            const washroomsData = await response.json()
            setWashrooms(washroomsData)
        }    
    }
    fetchAllWashrooms()
  }, [])

  return (
    <div>
      {
        washrooms.map((washroom) => {
          const locationAndDirection = distanceBetween(
              userLocation.lat, userLocation.lng, 
              washroom.location.coordinates[1], washroom.location.coordinates[0]
          )
          const distanceText = `${roundDistance(locationAndDirection.distance)}m ${locationAndDirection.direction}`
          return (<Washroom key={washroom._id} id={washroom._id} name={washroom.name} distanceText={distanceText} />)
        })
      }
    </div>

  )
}

export default WashroomList

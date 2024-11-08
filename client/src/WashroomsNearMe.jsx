import { useEffect, useState } from 'react'

function WashroomsNearMe() {
  const [washrooms, setWashrooms] = useState([])
  const [userLocation, setUserLocation] = useState({ lat: 51.08339, lng: -114.21483 })

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
      <h2>Washrooms nearest {userLocation.lat},{userLocation.lng}</h2>
      <table>
        <tbody>
          <tr><th>Name</th><th>Location</th></tr>
          {
            washrooms.map((washroom) => (
              <tr key={washroom._id}><td>{washroom.name}</td><td>{washroom.location.coordinates.join(', ')}</td></tr>
            ))
          }
        </tbody>
      </table>
      <button>Refresh</button>
    </div>
  )
}

export default WashroomsNearMe

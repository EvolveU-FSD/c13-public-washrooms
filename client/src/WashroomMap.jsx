import { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: 51.04516889497041, 
  lng: -114.05470642798426,
}

function WashroomMap() {
  const [washrooms, setWashrooms] = useState([])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    async function fetchAllWashrooms() {
        const response = await fetch('/api/washrooms')
        if (response.status === 200) {
            const washroomsData = await response.json()
            setWashrooms(washroomsData)
        }    
    }
    fetchAllWashrooms()
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
    >
        {
            washrooms.map((washroom) => (
              <Marker key={washroom._id} position={{ 
                lng: washroom.location.coordinates[0], 
                lat: washroom.location.coordinates[1] 
              }} />
            ))
        }
    </GoogleMap>
  ) : (
    <></>
  )

  return (
    <div>
      <table>
        <tbody>
          <tr><th>Name</th><th>Location</th></tr>
        </tbody>
      </table>
      <button>Refresh</button>
    </div>
  )
}

export default WashroomMap

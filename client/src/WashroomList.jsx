import { useEffect, useState } from 'react'

import './WashroomList.css'

function Washroom({id, name, coordinates}) {
  return (
    <div className="washroom-header" >
      <h4>{name}</h4>
      <div>{coordinates.join(', ')}</div>
    </div>
  )
}
function WashroomList() {
  const [washrooms, setWashrooms] = useState([])

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

  return (
    <div>
      {
        washrooms.map((washroom) => (
          <Washroom key={washroom._id} id={washroom._id} name={washroom.name} coordinates={washroom.location.coordinates} />
        ))
      }
    </div>

  )
}

export default WashroomList

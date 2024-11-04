import { useEffect, useState } from 'react'

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

export default WashroomList

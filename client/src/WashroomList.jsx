import { useEffect, useState } from 'react'

import './WashroomList.css'

async function getWashroomDetail(id) {
  const response = await fetch('/api/washrooms/'+id)
  if (response.status !== 200) {
    throw new Error('Fetch for washroom detail failed')
  }   
  return await response.json()
}

function Washroom({id, name, coordinates}) {
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
    <>
      <div className="washroom-header" onClick={toggleDetail}>
        <h4>{name}</h4>
        <div>{coordinates.join(', ')}</div>
      </div>
      { showDetail && (
        <div className="washroom-detail">
          <div>Toilet Paper: {''+washroomDetail.toiletPaper}</div>
        </div> 
      )}
    </>
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

import { useState } from 'react'
import './App.css'

function App() {
  const [washrooms, setWashrooms] = useState([
    {
      "_id": "67291160b8df17c464fdac58",
      "name": "BOWNESS PK COMFORT STATION 2",
      "address": "8900 48 AV NW",
      "city_globalid": "{E5AFDB1A-D542-4147-9FAF-286EB2692CE3}",
      "location": {
        "type": "Point",
        "coordinates": [-114.2201632, 51.0979772]
      }
    },
    {
      "_id": "67291160b8df17c464fdac59",
      "name": "BAKER PARK COMFORT STATION",
      "address": "9333 SCENIC BOW RD NW",
      "city_globalid": "{500D7B24-C7AA-4235-BBB8-637E283CFFB2}",
      "location": {
        "type": "Point",
        "coordinates": [-114.2206521, 51.1010746]
      }
    },
    {
      "_id": "67291160b8df17c464fdac5a",
      "name": "BOWNESS PK COMFORT STATION 1",
      "address": "8900 48 AV NW",
      "city_globalid": "{1F176950-DC3F-43B1-982B-703946626753}",
      "location": {
        "type": "Point",
        "coordinates": [-114.2247107, 51.0973907]
      }
    }
  ])

  return (
    <div>
      <table>
        <tbody>
          <tr><th>Name</th><th>Location</th></tr>
          {
            washrooms.map((washroom) => (
              <tr><td>{washroom.name}</td><td>{washroom.location.coordinates.join(', ')}</td></tr>
            ))
          }
        </tbody>
      </table>
      <button>Refresh</button>
    </div>
  )
}

export default App

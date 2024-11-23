
import { useState } from "react"

import FootNav from "./FootNav"
import "./MainLayout.css"
import WashroomListContent from "./WashroomListContent"
import WashroomMapContent from "./WashroomMapContent"

const viewOptions = [
    'List View', 'Map View'
]

export default function MainLayout() {
    const [selectedOption, setSelectedOption] = useState(viewOptions[0])

    return (
        <div className="screen">
            { selectedOption === 'List View' && <WashroomListContent />}
            { selectedOption === 'Map View' && <WashroomMapContent />}
            <div className="footer">
                <FootNav 
                    options={viewOptions} 
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </div>
        </div>
    )
}
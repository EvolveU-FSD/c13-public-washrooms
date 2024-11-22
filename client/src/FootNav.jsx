import { useState } from "react"
import "./FootNav.css"

export default function FootNav() {
    const [collapsed, setCollapsed] = useState(true)

    function uncollapse() {
        setCollapsed(false)
    }

    function collapse() {
        setCollapsed(true)
    }

    return (
        collapsed ? (
            <div className="collapsedFooter" onClick={uncollapse}>
                <div>&#9650;</div>
                <div className="selectedView">List View</div>
                <div>&#9650;</div>
            </div>
        )
        :
        (
            <div className="viewList" onClick={collapse}>
                <div className="viewSelector">List View</div>
                <div className="viewSelector">Map View</div>
                <div className="viewSelector">GOTTA GO NOW</div>
                <div className="collapsedFooter" onClick={collapse}>
                    <div>&#9660;</div>
                    <div className="cancel">Cancel</div>
                    <div>&#9660;</div>
                </div>
            </div>
        )
    )
}
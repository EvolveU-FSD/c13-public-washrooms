import { useState } from "react"
import "./FootNav.css"

export default function FootNav({options = [], selectedOption, setSelectedOption}) {
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
                <div className="selectedView">{selectedOption}</div>
                <div>&#9650;</div>
            </div>
        )
        :
        (
            <div className="viewList" onClick={collapse}>
                { options.map((option) => (
                    <div 
                        key={option} 
                        className={"viewSelector " + ((option===selectedOption) ? " selectedView" : "")}
                        onClick={() => setSelectedOption(option)}
                    >{option}</div>
                ))}
                <div className="collapsedFooter" onClick={collapse}>
                    <div>&#9660;</div>
                    <div className="cancel">Cancel</div>
                    <div>&#9660;</div>
                </div>
            </div>
        )
    )
}
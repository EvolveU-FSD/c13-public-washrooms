import WashroomList from "./WashroomList"
import "./WashroomListContent.css"

export default function WashroomListContent() {
    return (<>
        <h2 className="header">Washrooms List</h2>        
        <div className="scrollContainer">
            <WashroomList />
        </div>
    </>)
}
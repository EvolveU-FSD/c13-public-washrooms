
import FootNav from "./FootNav"
import "./MainLayout.css"

export default function MainLayout() {
    return (
        <div className="screen">
            <div className="content">
                <h2>Title here</h2>
            </div>
            <div className="footer">
                <FootNav />
            </div>
        </div>
    )
}
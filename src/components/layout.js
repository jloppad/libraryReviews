import Navbar from "./navbar";
import "../styles/layout.css";

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="container">{children}</div>
        </div>
    );
}

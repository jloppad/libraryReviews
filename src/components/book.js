import { Link } from "react-router-dom";
import "../styles/book.css"; 

export default function Book({ item }) {
    return (
        <div className="book-container">
            <Link to={`/view/${item.id}`} className="book-info">
                <img src={item.cover ? (process.env.REACT_APP_API_URL + `${item?.cover}`) : (process.env.REACT_APP_API_URL + `/uploads/default.png`)} width="200" alt={item.title} />
                <div className="book-title">{item.title}</div>
            </Link>
        </div>
    );
}

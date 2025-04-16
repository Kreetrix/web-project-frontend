import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-yellow-600 text-white shadow-lg">
            <div className="container mx-auto px-5 py-4">

                <Link to="/">Home</Link>
            </div>
        </header>
    )

}


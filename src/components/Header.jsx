import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-yellow-600 text-white shadow-lg">


            <div className="container mx-auto px-5 py-4">
                <h1 className="text-3xl font-bold">🍔 Burger Palace</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <Link to="/">Home</Link>
                        <Link to="/">Menu</Link>
                        <li><a href="order.html" className="hover:text-yellow-200 font-medium">Tilaus</a></li>
                        <li><a href="login.html" className="hover:text-yellow-200 font-medium">Kirjaudu</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )

}

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p class="mb-2">© 2025 Burger Palace</p>
                <p class="mb-2">Osoite: Burgerikatu 5, Helsinki</p>
                <p>Puhelin: 010 987 6543</p>
                <div class="mt-4 flex justify-center space-x-4">
                    <a href="#" class="text-yellow-400 hover:text-yellow-300 transition">Instagram</a>
                    <a href="#" class="text-yellow-400 hover:text-yellow-300 transition">Facebook</a>
                </div>
            </div>
        </footer>
    )

}





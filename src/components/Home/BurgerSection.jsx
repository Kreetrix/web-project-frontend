import { useNavigate } from "react-router-dom";
import RotatingBurger from "./RotatingBurger";
import '../../styles/RotatingBurger.css';

const BurgerSection = () => {
    const navigate = useNavigate();

    return (
        <section className="burger-bg rounded-xl p-7 text-center text-white mb-12 animate-fadeIn">
            <RotatingBurger />
            <h2 className="text-4xl font-bold mb-6 text-shadow">Tervetuloa Burger Palaceen!</h2>



            <div className="marquee-container mb-6">
                <div className="marquee-content">
                    <span className="marquee-text">
                        MAISTUVIMMAT BURGERIT KAUPUNGISSA 🔥 SYÖ KUIN KUNINGAS – VAIN BURGER PALACEISSA! 👑&nbsp;
                    </span>
                    <span className="marquee-text">
                        MAISTUVIMMAT BURGERIT KAUPUNGISSA 🔥 SYÖ KUIN KUNINGAS – VAIN BURGER PALACEISSA! 👑&nbsp;
                    </span>
                </div>
            </div>

            <button
                onClick={() => navigate("/menu")}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
            >
                Tilaa nyt
            </button>
        </section>
    );
};

export default BurgerSection;

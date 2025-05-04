import { useNavigate } from "react-router-dom";
import RotatingBurger from "./RotatingBurger";
import "../../styles/RotatingBurger.css";
import Text from "../locales/Text.jsx";

const BurgerSection = () => {
  const navigate = useNavigate();

  return (
    <section className="burger-bg rounded-xl p-7 text-center text-white mb-12 animate-fadeIn">
      <RotatingBurger />
      <h2 className="text-4xl font-bold mb-6 text-shadow">
        <Text id="app.home.burgerSection.welcome" />
      </h2>

      <div className="marquee-container mb-6">
        <div className="marquee-content">
          <span className="marquee-text">
            <Text id="app.home.burgerSection.goofy" />
            👑&nbsp;
          </span>
          <span className="marquee-text">
            <Text id="app.home.burgerSection.goofy" />
            👑&nbsp;
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate("/menu")}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
      >
        <Text id="app.home.burgerSection.order" />
      </button>
    </section>
  );
};

export default BurgerSection;

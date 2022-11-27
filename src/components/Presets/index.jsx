import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import cardsBackground from "../../helpers/cardsBackground";
import Card from "../Card";
import "./styles/Presets.css";

function Presets() {
  const { currentCard, setCurrentCard } = useContext(CardsContext);

  const { theme } = currentCard;

  const optionsThemes = Object.entries(cardsBackground);

  const handlePresetChange = ({ target }) => {
    setCurrentCard({ ...currentCard, theme: target.value });
  };

  return (
    <section className="_presets">
      {optionsThemes.map((option, i) => {
        const [key, value] = option;
        return (
          <label htmlFor={`_preset_${value}`} key={i}>
            <div className="_preset_card">
              <Card cardData={{ ...currentCard, theme: key }} isView />
            </div>
            <input
              checked={theme === key}
              type="radio"
              key={key}
              value={key}
              id={`_preset_${value}`}
              onChange={handlePresetChange}
            />
            <span className="_preset_name">{value}</span>
          </label>
        );
      })}
    </section>
  );
}

export default Presets;

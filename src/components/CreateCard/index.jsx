import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import Card from "../Card";
import FormCreate from "../FormCreate";
import "./styles/CreateCard.css";

function CreateCard({ openPresets, handleOpenPresets }) {
  const { currentCard } = useContext(CardsContext);

  return (
    <section className="_create_card">
      <div>
        <Card cardData={currentCard} isView />
        <button onClick={handleOpenPresets} className="_btn_presets">
          {openPresets ? "Close Presets" : "Presets"}
        </button>
      </div>
      <FormCreate />
    </section>
  );
}

export default CreateCard;

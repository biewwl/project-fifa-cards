import { createContext, useState } from "react";
import { getAllCards, getMain } from "../helpers/managerCollections";

export const CardsContext = createContext();

const CardsProvider = ({ children }) => {
  const initialCurrentCard = {
    theme: "gold23",
    collection: "",
    name: "",
    country: "br",
    club: "",
    image: "",
    id: 0,
    totalPoints: "",
    position: "",
    attr1Name: "PAC",
    attr1Value: "",
    attr2Name: "SHO",
    attr2Value: "",
    attr3Name: "PAS",
    attr3Value: "",
    attr4Name: "DRI",
    attr4Value: "",
    attr5Name: "DEF",
    attr5Value: "",
    attr6Name: "PHY",
    attr6Value: "",
  };

  const [currentCard, setCurrentCard] = useState(initialCurrentCard);
  const [cards, setCards] = useState(getAllCards());
  const [isEdit, setIsEdit] = useState(false);
  const [cardSavedInEdit, setCardSavedInEdit] = useState("");
  const [collections, setCollections] = useState(getMain());
  const [formPage, setFormPage] = useState(0);

  const resetCurrentCard = () => {
    setCurrentCard(initialCurrentCard);
  };

  const refreshCards = () => {
    setCards(getAllCards());
  };

  const refreshCollections = () => {
    setCollections(getMain());
  };

  const resetAll = () => {
    setIsEdit(false);
    refreshCollections();
    setCardSavedInEdit();
    resetCurrentCard();
    refreshCards();
  }

  return (
    <CardsContext.Provider
      value={{
        currentCard,
        setCurrentCard,
        resetCurrentCard,
        cards,
        refreshCards,
        isEdit,
        setIsEdit,
        cardSavedInEdit,
        setCardSavedInEdit,
        collections,
        setCollections,
        refreshCollections,
        resetAll,
        formPage,
        setFormPage
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;

import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import { getSlicedAttributes } from "../../helpers/getAttributes";
import { Icon } from "@iconify/react";
import { isCardInEdit } from "../../helpers/utils";
import { deleteCard } from "../../helpers/managerCollections";
import { useNavigate } from "react-router-dom";
import "./styles/Card.css";

function Card({ cardData, isView = false }) {
  const {
    refreshCards,
    setIsEdit,
    isEdit,
    setCurrentCard,
    cardSavedInEdit,
    setCardSavedInEdit,
    resetCurrentCard,
    setFormPage,
  } = useContext(CardsContext);

  const {
    name,
    image,
    country,
    club,
    totalPoints,
    position,
    theme,
    id,
    collection,
  } = cardData;

  const firstThreeAttributes = getSlicedAttributes(cardData, 0, 3);
  const lastThreeAttributes = getSlicedAttributes(cardData, 3, 6);
  const navigate = useNavigate();

  const handleDeleteCard = () => {
    deleteCard(collection, id);
    refreshCards();
  };

  const handleEditCard = () => {
    let isSameCard = isCardInEdit(cardSavedInEdit, cardData);
    if (!isEdit || !isSameCard) {
      setIsEdit(true);
      setCardSavedInEdit(cardData);
      setCurrentCard(cardData);
      navigate("/");
    } else {
      setIsEdit(false);
      setCardSavedInEdit("");
      resetCurrentCard();
    }
    setFormPage(0);
  };

  return (
    <section className={`_card ${theme}`}>
      <section className="_card_top_content">
        <aside className="_card_aside">
          <div className="_points_position">
            <span className="_card_total_points">{totalPoints}</span>
            <span className="_position">{position}</span>
          </div>
          <div className="_country">
            <img src={`https://flagcdn.com/w2560/${country}.png`} alt="" />
          </div>
          <img src={club} alt="" className="_club" />
        </aside>
        <img src={image} alt="" className="_player_image" />
      </section>
      <section className="_card_bottom_content">
        <div className="_card_name">
          <span>{name}</span>
        </div>
        <div className="_attributes">
          <div className="_attributes_left">
            {firstThreeAttributes.map((attr, i) => {
              const [name, value] = attr;
              return (
                <div className="_attribute" key={i}>
                  <span className="_attribute_value">{value}</span>
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
          <div className="_attributes_right">
            {lastThreeAttributes.map((attr, i) => {
              const [name, value] = attr;
              return (
                <div className="_attribute" key={i}>
                  <span className="_attribute_value">{value}</span>
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {!isView && (
        <button onClick={handleDeleteCard} className="_delete_btn">
          <Icon icon="ph:x-bold" />
        </button>
      )}
      {!isView && (
        <button onClick={handleEditCard} className="_edit_btn">
          <Icon icon="material-symbols:edit-outline-rounded" />
        </button>
      )}
    </section>
  );
}

export default Card;

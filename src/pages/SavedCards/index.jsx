import Card from "../../components/Card";
import { useContext, useState } from "react";
import { CardsContext } from "../../context/CardsContext";
import Collection from "../../components/Collection";
import { Icon } from "@iconify/react";
import { getAllCardsLength } from "../../helpers/managerCollections";
import "./styles/SavedCards.css";
import Header from "../../components/Header";

function SavedCards() {
  const { cards } = useContext(CardsContext);
  const { collections } = useContext(CardsContext);
  const [openAllCollections, setOpenAllCollections] = useState(true);

  const handleOpenAllCollections = () => {
    setOpenAllCollections(!openAllCollections);
  };

  return (
    <div className="_saved_cards">
      <Header />
      <div>
        <div className="_all_cards_header">
          <h2 className="_saved_cards_title">
            <span>All Cards </span>
            <span className="_all_collections_length">
              ({getAllCardsLength()})
            </span>
          </h2>
          <button
            onClick={handleOpenAllCollections}
            className="_btn_open_collection"
          >
            {!openAllCollections && (
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
            )}
            {openAllCollections && (
              <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
            )}
          </button>
        </div>
        {openAllCollections && (
          <section className="_all_saved_cards">
            {cards.map((card, i) => (
              <div key={i} className="_card_scale_min">
                <Card cardData={card} />
              </div>
            ))}
          </section>
        )}
      </div>
      {collections.map((collectionName, i) => (
        <Collection collectionName={collectionName} key={i} />
      ))}
    </div>
  );
}

export default SavedCards;

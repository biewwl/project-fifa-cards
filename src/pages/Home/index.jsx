import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CreateCard from "../../components/CreateCard";
import Header from "../../components/Header";
import Presets from "../../components/Presets";
import { CardsContext } from "../../context/CardsContext";
import { getCollectionLength } from "../../helpers/managerCollections";
import "./styles/Home.css";

function Home() {
  const [openPresets, setOpenPresets] = useState(false);
  const { collections } = useContext(CardsContext);

  const handleOpenPresets = () => {
    setOpenPresets(!openPresets);
  };

  return (
    <div className="_home_page">
      <Header />
      <CreateCard
        handleOpenPresets={handleOpenPresets}
        openPresets={openPresets}
      />
      {openPresets && <Presets />}
      <div className="_header_collections_home">
        <span>
          <Icon icon="bi:collection" />
          Collections
        </span>
      </div>
      <section className="_links_to_collections">
        {collections.map((collectionName, i) => {
          const collectionLength = getCollectionLength(collectionName);
          return (
            <Link
              to={`/collection/${collectionName}`}
              className="_link_to_collection"
              key={i}
            >
              <span className="_collection_name">
                <Icon icon="bi:collection" />
                {collectionName}
              </span>
              <span className="_collection_length">
                {collectionLength} {collectionLength > 1 ? "cards" : "card"}
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default Home;

import { useContext, useState } from "react";
import Card from "../Card";
import { Icon } from "@iconify/react";
import { CardsContext } from "../../context/CardsContext";
import {
  deleteCollection,
  getCardsByCollection,
  getCollectionLength,
  getMain,
  renameCollection,
} from "../../helpers/managerCollections";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import "./styles/Collection.css";

function Collection({ collectionName }) {
  const params = useParams();
  const navigate = useNavigate();

  if (params.collectionName) collectionName = params.collectionName;

  const cards = getCardsByCollection(collectionName);
  const [openCollection, setOpenCollection] = useState(true);
  const { refreshCards, refreshCollections, resetAll } =
    useContext(CardsContext);
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [newName, setNewName] = useState(collectionName);

  const handleOpenCloseCollection = () => {
    setOpenCollection(!openCollection);
  };

  const handleDeleteCollection = () => {
    deleteCollection(collectionName);
    refreshCollections();
    refreshCards();
  };

  const handleIsEditCollectionChange = () => {
    setIsEditCollection(!isEditCollection);
    if (isEditCollection) {
      const currentCollectionName = document.getElementById("_collection_name");
      currentCollectionName.innerText = collectionName;
      setNewName(collectionName);
    }
  };

  const setRename = () => {
    setIsEditCollection(false);
    renameCollection(collectionName, newName);
    resetAll();
    navigate(`/collection/${newName}`)
  };

  const handleNewNameChange = (e) => {
    const { target } = e;
    if (e.key === "Enter") {
      if (!saveDisabled()) {
        setRename();
      } else {
        e.preventDefault();
      }
    } else {
      setNewName(target.innerText);
    }
  };

  const saveDisabled = () => {
    const currentCollections = getMain();
    const existCollection = currentCollections.some(
      (collection) => collection === newName
    );
    return isEditCollection && (existCollection || !newName);
  };

  return (
    <section className="_collection_content">
      <Header />
      <div className="_header_collection">
        <div
          className={`_btn_delete_collection ${
            isEditCollection ? " _opened" : ""
          }`}
        >
          <button
            onClick={handleDeleteCollection}
            className="_btn_edit_collection _delete"
          >
            <Icon icon="ph:trash" />
          </button>
        </div>
        <h2 className={`_collection_name${isEditCollection ? " _edit" : ""}`}>
          <span
            contentEditable={isEditCollection}
            onInput={handleNewNameChange}
            suppressContentEditableWarning
            id="_collection_name"
            onKeyDown={handleNewNameChange}
          >
            {collectionName}
          </span>
          <span className="_collection_length">
            {" "}
            ({getCollectionLength(collectionName)})
          </span>
        </h2>
        {isEditCollection && (
          <button
            onClick={handleIsEditCollectionChange}
            className="_btn_edit_collection _quit"
          >
            <Icon icon="ph:x-bold" />
          </button>
        )}
        <button
          onClick={isEditCollection ? setRename : handleIsEditCollectionChange}
          disabled={saveDisabled()}
          className="_btn_edit_collection _edit"
        >
          {isEditCollection ? (
            <Icon icon="mdi:tick" />
          ) : (
            <Icon icon="material-symbols:edit-outline-rounded" />
          )}
        </button>
        <button
          onClick={handleOpenCloseCollection}
          className="_btn_edit_collection _arrow"
        >
          {!openCollection && (
            <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
          )}
          {openCollection && (
            <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
          )}
        </button>
      </div>
      {openCollection && (
        <div className="_collection">
          {cards.map((card, i) => (
            <div key={i} className="_card_scale_min">
              <Card cardData={card} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Collection;

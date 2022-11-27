import { Icon } from "@iconify/react";
import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import { getCollectionLength } from "../../helpers/managerCollections";

function FormCollection({ handleFormChange }) {
  const { currentCard, collections } = useContext(CardsContext);

  const { collection } = currentCard;

  return (
    <label htmlFor="_collection_input _form_top">
      <span>
      <Icon icon="bi:collection" />
        Collection</span>
      <input
        value={collection}
        type="text"
        id="_collection_input"
        name="collection"
        onChange={handleFormChange}
        list="_saved_collections"
        placeholder="Barcelona 2022"
        required
      />
      <datalist id="_saved_collections">
        {collections.map((collection, i) => {
          const collectionLength = getCollectionLength(collection);
          return (
            <option key={i} value={collection}>
              {collectionLength}
            </option>
          );
        })}
      </datalist>
    </label>
  );
}

export default FormCollection;

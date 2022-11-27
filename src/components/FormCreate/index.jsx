import { useContext } from "react";
import FormAttributes from "../FormAttributes";
import { CardsContext } from "../../context/CardsContext";
import { editCard, saveCard } from "../../helpers/managerCollections";
import FormNameAndImage from "../FormNameAndImage";
import FormTotalPointsAndPosition from "../FormTotalPointsAndPosition";
import FormCollection from "../FormCollection";
import FormCountryAndClub from "../FormCountryAndClub";
import { someBlankValue } from "../../helpers/utils";
import { getAttributesValues } from "../../helpers/getAttributes";
import "./styles/FormCreate.css";
import { Icon } from "@iconify/react";

function FormCreate() {
  const {
    currentCard,
    setCurrentCard,
    refreshCards,
    isEdit,
    setIsEdit,
    cardSavedInEdit,
    resetCurrentCard,
    refreshCollections,
    formPage,
    setFormPage,
  } = useContext(CardsContext);
  const { collection, name, image, club, totalPoints, position } = currentCard;

  const handleFormChange = ({ target }) => {
    if (target.name === "collection" && !isEdit) {
      setCurrentCard({
        ...currentCard,
        collection: target.value,
      });
    } else {
      setCurrentCard({ ...currentCard, [target.name]: target.value });
    }
  };

  const handleValuesChange = ({ target }) => {
    const noStartsWith0 = target.value[0] !== "0";
    if (noStartsWith0) {
      if (Number(target.value) > 99) {
        setCurrentCard({ ...currentCard, [target.name]: "99" });
      } else {
        handleFormChange({ target });
      }
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (isEdit) {
      editCard(cardSavedInEdit, currentCard);
      setIsEdit(false);
    } else {
      saveCard(collection, currentCard);
    }
    resetCurrentCard();
    refreshCards();
    refreshCollections();
    setFormPage(0);
  };

  const nextFormPage = () => {
    setFormPage(formPage + 1);
  };

  const prevFormPage = () => {
    setFormPage(formPage - 1);
  };

  const getDisabledNext = () => {
    if (formPage === 0) return someBlankValue([name, image]);
    if (formPage === 1) return someBlankValue([club]);
    if (formPage === 2) return someBlankValue([totalPoints, position]);
    if (formPage === 3) return someBlankValue(getAttributesValues(currentCard));
    if (formPage === 4) return someBlankValue([collection]);
  };

  const getDisabledRender = () => {
    return !someBlankValue([
      name,
      image,
      club,
      totalPoints,
      position,
      getAttributesValues(currentCard),
      collection,
    ]);
  };

  return (
    <form action="get" onSubmit={submitForm} className="_form_create">
      {formPage === 0 && (
        <FormNameAndImage handleFormChange={handleFormChange} />
      )}
      {formPage === 1 && (
        <FormCountryAndClub handleFormChange={handleFormChange} />
      )}
      {formPage === 2 && (
        <FormTotalPointsAndPosition
          handleFormChange={handleFormChange}
          handleValuesChange={handleValuesChange}
        />
      )}
      {formPage === 3 && (
        <FormAttributes
          handleFormChange={handleFormChange}
          handleValuesChange={handleValuesChange}
        />
      )}
      {formPage === 4 && <FormCollection handleFormChange={handleFormChange} />}
      <div className="_form_buttons">
        {getDisabledRender() && (
          <button className="_button_submit" type="submit">
            {isEdit ? "Save Changes" : "Create Card"}
          </button>
        )}
        <div className="_form_prev_next">
          {formPage > 0 && (
            <button type="button" onClick={prevFormPage}>
              <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
            </button>
          )}
          {formPage < 4 && (
            <button
              type="button"
              onClick={nextFormPage}
              disabled={getDisabledNext()}
            >
              <Icon icon="material-symbols:arrow-forward-ios-rounded" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default FormCreate;

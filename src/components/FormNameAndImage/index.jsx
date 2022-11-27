import { Icon } from "@iconify/react";
import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";

function FormNameAndImage({ handleFormChange }) {
  const { currentCard } = useContext(CardsContext);

  const { name, image } = currentCard;

  return (
    <div className="_form_top">
      <label htmlFor="_name_input">
        <span>
          <Icon icon="mdi:user" />
          Name
        </span>
        <input
          value={name}
          type="text"
          id="_name_input"
          name="name"
          onChange={handleFormChange}
          placeholder="Messi"
          required
        />
      </label>
      <label htmlFor="_image_input">
        <span>
          <Icon icon="material-symbols:photo-camera-outline" />
          Image
        </span>
        <input
          value={image}
          type="text"
          id="_image_input"
          name="image"
          onChange={handleFormChange}
          placeholder="https://b.fssta.com/uploads/application/soccer/headshots/711.png"
          required
        />
      </label>
    </div>
  );
}

export default FormNameAndImage;

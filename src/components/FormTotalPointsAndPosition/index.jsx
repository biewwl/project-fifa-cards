import { Icon } from "@iconify/react";
import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import { onlyNumber } from "../../helpers/formatValues";

function FormTotalPointsAndPosition({ handleFormChange, handleValuesChange }) {
  const { currentCard } = useContext(CardsContext);
  const { totalPoints, position } = currentCard;

  return (
    <div className="_form_top">
      <label htmlFor="_total_points_input">
        <span>
        <Icon icon="fluent:number-row-16-filled" />
          Total Points
        </span>
        <input
          value={totalPoints}
          type="text"
          id="_total_points_input"
          className="_total_points_input"
          name="totalPoints"
          onChange={handleValuesChange}
          onKeyDown={onlyNumber}
          maxLength={2}
          placeholder="0-99"
          required
        />
      </label>
      <label htmlFor="_position_input">
        <span>
          <Icon icon="mdi:football-play" />
          Position
        </span>
        <input
          value={position}
          type="text"
          id="_position_input"
          className="_position_input"
          name="position"
          onChange={handleFormChange}
          maxLength={3}
          placeholder="CA"
          required
        />
      </label>
    </div>
  );
}

export default FormTotalPointsAndPosition;

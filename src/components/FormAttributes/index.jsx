import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import { onlyNumber } from "../../helpers/formatValues";
import { getAttrNamesAndValues } from "../../helpers/getAttributes";
import "./styles/FormAttributes.css";

function FormAttributes({ handleFormChange, handleValuesChange }) {
  const { currentCard } = useContext(CardsContext);
  const attributes = getAttrNamesAndValues(currentCard);

  return (
    <div className="_form_attributes _form_top">
      {attributes.map((attr, i) => {
        const index = i + 1;

        const formatAttrName = `attr${index}Name`;
        const formatAttrValue = `attr${index}Value`;
        const attributeName = attr[formatAttrName];
        const attributeValue = attr[formatAttrValue];

        return (
          <div key={i} className="_form_attribute">
            <label htmlFor={formatAttrName} className="_form_attribute_name">
              {`Attribute ${index}`}
              <input
                type="text"
                id={formatAttrName}
                name={formatAttrName}
                value={attributeName}
                onChange={handleFormChange}
                maxLength={3}
                required
              />
            </label>
            <label htmlFor={formatAttrValue} className="_form_attribute_value">
              0-99
              <input
                type="text"
                id={formatAttrValue}
                name={formatAttrValue}
                value={attributeValue}
                onChange={handleValuesChange}
                onKeyDown={onlyNumber}
                maxLength={3}
                placeholder={attributeName}
                required
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default FormAttributes;

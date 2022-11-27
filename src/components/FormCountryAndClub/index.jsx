import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { CardsContext } from "../../context/CardsContext";

function FormCountryAndClub({ handleFormChange }) {
  const { currentCard } = useContext(CardsContext);
  const [countries, setCountries] = useState([]);
  const { country, club } = currentCard;

  useEffect(() => {
    const fetchAndSetCountries = async () => {
      const response = await fetch("https://flagcdn.com/en/codes.json");
      const responseJSON = await response.json();
      setCountries(Object.entries(responseJSON));
    };
    fetchAndSetCountries();
  }, []);

  return (
    <div className="_form_top">
      <label htmlFor="_country">
        <span>
          <Icon icon="gis:world-map-alt" />
          Nationality
        </span>
        <select
          name="country"
          id="_country"
          value={country}
          onChange={handleFormChange}
        >
          {countries.map((country, i) => {
            const [key, value] = country;
            return (
              <option key={i} value={key}>
                {value}
              </option>
            );
          })}
        </select>
      </label>
      <label htmlFor="_club_input">
        <span>
          <Icon icon="ion:shield-half-sharp" />
          Logo Team
        </span>
        <input
          value={club}
          type="text"
          id="_club_input"
          name="club"
          onChange={handleFormChange}
          placeholder="https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/FCBarcelona.svg/1200px-FCBarcelona.svg.png"
          required
        />
      </label>
    </div>
  );
}

export default FormCountryAndClub;

import { Link } from "react-router-dom";
import "./styles/Header.css";
import { Icon } from "@iconify/react";

function Header() {
  return (
    <header className="_header">
      <Link to="/">
        <Icon icon="ri:home-5-line" />
        <span>Home</span>
      </Link>
      <Icon icon="simple-icons:fifa" />
      <Link to="/cards">
      <Icon icon="mdi:cards-outline" />
        <span>All Cards</span>
      </Link>
    </header>
  );
}

export default Header;

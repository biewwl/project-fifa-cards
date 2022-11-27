import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Collection from "./components/Collection";
import CardsProvider from "./context/CardsContext";
import SavedCards from "./pages/SavedCards";
import "./styles/backgrounds/backgrounds.css";
import "./App.css";
import "./styles/colors/colors.css";
import "./styles/fontsAndAnimations/fontsAndAnimations.css";

function App() {
  return (
    <div className="App">
      <CardsProvider>
        <Routes>
          <Route
            exact
            path="/collection/:collectionName"
            element={<Collection />}
          />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cards" element={<SavedCards />} />
        </Routes>
      </CardsProvider>
    </div>
  );
}

export default App;

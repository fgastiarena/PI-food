import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import FormRecipe from "./components/FormRecipe/FormRecipe";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/recipes/:id" element={<RecipeDetail/>} />
        <Route exact path="/create" element={<FormRecipe/>}/>
      </Routes>
    </div>
  );
}

export default App;

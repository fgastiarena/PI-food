import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, getAllrecipes, getAllRecipesAndDiets, orderByAlpha, orderByHealthScore, orderRecipesByDiet } from "../../actions/actions.jsx";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import './Home.css';
import notFound4 from '../images/notFound4.gif';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.allRecipesState);
  const allDiets = useSelector(state => state.diets);
  const isLoading = useSelector(state => state.isLoading);


  useEffect(() =>{
      dispatch(getAllRecipesAndDiets());
  }, [dispatch])


  function chargeRecipes(e){
    let selectList = document.querySelectorAll('.default-select');
    selectList.forEach(select => select.value = 'DEFAULT')
      e.preventDefault();
      setCurrentPage(1);
      dispatch(getAllrecipes());
  }

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPerPage; // 1 * 9 = 9
  const indexFirstRecipe = indexLastRecipe - recipesPerPage; // 9 - 9 = 0
  const recipesInCurrentPage = allRecipes.slice(indexFirstRecipe, indexLastRecipe); // 0 - 9 // 9 - 18 // 18 - 27

//   console.log(indexFirstRecipe);
//   console.log(indexLastRecipe);

  const pagination = (pageNumber) => {
      setCurrentPage(pageNumber); 
  }

  //FILTROS

  //estado local vacío para renderizar los globales
  const [order, setOrder] = useState('');

  function handleAlpha(e){
      e.preventDefault();
      dispatch(orderByAlpha(e.target.value));
      setCurrentPage(1);
      setOrder(e.target.value) //cuando seteo la pag ↑, modifico el estado local y renderizo
    };

  function handleDiets(e){
      e.preventDefault();
      dispatch(orderRecipesByDiet(e.target.value));
      setCurrentPage(1);

  };

  function handleScore(e){
      e.preventDefault();
      dispatch(orderByHealthScore(e.target.value));
      setCurrentPage(1);
      setOrder(e.target.value);
  };


  return(
      <div className="container-home">
          <div>
              {
                  isLoading ? (
                      <LoadingPage/>
                  ) : (
                      <NavBar setCurrentPage={setCurrentPage}/>
                  )
              }
          </div>
              <button className="up-btn" onClick={e => chargeRecipes(e)}>All Recipes</button>
          <div className="filters-container">

              <select className="default-select" defaultValue={"DEFAULT"} onChange={e => {handleAlpha(e)}}>
                  <option value="DEFAULT">Alphabetic</option>
                  <option value="Asc">A-Z</option>
                  <option value="Desc">Z-A</option>
                </select>
              
                <select className="default-select" defaultValue={"DEFAULT"} onChange={e => {handleScore(e);}}>
                    <option value="DEFAULT">Health Score</option>
                    <option value='highScore'>Healthier</option>
                    <option value='lowScore'>Less Healthy</option>
                </select>

                <select className="default-select" defaultValue={"DEFAULT"} onChange={e => {handleDiets(e)}}>
                    <option value="DEFAULT">Select Diets</option>
                    {allDiets?.map(diet => {
                        return (diet.name ? <option value={diet.name} key={diet.id}> {diet.name} </option> : <option value={diet} key={diet}>{diet}</option>)
                    })}
                </select>
          </div>

          {(allRecipes.length === 0) && (<div className="not-found-message-container"><p className="not-found-message">Recipe not Found!</p>
                <img className="img-notFound"src={notFound4} alt='not found'/></div>)}
            
          <div>
              <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagination={pagination}/>
          </div>

          <div className="recipe-home">
              {
                  recipesInCurrentPage?.map(recipe => {
                      return (
                          <RecipeCard key={recipe.id} id={recipe.id} image={recipe.image} title={recipe.title} healthScore={recipe.healthScore} diets={recipe.diets}/>
                      )
                  })
              }
          </div>

          <div>
              <a style={{'textDecoration': 'none'}} href="#">
                  <button className="up-btn">Go Up ↑</button>
              </a>
          </div>
      </div>
  )
 
}


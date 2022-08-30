import React from 'react';

let initialState = {
    allRecipesState: [],
    recipesState: [], //copia del state para los filtros
    diets: [],
    detail: [], //detalle de c/u por id
    isLoading: false,
};

export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                allRecipesState: action.payload,
                recipesState: action.payload,
            };
        case 'GET_ALL_DIETS':
            return{
                ...state,
                diets: action.payload
            };
        case 'GET_ALL_RECIPES_AND_DIETS':
            return{
                ...state,
                allRecipesState: action.payload.allRecipes,
                recipesState: action.payload.allRecipes,
                diets: action.payload.allDiets
            }
        case 'GET_RECIPES_BY_NAME':
            return{
                ...state,
                allRecipesState: action.payload,
            };
        case 'GET_RECIPES_BY_ID':
            return{
                ...state,
                detail: action.payload
            }
        case 'ORDER_BY_ALPHA':
            const alphaState = state.recipesState;
            const alphabetic = action.payload === 'Asc' ? 
                            alphaState.sort((a, b) => a.title.localeCompare(b.title)) :
                            alphaState.sort((a, b) => b.title.localeCompare(a.title)) ;
            return{
                ...state,
                allRecipesState: alphabetic
            };
        case 'ORDER_BY_DIET':
            const dietsState = state.recipesState;
            const dietFilter = action.payload === 'All' ? dietsState : dietsState.filter(recipe => {
                return (recipe.diets.includes(action.payload)) || (recipe.diets.some( diet => diet.name === action.payload))
            });
            return{
                ...state,
                allRecipesState: dietFilter
            };
        case 'ORDER_BY_SCORE':
            const scoreState = state.recipesState;
            const score = action.payload === 'highScore' ?
                            scoreState.sort((a,b) => b.healthScore - a.healthScore) :
                            scoreState.sort((a,b) => a.healthScore - b.healthScore) ;
            return {
                ...state,
                allRecipesState: score
            };
            case 'SET_LOADING':
                return {
                  ...state,
                  isLoading: action.payload.isLoading
                };

        default:
            return state;
    }

}
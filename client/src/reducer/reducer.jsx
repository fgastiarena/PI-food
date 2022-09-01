import React from 'react';

let initialState = {
    allRecipesState: [],
    recipesState: [],
    diets: [],
    detail: [],
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
            // const newObject = {...state.recipesState};
            // console.log('1', newObject);
            const alphaState = state.recipesState;
            const alphabetic = action.payload === 'Asc' ? 
                            alphaState.sort((a, b) => a.title.localeCompare(b.title)) :
                            alphaState.sort((a, b) => b.title.localeCompare(a.title)) ;
            // console.log('2', state.recipesState);
            return{
                ...state,
                allRecipesState: alphabetic
            };
        case 'FILTER_BY_DIET':
            // const newObject2 = {...state.recipesState};
            // console.log('1', newObject2);
            // const dietsState = state.recipesState;
            state.recipesState = action.payload === 'All' ? state.recipesState : state.recipesState.filter(recipe => {
                return (recipe.diets.includes(action.payload)) || (recipe.diets.some( diet => diet.name === action.payload))
            });
            // console.log('2', state.recipesState);
            return{
                ...state,
                allRecipesState: state.recipesState
            };
        case 'ORDER_BY_SCORE':
            // const newObject3 = {...state.recipesState};
            // console.log('1', newObject3);
            const scoreState = state.recipesState;
            const score = action.payload === 'highScore' ?
                            scoreState.sort((a,b) => b.healthScore - a.healthScore) :
                            scoreState.sort((a,b) => a.healthScore - b.healthScore) ;
            // console.log('2', state.recipesState);
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
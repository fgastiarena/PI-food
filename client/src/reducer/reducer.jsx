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
            const alphabetic = action.payload === 'Asc' ? 
                            state.recipesState.sort((a, b) => a.title.localeCompare(b.title)) :
                            state.recipesState.sort((a, b) => b.title.localeCompare(a.title)) ;
            return{
                ...state,
                allRecipesState: alphabetic
            };
        case 'ORDER_BY_DIET':
            const allRecipes = state.recipesState;
            const dietFilter = action.payload === 'All' ? allRecipes : allRecipes.filter(recipe => recipe.diets.includes(action.payload));
            return{
                ...state,
                allRecipesState: dietFilter
            };
        case 'ORDER_BY_SCORE':
            const score = action.payload === 'highScore' ?
                            state.recipesState.sort((a,b) => b.healthScore - a.healthScore) :
                            state.recipesState.sort((a,b) => a.healthScore - b.healthScore) ;
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
import axios from 'axios';


export function getAllrecipes() {
    return async function(dispatch) {
        try {
            dispatch({
                type:'SET_LOADING',
                payload:{isLoading: true}
            });
            let allRecipes = await axios.get('http://localhost:3001/recipes');
            dispatch({
                type: 'GET_ALL_RECIPES',
                payload: allRecipes.data
            });
            return dispatch({
                type:'SET_LOADING',
                payload:{isLoading: false}
            });
        } catch (error) {
            console.error('Error en getAllRecipes --> ', error);
        }
    }
};

export function getAllDiets(){
    return async function(dispatch){
        try {
            dispatch({
                type:'SET_LOADING',
                payload:{isLoading: true}
            });
            let allDiets = await axios.get('http://localhost:3001/diets');
            dispatch({
                type: 'GET_ALL_DIETS',
                payload: allDiets.data
            });
            return dispatch({
                type:'SET_LOADING',
                payload:{isLoading: false}
            });
        } catch (error) {
            console.error('Error en getAllDiets --> ', error);
        }
    }
};

export function getAllRecipesAndDiets(){
    return async function(dispatch){
        try {
            dispatch({
                type:'SET_LOADING',
                payload:{isLoading: true}
            });
            let allRecipes = await axios.get('http://localhost:3001/recipes');
            let allDiets =  await axios.get('http://localhost:3001/diets');

            dispatch({
                type: 'GET_ALL_RECIPES_AND_DIETS',
                payload: {
                    allRecipes: allRecipes.data, 
                    allDiets: allDiets.data
                }
            });
            return dispatch({
                type:'SET_LOADING',
                payload:{isLoading: false}
            });
        } catch (error) {
            console.error('Error en getAllRecipesAndDiets --> ', error);
        }
    }
}

export function getRecipesByName(name){
    return async function(dispatch){
        try {
            dispatch({
                type:'SET_LOADING',
                payload:{isLoading: true}
            });
            let recipesByName = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            dispatch({
                type: 'GET_RECIPES_BY_NAME',
                payload: recipesByName.data
            });
            return dispatch({
                type:'SET_LOADING',
                payload:{isLoading: false}
            });
            
        } catch (error) {
            console.error('Error en getRecipesByName(name) --> ', error);
        }
    }
};

export function getRecipesById(id){
    return async function(dispatch){
        try {
            dispatch({
                type:'SET_LOADING',
                payload:{isLoading: true}
            });
            let recipesById = await axios.get(`http://localhost:3001/recipes/${id}`);
            dispatch({
                type: 'GET_RECIPES_BY_ID',
                payload: recipesById.data
            });
            return dispatch({
                type:'SET_LOADING',
                payload:{isLoading: false}
            }); 
            
        } catch (error) {
            console.error('Error en getRecipesById(id) --> ', error);
        }
    }
};

export function postRecipe(payload){
    return async function(){
        try {
            let newRecipe = await axios.post('http://localhost:3001/recipes/create', payload)
            return newRecipe;
        } catch (error) {
            console.error('Error en postRecipe --> ', error);
        }
    }
}


//FILTROS

export function orderRecipesByDiet(payload){
    return {
        type: 'ORDER_BY_DIET',
        payload
    }
};

export function orderByAlpha(payload){
    return{
        type: 'ORDER_BY_ALPHA',
        payload
    }
};

export function orderByHealthScore(payload){
    return{
        type: 'ORDER_BY_SCORE',
        payload
    }
};

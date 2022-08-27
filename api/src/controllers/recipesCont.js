const axios = require('axios');
const ENV = process.env;
const { Recipe, Diet } = require('../db.js');


//------------- ALL RECIPES -------------

const getRecipesFromApi = async() => {
    const getApiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ENV.APIKEY}&addRecipeInformation=true&number=100`);
    const getApiInfo = await getApiUrl.data.results.map(re => {
        return {
            id: re.id,
            title: re.title,
            summary: re.summary,
            healthScore: re.healthScore,
            steps: re.analyzedInstructions[0]?.steps.map(e => e.step),
            image: re.image,
            diets: re.diets.map(d => d)
        }
    });
    return getApiInfo;
};


const getDataBaseInfo = async() => {
    return await Recipe.findAll({
        include: [{
            model: Diet,
            attributes: ['name']
        }]
    })
};

//combino ambos arrays, el que me trae la info de la api y el que me trae la info de la db

const getAllRecipes = async() => {
    let apiRecipes = await getRecipesFromApi();
    let dbInfo = await getDataBaseInfo();
    let totalRecipes = [...apiRecipes, ...dbInfo];

    return totalRecipes;
};

//------------- ID -------------

const searchByIdAtApi = async(id) => {
    const recipeIdAtApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${ENV.APIKEY}`);
    const detailRecipe = recipeIdAtApi.data;
    return {
        id: detailRecipe.id,
        title: detailRecipe.title,
        summary: detailRecipe.summary.replace(/<[^>]*>?/g, ''),
        healthScore: detailRecipe.healthScore,
        steps: detailRecipe.analyzedInstructions[0]?.steps.map(el => el.step),
        image: detailRecipe.image,
        diets: detailRecipe.diets
    }
};

const searchByIdAtDataBase = async(id) => {

    const dataBaseIds = await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name']
        }
    });

    return {
        id: dataBaseIds.id,
        title: dataBaseIds.title,
        summary: dataBaseIds.summary.replace(/<[^>]*>?/g, ''),
        healthScore: dataBaseIds.healthScore,
        steps: dataBaseIds.steps,
        image: dataBaseIds.image,
        diets: dataBaseIds.diets.map(e => e.name)
    };
};



const searchById = async(id) => {

    if (id.includes('-')) {
        const dbId = await searchByIdAtDataBase(id);
        return dbId;
    }
    const apiId = await searchByIdAtApi(id);
    return apiId;

};




module.exports = {
    getRecipesFromApi,
    getDataBaseInfo,
    getAllRecipes,
    searchById,
    searchByIdAtDataBase,
    searchByIdAtApi
}
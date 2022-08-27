const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const { getAllRecipes, searchById } = require('../controllers/recipesCont.js');

router.get('/', async(req, res) => {
    const { name } = req.query;

    try {
        let totalRecipes = await getAllRecipes();
        if (name) {
            let recipes = totalRecipes.filter(r => r.title?.toLowerCase().includes(name.toLowerCase()));
            
            recipes.length ? res.status(200).send(recipes) : res.status(500).json({ msg: 'Recipe not found' });
        } else {
            res.status(200).send(totalRecipes);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en routes/recipes/{name} --> ', error });
    }
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const ids = await searchById(id);

        !ids ?
            res.status(404).send('There is not recipe with this ID!') :
            res.status(200).send(ids);

    } catch (error) {
        res.status(500).json({ msg: 'Error en routes/recipes/{id} --> ', error });
    }

})

router.post('/create', async(req, res) => {
    const { title, summary, healthScore, steps, image, diets } = req.body;

    // if(!title || !summary) res.status(404).send('Missing data!');

    try {
        const recipeCreated = await Recipe.create({
            title,
            summary,
            healthScore,
            steps,
            image
        });

        let dietsInDataBase = await Diet.findAll({
            where: { id: diets }
        });

        if (!title || !summary) res.status(404).send('Missing data!');

        recipeCreated.addDiet(dietsInDataBase);

        res.status(200).json({ msg: 'Recipe successfully created!' })

    } catch (error) {
        res.status(500).json({ msg: 'Error en routes/recipes/POST --> ', error });
    }
});


module.exports = router;
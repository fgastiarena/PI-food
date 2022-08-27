const axios = require("axios");
const { Diet } = require("../db.js");

const getAllDietsTypes = async () => {

    const dietsTypes = [
      "gluten free",
      "ketogenic",
      "vegetarian",
      "lacto vegetarian",
      "lacto ovo vegetarian",
      "ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
    ];

    dietsTypes.map(el => {
        Diet.findOrCreate({
            where: {name : el}
        })
    });

    return await Diet.findAll();
};

module.exports = {getAllDietsTypes}

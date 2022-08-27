import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({id, image, title, healthScore, diets}) {
  return (
    <div>
        <Link to={`/recipes/${id}`} className='card-link'>
            <div className='card-div'>
                <img className='img-card' src={image} alt='Image not found'/>
                <h2 className='main-title-card'>{title}</h2>
                <h4 className='title-card'>💚 {healthScore}% HEALTHY</h4>
                {diets?.map(diet => {
                  return diet.name ?  <h3 className='title-card' key={diet.name}>· {diet.name}</h3> :  <h3 className='title-card'key={diet}>· {diet}</h3>
                })}
            </div>
        </Link>
    </div>
  )
}

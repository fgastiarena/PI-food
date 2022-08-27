import React from 'react';
import './Pagination.css'

export default function Pagination({recipesPerPage, allRecipes, pagination}) {
    const pageNumber = [];

    for (let i = 1; i < (Math.ceil(allRecipes/recipesPerPage)) +1; i++) {
        pageNumber.push(i);
    }

    return( 
        <nav className='pagination-container'>
            <ul className='ulPag'>
                {
                    pageNumber?.map(page => (
                        <li className='list-items-pag' key={page} value={page} onClick={()=> pagination(page)}>{page}</li>
                    ))
                }
            </ul>
        </nav>
    )
}

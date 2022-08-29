import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../../../actions/actions';
import './SearchBar.css';


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    };

    function handleSubmit(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getRecipesByName(name));
        setName(''); 
    };

    function handleEnter(e){
        if(e.key === 'Enter') handleSubmit(e);
    }

  return (
    <div className='search-container'>
        <input
            className='input-search'
            type='text'
            placeholder='Search Recipe ..'
            onChange={e => {handleChange(e)}}
            onKeyDown={e => {handleEnter(e)}}
            value={name}
        />
        <button className='btn-search' onClick={e => {handleSubmit(e)}} type='submit'>🔍</button>
    </div>
  )
}

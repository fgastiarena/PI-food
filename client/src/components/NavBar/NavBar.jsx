import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar';
import './NavBar.css';

export default function NavBar({setCurrentPage}) {
  const navigate = useNavigate()

  function handleClick(e){
    e.preventDefault();
    navigate('/create');
  }

  return (
    <div className='header-nav'>
      <button className='btn-nav' type='submit' onClick={e => {handleClick(e)}}>Create Recipe</button>
      <h1 className='title-nav'>RECIPES BOOK</h1>
      <SearchBar setCurrentPage={setCurrentPage}/>
    </div>
  )
}

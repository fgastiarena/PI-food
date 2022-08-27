import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipesById } from '../../actions/actions';
import LoadingPage from '../LoadingPage/LoadingPage';
import './RecipeDetail.css';

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.isLoading);
  const detail = useSelector(state => state.detail);

  useEffect(() => {
    dispatch(getRecipesById(id));
  }, [dispatch, id]);

  function handleClick(e){
    e.preventDefault();
    navigate('/home');
  }

  return(
    <div className='container-detail'>

      <div className='cardDetail'>
        {isLoading ? (
          <LoadingPage/>
        ) : (
          <>
            <img className='detail-img' src={detail.image} alt='notFound'/>
            <h1 className='titleName'>{detail.title}</h1>
            <h3 className='middle-titles'>SUMMARY</h3>
            <p className='p-tags'>{detail.summary}</p>
            <h3 className='middle-titles'>HEALTH SCORE</h3>
            <p className='p-tags'>{detail.healthScore}%</p>
            <h3 className='middle-titles'>INSTRUCTIONS</h3>
            <p className='p-tags'>{detail.steps}</p>
            <h3 className='middle-titles'>DIETS</h3>
            <p className='p-tags'> {detail.diets?.map(diet => <li key={diet}>{diet}</li>)}</p>
          </>
        )}

      </div>
        
        <button className='btn-detail' type="submit" onClick={(e) => handleClick(e)}>
          Back to Home 
        </button>
       

    </div>
  )

}

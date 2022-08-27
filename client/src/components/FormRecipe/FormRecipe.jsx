import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllDiets, getAllrecipes, postRecipe } from '../../actions/actions';
import './FormRecipe.css';


const validationForm = (input) => {
  let errors = {};
  let validateName = /^[a-zA-Z\s]+$/;

  if (!input.title.length) {
    errors.title = "This field cannot be empty";
  }
  if (!validateName.test(input.title)) {
    errors.title = "Special characters or numbers are not allowed";
  }
  if (!input.summary.length) {
    errors.summary = "This field cannot be empty";
  }
  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "Number required. Must be a number between 1-100";
  }
  if (!input.steps.length) {
    errors.steps = "This field cannot be empty";
  }
  if (input.steps.length < 40) {
    errors.steps = "This field must be longer than 40 characters";
  }
  if (input.diets.length === 0) {
    errors.diets = "Select at least one diet";
  }

  return errors;
};

export default function FormRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allDiets = useSelector(state => state.diets);
  const initialState = {
    title: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: []
  };

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getAllDiets())
    dispatch(getAllrecipes())
  }, [dispatch]);


  function handleChange(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    // setErrors(
    //   validationForm({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  function handleSelect(e){
    if(!input.diets.includes(e.target.value)){
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    //   setErrors(
    //     validationForm({
    //       ...input,
    //       diets: [...input.diets, e.target.value]
    //     })
    //   )
    // }
    }
  };
  
  function handleDelete(e){
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== e.target.name)
    });
  };
  
  function handleSubmit(e){
    e.preventDefault();
    setErrors(validationForm(input));
    // if (Object.values(errors).length !== 0) return;
    const errors = validationForm(input);
    if(!input.image){
      input.image = 'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_960_720.jpg';
    }

    if (Object.values(errors).length === 0) {
      dispatch(postRecipe(input));
      alert("Recipe successfully created!");
      document.formAct.reset();
      setInput(initialState);
    } else {
      alert("Please complete all the entries before creating a recipe");
    }
  };

  return(
      <div className='container-form'>
        <form className='form' name="formAct">
          <h2>Create your Recipe</h2>

          {/* -----TITLE----- */}
          <div className='div-inputs'>
          <input
              className='input-detail'
              type='text'
              name='title'
              value={input.title}
              placeholder='Recipe name..'
              onChange={e => handleChange(e)}
            />
            {errors.title && <p className='form-error'>{errors.title}</p>}            
          </div>

          {/* -----IMAGE----- */}
          <div className='div-inputs'>
          <input
          className='input-detail'
            type='url'
            name='image'
            value={input.image}
            autoComplete='off'
            placeholder=" URL Image (Optional)..."
            onChange={e => handleChange(e)}
          />
           {errors.image && <p className='form-error'>{errors.image}</p>}            
          </div>

          {/* -----SUMMARY----- */}
          <div className='div-inputs'>
          <textarea
          className='input-detail'
            type='text'
            name='summary'
            value={input.summary}
            autoComplete='off'
            placeholder='Summary...'
            onChange={e => handleChange(e)}
          />
           {errors.summary && <p className='form-error'>{errors.summary}</p>}            
          </div>

          {/* -----HEALTH SCORE----- */}
          <div className='div-inputs'>
          <input
          className='input-detail'
            type='number'
            name='healthScore'
            value={input.healthScore}
            autoComplete='off'
            placeholder='Health Score'
            onChange={e => handleChange(e)}
          />
           {errors.healthScore && <p className='form-error'>{errors.healthScore}</p>}            
          </div>

          {/* -----STEPS----- */}
          <div className='div-inputs'>
          <textarea
          className='input-detail'
            type='text'
            name='steps'
            value={input.steps}
            autoComplete='off'
            placeholder='Instructions...'
            onChange={e => handleChange(e)}
          />
           {errors.steps && <p className='form-error'>{errors.steps}</p>}            
          </div>

          {/* -----DIETS----- */}
          <div className='div-inputs'>
            <select onChange={e => handleSelect(e)} className='input-detail'>
              <option value="" name='diets' hidden>Select Diets</option>
              {
                allDiets?.map(diet => {
                  return ( <option value={diet.id} key={diet.id}>{diet.name}</option>)
                })
              }
            </select>
          </div>

          {/* -----DIETS LIST----- */}
          <div className='div-inputs'>
            <ul className='diets-list'>
             
               {input.diets.map(diet => 
               <li>
                <button className='btn-form-delete' name={diet} onClick={e => handleDelete(e)}>❌</button>
                <span>{allDiets?.find(element => element.id === diet)?.name.toUpperCase()}</span>
              </li>
                )}
             
            </ul>
          </div> 
          {errors.diets && <p className='form-error'>{errors.diets}</p>}

        <div className='buttons'>
            <button className='final-btn' type='submit' onClick={e => handleSubmit(e)}>Create Recipe 🍳</button>
            <button className='final-btn' onClick={(e) => {
                e.preventDefault();
                navigate('/home');
              }}>
              Back to Home
            </button>
        </div>

        </form>
      </div>

  )

}


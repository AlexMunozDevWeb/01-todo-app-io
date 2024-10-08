import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  position: relative;

  min-height: 300px; width: 100%;
  padding: 50px 0 85px 0;

  input[type="text"]{
    border: none;
    line-height: 15px;
    padding: 10px 5px;
    width: 100%;

    &:active, &:focus{
      outline: none;  
    }
  }

  .bg-image{
    position: absolute;
    width: 100%;height: 100%;

    top: 0;
    object-fit: cover;
    z-index: -1;
  }

  .title-button-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    > h1{
      height: 31px;
      letter-spacing: 10px;
    }

    > button{
      background-color: transparent;
      border: none;
      cursor: pointer;
      height: fit-content;
    }

  }

  .form-wrapper{
    button.add-task{
      position: relative;
      cursor: pointer;

      border-radius: 50%;
      height: 28px; width: 30px;

      &:hover{
        border: unset!important;
      } 

      &::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        height: 29px; width: 30px;
        top: 0px; left: 0px;
        padding: 2px;
        z-index: 0;
  
        background: var(--check-background); /* Gradient colors */
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }

    }
    
  }
`;

// Se le pasa por parámetro la desestructuración del objeto para facilitar su acceso
export default function Header( {addItem, darkMode, changeDarkMode} ) {

  const bgDarkMode = darkMode ? 'bg-mobile-dark.webp' : 'bg-mobile-light.webp'
  const iconDarkMode = darkMode ? 'icon-sun.svg' : 'icon-moon.svg'

  const [newTodo, setNewTodo] = useState('')

  // Evento que obtiene el valor del input y se le añade al state temporal
  const handleChange = (e) => {
    setNewTodo( e.target.value )
  }

  // Evento click que añade el string del state temporal al de la lista de TODOS
  const handleClick = (e) => {
    e.preventDefault()
    if (newTodo.length > 0) {
      addItem( {id: uuidv4(),
                active: true,
                name: newTodo} )
      setNewTodo('')
    }
  }

  return (
    <StyledHeader>
      <img 
        src={`/images/${bgDarkMode}`} 
        alt="Imagen desktop dark mode" 
        className="bg-image"
      />

      <div className="container">
        <div className="title-button-wrapper">

          <h1>TODO</h1>
          <button 
            onClick={changeDarkMode}
          >
            <img src={`/images/${iconDarkMode}`} alt="Imagen para cambiar a dark/light mode" />
          </button>

        </div>

        <form>
          <div className="form-wrapper">
            <button 
              className="add-task" 
              onClick={handleClick}
            />
            <input 
              type="text" 
              id="text_todo" 
              placeholder="Crear nuevo todo..."
              value={newTodo}
              onChange={handleChange}
            />
          </div>
        </form>

      </div>
    </StyledHeader>
  )
}

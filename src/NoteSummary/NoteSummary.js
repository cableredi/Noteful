import React from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

function convertDate(date) {
  let d = new Date(date);
  return d.toDateString();
}

NoteSummary.defaultProps ={
  onDeleteNote: () => {},
  onNote: false
}

export default function NoteSummary(props) {
console.log(props)
  return(
    <div className='Note'>
      <NavLink
        className='Note_selected'
        to={`/note/${props.id}`}
      >
        <div className='bold Note_noteName'>{props.name}</div>
      </NavLink>
      <div>
        <span className='bold Note_noteModified'>Date modified: </span> { convertDate(props.modified) }
        <NotefulContext.Consumer>
          { (context) => (
            <button 
              type='button'
              onClick={ () => {
                context.deleteNote(props.id)
              }}
            >
              Delete Note
            </button>
          )}
        </NotefulContext.Consumer>
      </div>
    </div>
  )
}



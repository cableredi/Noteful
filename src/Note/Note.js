import React from 'react';
import { NavLink } from 'react-router-dom';

function convertDate(date) {
  let d = new Date(date);
  return d.toDateString();
}

export default function NoteNote(props) {
  return(
    <div className='Note'>
      <NavLink
        className='Note_selected'
        to={`/note/${props.id}`}
      >
        <div className='bold noteName'>{props.name}</div>
      </NavLink>
      <div>
        <span className='bold noteModified'>Date modified: </span> { convertDate(props.modified) }
        <button type='button'>Delete Note</button>
      </div>
    </div>
  )
}




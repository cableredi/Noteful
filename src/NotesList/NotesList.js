import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotesList(props) {
  const notesItems = props.notes.map( (note) => 
    <li key={note.id}>
      <NavLink
        className='Note_selected'
        to={`/note/${note.id}`}
      >
        <div className='bold noteName'>{note.name}</div>
      </NavLink>
      <div className='NotesList_info'>
        <span className='bold noteModified'>Date modified: </span> {note.modified}
        <button type='button'>Delete Note</button>
      </div>
    </li>
  )


  return(
    <>
      <ul className='NotesList'>
        {notesItems}
      </ul>
      <button type='button' className='NoteButton'>Add Note</button>
    </>
  )
}
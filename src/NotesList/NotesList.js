import React from 'react';
import NoteSummary from '../NoteSummary/NoteSummary'

export default function NotesList(props) {

  const notesItems = props.notes.map( (note) => 
    <NoteSummary
      id={note.id}
      key={note.id}
      name={note.name}
      modified={note.modified}
    />
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
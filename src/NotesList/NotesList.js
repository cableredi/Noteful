import React from 'react';
import Note from '../Note/Note'

export default function NotesList(props) {

  const notesItems = props.notes.map( (note) => 
    <Note
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
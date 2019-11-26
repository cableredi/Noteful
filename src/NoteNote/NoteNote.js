import React from 'react';
import Note from '../Note/Note'

export default function NoteNote(props) {
  return(
    <div className='Note_note'>
      <Note
        id={props.notes[0].id}
        name={props.notes[0].name}
        modified={props.notes[0].modified}
      />
      <div className='Note_content'>{props.notes[0].content}</div>
    </div>
  )
}
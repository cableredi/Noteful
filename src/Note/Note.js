import React from 'react';

export default function Note(props) {
  return(
    <>
      <div className='bold noteName'>{props.notes[0].name}</div>
      <div className='NotesList_info'>
        <span className='bold noteModified'>Date modified: </span> {props.notes[0].modified}
        <button type='button'>Delete Note</button>
      </div>
      <div>{props.notes[0].content}</div>
    </>
  )
}
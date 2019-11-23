import React from 'react';

function convertDate(date) {
  let d = new Date(date);
  return d.toDateString();
}

export default function Note(props) {
  return(
    <div className='Note'>
      <div className='bold Note_noteName'>{props.notes[0].name}</div>
      <div>
        <span className='bold Note_Modified'>Date modified: </span> { convertDate(props.notes[0].modified) }
        <button type='button'>Delete Note</button>
      </div>
      <div className='Note_content'>{props.notes[0].content}</div>
    </div>
  )
}
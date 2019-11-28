import React from 'react';
import NoteSummary from '../NoteSummary/NoteSummary'


export default function Note(props) {
  return(
    <div className='Note_note'>
      <NoteSummary
        id={props.notes.id}
        name={props.notes.name}
        modified={props.notes.modified}
      />
      <div className='Note_content'>{props.notes.content}</div>
    </div>
  )
}

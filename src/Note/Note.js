import React from 'react';
import { useHistory } from 'react-router-dom';
import NoteSummary from '../NoteSummary/NoteSummary'

function onDeleteNote(history) {
console.log('onDeleteNote')
console.log(history)
  history.push('/')
}

export default function Note(props) {
  let history = useHistory();
  return(
    <div className='Note_note'>
      <NoteSummary
        id={props.notes.id}
        name={props.notes.name}
        modified={props.notes.modified}
        onDeleteNote={onDeleteNote(history)}
      />
      <div className='Note_content'>{props.notes.content}</div>
    </div>
  )
}

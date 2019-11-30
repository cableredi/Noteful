import React from 'react';
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import config from '../config';

function convertDate(date) {
  let d = new Date(date);
  return d.toDateString();
}

NoteSummary.defaultProps = {
  deleteNote: () => {}
}

function deleteNoteRequest(props, callback, history) {
  fetch(config.API_ENDPOINT_NOTES + `/${props.id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw error
        })
      }
      history.push('/');
      callback(props.id)
    })
    .catch(error => {
      console.error(error)
    })
}

function NoteSummary(props) {
  let history = useHistory();

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
                deleteNoteRequest(props, context.onDeleteNote, history)
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

export default withRouter(NoteSummary);

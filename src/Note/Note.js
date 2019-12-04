import React from 'react';
import PropTypes from 'prop-types';
import NoteSummary from '../NoteSummary/NoteSummary'

export default function Note(props) {
  if (!props.notes) {
    return null;
  }

  return(
    <section className='App_NotesList'>
      <div className='Note_note'>
        <NoteSummary
          id={props.notes.id}
          name={props.notes.name}
          modified={props.notes.modified}
        />
        <div className='Note_content'>{props.notes.content}</div>
      </div>
    </section>
  )
}

Note.defaultProps = {
  notes: ''
}

Note.propTypes = {
  notes: PropTypes
    .object
    .isRequired
};
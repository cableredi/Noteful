import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteSummary from '../NoteSummary/NoteSummary'
import AddButton from '../AddForms/AddButton';

export default function NotesList(props) {
  const notesItems = props.notes.map( (note) => 
    <NoteSummary
      id={note.id}
      key={note.id}
      name={note.noteName}
      modified={note.modified}
    />
  )


  return(
    <section className='App_NotesList'>
      <div className='NotesList'>
        {notesItems}
      </div>

      <div className='Add_button'>
          <AddButton
            tag={Link}
            to='../addNote'
            type='button' 
            className='Add_button-button'
          >
            Add Note
          </AddButton>
        </div>
    </section>
  )
}

NotesList.defaultProps = {
  notes: []
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object)
};
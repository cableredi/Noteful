import React from 'react';
import PropTypes from 'prop-types';

export default function FolderNote(props) {
  console.log('Foldernote')
  console.log(props)

  return(
    <section className='App_FolderList'>
      <button type='button' className='FolderNote_GoBack' onClick={ props.history.goBack }>
        Go Back
      </button>
      <div className='Foldernote_folder'>{props.folder.folderName}</div>
    </section>
  )
}

FolderNote.defaultProps = {
  folder: ''
}

FolderNote.propTypes = {
  folder: PropTypes
    .object
    .isRequired
};
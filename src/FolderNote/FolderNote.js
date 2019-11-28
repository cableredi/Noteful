import React from 'react';

export default function FolderNote(props) {
  return(
    <>
      <button type='button' className='FolderNote_GoBack' onClick={ props.history.goBack }>
        Go Back
      </button>
      <div className='Foldernote_folder'>{props.folder.name}</div>
    </>
  )
}
import React from 'react';

export default function FolderNote(props) {
  console.log(props.history)
  return(
    <>
      <button type='button' className='FolderNote_GoBack' onClick={props.history.goBack()}>
        Go Back
      </button>
      <div>{props.folder[0].name}</div>
    </>
  )
}

FolderNote.defaultProps = {
  history: {
    goBack: () => {}
  }
}
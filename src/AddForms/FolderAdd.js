import React from 'react';
import PropTypes from 'prop-types';

export default function FolderAdd(props) {

  return(
    <section className='App_FolderList'>
      <button 
        type='button'
        role='link' 
        className='FolderNote_GoBack' 
        onClick={() => props.history.goBack() }>
          Go Back
      </button>
    </section>
  )
}

FolderAdd.defaultProps = {
  folders: [],
  history: {
    goBack: () => {}
  }
}

FolderAdd.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
};
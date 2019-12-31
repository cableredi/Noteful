import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NoteFulContext from '../NotefulContext';
import ValidateError from '../ValidateError/ValidateError';
import config from '../config';

class FolderAddForm extends Component {
  static contextType = NoteFulContext;

  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: '',
        touched: false
      },
    }
  }

/* Update state */
  updateFolderName(folderName) {
    this.setState({
      folderName: {
        value: folderName,
        touched: true
      }
    })
  }

  /* On Submit Add Folder Name to DB and go to Home Page */
  handleSubmit(e) {
    e.preventDefault();

    fetch(config.API_ENDPOINT_FOLDERS, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        folderName: this.state.folderName.value
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then( (data) => {
        this.context.addFolder(data);
        this.props.history.push('/');
      })
      .catch(error => this.setState({error}))
  }

  /* Validate Folder Name => min 3 char, alphanumeric only, cannot be duplicate */
  validateFolderName() {
    const name = this.state.folderName.value.trim();

    if (name.length === 0) {
      return {error: true, message:'Folder Name is required'};
    } else if (name.length < 3) {
      return {error: true, message:'Folder Name must be at least 3 characters long'};
    } else if (name.match(/[^a-zA-Z0-9 ]/)) {
      return {error: true, message:'Folder Name can only include Alphanumeric letters'};
    } else if ( this.context.folders.find(folder => folder.folderName.toLowerCase() === name.toLowerCase()) ) {
      return {error: true, message:`${name} already exists`};
    }

    return {error: false, message:''};
  }

  render() {
    let noteButtonDisabled = true;

    const folderNameError = this.validateFolderName();

    if (!folderNameError.error) {
      noteButtonDisabled = false;
    }

    return (
      <section className='App_NotesList'>
        <form className='AddForm' id='AddForm' onSubmit={e => this.handleSubmit(e)}>
          <h2>Add New Folder</h2>
          <label htmlFor='folderName'>Folder Name: </label>
          <input
            type='text'
            className='formInput'
            name='folderName'
            id='folderName'
            defaultValue = {this.state.folderName.value}
            aria-label="New Folder Name"
            aria-required="true"
            onChange={e => this.updateFolderName(e.target.value)}
          />
          {this.state.folderName.touched && <ValidateError message={folderNameError.message} />}
          
          <div className='submitButtons'>
            <button
              type='submit'
              className='formButtons'
              id='AddFolderButton'
              disabled={noteButtonDisabled}
            >
              Add
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(FolderAddForm);
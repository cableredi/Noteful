import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NoteFulContext from '../NotefulContext';
import ValidateError from '../ValidateError/ValidateError';
import config from '../config';


class NoteAddForm extends Component {
  static contextType = NoteFulContext;

  constructor(props) {
    super(props);
    this.state = {
      noteFolder: {
        value: '',
        touched: false
      },
      noteName: {
        value: '',
        touched: false
      },
      noteContent: {
        value: '',
        touched: false
      },
      noteAddButton: {
        value: false,
      }
    }
  }

  /* Update state */
  updateNoteName(noteName) {
    this.setState({
      noteName: {
        value: noteName,
        touched: true
      }
    })
  }

  updateNoteFolder(noteFolder) {
    this.setState({
      noteFolder: {
        value: noteFolder,
        touched: true
      }
    })
  }

  updateNoteContent(noteContent) {
    this.setState({
      noteContent: {
        value: noteContent,
        touched: true
      }
    })
  }

  updateNoteAddButton(noteAddButton) {
    this.setState({
      noteAddButton: {
        value: noteAddButton
      }
    })
  }

  /* On Submit Add Note to DB and go to Home Page */
  handleSubmit(e) {
    e.preventDefault();

    fetch(config.API_ENDPOINT_NOTES, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.noteName.value,
        folderId:  this.state.noteFolder.value,
        content: this.state.noteContent.value,
        modified: new Date(),
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then( (data) => {
        this.context.addNote(data);
        this.props.history.push('/');
      })
      .catch(error => this.setState({error}))
  }

  /* Validate Note Name => min 3 char, alphanumeric only, cannot be duplicate within Folder */
  validateNoteName() {
    const name = this.state.noteName.value.trim();

    if (name.length === 0) {
      return 'Note Name is required';
    } else if (name.length < 3) {
      return 'Note Name must be at least 3 characters long';
    } else if (name.match(/[^a-zA-Z0-9 ]/)) {
      return 'Note Name can only include Alphanumeric letters'
    } else if (this.state.noteFolder.value > '') {
      const noteName = this.state.noteName.value.trim();
      const folderId = this.state.noteFolder.value.trim();
      const notes = this.context.notes.filter(note => note.folderId === folderId)

      if ( notes.find(note => note.name === noteName) ) {
        return 'Note Name already exists in the folder';
      }
    }
  }

  /* Validate Note Folder */
  validateNoteFolder() {
    const folder = this.state.noteFolder.value.trim();

    if (folder.value === 'Folder ...') {
      return 'Folder is required';
    }
  }

  /* Validate Note Content */
  validateNoteContent() {
    const content = this.state.noteContent.value.trim();

    if (content.length === 0) {
      return 'Note Content is required';
    }
  }

  render() {
    const NoteNameError = this.validateNoteName();
    const NoteFolderError = this.validateNoteFolder();
    const NoteContentError = this.validateNoteContent();

    if (typeof NoteNameError === 'undefined' && typeof NoteFolderError === 'undefined' && typeof NoteContentError === 'undefined') {
      this.updateNoteAddButton(true);
    }

    const folderOptions = this.context.folders.map( (folder, i) => 
      <option value={folder.id} key={i}>
        {folder.name}
      </option>
    );

    return (
      <section className='App_NotesList'>
        <form className = 'AddForm'  id = 'AddForm' onSubmit={e => this.handleSubmit(e)}>
          <h2>Add New Note</h2>
          <div>
            <label htmlFor='noteFolder'>Folder: </label>
            <select
              id='noteFolder'
              name='noteFolder'
              className='formSelect'
              defaultValue = {this.state.noteFolder.value}
              aria-label="Select a folder"
							aria-required="true"
              onChange={e => this.updateNoteFolder(e.target.value)}
            >
              <option value=''>Folder... </option>
              {folderOptions}
            </select>
          </div>
          {this.state.noteFolder.touched && <ValidateError message={NoteFolderError} />}

          <div>
            <label htmlFor='noteName'>Note Name: </label>
            <input
              type='text'
              className='formInput'
              name='noteName'
              id='noteName'
              defaultValue = {this.state.noteName.value}
              aria-label="New Note Name"
              aria-required="true"
              onChange={e => this.updateNoteName(e.target.value)}
            />
          </div>
          {this.state.noteName.touched && <ValidateError message={NoteNameError} />}

          <div>
            <label htmlFor='noteContent'>Note Content: </label>
            <textarea
              className='formTextArea'
              name='noteContent'
              id='noteContent'
              defaultValue = {this.state.noteContent.value}
              aria-label="Content of Note"
              aria-required="true"
              onChange={e => this.updateNoteContent(e.target.value)}
            >
            </textarea>
          </div>
          {this.state.noteContent.touched && <ValidateError message={NoteContentError} />}

          <div className='submitButtons'>
            <button
              type='submit'
              className='formButtons'
              id='AddNoteButton'
              disabled={this.state.noteAddButton.value ? '' : 'disabled'}
            >
              Add
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(NoteAddForm);
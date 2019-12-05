import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import Header from './Header/Header';
import FolderList from './FolderList/FolderList';
import NotesList from './NotesList/NotesList';
import FolderNote from './FolderNote/FolderNote';
import Note from './Note/Note';
import FolderAdd from './AddForms/FolderAdd';
import FolderAddForm from './AddForms/FolderAddForm';
import NoteAddForm from './AddForms/NoteAddForm';
import ErrorBoundary from './ErrorBoundary';
import config from './config';

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  setFolders = folders => {
    this.setState({
      folders
    })
  }

  setNotes = notes => {
    this.setState({
      notes
    })
  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ],
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ],
    })
  }

  handleDeleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    );
    this.setState({
      notes: newNotes
    });
  }

  getFolder(notesId) {
    const gotNote =  this.state.notes.find(note => note.id === notesId);
    return this.state.folders.find(folder => folder.id === gotNote.folderId);
  } 

  componentDidMount() {
    fetch(config.API_ENDPOINT_FOLDERS, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(this.setFolders)
      .catch(error => this.setState({error}))

      fetch(config.API_ENDPOINT_NOTES, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status)
          }
          return response.json()
        })
        .then(this.setNotes)
        .catch(error => this.setState({error}))
  }


  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      onDeleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
    }

    return (
      <div className="App">
        <Route
          path='/'
          component={Header}
        />

        <NotefulContext.Provider value={contextValue}>
          <div className='App_sections'>
              { /* All Folders/Notes list */ }
              <ErrorBoundary>
                <Route
                  exact path = '/'
                  render={ () =>
                    <>
                      <FolderList folders={this.state.folders} />
                      <NotesList notes={this.state.notes} />
                    </>
                  }
                />
              </ErrorBoundary>

              { /* Selected Folder/All Notes for Folder list */ }
              <ErrorBoundary>
                <Route
                  exact path = '/folder/:folderId'
                  render={ (routeProps) =>
                    <>
                      <FolderList folders={this.state.folders} />
                      <NotesList 
                        notes={this.state.notes.filter(note => note.folderId === routeProps.match.params.folderId)} 
                      />
                    </>
                  }
                />
              </ErrorBoundary>

              { /* Selected Folder/Note list */}
              <ErrorBoundary>
                <Route
                  exact path = '/note/:NoteId'
                  render = { (routeProps) =>
                    <>
                      <FolderNote 
                        folder={ this.getFolder(routeProps.match.params.NoteId) } 
                        {...routeProps}
                      />
                      <Note 
                        notes={this.state.notes.find(note => note.id === routeProps.match.params.NoteId)}
                      />
                    </>
                  }
                />
              </ErrorBoundary>

              { /* Add new Folder */ }
              <ErrorBoundary>
                <Route 
                  path='/addFolder'
                  render = { (routeProps) =>
                    <>
                      <FolderAdd {...routeProps} folder={this.state.folders} />
                      <FolderAddForm />
                    </>
                  }
                />
              </ErrorBoundary>
              
              { /* Add new Note */ }
              <ErrorBoundary>
                <Route 
                  path='/addNote'
                  render = { (routeProps) =>
                    <>
                      <FolderAdd {...routeProps} folder={this.state.folders} />
                      <NoteAddForm />
                    </>
                  }
                />
              </ErrorBoundary>
          </div>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
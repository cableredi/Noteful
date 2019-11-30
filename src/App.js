import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import Header from './Header/Header';
import FolderList from './FolderList/FolderList';
import NotesList from './NotesList/NotesList';
import FolderNote from './FolderNote/FolderNote';
import Note from './Note/Note';
import config from './config';

class App extends Component {
  state = {
    folders: [],
    notes: [],
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

  handleDeleteNote = (noteId) => {
  console.log('App handleDeleteNote')
  console.log(noteId)
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
      onDeleteNote: this.handleDeleteNote
    }

    return (
      <div className="App">
        <Route
          path='/'
          component={Header}
        />

        <NotefulContext.Provider value={contextValue}>
          <div className='App_sections'>
            { /* sidebar section */ }
            <section className='App_FolderList'>

              { /* Main Folder list */ }
              <Route
                exact path = '/'
                component={FolderList}
              />

              { /* Selected Folder list */ }
              <Route
                exact path = '/folder/:folderId'
                component={FolderList}
              />

              { /* Selected Note */}
              <Route
                exact path = '/note/:NoteId'
                render = { (routeProps) => 
                  <FolderNote 
                    folder={ this.getFolder(routeProps.match.params.NoteId) } 
                    {...routeProps}
                  />
                }
              />
            </section>

            { /* main section */ }
            <section className='App_NotesList'>

              { /* All Notes list */ }
              <Route
                exact path = '/'
                render={ () =>
                  <NotesList notes={this.state.notes} />
                }
              />

              { /* Selected Folder Notes list */ }
              <Route
                exact path = '/folder/:folderId'
                render={ (routeProps) =>
                  <NotesList 
                    notes={this.state.notes.filter(note => note.folderId === routeProps.match.params.folderId)} 
                  />
                }
              />

              { /* Selected Note */ }
              <Route
                exact path = '/note/:noteId'
                render={ (routeProps) =>
                  <Note 
                    notes={this.state.notes.find(note => note.id === routeProps.match.params.noteId)}
                  />
                }
              />
            </section>

          </div>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
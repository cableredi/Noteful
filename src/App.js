import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NOTES from './dummy-store';
import Header from './Header/Header';
import FolderList from './FolderList/FolderList';
import NotesList from './NotesList/NotesList';
import FolderNote from './FolderNote/FolderNote';
import Note from './Note/Note';

class App extends Component {
  state = {
    folders: NOTES.folders,
    notes: NOTES.notes
  }

  getFolder(NotesId) {
    const gotNote =  this.state.notes.filter(note => note.id === NotesId);
    return this.state.folders.filter(folder => folder.id === gotNote[0].folderId);
  } 

  render() {
    return (
      <div className="App">
        <Route
          path='/'
          component={Header}
        />

        <div className='App_sections'>
          { /* sidebar section */ }
          <section className='App_FolderList'>

            { /* Main Folder list */ }
            <Route
              exact path = '/'
              render = { () =>
                <FolderList folders={this.state.folders} />
              }
            />

            { /* Selected Folder list */ }
            <Route
              exact path = '/folder/:folderId'
              render = { () =>
                <FolderList folders={this.state.folders} />
              }
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
                  notes={this.state.notes.filter(note => note.id === routeProps.match.params.noteId)} 
                />
              }
            />
          </section>

        </div>
      </div>
    );
  }
}

export default App;

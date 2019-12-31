import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import AddButton from '../AddForms/AddButton';

export default class FolderList extends Component {
  render() {
    const isActive = (path, match, location) => !!(match || path === location.pathname);

    const folderItems = ( 
      <NotefulContext.Consumer>
        { (context) => (
          context.folders.map( (folder) => 
            <li key={folder.id}>
              <NavLink
                className='Folderlist'
                to={`/folder/${folder.id}`}
                isActive={isActive.bind(this, `/folder/${folder.id}`)}
              >
                {folder.folderName}
              </NavLink>
            </li>
          )
        )}
      </NotefulContext.Consumer>
    );

    return (

      <section className='App_FolderList'>
        <ul>
          {folderItems}
        </ul>
        <div className='Add_button'>
          <AddButton
            tag={Link}
            to='../addFolder'
            type='button' 
            className='Add_button-button'
          >
            Add Folder
          </AddButton>
        </div>
      </section>
    )
  }
}

FolderList.defaultProps = {
  folders: []
}

FolderList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
};
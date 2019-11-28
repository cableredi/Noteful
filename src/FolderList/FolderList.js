import React from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

export default function FolderList(props) { 
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
              {folder.name}
            </NavLink>
          </li>
        )
      )}
    </NotefulContext.Consumer>
  )

  return(
    <>
      <ul>
        {folderItems}
      </ul>
      <button className='FolderButton'>Add Folder</button>
    </>
  )
}
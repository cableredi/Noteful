import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FolderList(props) { 
  const isActive = (path, match, location) => !!(match || path === location.pathname);

  const folderItems = props.folders.map( (folder) => 
    <li 
      key={folder.id}
    >
      <NavLink
        className={'Folderlist'}
        to={`/folder/${folder.id}`}
        isActive={isActive.bind(this, `/folder/${folder.id}`)}
      >
        {folder.name}
      </NavLink>
    </li>
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
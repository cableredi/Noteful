import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FolderList(props) {
  const folderItems = props.folders.map( (folder) => 
    <NavLink
      className='Folderlist_selected'
      key={folder.id}
      to={`/folder/${folder.id}`}
    >
      <li>
          {folder.name}
      </li>
    </NavLink>
  )

  return(
    <>
      <ul className='FolderList'>
        {folderItems}
      </ul>
      <button className='FolderButton'>Add Folder</button>
    </>
  )
}
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  let node = useRef(null);
  const [ editStatus, setEditStatus ] = useState(false);
  const [ value, setValue ] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const closeSearch = (editItem) => {
    //e.preventDefault();
    setEditStatus(false);
    setValue('');

    if(editItem.isNew){
      onFileDelete(editItem.id)
    }
  };
  useEffect(()=>{
    const newFile = files.find(file => file.isNew);
    if(newFile){
      setEditStatus(newFile.id);
      setValue(newFile.title)
    }
  }, [files]);
  useEffect(() => {
    const editItem = files.find(file => file.id === editStatus);
    if(enterPressed && editStatus && value.trim()){
      onSaveEdit(editItem.id, value);
      setEditStatus(false);
      setValue('')
    }
    if(escPressed && editStatus){
      closeSearch(editItem)
    }
    /*const handleInputEvent = (event) => {
      const { keyCode } = event;
      if(keyCode === 13 && editStatus && value){
        const editItem = files.filter(file => file.id === editStatus);
        onSaveEdit(editItem[0].id, value);
        setEditStatus(false);
        setValue('')
      }else if(keyCode === 27 && editStatus){
        closeSearch(event)
      }
    };
    document.addEventListener('keyup', handleInputEvent);
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }*/
  });

  useEffect(() => {
    if(editStatus){
      node.current.focus()
    }
  });

  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li
            className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
            key={file.id}
          >
            { ( file.id !== editStatus && !file.isNew) &&
              <>
                <span className="col-2">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faMarkdown}
                  />
                </span>
                    <span
                      className="col-7 c-link"
                      onClick={() => { onFileClick(file.id) }}
                    >
                  {file.title}
                </span>
                <button
                  type="button"
                  className="icon-button col-1"
                  onClick={() => { setEditStatus(file.id); setValue(file.title) }}
                >
                  <FontAwesomeIcon
                    title="编辑"
                    size="lg"
                    icon={faEdit}
                  />
                </button>

                <button
                  type="button"
                  className="icon-button col-1"
                  onClick={() => { onFileDelete(file.id) }}
                >
                  <FontAwesomeIcon
                    title="删除"
                    size="lg"
                    icon={faTrash}
                  />
                </button>
              </>
            }
            {
              (( file.id === editStatus ) || (file.isNew)) &&
              <>
                <input
                  className="form-control col-10"
                  ref={node}
                  value={value}
                  placeholder="请输入文件名称"
                  onChange={e => setValue(e.target.value)}
                />
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => {closeSearch(file)}}
                >
                  <FontAwesomeIcon
                    title="关闭"
                    size="lg"
                    icon={faTimes}
                  />
                </button>
              </>
            }
          </li>
        ))
      }
    </ul>
  )
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
};

export default FileList

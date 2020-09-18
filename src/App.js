import React, { useState, useEffect, useRef } from 'react';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from 'react-simplemde-editor';
import { v4 as uuidv4 } from 'uuid';
import { flattenArr, objToArr } from './utils/helper'
import 'easymde/dist/easymde.min.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import BottomBtn from './components/BottomBtn';
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'

const fs = window.require('fs');
console.log(fs)

function App() {
  const [ files, setFiles ] = useState(flattenArr(defaultFiles));
  const [ searchedFiles, setSearchedFiles ] = useState([]);
  const [ activeFileID, setActiveFileID ] = useState('');
  const [ openedFileIDs, setOpenedFileIDs ] = useState([]);
  const [ unsavedFileIDs, setUnsavedFileIDs ] = useState([]);
  const filesArr = objToArr(files);

  const fileClick = (fileID) => {
    setActiveFileID(fileID);
    if(!openedFileIDs.includes(fileID)) setOpenedFileIDs([ ...openedFileIDs, fileID ])
  };
  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  };
  const tabClose = (id) => {
    const tabWithout = openedFileIDs.filter(fileID => fileID !== id);
    setOpenedFileIDs(tabWithout);

    if(tabWithout.length > 0){
      setActiveFileID(tabWithout[0])
    }else {
      setActiveFileID('')
    }
  };
  const fileChange = (id, value) => {
    const newFile = { ...files[id], body: value };
    setFiles({ ...files, [id]: newFile });
    if(!unsavedFileIDs.includes(id)){
      setUnsavedFileIDs([ ...unsavedFileIDs, id ])
    }
  };
  const deleteFile = (id) => {
    delete files[id];
    setFiles(files);
    tabClose(id)
  };
  const updateFileName = (id, title) => {
    const modifiedFile = { ...files[id], title, isNew: false };
    setFiles({ ...files, [id]: modifiedFile })
  };
  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword));
    setSearchedFiles(newFiles)
  };
  const activeFile = files[activeFileID];
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  });
  const fileListArr = searchedFiles.length ? searchedFiles : filesArr;

  const createNewFile = () => {
    const newID = uuidv4();
    const newFile = {
      title: '',
      body: '## Please Input Markdown',
      createdAt: new Date().getTime(),
      isNew: true
    };
    setFiles({ ...files, [newID]: newFile })
  };
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            title="我的云文档"
            onFileSearch={fileSearch}
          />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col no-border">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          { !activeFile &&
            <div className="start-page">
              选择或者创建新的 Markdown 文档
            </div>
          }
          { activeFile &&
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsavedIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                options={{
                  minHeight: '515px'
                }}
                value={activeFile && activeFile.body}
                onChange={value => {fileChange(activeFile.id, value)}}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;

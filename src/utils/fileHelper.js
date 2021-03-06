const fs = require('fs').promises;
const path = require('path');

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, { encoding: 'utf8' })
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  },
};

const testPath = path.join(__dirname, 'helper.js');
const testWritePath = path.join(__dirname, 'hello.md');
const renamePath = path.join(__dirname, 'rename.md');

// fileHelper.readFile(testPath).then(res=>{
//   console.log(res)
// });
//
// fileHelper.writeFile(testWritePath, '## hello world').then(res=>{
//   console.log('写入成功')
// });
//
// fileHelper.renameFile(testWritePath, renamePath).then(res=>{
//   console.log('重命名成功')
// });

fileHelper.deleteFile(renamePath).then(res=>{
  console.log('删除成功')
});

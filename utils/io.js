
const multer = require('koa-multer');
const { statSync, readdirSync } = require('fs');
const path = require('path');

//files配置
var filesStorage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/files/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
//加载配置
var filesUpload = multer({
   storage: filesStorage,
   limits: {
      fileSize: 1024 * 1024 * 20 // 限制20M
    }
});



const filePathList = async (dirPath) => {
  // 被读取的文件夹地址
  const arr = [];
  const fileDisplay = async (filePath) => {
    console.log(filePath);
    //根据文件路径读取文件，返回文件列表
    const files = await readdirSync(filePath);
    files.forEach(async(item) => {
      const itemPath = path.join(filePath, item);
      const stat = statSync(itemPath);
      if (stat.isDirectory()) fileDisplay(itemPath);
      if (stat.isFile()) arr.push(itemPath);
    });
  }
  
  await fileDisplay(path.resolve(dirPath));
  const fileDirName = dirPath.substr(dirPath.lastIndexOf('/'));
  for (let index = 0; index < arr.length; index++) {
    const name = arr[index];
    arr[index] = name.split(fileDirName)[1];
  }
  return arr;
};

module.exports = {
  filesUpload,
  filePathList,
};
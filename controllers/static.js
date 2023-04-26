
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { filePathList } = require('../utils/io');

class StaticServer {

  static async getFile(ctx) {
    const { fileName } = ctx.params;
    let filePath = path.join(__dirname, `../public/files/${fileName}`);
    let file = null;
    try {
        file = fs.readFileSync(filePath);
        let mimeType = mime.lookup(filePath);
        ctx.set('content-type', mimeType);
        ctx.body = file;
    } catch (error) {
      ctx.body = JSON.stringify(error);
    }
  }

  static async saveFile(ctx) {
    // 解析数据
    const file = ctx.req.file;
    if (file && file.filename) ctx.body = {
      code: '200',
      data: file.filename,
      success: true,
    };
    else {
      ctx.body = {
        code: '300',
        data: null,
        success: false,
      };
    }
  }

  static async getFileList() {
    const list = await filePathList('public/files');
    return list.map((fileName) => {
      if (fileName.charAt(0) === '/') return fileName.substr(1);
      return fileName;
    });
  }
}

module.exports = StaticServer;

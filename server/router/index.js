import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import koaBody from 'koa-body';
import reactDomServer from 'react-dom/server';

const index = new Router();

index.post('/upload',
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
  }), async (ctx) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../extensions') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.body = JSON.stringify({ result: 200, fileName: file.name });
  });

index.post('/getUploadJS', koaBody(), async (ctx) => {
  const { fileName } = JSON.parse(ctx.request.body);
  const filePath = path.join(__dirname, '../extensions') + `/${fileName}`;
  const element = fs.readFileSync(filePath, 'utf-8');
  console.log(element);
  ctx.body = JSON.stringify({ html : element });
});

export default index;
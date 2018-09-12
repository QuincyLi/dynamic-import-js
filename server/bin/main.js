import koa from 'koa';
import path from 'path';
import router from 'koa-router';
import serve from 'koa-static';

const app = new koa();
const staticPath = process.env.NODE_ENV === 'DEV' ? path.resolve('./src') : path.resolve('./dist/src');

if (process.env.NODE_ENV === 'DEV') {
  const devMiddleware = require('koa-webpack-dev-middleware');
  const hotMiddleware = require('koa-webpack-hot-middleware');
  const webpack = require('webpack');
  const devConfig = require('../../webpack.config.js');
  const complie = webpack(devConfig);

  app.use(devMiddleware(complie, {
    noInfo: false,
    // 编译信息有颜色显示
    stats: {
      colors: true,
      quiet: true,
      publicPath: devConfig.output.publicPath
    }
  }));

  app.use(hotMiddleware(complie));
}

app.use(
  serve(staticPath)
)

app.listen(3000, () => {
  console.log('you are listening on port 3000');
})
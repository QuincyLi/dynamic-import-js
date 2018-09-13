import koa from 'koa';
import path from 'path';
import Router from 'koa-router';
import serve from 'koa-static';

import index from '../router/index';

const app = new koa();
const router = new Router();
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

if (process.env.NODE_ENV === 'DEBUG') {
  const devMiddleware = require('koa-webpack-dev-middleware');
  const hotMiddleware = require('koa-webpack-hot-middleware');
  const webpack = require('webpack');
  const devConfig = require('../../webpack.config.debug.js');
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
);

app.use(
  serve(path.resolve('./server/extensions'))
);

router.use('', index.routes(), index.allowedMethods());
app.use(router.routes(), router.allowedMethods());

app.listen(3000, () => {
  console.log('you are listening on port 3000');
})
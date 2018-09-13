import Router from 'koa-router';

const index = new Router();

index.post('/upload', async (ctx) => {
  console.log(ctx);
  ctx.body = 'successed';
});

export default index;
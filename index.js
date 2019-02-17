const Koa = require('koa');
const env = require('./environment');
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.type = "application/json; charset=utf-8";
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.request.method === 'GET' && ctx.request.url === '/') {
    return ctx.body = JSON.stringify({message: 'Contribute to this public API via https://github.com/PhentomPT/atrasos-api'});
  }

  await next();
});

app.use(async (ctx, next) => {
  if (ctx.request.method === 'GET' && ctx.request.url === '/delays') {
    const mongoose = require('mongoose');
    const Delay = require('./models/delay');

    let response = {};
    try {
      await mongoose.connect(env.DB_CONNECTION);
      const results = await Delay.find({status: 'ACTIVE'}).exec();

      return ctx.body = JSON.stringify({results});
    } catch (error) {
      response[error] = {
        status: 500,
        message: 'Sorry... problem fetching delays'
      };
    }

    return ctx.body = JSON.stringify(response);
  }

  await next();
});

app.use(async (ctx, next) => {
  ctx.status = 404;
  ctx.body = JSON.stringify({message: '404: Not Found...'});
})

app.listen(env.PORT);
console.info(`API on port: ${env.PORT}`)
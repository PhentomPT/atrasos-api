const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const env = require('./environment');

const app = new Koa();
const router = new Router();

router.get('/', require('./controllers/home'));
router.get('/delays', require('./controllers/delays/get'));
router.post('/delays', require('./controllers/delays/create'));

app
  .use(async (ctx, next) => {
    ctx.accepts('application/json');
    ctx.type = "application/json; charset=utf-8";
    await next();
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    ctx.status = 404;
    ctx.body = JSON.stringify({message: '404: Not Found...'});
  })
  .listen(env.PORT);
  
console.info(`API on port: ${env.PORT}`)
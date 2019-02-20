const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cache = require('flat-cache');
const logger = require('./helpers/logger');
const env = require('./environment');

const app = new Koa();
const router = new Router();

cache.clearAll();

router.get('/', require('./controllers/home'));
router.get('/delays', require('./controllers/delays/get'));
router.post('/delays', require('./controllers/delays/create'));

app
  .use(async (ctx, next) => {
    ctx.accepts('application/json');
    ctx.type = 'application/json; charset=utf-8';
    await next();
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx) => {
    ctx.status = 404;
    ctx.body = JSON.stringify({ message: '404: Not Found...' });
  })
  .listen(env.PORT);

logger.info(`API on port: ${env.PORT}`);

const mongoose = require('mongoose');
const cache = require('memory-cache');

const logger = require('../../helpers/logger');
const env = require('../../environment');

const Delay = require('../../models/delay');

module.exports = async (ctx) => {
  const response = {};
  try {
    await mongoose.connect(env.DB_CONNECTION, { useNewUrlParser: true });
    const delay = new Delay({
      company: ctx.request.body.company,
      delay: ctx.request.body.delay,
      line: ctx.request.body.line,
      direction: ctx.request.body.direction,
      status: ctx.request.body.status,
    });


    const delayDoc = await delay.save();

    let delays = cache.get('delays');

    if (!delays) {
      delays = [];
    }

    delays.push(delayDoc);
    cache.put('delays', delays);

    mongoose.disconnect();

    ctx.body = JSON.stringify({ status: 200, message: 'Delay registered' });
    return;
  } catch (error) {
    logger.error(error);
    response.error = {
      status: 500,
      message: 'Problem saving delay',
    };
    ctx.status = 500;
  }

  ctx.body = JSON.stringify(response);
};

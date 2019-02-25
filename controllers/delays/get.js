const mongoose = require('mongoose');
const cache = require('memory-cache');

const logger = require('../../helpers/logger');
const env = require('../../environment');
const Delay = require('../../models/delay');

async function getDelays() {
  await mongoose.connect(env.DB_CONNECTION, { useNewUrlParser: true });
  const delays = await Delay.find({ status: 'ACTIVE' }).exec();
  mongoose.disconnect();

  return delays;
}

module.exports = async (ctx) => {
  const response = {};
  try {
    let delays = cache.get('delays');

    if (!delays) {
      delays = await getDelays();
      cache.put('delays', delays);
    }

    ctx.body = JSON.stringify({ delays });
    return;
  } catch (error) {
    logger.error(error);
    response.error = {
      status: 500,
      message: 'Problem fetching delays',
    };
    ctx.status = 500;
  }

  ctx.body = JSON.stringify(response);
};

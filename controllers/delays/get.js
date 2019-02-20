const mongoose = require('mongoose');
const delaysCache = require('flat-cache').load('delays-store', './.cache');

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
    let delays = delaysCache.getKey('delays');

    if (!delays) {
      delays = await getDelays();
      delaysCache.setKey('delays', delays);
      delaysCache.save();
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

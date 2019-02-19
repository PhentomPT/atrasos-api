const mongoose = require('mongoose');
const delaysCache = require('flat-cache').load('deloys-store');
const env = require('../../environment');

const Delay = require('../../models/delay');

module.exports = async (ctx, next) => {
    let response = {};
    try {
      await mongoose.connect(env.DB_CONNECTION, {useNewUrlParser: true});
      const delay = new Delay({
        company: ctx.request.body.company,
        delay: ctx.request.body.delay,
        line: ctx.request.body.line,
        direction: ctx.request.body.direction,
        status: ctx.request.body.status,
      });
  
      
      const delayDoc = await delay.save();

      let delays = delaysCache.getKey('delays');

      if (!delays) {
        delays = [];
      }
      
      delays.push(delayDoc);
      delaysCache.setKey('delays', delays);

      mongoose.disconnect();
  
      return ctx.body = JSON.stringify({status: 200, message: 'Delay registered'});
    } catch (error) {
      console.error(error);
      response['error'] = {
        status: 500,
        message: 'Problem saving delay'
      };
      ctx.status = 500;
    }
  
    return ctx.body = JSON.stringify(response);
}
const mongoose = require('mongoose');
const env = require('../../environment');
const Delay = require('../../models/delay');

module.exports = async (ctx, next) => {
    let response = {};
    try {
      await mongoose.connect(env.DB_CONNECTION, {useNewUrlParser: true});
      const delay = new Delay(ctx.request.body);
  
      await delay.save();
      await mongoose.disconnect();
  
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
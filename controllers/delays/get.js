const mongoose = require('mongoose');
const env = require('../../environment');
const Delay = require('../../models/delay');

module.exports = async (ctx, next) => {  
    let response = {};
    try {
        await mongoose.connect(env.DB_CONNECTION, {useNewUrlParser: true});
        const results = await Delay.find({status: 'ACTIVE'}).exec();
        await mongoose.disconnect();

        return ctx.body = JSON.stringify({results});
    } catch (error) {
        console.error(error);
        response['error'] = {
        status: 500,
        message: 'Problem fetching delays'
        };
        ctx.status = 500;
    }

    return ctx.body = JSON.stringify(response);
}
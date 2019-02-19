const mongoose = require('mongoose');
const delaysCache = require('flat-cache').load('delays-store');
const env = require('../../environment');
const Delay = require('../../models/delay');

async function getDelays() {
    await mongoose.connect(env.DB_CONNECTION, {useNewUrlParser: true});
    const delays = await Delay.find({status: 'ACTIVE'}).exec();
    mongoose.disconnect();

    return delays;
}

module.exports = async (ctx, next) => {  
    let response = {};
    try {
        let delays = delaysCache.getKey('delays');

        if (!delays) {
            delays = await getDelays();
            delaysCache.setKey('delays', delays);
        }

        return ctx.body = JSON.stringify({delays});
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
module.exports = async (ctx, next) => {
    return ctx.body = JSON.stringify({message: 'Contribute to this public API via https://github.com/PhentomPT/atrasos-api'});
}
module.exports = {
    "PORT": parseInt(process.env.PORT) || 3000,
    "DB_CONNECTION": process.env.DB_CONNECTION || 'mongodb://localhost/atrasos-api',
    "ACCESS_KEY": process.env.ACCESS_KEY || 'dummy_key'
}
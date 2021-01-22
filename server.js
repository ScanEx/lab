const fastify = require('fastify')({
    logger: true
});

const path = require('path');

const rows = require('./ls8.json');

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),    
});

fastify.get('/layer', (req, res) => {
    return rows;
});
  
const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
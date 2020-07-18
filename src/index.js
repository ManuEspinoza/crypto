const app = require('./app');
require('./db/db');
const PORT = process.env.PORT;
const initDatabase = require('./helpers/initdatabase');

initDatabase();

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
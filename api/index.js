const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { DataBase } = require('./src/DB/DB')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    DataBase();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

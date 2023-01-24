const express = require('express');
const app = express();
const routers = require('./routers');

app.get('/', function (req, res) {
  res.json('Library Serve Project');
});

app.use(routers.authRouter);
app.use(routers.userRouter);
app.use(routers.libraryRouter);
app.use(routers.authorRouter);
app.use(routers.bookRouter);
app.use(routers.librariesBookRouter);

app.use((req, res, next) => {
  res.send('404 NOT FOUND');
});

module.exports = app;

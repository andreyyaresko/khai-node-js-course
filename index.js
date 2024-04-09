const express = require('express')
const productRoutes = require('./product.routes');
const { logRequest } = require('./middleware');
const { errorResponder } = require('./error.middleware');

const app = express();
const PORT = 3000;

app.use(logRequest);
app.use(productRoutes);
app.use(errorResponder);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
const express = require('express');

const app = express();
const PORT = 505;

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.listen(PORT, () => {
  console.log('Servidor iniciado en http://localhost:0505');
});
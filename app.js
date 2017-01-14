const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send(`node version ${process.version} working for mfc3 plus one`);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backbone app listening on port ${PORT}`);
});
// [END app]

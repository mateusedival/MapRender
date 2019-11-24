const express = require("express");

const app = express();
const router = express.Router();

app.use(require('cors')());

app.get("/points", (req, res) => {
  res.json([
    {
      x: 1,
      y: 3
    },
    {
      x: 4,
      y: 5
    },
    {
      x: 5,
      y: 6
    }
  ]);
});

app.listen(8081, () => console.log('listening in http://localhost:8081'));


//[[1,3],[2,4],[4,5]]

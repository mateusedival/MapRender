const express = require("express");

const app = express();
const router = express.Router();

app.use(require('cors')());

//Pontos em WireFrame
app.get("/pointsW", (req, res) => {
  res.json([
    {
      x: 200,
      y: 300
    },
    {
      x: 205,
      y: 305
    },
    {
      x: 198,
      y: 297
    }
  ]);
});

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

app.get("/file", (req, res) => {
  res.download('./index.html')
});

app.listen(8081, () => console.log('listening in http://localhost:8081'));

//[[1,3],[2,4],[4,5]]

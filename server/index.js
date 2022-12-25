// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3005;

const msgDebut = "On joue-ti au beu???";
const msgMilieu = "On joue au beu!!!";

const app = express();
let credentials = { username: "piqueAtout", password: "$2a$10$CwTycUXWue0Thq9StjUM0uYeGlesTBdnAHall/2/EJ57bnCFcW/0G" };

// parse application/json
app.use(express.json());

app.get("/api/:msgId", (req, res) => {
  switch (req.params.msgId) {
    case 'debut': {
      res.json({ message: msgDebut });
      break;
    }
    case 'milieu':
    default: {
      res.json({ message: msgMilieu });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/credentials", (req, res) => {
  res.json(credentials);
});

app.post("/api/credentials", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (req.body.username === credentials.username && req.body.password === credentials.password) {
    console.log('yé');
    return res.sendStatus(200);
  }
  console.log(credentials.password);
  console.log(req.body.password);
  return res.sendStatus(401);
});




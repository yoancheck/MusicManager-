const express = require("express");
const app = express();
const musics = require("./musics.json");
var Music = require("./entities/music");
bodyParser = require("body-parser").json();

app.use(express.json());

app.get("/musics", (req, res) => {
  res.status(200).json(musics);
});

app.get("/musics/:name", (req, res) => {
  const name = req.params.name;
  const music = musics.find((music) => music.name === name);
  res.status(200).json(music);
});

app.post("/musics", (req, res) => {
  if (!req.body || !req.body.name || !req.body.author || !req.body.year) {
    res.status(400).send({
      message: "Content name, author, year can not be empty!",
    });
    return;
  }
  const newMusic = new Music(req.body.name, req.body.author, req.body.year);
  musics.push(newMusic);
  res.status(200).json(musics);
});

// Change year of music
app.put("/musics/:name", (req, res) => {
  const name = req.params.name;
  if (!req.body.year) {
    res.status(400).send({
      message: "Year can not be empty!",
    });
    return;
  }

  for (let i = 0; i < musics.length; i++) {
    if (musics[i].name === name) {
      musics[i].year = req.body.year;
      res.status(200).json(musics);
      return;
    }
  }
  res.status(400).json("Music not found");
});

app.delete("/musics/:name", (req, res) => {
  const name = req.params.name;
  for (let i = 0; i < musics.length; i++) {
    if (musics[i].name === name) {
      musics.splice(i, 1);
      res.status(200).json(musics);
      return;
    }
  }
  res.status(400).json("Music not found");
});

port = 3001;
app.listen(port, () => {
  console.log(`Listenning on ${port}`);
});

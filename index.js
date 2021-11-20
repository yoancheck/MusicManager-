const express = require("express");
const app = express();
const musics = require("./musics.json");
var Music = require("./entities/music");
var cors = require("cors");
bodyParser = require("body-parser").json();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3006" }));

app.get("/musics", (req, res) => {
  res.status(200).json(musics);
});

app.get("/musics/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const music = musics.find((music) => music.id === id);
  res.status(200).json(music);
});

app.post("/musics", (req, res) => {
  if (!req.body || !req.body.name || !req.body.author || !req.body.URL) {
    res.status(400).send({
      message: "Content name, author, URL can not be empty!",
    });
    return;
  }
  const newMusic = new Music(
    musics.length + 1,
    req.body.name,
    req.body.author,
    req.body.URL
  );
  musics.push(newMusic);
  res.status(200).json(musics);
});

app.put("/musics/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let music = musics.find((music) => music.id === id);
  res.status(200).json(music);
});

app.delete("/musics/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let music = musics.find((music) => music.id === id);
  musics.splice(musics.indexOf(music), 1);
  res.status(200).json(musics);
});

port = 3000;
app.listen(port, () => {
  console.log(`Listenning on ${port}`);
});

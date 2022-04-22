// calling the express library and requiring
// const { application } = require('express');
const express = require('express');
const data = require('./db/db.json');
//allow for relative paths
const path = require('path');
const {writeFileSync} = require('fs');

const app = express();
const PORT = 3001;
// directs to the public folder where the client side files are stored
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'))
});

app.post('/api/notes', (req, res) => {
    const note = req.body
    // res.sendFile(path.join(__dirname, 'db/db.json'))
data.push(note);
    writeFileSync("./db/db.json", JSON.stringify(data));
    res.sendFile(path.join(__dirname, './db/db.json'))
    console.log("note added")
});




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);






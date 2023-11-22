const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving notes
notes.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for tips`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST Route for saving notes on the request body & adding to db.json, returning new note to end user
notes.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.errored(`Error in adding note`);
    }
});
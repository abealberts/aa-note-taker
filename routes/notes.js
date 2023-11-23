const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

var noteList = require('../db/db.json');

// GET Route for retrieving notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST Route for saving notes on the request body & adding to db.json
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error(`Error in adding note`);
    }
});

//DELETE Route for deleting notes within db.json that have the targeted id
notes.delete('/:id', (req, res) => {
    const idToRemove = req.params.id;

    for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].id == idToRemove) {
            delete noteList[i];
        }
    };

    console.info(`Note (${idToRemove}) deleted successfully`);
    writeToFile('./db/db.json', noteList);
    res.json(`Note deleted successfully`);
});

module.exports = notes;